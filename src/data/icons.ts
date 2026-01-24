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
  // Frontend - Languages & Frameworks
  { id: 'typescript', name: 'TypeScript', category: 'frontend', imageSrc: '/typescript.svg', link: 'https://www.typescriptlang.org/' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', imageSrc: '/javascript.svg', link: 'https://www.javascript.com/' },
  { id: 'react', name: 'React', category: 'frontend', imageSrc: '/react.svg', link: 'https://reactjs.org/' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', imageSrc: '/next.svg', link: 'https://nextjs.org/' },
  { id: 'html', name: 'HTML', category: 'frontend', imageSrc: '/html.svg', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { id: 'css', name: 'CSS', category: 'frontend', imageSrc: '/css.svg', link: 'https://www.w3.org/Style/CSS/Overview.en.html' },
  { id: 'tailwind_css', name: 'Tailwind CSS', category: 'frontend', imageSrc: '/tailwindcss.svg', link: 'https://tailwindcss.com/' },

  // Backend - Languages & Frameworks
  { id: 'nodejs', name: 'Node.js', category: 'backend', imageSrc: '/node.js.svg', link: 'https://nodejs.org/' },
  { id: 'python', name: 'Python', category: 'backend', imageSrc: '/Python.svg', link: 'https://www.python.org/' },
  { id: 'csharp', name: 'C#', category: 'backend', imageSrc: '/csharp.svg', link: 'https://learn.microsoft.com/en-us/dotnet/csharp/' },
  { id: 'c_programming', name: 'C', category: 'backend', imageSrc: '/c.svg', link: 'https://en.wikipedia.org/wiki/C_(programming_language)' },

  // Database & Backend Services
  { id: 'firebase', name: 'Firebase', category: 'database', imageSrc: '/firebase.svg', link: 'https://firebase.google.com/' },
  { id: 'supabase', name: 'Supabase', category: 'database', imageSrc: '/supabase.svg', link: 'https://supabase.com/' },
  { id: 'sql', name: 'SQL', category: 'database', imageSrc: '/SQL.svg', link: 'https://www.w3schools.com/sql/' },
  { id: 'airtable', name: 'Airtable', category: 'database', imageSrc: '/airtable.svg', link: 'https://airtable.com/' },
  { id: 'ms_access', name: 'MS Access', category: 'database', imageSrc: '/access.svg', link: 'https://www.microsoft.com/en-us/microsoft-365/access' },

  // AI & Machine Learning
  { id: 'claude', name: 'Claude Code', category: 'ai', imageSrc: '/claude.svg', link: 'https://claude.ai/' },
  { id: 'gemini', name: 'Gemini AI', category: 'ai', imageSrc: '/Gemini.svg', link: 'https://deepmind.google/technologies/gemini/' },
  { id: 'chatgpt', name: 'ChatGPT', category: 'ai', imageSrc: '/chatgpt.svg', link: 'https://chat.openai.com/' },

  // DevOps & Deployment
  { id: 'vercel', name: 'Vercel', category: 'devops', imageSrc: '/vercel.svg', link: 'https://vercel.com/' },
  { id: 'git', name: 'Git', category: 'devops', imageSrc: '/git.svg', link: 'https://git-scm.com/' },
  { id: 'github', name: 'GitHub', category: 'devops', imageSrc: '/github.svg', link: 'https://github.com/' },

  // Design
  { id: 'figma', name: 'Figma', category: 'design', imageSrc: '/figma.svg', link: 'https://www.figma.com/' },
  { id: 'canva', name: 'Canva', category: 'design', imageSrc: '/canva.svg', link: 'https://www.canva.com/' },

  // Development Tools
  { id: 'visual_studio', name: 'Visual Studio', category: 'tools', imageSrc: '/vs.svg', link: 'https://visualstudio.microsoft.com/' },
  { id: 'vs_code', name: 'VS Code', category: 'tools', imageSrc: '/vscode.svg', link: 'https://code.visualstudio.com/' },

  // Communications
  { id: 'discord', name: 'Discord', category: 'communications', imageSrc: '/discord.svg', link: 'https://discord.com/' },
  { id: 'ms_teams', name: 'MS Teams', category: 'communications', imageSrc: '/ms_teams.svg', link: 'https://www.microsoft.com/en-us/microsoft-teams/group-chat-software' },
  { id: 'slack', name: 'Slack', category: 'communications', imageSrc: '/slack.svg', link: 'https://slack.com/' },
];

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Database' },
  { id: 'ai', name: 'AI' },
  { id: 'devops', name: 'DevOps' },
  { id: 'design', name: 'Design' },
  { id: 'tools', name: 'Tools' },
  { id: 'communications', name: 'Communication' },
];

// Also export the CategoryId type for use in the component
export type CategoryId = 'all' | 'frontend' | 'backend' | 'database' | 'ai' | 'devops' | 'design' | 'tools' | 'communications';