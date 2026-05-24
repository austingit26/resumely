'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStep } from '@/store/slices/resumeSlice';

import PersonalStep from '../steps/PersonalStep';
import ExperienceStep from '../steps/ExperienceStep';
import EducationStep from '../steps/EducationStep';
import SkillsStep from '../steps/SkillsStep';
import ProjectsStep from '../steps/ProjectsStep';
import ReorderStep from '../steps/ReorderStep';

/* =========================
   STEP CONFIG
========================= */
const STEPS = [
  { key: 'personal', label: 'Personal' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'reorder', label: 'Reorder Sections' },
];

export default function ResumeStepper() {
  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.resume.step);

  /* =========================
     SAFE STEP (CRASH PROTECTION)
  ========================= */
  const safeStep =
    typeof step === 'number'
      ? Math.min(Math.max(step, 0), STEPS.length - 1)
      : 0;

  /* =========================
     NAVIGATION
  ========================= */
  const nextStep = () => {
    if (safeStep < STEPS.length - 1) {
      dispatch(setStep(safeStep + 1));
    }
  };

  const prevStep = () => {
    if (safeStep > 0) {
      dispatch(setStep(safeStep - 1));
    }
  };

  /* =========================
     RENDER STEP
  ========================= */
  const renderStep = () => {
    switch (STEPS[safeStep].key) {
      case 'personal':
        return <PersonalStep />;

      case 'experience':
        return <ExperienceStep />;

      case 'education':
        return <EducationStep />;

      case 'skills':
        return <SkillsStep />;

      case 'projects':
        return <ProjectsStep />;

      case 'reorder':
        return <ReorderStep />;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">

      {/* ================= HEADER ================= */}
      <Card className="p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            Step {safeStep + 1} of {STEPS.length}
          </p>

          <h2 className="text-lg font-semibold">
            {STEPS[safeStep].label}
          </h2>
        </div>

        <div className="text-sm text-gray-500">
          {Math.round(((safeStep + 1) / STEPS.length) * 100)}%
        </div>
      </Card>

      {/* ================= CONTENT ================= */}
      <Card className="p-4">
        {renderStep()}
      </Card>

      {/* ================= NAVIGATION ================= */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={safeStep === 0}
        >
          Back
        </Button>

        <Button onClick={nextStep}>
          {safeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}