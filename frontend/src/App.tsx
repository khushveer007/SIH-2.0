import './App.css';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/components/landing/LandingPage';
import { TestAlias } from '@/components/TestAlias';

function App() {
  return (
    <AppLayout>
      <div className="space-y-12">
        <LandingPage />
        <div className="pt-8 border-t border-neutral-800/60">
          <h2 className="text-lg font-semibold tracking-tight mb-2">Alias Check Component</h2>
          <TestAlias />
        </div>
      </div>
    </AppLayout>
  );
}

export default App;

