import { motion, useReducedMotion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from './variants';
import { RetroGrid } from '../ui/retro-grid';
import { Ripple } from '../ui/ripple';
import { Meteors } from '../ui/meteors';
import { AnimatedShinyText } from '../ui/animated-shiny-text';

export const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ 
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="hero" className="relative py-16 sm:py-24 md:py-32 overflow-hidden" aria-labelledby="hero-heading">
      {/* Magic UI Meteors Background - Hidden on mobile for performance */}
      {!reduceMotion && (
        <div className="hidden sm:block">
          <Meteors 
            number={8} 
            minDelay={0.2} 
            maxDelay={1.2} 
            minDuration={1.5} 
            maxDuration={3} 
            angle={215}
            className="-z-20"
          />
        </div>
      )}
      
      {/* Magic UI Retro Grid Background */}
      {!reduceMotion && <RetroGrid className="-z-10" opacity={0.35} cellSize={70} angle={70} darkLineColor="rgba(255,255,255,0.08)" lightLineColor="rgba(0,0,0,0.2)" />}
      
      {/* Soft radial overlay - lighter to show ripple */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
      
      <motion.div
        variants={staggerContainer(0.18)}
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : 'show'}
        className="relative container max-w-5xl mx-auto text-center px-6 min-h-[400px] flex flex-col justify-center"
      >
        <motion.div variants={fadeInUp}>
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            <AnimatedShinyText 
              className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              shimmerWidth={120}
            >
              Future-Ready Guidance
            </AnimatedShinyText>
          </h1>
        </motion.div>
        
        <motion.p variants={fadeInUp} className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl mx-auto px-2">
          A structured pathway platform helping students discover, plan & track career-aligned learning journeys.
        </motion.p>
        
        <motion.div variants={scaleIn} className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center relative px-4 sm:px-0">
          {/* Ripple positioned behind everything but visible - Hidden on mobile */}
          {!reduceMotion && (
            <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none">
              <Ripple className="opacity-80" mainCircleSize={200} mainCircleOpacity={0.35} />
            </div>
          )}
          
          <a
            href="#get-started"
            className="relative z-10 inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 sm:px-8 py-3 text-sm font-medium text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors"
            aria-label="Get started with Future-Ready Guidance platform"
          >
            Get Started
          </a>
          
          <button
            onClick={scrollToHowItWorks}
            className="relative z-10 inline-flex items-center justify-center rounded-md border border-neutral-600 bg-neutral-900/50 px-6 sm:px-8 py-3 text-sm font-medium text-neutral-200 hover:bg-neutral-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors backdrop-blur-sm"
            aria-label="Learn how the platform works"
          >
            How It Works
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
