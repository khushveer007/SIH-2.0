import React, { useEffect, useRef } from 'react';

/**
 * Lightweight animated point globe (no external deps, friendly to SSR idle hydration).
 * Renders a rotating sphere of latitude/longitude points using a 2D canvas.
 */
export interface GlobeProps {
  /** Diameter in pixels (applied via style; canvas internally scales for devicePixelRatio) */
  size?: number;
  /** Color of individual points */
  pointColor?: string;
  /** Optional line color for meridians/parallels */
  lineColor?: string;
  /** Number of latitude divisions (higher => more points) */
  latSteps?: number;
  /** Number of longitude divisions */
  lonSteps?: number;
  /** Point radius in screen pixels */
  pointRadius?: number;
  /** Rotation speed scalar */
  speed?: number;
  className?: string;
}

export const Globe: React.FC<GlobeProps> = ({
  size = 420,
  pointColor = '#818cf8', // indigo-400-ish
  lineColor = 'rgba(255,255,255,0.08)',
  latSteps = 16,
  lonSteps = 32,
  pointRadius = 2,
  speed = 0.015,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const radius = size / 2 * 0.85; // margin inside canvas
    const center = { x: size / 2, y: size / 2 };

    // Precompute sphere points
    interface SpherePoint { x: number; y: number; z: number; }
    const points: SpherePoint[] = [];

    for (let i = 1; i < latSteps; i++) { // skip poles for points (we can add them separately)
      const theta = Math.PI * (i / latSteps); // polar angle
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      for (let j = 0; j < lonSteps; j++) {
        const phi = 2 * Math.PI * (j / lonSteps); // azimuthal
        const x = sinTheta * Math.cos(phi);
        const y = cosTheta; // y up
        const z = sinTheta * Math.sin(phi);
        points.push({ x, y, z });
      }
    }
    // add poles
    points.push({ x: 0, y: 1, z: 0 });
    points.push({ x: 0, y: -1, z: 0 });

    const drawFrame = () => {
      const rot = rotationRef.current;
      ctx.clearRect(0, 0, size, size);

      // Light background radial gradient subtle (optional)
      const g = ctx.createRadialGradient(center.x, center.y, radius * 0.2, center.x, center.y, radius);
      g.addColorStop(0, 'rgba(99,102,241,0.10)');
      g.addColorStop(1, 'rgba(30,27,75,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Optionally draw latitude / longitude lines (coarse to reduce fill cost)
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      const lineLatEvery = Math.max(1, Math.floor(latSteps / 4));
      const lineLonEvery = Math.max(1, Math.floor(lonSteps / 8));

      // Latitude circles
      for (let i = lineLatEvery; i < latSteps; i += lineLatEvery) {
        const theta = Math.PI * (i / latSteps);
        const y = radius * Math.cos(theta);
        const r = radius * Math.sin(theta);
        ctx.beginPath();
        // project circle rotated by rot around Y => becomes ellipse; approximate by many segments
        const segments = 48;
        for (let s = 0; s <= segments; s++) {
          const angle = 2 * Math.PI * (s / segments);
          const x3d = Math.cos(angle) * r;
          const z3d = Math.sin(angle) * r;
          // rotate around Y
          const xRot = x3d * Math.cos(rot) + z3d * Math.sin(rot);
          const zRot = -x3d * Math.sin(rot) + z3d * Math.cos(rot);
          // perspective (simple)
          const scale = 1 / (1 + zRot * 0.5);
          const x2d = center.x + xRot * scale;
          const y2d = center.y + y * scale;
          if (s === 0) ctx.moveTo(x2d, y2d); else ctx.lineTo(x2d, y2d);
        }
        ctx.stroke();
      }

      // Longitude lines
      for (let j = 0; j < lonSteps; j += lineLonEvery) {
        ctx.beginPath();
        const segments = 64;
        for (let s = 0; s <= segments; s++) {
          const t = -Math.PI / 2 + Math.PI * (s / segments); // from south to north
          const y3d = Math.sin(t);
          const r = Math.cos(t);
          const phi = 2 * Math.PI * (j / lonSteps);
          const x3d = r * Math.cos(phi);
          const z3d = r * Math.sin(phi);
          // rotate around Y
            const xRot = x3d * Math.cos(rot) + z3d * Math.sin(rot);
            const zRot = -x3d * Math.sin(rot) + z3d * Math.cos(rot);
          const scale = 1 / (1 + zRot * 0.5);
          const x2d = center.x + xRot * radius * scale;
          const y2d = center.y - y3d * radius * scale;
          if (s === 0) ctx.moveTo(x2d, y2d); else ctx.lineTo(x2d, y2d);
        }
        ctx.stroke();
      }

      // Draw points (simple painter's algorithm: sort by depth for nicer layering)
      const transformed = points.map(p => {
        const xRot = p.x * Math.cos(rot) + p.z * Math.sin(rot);
        const zRot = -p.x * Math.sin(rot) + p.z * Math.cos(rot);
        const scale = 1 / (1 + zRot * 0.5);
        return {
          screenX: center.x + xRot * radius * scale,
            screenY: center.y - p.y * radius * scale,
          depth: zRot,
          scale
        };
      });
      transformed.sort((a,b) => a.depth - b.depth); // back to front

      ctx.fillStyle = pointColor;
      for (const pt of transformed) {
        const rPix = pointRadius * pt.scale;
        if (rPix < 0.3) continue; // skip tiny
        ctx.beginPath();
        ctx.arc(pt.screenX, pt.screenY, rPix, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        rotationRef.current += speed;
      }
      animationRef.current = requestAnimationFrame(drawFrame);
    };

    animationRef.current = requestAnimationFrame(drawFrame);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [size, pointColor, lineColor, latSteps, lonSteps, pointRadius, speed, reducedMotion]);

  return (
    <div
      className={[
        'relative',
        'flex items-center justify-center',
        'select-none pointer-events-none',
        className || ''
      ].join(' ')}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

function usePrefersReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => { ref.current = mq.matches; };
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);
  return ref.current;
}

export default Globe;
