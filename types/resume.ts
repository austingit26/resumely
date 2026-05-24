export interface PersonalInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  socialLinks: SocialLink[];
  summary: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  bullets: string[];
}

export type EducationDegree = 'Elementary Education' | 'Junior High School' | 'Senior High School' | 'Associate Degree' | 'Bachelor Degree' | 'Master Degree' | 'Doctorate Degree';

export interface EducationItem {
  id: string;
  degree: EducationDegree;
  field: string;
  school: string;
  startYear: string;
  endYear: string;
  achievements: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export type ResumeSection = 'personal' | 'skills' | 'experience' | 'projects' | 'education';

export interface ResumeState {
  step: number;
  sectionOrder: ResumeSection[];
  personal: PersonalInfo;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
}