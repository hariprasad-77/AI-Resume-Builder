import { PersonalInfo, Experience } from '../types/resume';

const jobDescriptions: Record<string, string[]> = {
  'software engineer': [
    'Developed and maintained scalable web applications using React, Node.js, and TypeScript',
    'Collaborated with cross-functional teams to deliver high-quality software solutions',
    'Implemented automated testing strategies, improving code coverage by 40%',
    'Optimized application performance, reducing load times by 35%',
    'Mentored junior developers and conducted code reviews'
  ],
  'product manager': [
    'Led product development initiatives from conception to launch',
    'Analyzed market trends and user feedback to inform product strategy',
    'Coordinated with engineering, design, and marketing teams',
    'Managed product roadmaps and prioritized feature development',
    'Increased user engagement by 25% through data-driven product decisions'
  ],
  'marketing manager': [
    'Developed and executed comprehensive marketing campaigns across multiple channels',
    'Managed marketing budget of $500K+ and achieved 120% ROI',
    'Led market research initiatives to identify new opportunities',
    'Collaborated with sales team to generate qualified leads',
    'Increased brand awareness by 40% through strategic partnerships'
  ],
  'data scientist': [
    'Built machine learning models to solve complex business problems',
    'Analyzed large datasets using Python, SQL, and statistical methods',
    'Created data visualizations and dashboards for stakeholder reporting',
    'Collaborated with engineering teams to deploy ML models in production',
    'Improved prediction accuracy by 30% through advanced modeling techniques'
  ],
  'designer': [
    'Created user-centered designs for web and mobile applications',
    'Conducted user research and usability testing to inform design decisions',
    'Developed design systems and maintained brand consistency',
    'Collaborated with developers to ensure design implementation fidelity',
    'Increased user satisfaction scores by 25% through improved UX design'
  ]
};

const summaryTemplates: Record<string, string> = {
  'software engineer': 'Experienced software engineer with expertise in full-stack development, passionate about creating scalable solutions and mentoring teams.',
  'product manager': 'Strategic product manager with a track record of launching successful products and driving user growth through data-driven decision making.',
  'marketing manager': 'Results-driven marketing professional with extensive experience in digital marketing, brand management, and campaign optimization.',
  'data scientist': 'Data scientist with strong analytical skills and experience in machine learning, statistical modeling, and business intelligence.',
  'designer': 'Creative designer focused on user experience and interface design, with a passion for creating intuitive and visually appealing digital products.'
};

export const generateJobDescription = (position: string): string[] => {
  const normalizedPosition = position.toLowerCase();
  
  for (const [key, descriptions] of Object.entries(jobDescriptions)) {
    if (normalizedPosition.includes(key)) {
      return descriptions.slice(0, 3); // Return first 3 descriptions
    }
  }
  
  // Generic descriptions if no match found
  return [
    'Contributed to team objectives and company goals',
    'Collaborated effectively with cross-functional teams',
    'Demonstrated strong problem-solving and communication skills'
  ];
};

export const generateSummary = (personalInfo: PersonalInfo, experiences: Experience[]): string => {
  if (experiences.length === 0) {
    return 'Motivated professional seeking to leverage skills and experience in a challenging role that offers opportunities for growth and development.';
  }
  
  const latestPosition = experiences[0]?.position?.toLowerCase() || '';
  
  for (const [key, template] of Object.entries(summaryTemplates)) {
    if (latestPosition.includes(key)) {
      return template;
    }
  }
  
  return `Experienced professional with a background in ${experiences[0]?.position || 'various roles'}, committed to delivering high-quality results and continuous learning.`;
};

export const generateSkillSuggestions = (experiences: Experience[]): string[] => {
  const skillMap: Record<string, string[]> = {
    'software engineer': ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS'],
    'product manager': ['Product Strategy', 'Market Research', 'Agile', 'Data Analysis', 'Stakeholder Management'],
    'marketing manager': ['Digital Marketing', 'SEO/SEM', 'Analytics', 'Content Strategy', 'Social Media'],
    'data scientist': ['Python', 'R', 'Machine Learning', 'SQL', 'Statistics', 'Tableau', 'TensorFlow'],
    'designer': ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Prototyping', 'User Research']
  };
  
  const allPositions = experiences.map(exp => exp.position.toLowerCase()).join(' ');
  
  for (const [key, skills] of Object.entries(skillMap)) {
    if (allPositions.includes(key)) {
      return skills;
    }
  }
  
  return ['Communication', 'Problem Solving', 'Leadership', 'Time Management', 'Teamwork'];
};