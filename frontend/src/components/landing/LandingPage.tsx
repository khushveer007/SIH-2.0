// Composes all landing sections. This replaces the prior LandingPlaceholder.
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { Features } from './Features';
import { FinalCta } from './FinalCta';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-10 md:space-y-24">
      <Hero />
      <HowItWorks />
      <Features />
      <FinalCta />
    </div>
  );
};
