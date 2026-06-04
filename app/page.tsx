'use client';

import React from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  FileCheck,
  ScanSearch,
  Bot,
  FileX,
} from 'lucide-react';
import Link from 'next/link';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col select-none text-zinc-800 gap-y-12">
      <section className="flex flex-col items-center text-center px-6 z-99">
        <div className='lg:h-[80vh] md:h-[70vh] h-[80vh] flex flex-col justify-center gap-y-12'>
          <div className='flex flex-col gap-y-4'>
            <p className='font-title text-5xl text-primary-500'>RESUMELY</p>
            <p className="text-base md:text-2xl font-bold max-w-3xl leading-tight text-zinc-800">
              Build resumes that pass ATS and impress recruiters
            </p>
          </div>
          <div className='flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base'>
            <div
              onClick={() => document.getElementById("learn")?.scrollIntoView({ behavior: "smooth" })}
              className="cursor-pointer py-2 md:px-6 md:w-max w-full bg-transparent border border-zinc-600 rounded-lg hover:bg-zinc-50/5 transition font-medium"
            >
              Learn More
            </div>
            <Link
              href="/resume"
              className="py-2 md:px-6 md:w-max w-full bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
            >
              Build Resume
            </Link>
          </div>
        </div>
      </section>

      {/* LEARN */}
      <section className="px-6 text-center flex flex-col justify-center items-center gap-y-6" id='learn'>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 text-white text-sm font-medium w-max">
          <Bot size={16} />
          ATS Resume Education
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-800">
          What is ATS and why does it matter?
        </h1>

        <p className="text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Many companies use Applicant Tracking Systems (ATS)
          to automatically scan, filter, and rank resumes before
          a recruiter even sees them.
        </p>
      </section>

      {/* WHAT IS ATS */}
      <section className="px-6 md:px-24 xl:px-36 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 rounded-xl p-8 shadow-sm flex flex-col gap-y-4">
          <div className='flex items-center gap-x-2'>
            <div className="w-14 h-14 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500">
              <ScanSearch size={28} />
            </div>
            <h2 className="text-lg font-semibold text-zinc-900">What exactly is ATS?</h2>
          </div>
          <div className='flex flex-col gap-y-4 text-sm md:pl-6 text-zinc-500'>
            <p>
              ATS stands for Applicant Tracking System.
              It is software used by companies to organize,
              search, and filter job applications.
            </p>

            <p>
              Instead of reading every resume manually,
              recruiters often rely on ATS systems to
              identify resumes that match the job description.
            </p>

            <p>
              If your resume is poorly formatted or missing
              important keywords, it may never reach a real recruiter.
            </p>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-8 shadow-sm flex flex-col gap-y-4 h-max">
          <div className='flex items-center gap-x-2'>
            <div className="w-14 h-14 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500">
              <FileX size={28} />
            </div>
            <p className="text-lg font-semibold text-zinc-900">Why resumes get rejected</p>
          </div>
          <div className='flex flex-col gap-y-4 text-sm md:pl-6 text-zinc-500'>
            <Reason text="Complex layouts that ATS cannot read properly" />
            <Reason text="Missing keywords related to the job role" />
            <Reason text="Poor section organization and structure" />
            <Reason text="Images, graphics, and tables confusing the parser" />
            <Reason text="Unclear experience and skills formatting" />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-24 xl:px-82 my-6 text-center flex flex-col justify-center items-center gap-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 text-white text-sm font-medium w-max">
           <Sparkles size={16} />
            How Resumely Helps
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-zinc-800">
          Built to help your resume pass ATS
        </h1>

        <p className="text-slate-700 text-sm md:text-base leading-relaxed">
          Resumely focuses on clean formatting, proper resume structure, 
          and ATS-friendly layouts so your application has a better 
          chance of reaching recruiters.
        </p>
      </section>

      {/* FEATURE */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 px-6 md:px-24 xl:px-36">
        <FeatureCard
          icon={<ShieldCheck size={14} />}
          title="ATS-Friendly Structure"
          desc="Sections are organized clearly for resume scanners."
        />

        <FeatureCard
          icon={<Zap size={14} />}
          title="Fast Resume Building"
          desc="Create professional resumes in minutes."
        />

        <FeatureCard
          icon={<FileCheck size={14} />}
          title="Clean Formatting"
          desc="Simple layouts designed for readability and parsing."
        />

        <FeatureCard
          icon={<Sparkles size={14} />}
          title="Beginner-Friendly"
          desc="No design or resume experience needed."
        />
      </section>

      {/* STATS */}
      <section className="bg-zinc-950/3 py-12">
        <div className="flex flex-col md:flex-row gap-4 justify-evenly md:px-36">
          <Stat value="12,500+" label="Active Users" />
          <Stat value="98%" label="Recommendations" />
          <Stat value="45,000+" label="Resume Downloads" />
        </div>
      </section>

      <section>
        <div className="relative w-full flex justify-center p-4">
          <div className="relative w-screen md:w-[50vw]">
            <Image
              src="/folder.png"
              alt="logo"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto"
            />

            {/* CONTENT INSIDE FOLDER */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-[10%] text-center">
              <div className="flex flex-col gap-y-2">
                <p className="text-sm md:text-2xl font-semibold text-secondary-500">
                  Your next opportunity starts with a better resume.
                </p>
                <p className="text-xs md:text-base text-zinc-400">
                  Create your ATS-friendly resume today.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

/* -------------------------
   CARD
--------------------------*/
const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => {
  return (
    <div className="bg-transparent rounded-lg border border-zinc-100/90 p-6 shadow-xs flex flex-col gap-y-2">
      <div className='flex items-center gap-x-2'>
        <div className="w-8 h-8 rounded-lg bg-secondary-500/10 text-primary-500 flex items-center justify-center">
          {icon}
        </div>

        <h3 className="font-semibold text-sm md:text-base text-slate-900">
          {title}
        </h3>
      </div>
      <p className="pl-6 text-xs md:text-sm text-slate-600 leading-relaxed">
        {desc}
      </p>

    </div>
  );
};

/* -------------------------
   STATS
--------------------------*/
const Stat = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className='flex flex-col gap-y-0.5 justify-center items-center'>
      <div className="text-md md:text-2xl font-bold text-secondary-600">{value}</div>
      <div className="text-xs md:text-sm text-zinc-500">{label}</div>
    </div>
  );
};


const Reason = ({ text }: { text: string }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
      <p className="text-slate-700 leading-relaxed">{text}</p>
    </div>
  );
};
export default Landing;