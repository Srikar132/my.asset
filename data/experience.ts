export interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  period: string;
  description: string;
}

const experience: ExperienceItem[] = [
  {
    company: 'Bellcorp Studio',
    role: 'Full Stack Developer',
    type: 'Internship · Stipend',
    period: '6 Months',
    description:
      'Working across the stack — building and shipping production web features end-to-end, from APIs and data models to polished, responsive UI.',
  },
];

export default experience;
