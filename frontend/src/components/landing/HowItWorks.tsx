import { motion, useReducedMotion } from 'framer-motion';
import { Compass, University, Rocket } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from './content';
import { fadeInUp, staggerContainer } from './variants';

const iconMap = {
  1: Compass,
  2: University,
  3: Rocket,
};

export const HowItWorks: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container">
        <header className="mb-12 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-3 text-neutral-300">A concise three-step journey designed for clarity and sustained momentum.</p>
        </header>
        <motion.ol
          variants={staggerContainer(0.2)}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, amount: 0.35 }}
          className="grid gap-6 md:grid-cols-3"
          role="list"
          aria-label="How it works steps"
        >
          {HOW_IT_WORKS_STEPS.map(step => {
            const IconComponent = iconMap[step.id as keyof typeof iconMap];
            return (
              <motion.li
                key={step.id}
                variants={fadeInUp}
                className="group"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Could add navigation or modal functionality here
                  }
                }}
              >
                <div
                  className="h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neutral-500/10 focus-within:scale-105 focus-within:shadow-lg focus-within:shadow-neutral-500/10 rounded-2xl bg-neutral-900/50 border border-neutral-800/50 backdrop-blur-sm"
                  role="listitem"
                  aria-labelledby={`step-${step.id}-title`}
                  aria-describedby={`step-${step.id}-description`}
                  tabIndex={0}
                >
                  <div className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/80 to-indigo-600/80 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={24} />
                    </div>
                    <h3 id={`step-${step.id}-title`} className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                    <p id={`step-${step.id}-description`} className="text-sm text-neutral-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
};
