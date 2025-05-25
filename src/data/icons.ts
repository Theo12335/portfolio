'use client';

export interface IconData {
  id: string;
  name: string;
  category: CategoryId;
  imageSrc: string; // Path to the SVG image in the public directory
}

// Your full list of icons with assigned categories
export const allIcons: IconData[] = [
  // Core Stack
  { id: 'typescript', name: 'TypeScript', category: 'core_stack', imageSrc: '/typescript.svg' },
  { id: 'javascript', name: 'JavaScript', category: 'core_stack', imageSrc: '/javascript.svg' },
  { id: 'react', name: 'React', category: 'core_stack', imageSrc: '/react.svg' },
  { id: 'nextjs', name: 'Next.js', category: 'core_stack', imageSrc: '/next.svg' },
  { id: 'css', name: 'CSS', category: 'core_stack', imageSrc: '/css.svg' },
  { id: 'tailwind_css', name: 'Tailwind CSS', category: 'core_stack', imageSrc: '/tailwindcss.svg' },
  { id: 'nodejs', name: 'Node.js', category: 'core_stack', imageSrc: '/node.js.svg' },
  { id: 'html', name: 'HTML', category: 'core_stack', imageSrc: '/html.svg' },
  { id: 'firebase', name: 'Firebase', category: 'core_stack', imageSrc: '/firebase.svg' },
  { id: 'git', name: 'Git', category: 'environment', imageSrc: '/git.svg' },
  { id: 'github', name: 'GitHub', category: 'environment', imageSrc: '/github.svg' },
  { id: 'c_programming', name: 'C Programming', category: 'core_stack', imageSrc: '/c.svg' },
  { id: 'csharp', name: 'C#', category: 'core_stack', imageSrc: '/csharp.svg' },
  { id: 'python', name: 'Python', category: 'core_stack', imageSrc: '/python.svg' },
  { id: 'sql', name: 'SQL', category: 'core_stack', imageSrc: '/sql.svg' },
  { id: 'supabase', name: 'Supabase', category: 'core_stack', imageSrc: '/supabase.svg' },
  { id: 'chatgpt', name: 'ChatGPT', category: 'core_stack', imageSrc: '/chatgpt.svg' },
  { id: 'airtable', name: 'Airtable', category: 'core_stack', imageSrc: '/airtable.svg' },
  { id: 'ms_access', name: 'MS Access', category: 'core_stack', imageSrc: '/access.svg' },

  // Design
  { id: 'figma', name: 'Figma', category: 'design', imageSrc: '/figma.svg' },
  { id: 'canva', name: 'Canva', category: 'design', imageSrc: '/canva.svg' },

  // Environment (Tools / Development Environment)
  { id: 'visual_studio', name: 'Visual Studio', category: 'environment', imageSrc: '/vs.svg' },
  { id: 'vs_code', name: 'VS Code', category: 'environment', imageSrc: '/vscode.svg' },
  
  

  // Communications
  
  { id: 'discord', name: 'Discord', category: 'communications', imageSrc: '/discord.svg' },
  { id: 'ms_teams', name: 'MS Teams', category: 'communications', imageSrc: '/ms_teams.svg' },
  { id: 'slack', name: 'Slack', category: 'communications', imageSrc: '/slack.svg' },
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