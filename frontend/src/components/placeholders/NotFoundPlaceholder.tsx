import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';

export const NotFoundPlaceholder: React.FC = () => {
  return (
    <FadeIn>
      <div className="text-center space-y-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight">404</h2>
        <p className="text-neutral-400">We couldn't find the page you're looking for.</p>
        <Button variant="outline" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </Button>
      </div>
    </FadeIn>
  );
};
