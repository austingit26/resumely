'use client';

import { useState } from 'react';
import ResumeStepper from '@/components/resume/ResumeStepper';
import ResumePreview from '@/components/resume/ResumePreview';
import Navbar from '@/components/common/navbar';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStep } from '@/store/slices/resumeSlice';
import { ChevronLeft, ChevronRight, FileDown, ScanEye, SquarePen } from 'lucide-react';

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
          <Button className="text-sm text-black font-semibold flex sm:hidden bg-white">
            Step {safeStep + 1} / {STEPS_LENGTH}
          </Button>
        }
      />

      {/* MAIN AREA */}
      <div className="flex flex-1 p-4 pb-24 bg-slate-100">

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
      <div className="fixed bottom-0 left-0 right-0 bg-white px-6 py-3 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-1.5">
        <Button
          onClick={() => setShowPreview((v) => !v)}
          className="sm:hidden bg-secondary-500 text-secondary-900 flex min-w-full sm:min-w-32"
        >
          {showPreview ? <SquarePen/> : <ScanEye />}
          {showPreview ? 'Edit' : 'Preview'}
        </Button>
        <div className='flex items-center justify-between gap-x-2 w-full'>
          <Button variant="outline" onClick={prevStep} disabled={safeStep === 0 || showPreview} className='flex-1 sm:flex-0 sm:min-w-32'>
            <ChevronLeft />
            Back
          </Button>

          <div className="text-sm text-black font-semibold sm:flex hidden">
            Step {safeStep + 1} / {STEPS_LENGTH}
          </div>

          <Button onClick={nextStep} className='flex-1 sm:flex-0 sm:min-w-32' disabled={showPreview}>
            {safeStep === STEPS_LENGTH - 1 && <FileDown />}
            {safeStep === STEPS_LENGTH - 1 ? 'Download' : 'Next'}
            {safeStep !== STEPS_LENGTH - 1 && <ChevronRight />}
          </Button>
        </div>
      </div>

    </div>
  );
}