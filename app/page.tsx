'use client';

import { useState } from 'react';
import ResumeStepper from '@/components/resume/ResumeStepper';
import ResumePreview from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* NAVBAR */}
      <div className="sticky top-0 z-10 bg-white border-b p-3 flex justify-between items-center">
        <h1 className="font-semibold">Resumely</h1>

        <Button onClick={() => setShowPreview((v) => !v)}>
          {showPreview ? 'Edit Resume' : 'Preview'}
        </Button>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {showPreview ? <ResumePreview /> : <ResumeStepper />}
      </div>
    </div>
  );
}