import { motion, useReducedMotion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from './variants';
import { RetroGrid } from '../ui/retro-grid';
import { Ripple } from '../ui/ripple';
import { TextAnimate } from '../ui/text-animate';

export const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative py-24 md:py-32 overflow-hidden">
      {/* Magic UI Retro Grid Background */}
      {!reduceMotion && <RetroGrid className="-z-10" opacity={0.35} cellSize={70} angle={70} darkLineColor="rgba(255,255,255,0.08)" lightLineColor="rgba(0,0,0,0.2)" />}
      {/* Soft radial overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_65%)]" />
      <motion.div
        variants={staggerContainer(0.18)}
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : 'show'}
        className="relative container max-w-5xl mx-auto text-center px-6"
      >
        <motion.div variants={fadeInUp}>
          <TextAnimate
            as="h1"
            animation={reduceMotion ? 'fadeIn' : 'blurInUp'}
            by="word"
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
          >
            Future-Ready Guidance
          </TextAnimate>
        </motion.div>
        <motion.p variants={fadeInUp} className="mt-6 text-neutral-300 md:text-lg leading-relaxed max-w-2xl mx-auto">
          A structured pathway platform helping students discover, plan & track career-aligned learning journeys.
        </motion.p>
        <motion.div variants={scaleIn} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center relative">
          {!reduceMotion && <Ripple className="-z-10" mainCircleSize={240} />}
          <a
            href="#get-started"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-sm font-medium text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors"
          >
            Get Started
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-md border border-neutral-700 px-8 py-3 text-sm font-medium text-neutral-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors backdrop-blur-sm/30"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
