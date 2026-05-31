'use client';

import { useEffect, useState } from 'react';
import ResumeStepper from '@/components/resume/ResumeStepper';
import ResumePreview from '@/components/resume/ResumePreview';
import Navbar from '@/components/common/navbar';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStep } from '@/store/slices/resumeSlice';
import { ChevronLeft, ChevronRight, FileDown, ScanEye, SquarePen } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import ResumePDF from '@/components/pdf/ResumePDF';


export default function Form() {
  const dispatch = useAppDispatch();
  const resume = useAppSelector((state) => state.resume);
  const step = useAppSelector((state) => state.resume.step ?? 0);

  const [showPreview, setShowPreview] = useState(false);

  const STEPS_LENGTH = 6;
  const safeStep = Math.min(Math.max(step, 0), STEPS_LENGTH - 1);

  const nextStep = async () => {
    if (safeStep < STEPS_LENGTH - 1) {
      dispatch(setStep(safeStep + 1));
    }
    if (safeStep === STEPS_LENGTH - 1) {
      console.log('DOWNLOADING...');
      await downloadResume()
      return;
    }
  };

  const prevStep = () => {
    if (safeStep > 0) {
      dispatch(setStep(safeStep - 1));
    }
  };

  const downloadResume = async () => {
    const blob = await pdf(<ResumePDF resume={resume} />).toBlob();
    const url = URL.createObjectURL(blob);
    const { personal } = resume;

    const first = personal?.firstName?.trim();
    const middle = personal?.middleName?.trim();
    const last = personal?.lastName?.trim();
    const suffix = personal?.suffix?.trim();
    const nameParts = [last, suffix, first, middle].filter(Boolean);

    // fallback if nothing exists
    const filename = nameParts.length > 0 ? `${nameParts.join(' ')}.pdf` : 'resume.pdf';

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    dispatch(setStep(0));
  }, [dispatch]);

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
            <div
              id="resume-pdf"
              className="bg-white text-black p-6"
              style={{
                color: '#000',
                backgroundColor: '#fff',
                fontFamily: 'Arial, sans-serif',
              }}
            >
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