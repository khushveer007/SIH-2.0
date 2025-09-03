import { motion, useReducedMotion } from 'framer-motion';
import { FEATURE_ITEMS, CAREER_PATH_ROTATION } from './content';
import { fadeInUp, staggerContainer } from './variants';
import { useEffect, useState } from 'react';

export const Features: React.FC = () => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return; // skip rotation when reduced motion requested
    const id = setInterval(() => setIndex(i => (i + 1) % CAREER_PATH_ROTATION.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <header className="mb-12 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Core Features</h2>
          <p className="mt-3 text-neutral-300">Built for clarity, momentum & informed decision-making.</p>
        </header>
        <motion.div
          variants={staggerContainer(0.18)}
            initial={reduce ? undefined : 'hidden'}
            whileInView={reduce ? undefined : 'show'}
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-6 md:grid-cols-4 auto-rows-[200px]"
        >
          {FEATURE_ITEMS.map(item => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className={`group relative rounded-lg border border-neutral-800/90 bg-neutral-900/40 p-5 flex flex-col justify-between overflow-hidden ${item.emphasis ? 'md:col-span-2 row-span-2' : ''}`}
            >
              <div>
                <h3 className="text-lg font-semibold mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed line-clamp-4">{item.description}</p>
              </div>
              {item.emphasis && (
                <div className="mt-4 text-sm font-medium text-indigo-300/90">
                  <span className="opacity-70">Evolving Focus:</span>{' '}
                  <span className="inline-block min-w-[8ch]">
                    {CAREER_PATH_ROTATION[index]}
                  </span>
                </div>
              )}
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
