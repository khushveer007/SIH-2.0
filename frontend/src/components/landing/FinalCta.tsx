import { motion, useReducedMotion } from 'framer-motion';
import { scaleIn, fadeInUp } from './variants';

export const FinalCta: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <section id="get-started" className="py-24 md:py-32 relative">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_70%)]" />
      <div className="container max-w-3xl mx-auto text-center">
        <motion.div
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, amount: 0.5 }}
          variants={scaleIn}
          className="relative rounded-2xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md p-10 overflow-hidden"
        >
          <div aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-indigo-500/20" />
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to Build Momentum?
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 text-neutral-300 leading-relaxed max-w-xl mx-auto">
            Create a profile and start exploring actionable academic and vocational pathways—
            clarity begins with a single step.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#register"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors"
            >
              Create Profile
            </a>
            <a
              href="#hero"
              className="inline-flex items-center justify-center rounded-md border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors"
            >
              Back to Top
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
