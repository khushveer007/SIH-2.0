import { motion, useReducedMotion } from 'framer-motion';
import { TESTIMONIALS } from './content';
import { marqueeContainer } from './variants';
import { useEffect, useRef } from 'react';

export const Testimonials: React.FC = () => {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return; // static fallback when reduced motion
    const track = trackRef.current;
    if (!track) return;
    let frame: number;
    let x = 0;
    const speed = 0.4; // px per frame
    const loop = () => {
      x -= speed;
      if (Math.abs(x) >= track.scrollWidth / 2) x = 0; // loop
      track.style.transform = `translateX(${x}px)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container">
        <header className="mb-12 max-w-xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Testimonials</h2>
          <p className="mt-3 text-neutral-300">What early users & educators are saying.</p>
        </header>
        <motion.div
          variants={marqueeContainer}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden border border-neutral-800/80 rounded-lg bg-neutral-900/40"
        >
          <div
            ref={trackRef}
            className={`flex min-w-max select-none ${reduce ? 'flex-wrap p-6 gap-6' : 'gap-0'} hover:[animation-play-state:paused]`}
            aria-live="polite"
          >
            {[...TESTIMONIALS, ...TESTIMONIALS].map(item => (
              <figure
                key={`${item.id}-${Math.random()}`}
                className="w-80 shrink-0 p-6 border-r border-neutral-800/80 last:border-r-0"
              >
                <blockquote className="text-sm text-neutral-200 leading-relaxed">“{item.quote}”</blockquote>
                <figcaption className="mt-4 text-xs font-medium text-neutral-400">
                  {item.author}{item.role && <span className="text-neutral-500"> · {item.role}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
