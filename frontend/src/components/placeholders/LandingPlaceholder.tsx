import { FadeIn } from '@/components/motion/FadeIn';
import { Button } from '@/components/ui/button';

export const LandingPlaceholder: React.FC = () => {
  return (
    <div className="space-y-10">
      <FadeIn>
        <section className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Welcoming Placeholder Experience
          </h1>
          <p className="mt-4 text-neutral-300 leading-relaxed">
            This is a temporary landing hero. Replace with real marketing copy and rich interactive components in later tasks.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </section>
      </FadeIn>
      <FadeIn delay={0.1}>
        <section className="grid gap-6 md:grid-cols-3">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 h-32 animate-pulse" />
          ))}
        </section>
      </FadeIn>
    </div>
  );
};
