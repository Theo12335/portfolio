// data/icons.ts
import React from 'react';

// Define the interface for better type safety
export interface IconData {
  id: string;
  name: string;
  category: CategoryId;
  imageSrc: string; // Path to the SVG image in the public directory
}

// Your full list of icons with assigned categories
export const allIcons: IconData[] = [
  // Core Stack
  { id: 'typescript', name: 'TypeScript', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'javascript', name: 'JavaScript', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'react', name: 'React', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'nextjs', name: 'Next.js', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'css', name: 'CSS', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'tailwind_css', name: 'Tailwind CSS', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'nodejs', name: 'Node.js', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'html', name: 'HTML', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'firebase', name: 'Firebase', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'git', name: 'Git', category: 'environment', imageSrc: '/next.svg' },
  { id: 'github', name: 'GitHub', category: 'environment', imageSrc: '/next.svg' },
  { id: 'c_programming', name: 'C Programming', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'csharp', name: 'C#', category: 'core_stack', imageSrc: '/next.svg' },
  { id: '.net', name: '.NET', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'python', name: 'Python', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'sql', name: 'SQL', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'supabase', name: 'Supabase', category: 'core_stack', imageSrc: '/next.svg' },

  // Design
  { id: 'figma', name: 'Figma', category: 'design', imageSrc: '/next.svg' },
  { id: 'canva', name: 'Canva', category: 'design', imageSrc: '/next.svg' },

  // Environment (Tools / Development Environment)
  { id: 'visual_studio', name: 'Visual Studio', category: 'environment', imageSrc: '/next.svg' },
  { id: 'vs_code', name: 'VS Code', category: 'environment', imageSrc: '/next.svg' },
  { id: 'ms_access', name: 'MS Access', category: 'environment', imageSrc: '/next.svg' },
  { id: 'airtable', name: 'Airtable', category: 'environment', imageSrc: '/next.svg' },


  // Communications
  { id: 'chatgpt', name: 'ChatGPT', category: 'communications', imageSrc: '/next.svg' },
  { id: 'discord', name: 'Discord', category: 'communications', imageSrc: '/next.svg' },
  { id: 'ms_teams', name: 'MS Teams', category: 'communications', imageSrc: '/next.svg' },
  { id: 'slack', name: 'Slack', category: 'communications', imageSrc: '/next.svg' },
];

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'core_stack', name: 'Core Stack' },
  { id: 'design', name: 'Design' },
  { id: 'environment', name: 'Environment' },
  { id: 'communications', name: 'Communication' },
];

// Also export the CategoryId type for use in the component
export type CategoryId = 'all' | 'core_stack' | 'design' | 'environment' | 'communications';