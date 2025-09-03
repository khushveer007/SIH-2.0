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

export interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role?: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { id: 1, title: 'Create Profile', description: 'Sign up and complete a skill-focused student profile.' },
  { id: 2, title: 'Explore Pathways', description: 'Browse curated academic & vocational career trajectories.' },
  { id: 3, title: 'Track Progress', description: 'Use timelines & milestones to stay motivated and aligned.' }
];

export const FEATURE_ITEMS: FeatureItem[] = [
  { id: 1, title: 'Personalized Guidance', description: 'Adaptive recommendations based on profile signals.', emphasis: true },
  { id: 2, title: 'Skill Path Visualizer', description: 'Clear, contextual visualization of academic + career steps.' },
  { id: 3, title: 'Collaborative Mentoring', description: 'Enable structured input from educators & guardians.' },
  { id: 4, title: 'Progress Insights', description: 'Milestone tracking with actionable improvement suggestions.' }
];

export const CAREER_PATH_ROTATION: string[] = [
  'Data Analyst',
  'Civil Engineer',
  'Sustainability Lead',
  'AI Researcher',
  'Healthcare Technologist'
];

export const TESTIMONIALS: TestimonialItem[] = [
  { id: 1, quote: 'This platform clarified my direction in just a week.', author: 'Aarav', role: 'Grade 11 Student' },
  { id: 2, quote: 'A focused way to align curriculum with future-ready skills.', author: 'Ms. Sharma', role: 'Educator' },
  { id: 3, quote: 'Reduced anxiety for our child by showing tangible progress.', author: 'Parent', role: 'Guardian' },
  { id: 4, quote: 'Exactly the structure we needed for outcome-based guidance.', author: 'Counselor', role: 'Academic Advisor' }
];
