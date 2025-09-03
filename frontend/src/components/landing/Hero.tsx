import { motion, useReducedMotion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from './variants';

export const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative py-20 md:py-28 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,56,180,0.25),transparent_60%)]" />
      <div aria-hidden className="absolute -z-10 inset-0 opacity-[0.15] bg-[linear-gradient(120deg,#1e1e2e_0%,#181827_35%,#101016_70%)]" />
      {/* Decorative grid */}
      <div aria-hidden className="absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <motion.div
        variants={staggerContainer(0.18)}
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : 'show'}
        className="relative container max-w-4xl mx-auto text-center"
      >
        <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Future-Ready Guidance
          </span>
        </motion.h1>
        <motion.p variants={fadeInUp} className="mt-6 text-neutral-300 md:text-lg leading-relaxed">
          A structured pathway platform helping students discover, plan & track career-aligned learning journeys.
        </motion.p>
        <motion.div variants={scaleIn} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-started"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors"
          >
            Get Started
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-md border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
