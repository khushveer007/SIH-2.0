// Composes all landing sections. This replaces the prior LandingPlaceholder.
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { Features } from './Features';
import { FinalCta } from './FinalCta';
import { Footer } from './Footer';

export interface LandingPageProps {
  onShowLogin?: () => void;
  onShowRegister?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin, onShowRegister }) => {
  return (
    <div className="space-y-10 md:space-y-24">
  <Hero onShowRegister={onShowRegister} />
      <HowItWorks />
      <Features />
      <FinalCta onShowRegister={onShowRegister} onShowLogin={onShowLogin} />
      <Footer />
    </div>
  );
};
