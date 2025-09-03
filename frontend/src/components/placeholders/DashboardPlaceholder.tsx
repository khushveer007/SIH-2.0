import { FadeIn } from '@/components/motion/FadeIn';

export const DashboardPlaceholder: React.FC = () => {
  return (
    <FadeIn>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Dashboard (Placeholder)</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 h-28 animate-pulse" />
          ))}
        </div>
      </div>
    </FadeIn>
  );
};
