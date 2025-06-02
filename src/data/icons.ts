'use client';

export interface IconData {
  id: string;
  name: string;
  category: CategoryId;
  imageSrc: string; // Path to the SVG image in the public directory
  link?: string; // Optional link for the icon
}

// Your full list of icons with assigned categories
export const allIcons: IconData[] = [
  // Core Stack
  { id: 'typescript', name: 'TypeScript', category: 'core_stack', imageSrc: '/typescript.svg', link: 'https://www.typescriptlang.org/' },
  { id: 'javascript', name: 'JavaScript', category: 'core_stack', imageSrc: '/javascript.svg', link: 'https://www.javascript.com/' },
  { id: 'react', name: 'React', category: 'core_stack', imageSrc: '/react.svg', link: 'https://reactjs.org/' },
  { id: 'nextjs', name: 'Next.js', category: 'core_stack', imageSrc: '/next.svg', link: 'https://nextjs.org/' },
  { id: 'css', name: 'CSS', category: 'core_stack', imageSrc: '/css.svg', link: 'https://www.w3.org/Style/CSS/Overview.en.html' },
  { id: 'tailwind_css', name: 'Tailwind CSS', category: 'core_stack', imageSrc: '/tailwindcss.svg', link: 'https://tailwindcss.com/' },
  { id: 'nodejs', name: 'Node.js', category: 'core_stack', imageSrc: '/node.js.svg', link: 'https://nodejs.org/' },
  { id: 'html', name: 'HTML', category: 'core_stack', imageSrc: '/html.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { id: 'firebase', name: 'Firebase', category: 'core_stack', imageSrc: '/firebase.svg', link: 'https://firebase.google.com/' },
  { id: 'git', name: 'Git', category: 'environment', imageSrc: '/git.svg', link: 'https://git-scm.com/' },
  { id: 'github', name: 'GitHub', category: 'environment', imageSrc: '/github.svg', link: 'https://github.com/' },
  { id: 'c_programming', name: 'C Programming', category: 'core_stack', imageSrc: '/c.svg', link: 'https://en.wikipedia.org/wiki/C_(programming_language)' },
  { id: 'csharp', name: 'C#', category: 'core_stack', imageSrc: '/csharp.svg', link: 'https://learn.microsoft.com/en-us/dotnet/csharp/' },
  { id: 'python', name: 'Python', category: 'core_stack', imageSrc: '/Python.svg', link: 'https://www.python.org/' },
  { id: 'sql', name: 'SQL', category: 'core_stack', imageSrc: '/SQL.svg', link: 'https://www.w3schools.com/sql/' },
  { id: 'supabase', name: 'Supabase', category: 'core_stack', imageSrc: '/supabase.svg', link: 'https://supabase.com/' },
  { id: 'chatgpt', name: 'ChatGPT', category: 'core_stack', imageSrc: '/chatgpt.svg', link: 'https://chat.openai.com/' },
  { id: 'airtable', name: 'Airtable', category: 'core_stack', imageSrc: '/airtable.svg', link: 'https://airtable.com/' },
  { id: 'ms_access', name: 'MS Access', category: 'core_stack', imageSrc: '/access.svg', link: 'https://www.microsoft.com/en-us/microsoft-365/access' },

  // Design
  { id: 'figma', name: 'Figma', category: 'design', imageSrc: '/figma.svg', link: 'https://www.figma.com/' },
  { id: 'canva', name: 'Canva', category: 'design', imageSrc: '/canva.svg', link: 'https://www.canva.com/' },

  // Environment (Tools / Development Environment)
  { id: 'visual_studio', name: 'Visual Studio', category: 'environment', imageSrc: '/vs.svg', link: 'https://visualstudio.microsoft.com/' },
  { id: 'vs_code', name: 'VS Code', category: 'environment', imageSrc: '/vscode.svg', link: 'https://code.visualstudio.com/' },



  // Communications

  { id: 'discord', name: 'Discord', category: 'communications', imageSrc: '/discord.svg', link: 'https://discord.com/' },
  { id: 'ms_teams', name: 'MS Teams', category: 'communications', imageSrc: '/ms_teams.svg', link: 'https://www.microsoft.com/en-us/microsoft-teams/group-chat-software' },
  { id: 'slack', name: 'Slack', category: 'communications', imageSrc: '/slack.svg', link: 'https://slack.com/' },
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