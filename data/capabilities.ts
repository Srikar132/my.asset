
export interface TagItem {
  label: string;
  color: string;
  textColor?: string;
  rotated?: boolean;
}
 
export interface EmojiItem {
  emoji: string;
  color: string;
}
 
export type CapabilityItem =
  | { kind: 'tag';   data: TagItem }
  | { kind: 'emoji'; data: EmojiItem };
 
// ─────────────────────────────────────────────────────────────────────────────
// DATA — add your other tab arrays here (or import from @/data/capabilities)
// ─────────────────────────────────────────────────────────────────────────────
const CORE_CAPABILITIES: CapabilityItem[] = [
  { kind: 'tag',   data: { label: 'Web apps',             color: '#f4956a', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '🎯',                   color: '#7b9ec9' } },
  { kind: 'tag',   data: { label: 'Headless CMS',         color: '#7b9ec9', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '🤝',                   color: '#f06292' } },
  { kind: 'tag',   data: { label: 'Motion & Interaction', color: '#2d6a4f', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '⭐',                   color: '#f4956a' } },
  { kind: 'tag',   data: { label: 'Creative frontend',    color: '#f4956a', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '👻',                   color: '#2d6a4f' } },
  { kind: 'tag',   data: { label: 'Full-stack',           color: '#9e9e9e', textColor: '#fff', rotated: true } },
  { kind: 'emoji', data: { emoji: '🎮',                   color: '#ffb347' } },
  { kind: 'tag',   data: { label: 'SEO',                  color: '#f4956a', textColor: '#fff', rotated: true } },
  { kind: 'emoji', data: { emoji: '🖥️',                  color: '#c084fc' } },
  { kind: 'tag',   data: { label: 'Performance',          color: '#9e9e9e', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '🏅',                   color: '#7b9ec9' } },
  { kind: 'tag',   data: { label: 'eCommerce',            color: '#2d6a4f', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '🤖',                   color: '#f06292' } },
  { kind: 'tag',   data: { label: 'No code',              color: '#7b9ec9', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '🍑',                   color: '#f4956a' } },
  { kind: 'tag',   data: { label: 'Less code',            color: '#f06292', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '🎨',                   color: '#2d6a4f' } },
  { kind: 'tag',   data: { label: 'AI',                   color: '#7b9ec9', textColor: '#fff' } },
  { kind: 'tag',   data: { label: 'Next.js',              color: '#1a1a1a', textColor: '#fff' } },
  { kind: 'tag',   data: { label: 'TypeScript',           color: '#3178c6', textColor: '#fff' } },
  { kind: 'tag',   data: { label: 'GSAP',                 color: '#0ae448', textColor: '#000' } },
];
 
// ── Placeholders — fill these with your own data ──────────────────────────────
const TECH_STACKS: CapabilityItem[] = [
  { kind: 'tag',   data: { label: 'React',        color: '#61dafb', textColor: '#000' } },
  { kind: 'emoji', data: { emoji: '⚛️',           color: '#7b9ec9' } },
  { kind: 'tag',   data: { label: 'Next.js',      color: '#1a1a1a', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '🚀',           color: '#f06292' } },
  { kind: 'tag',   data: { label: 'Tailwind CSS', color: '#38bdf8', textColor: '#000' } },
  { kind: 'emoji', data: { emoji: '🎨',           color: '#f4956a' } },
  { kind: 'tag',   data: { label: 'TypeScript',   color: '#3178c6', textColor: '#fff' } },
  { kind: 'tag',   data: { label: 'GSAP',         color: '#0ae448', textColor: '#000' } },
  { kind: 'emoji', data: { emoji: '✨',           color: '#2d6a4f' } },
  { kind: 'tag',   data: { label: 'Framer',       color: '#0055ff', textColor: '#fff' } },
  { kind: 'tag',   data: { label: 'Supabase',     color: '#3ecf8e', textColor: '#000' } },
  { kind: 'emoji', data: { emoji: '🛠️',          color: '#ffb347' } },
  { kind: 'tag',   data: { label: 'Prisma',       color: '#2d3748', textColor: '#fff' } },
  { kind: 'tag',   data: { label: 'Vercel',       color: '#1a1a1a', textColor: '#fff' } },
];
 
const SERVICES: CapabilityItem[] = [
  { kind: 'tag',   data: { label: 'Design to Code', color: '#f4956a', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '🎯',             color: '#7b9ec9' } },
  { kind: 'tag',   data: { label: 'Consulting',     color: '#2d6a4f', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '💡',             color: '#f06292' } },
  { kind: 'tag',   data: { label: 'MVP Build',      color: '#9e9e9e', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '⚡',             color: '#ffb347' } },
  { kind: 'tag',   data: { label: 'UI/UX Audit',   color: '#7b9ec9', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '🔍',             color: '#c084fc' } },
  { kind: 'tag',   data: { label: 'Code Review',   color: '#f06292', textColor: '#fff' } },
  { kind: 'emoji', data: { emoji: '📦',             color: '#f4956a' } },
  { kind: 'tag',   data: { label: 'Freelance',     color: '#0ae448', textColor: '#000' } },
  { kind: 'tag',   data: { label: 'Mentoring',     color: '#3178c6', textColor: '#fff' } },
];
 
// Tab config — add new tabs here, everything else is automatic
export const TABS = [
  { label: 'Core Capabilities', data: CORE_CAPABILITIES },
  { label: 'Tech Stacks',       data: TECH_STACKS },
  { label: 'Services',          data: SERVICES },
];