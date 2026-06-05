'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EducationItem,
  ExperienceItem,
  PersonalInfo,
  ProjectItem,
  ResumeSection,
  ResumeState,
  SkillCategory,
} from '@/types/resume';

const LOCAL_STORAGE_KEY = 'resumely-resume';

/* =========================
   INITIAL STATE
========================= */
const initialState: ResumeState = {
  step: 0,

  sectionOrder: [
    'personal',
    'skills',
    'experience',
    'projects',
    'education',
  ],

  personal: {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: [],
    summary: '',
    role: ''
  },

  skills: [],
  experience: [],
  education: [],
  projects: [],
};

/* =========================
   LOAD STATE
========================= */
const loadState = (): ResumeState => {
  if (typeof window === 'undefined') {
    return initialState;
  }

  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!stored) {
      return initialState;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load resume state', error);
    return initialState;
  }
};

/* =========================
   SAVE STATE
========================= */
const saveState = (state: ResumeState) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save resume state', error);
  }
};

/* =========================
   SLICE
========================= */
const resumeSlice = createSlice({
  name: 'resume',
  initialState: loadState(),

  reducers: {

    /* ================= STEP CONTROL ================= */
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
      saveState(state);
    },

    /* ================= PERSONAL ================= */
    setPersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInfo>>,
    ) => {
      state.personal = {
        ...state.personal,
        ...action.payload,
      };

      saveState(state);
    },

    /* ================= SECTION ORDER ================= */
    reorderSections: (
      state,
      action: PayloadAction<ResumeSection[]>,
    ) => {
      state.sectionOrder = action.payload;
      saveState(state);
    },

    /* ================= SKILLS ================= */
    setSkills: (state, action: PayloadAction<SkillCategory[]>) => {
      state.skills = action.payload;
      saveState(state);
    },

    /* ================= EXPERIENCE ================= */
    addExperience: (state, action: PayloadAction<ExperienceItem>) => {
      state.experience.push(action.payload);
      saveState(state);
    },

    updateExperience: (state, action: PayloadAction<ExperienceItem>) => {
      state.experience = state.experience.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );

      saveState(state);
    },

    removeExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter(
        (item) => item.id !== action.payload,
      );

      saveState(state);
    },

    /* ================= EDUCATION ================= */
    addEducation: (state, action: PayloadAction<EducationItem>) => {
      state.education.push(action.payload);
      saveState(state);
    },

    updateEducation: (state, action: PayloadAction<EducationItem>) => {
      state.education = state.education.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );

      saveState(state);
    },

    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(
        (item) => item.id !== action.payload,
      );

      saveState(state);
    },

    /* ================= PROJECTS ================= */
    addProject: (state, action: PayloadAction<ProjectItem>) => {
      state.projects.push(action.payload);
      saveState(state);
    },

    updateProject: (state, action: PayloadAction<ProjectItem>) => {
      state.projects = state.projects.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );

      saveState(state);
    },

    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (item) => item.id !== action.payload,
      );

      saveState(state);
    },

    /* ================= IMPORT / RESET ================= */
    importResume: (state, action: PayloadAction<ResumeState>) => {
      Object.assign(state, action.payload);
      saveState(state);
    },

    resetResume: (state) => {
      Object.assign(state, initialState);
      saveState(state);
    },
  },
});

/* =========================
   EXPORTS
========================= */
export const {
  setStep,
  setPersonalInfo,
  reorderSections,
  setSkills,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addProject,
  updateProject,
  removeProject,
  importResume,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;