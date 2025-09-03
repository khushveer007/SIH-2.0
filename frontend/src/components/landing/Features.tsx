import { motion, useReducedMotion } from 'framer-motion';
import { CAREER_PATH_ROTATION } from './content';
import { staggerContainer } from './variants';
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid';
import { AnimatedList } from '@/components/magicui/animated-list';
import { FileTextIcon, MapPinIcon, CalendarIcon, RouteIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CareerStep {
  name: string;
  description: string;
  icon: string;
  color: string;
}

const careerSteps: CareerStep[] = CAREER_PATH_ROTATION.map((step, index) => ({
  name: step,
  description: `Step ${index + 1} in your career journey`,
  icon: ["🎓", "📊", "👨‍💼", "🔬", "👔"][index] || "🎯",
  color: ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"][index] || "#6366F1",
}));

const CareerStepItem = ({ name, description, icon, color }: CareerStep) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[280px] overflow-hidden rounded-lg p-2.5",
        "bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/60",
        "transition-all duration-200 ease-in-out hover:scale-[102%] hover:bg-neutral-800/80",
        "[box-shadow:0_0_0_1px_rgba(255,255,255,.03),0_2px_4px_rgba(0,0,0,.05)]",
        "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-7 items-center justify-center rounded-lg"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-sm">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-sm font-medium text-neutral-100">
            <span className="text-sm">{name}</span>
          </figcaption>
          <p className="text-xs font-normal text-neutral-400">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export const Features: React.FC = () => {
  const reduce = useReducedMotion();

  const features = [
    {
      Icon: FileTextIcon,
      name: "Aptitude Based Suggestions",
      description: "AI-powered recommendations based on your skills, interests, and academic performance to guide your career choices.",
      href: "#",
      cta: "Learn more",
      className: "col-span-4 lg:col-span-2",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-blue-950/30" />
      ),
      "aria-label": "Feature: Aptitude Based Suggestions - AI-powered career guidance",
    },
    {
      Icon: MapPinIcon,
      name: "Nearby Colleges",
      description: "Discover and compare educational institutions in your area with detailed information and admission requirements.",
      href: "#",
      cta: "Explore",
      className: "col-span-4 lg:col-span-2",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-green-950/20 to-teal-950/30" />
      ),
      "aria-label": "Feature: Nearby Colleges - Find educational institutions in your area",
    },
    {
      Icon: CalendarIcon,
      name: "Timeline Tracker",
      description: "Visual progress tracking with milestones, deadlines, and personalized study plans to keep you on track.",
      href: "#",
      cta: "Track",
      className: "col-span-4 lg:col-span-2",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-orange-950/20 to-yellow-950/30" />
      ),
      "aria-label": "Feature: Timeline Tracker - Monitor academic progress and milestones",
    },
    {
      Icon: RouteIcon,
      name: "Course-to-Career Mapping",
      description: "Explore how different courses and subjects align with various career paths and future opportunities.",
      href: "#",
      cta: "Discover",
      className: "col-span-4 lg:col-span-2",
      background: reduce ? (
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          {careerSteps.map((step, index) => (
            <CareerStepItem key={index} {...step} />
          ))}
        </div>
      ) : (
        <div className="absolute right-2 top-4 h-[240px] w-full scale-70 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-80">
          <AnimatedList aria-live="off">
            {careerSteps.map((step, idx) => (
              <CareerStepItem key={idx} {...step} />
            ))}
          </AnimatedList>
        </div>
      ),
      "aria-label": "Feature: Course-to-Career Mapping - Explore career pathways from your courses",
    },
  ];

  return (
    <section id="features" className="py-12 md:py-16">
      <div className="container">
        <header className="mb-8 max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-3xl font-bold tracking-tight text-neutral-100">Core Features</h2>
          <p className="mt-2 text-neutral-400">Built for clarity, momentum & informed decision-making.</p>
        </header>
        <motion.div
          variants={staggerContainer(0.18)}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full"
        >
          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard
                key={idx}
                {...feature}
                aria-label={feature["aria-label"]}
                tabIndex={0}
                role="article"
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
};
