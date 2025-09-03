import { motion, useReducedMotion } from 'framer-motion';
import { HOW_IT_WORKS_STEPS } from './content';
import { fadeInUp, staggerContainer } from './variants';

export const HowItWorks: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container">
        <header className="mb-12 max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-3 text-neutral-300">A concise three-step journey designed for clarity and sustained momentum.</p>
        </header>
        <motion.ol
          variants={staggerContainer(0.2)}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, amount: 0.35 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {HOW_IT_WORKS_STEPS.map(step => (
            <motion.li
              key={step.id}
              variants={fadeInUp}
              className="relative rounded-lg border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white shadow">
                {step.id}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};
