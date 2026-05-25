'use client';

import { useState } from 'react';
import ResumeStepper from '@/components/resume/ResumeStepper';
import ResumePreview from '@/components/resume/ResumePreview';
import Navbar from '@/components/common/navbar';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStep } from '@/store/slices/resumeSlice';

export default function Form() {
  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.resume.step ?? 0);

  const [showPreview, setShowPreview] = useState(false);

  const STEPS_LENGTH = 6;
  const safeStep = Math.min(Math.max(step, 0), STEPS_LENGTH - 1);

  const nextStep = () => {
    if (safeStep < STEPS_LENGTH - 1) {
      dispatch(setStep(safeStep + 1));
    }
  };

  const prevStep = () => {
    if (safeStep > 0) {
      dispatch(setStep(safeStep - 1));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* NAVBAR */}
      <Navbar
        rightSlot={
          <Button
            onClick={() => setShowPreview((v) => !v)}
            className="lg:hidden bg-primary-500 text-white"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
        }
      />

      {/* MAIN AREA */}
      <div className="flex flex-1 p-4 pb-24 bg-secondary-500">

        {/* MOBILE VIEW SWITCH */}
        <div className="w-full lg:hidden">

          {!showPreview ? (
            <ResumeStepper />
          ) : (
            <div className="bg-white border rounded-lg p-4">
              <ResumePreview />
            </div>
          )}

        </div>

        {/* DESKTOP SPLIT VIEW */}
        <div className="hidden lg:flex w-full gap-4">

          {/* LEFT */}
          <div className="w-1/2">
            <ResumeStepper />
          </div>

          {/* RIGHT */}
          <div className="w-1/2 bg-white border rounded-lg p-4 overflow-auto">
            <ResumePreview />
          </div>

        </div>

      </div>

      {/* FOOTER NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-secondary-500 px-6 py-3 flex justify-between items-center">
        <Button variant="outline" onClick={prevStep} disabled={safeStep === 0} className='min-w-32'>
          Back
        </Button>

        <div className="text-sm text-black font-semibold">
          Step {safeStep + 1} / {STEPS_LENGTH}
        </div>

        <Button onClick={nextStep} className='min-w-32'>
          {safeStep === STEPS_LENGTH - 1 ? 'Download' : 'Next'}
        </Button>
      </div>

    </div>
  );
}