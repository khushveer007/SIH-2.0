// Centralized static content & data structures for landing page sections.
// Using simple arrays/objects to keep initial implementation lightweight.

export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  emphasis?: boolean;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { id: 1, title: 'Create Profile', description: 'Sign up and complete a skill-focused student profile.' },
  { id: 2, title: 'Explore Pathways', description: 'Browse curated academic & vocational career trajectories.' },
  { id: 3, title: 'Track Progress', description: 'Use timelines & milestones to stay motivated and aligned.' }
];

export const FEATURE_ITEMS: FeatureItem[] = [
  { id: 1, title: 'Aptitude Suggestion', description: 'AI-powered recommendations based on your skills, interests, and academic performance to guide your career choices.', emphasis: true },
  { id: 2, title: 'Nearby Colleges', description: 'Discover and compare educational institutions in your area with detailed information and admission requirements.' },
  { id: 3, title: 'Timeline Tracker', description: 'Visual progress tracking with milestones, deadlines, and personalized study plans to keep you on track.' },
  { id: 4, title: 'Course-to-Career Mapping', description: 'Explore how different courses and subjects align with various career paths and future opportunities.', emphasis: true }
];

export const CAREER_PATH_ROTATION: string[] = [
  'B.Sc. Computer Science',
  'Data Analyst',
  'Senior Analyst',
  'Data Scientist',
  'Analytics Manager'
];
