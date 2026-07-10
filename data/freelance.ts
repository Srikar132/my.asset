export interface FreelanceProject {
  name: string;
  category: string;
  role: string;
  summary: string;
  href: string;
  /** Drop a screenshot at /public/freelance/<file> and set the path here.
   *  Empty string → an accent placeholder card is shown instead. */
  image: string;
  accent: string;
}

const freelance: FreelanceProject[] = [
  {
    name: 'CREONEX',
    category: 'CREATOR MARKETPLACE · SAAS',
    role: 'WEB DESIGN & DEVELOPMENT',
    summary: "Find the expert you've been looking for — 1:1 sessions, courses & paid communities from verified creators.",
    href: 'https://creonex-beta.vercel.app',
    image: '/creonex.png',
    accent: '',
  },
  {
    name: 'NALA ARMOIRE',
    category: 'ECOMMERCE · FASHION',
    role: 'WEB DESIGN & DEVELOPMENT',
    summary: 'A modern fashion & apparel storefront with a clean, conversion-focused shopping flow.',
    href: 'https://nalaarmoire.com',
    image: '/nala-armoire.png',
    accent: '',
  },
  {
    name: 'TREEKART',
    category: 'ECOMMERCE · AGRI-RENTAL',
    role: 'WEB DEVELOPMENT',
    summary: 'A mango store and tree-rental marketplace connecting growers with buyers and renters.',
    href: 'https://treekart.in',
    image: '/treekart.png',
    accent: '',
  },
];

export default freelance;
