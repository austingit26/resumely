'use client';

import { Card } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';

import PersonalStep from '../steps/PersonalStep';
import ExperienceStep from '../steps/ExperienceStep';
import EducationStep from '../steps/EducationStep';
import SkillsStep from '../steps/SkillsStep';
import ProjectsStep from '../steps/ProjectsStep';
import ReorderStep from '../steps/ReorderStep';

const STEPS = [
  { key: 'personal' },
  { key: 'experience' },
  { key: 'education' },
  { key: 'skills' },
  { key: 'projects' },
  { key: 'reorder' },
];

export default function ResumeStepper() {
  const step = useAppSelector((state) => state.resume.step ?? 0);

  const safeStep = Math.min(Math.max(step, 0), STEPS.length - 1);

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
    <div className="space-y-4">

      <Card className="p-4 bg-white">
        {renderStep()}
      </Card>

    </div>
  );
}