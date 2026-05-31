import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bot,
  FileCheck,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/common/navbar';

const LearnPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <Navbar
        rightSlot={
          <Link
            href="/"
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
          >
            Back Home
          </Link>
        }
      />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-14 text-center">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium">
          <Bot size={16} />
          ATS Resume Education
        </div>

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
          What is ATS and why does it matter?
        </h1>

        <p className="mt-6 text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
          Many companies use Applicant Tracking Systems (ATS)
          to automatically scan, filter, and rank resumes before
          a recruiter even sees them.
        </p>

      </section>

      {/* WHAT IS ATS */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-secondary-500 rounded-3xl border border-slate-200 p-8 shadow-sm">

          <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-500">
            <ScanSearch size={28} />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-slate-900">
            What exactly is ATS?
          </h2>

          <p className="mt-4 text-slate-700 leading-relaxed">
            ATS stands for Applicant Tracking System.
            It is software used by companies to organize,
            search, and filter job applications.
          </p>

          <p className="mt-4 text-slate-700 leading-relaxed">
            Instead of reading every resume manually,
            recruiters often rely on ATS systems to
            identify resumes that match the job description.
          </p>

          <p className="mt-4 text-slate-700 leading-relaxed">
            If your resume is poorly formatted or missing
            important keywords, it may never reach a real recruiter.
          </p>

        </div>

        <div className="bg-secondary-500 rounded-3xl border border-slate-200 p-8 shadow-sm">

          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
            <FileCheck size={28} />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-slate-900">
            Why resumes get rejected
          </h2>

          <div className="mt-6 space-y-4">

            <Reason text="Complex layouts that ATS cannot read properly" />

            <Reason text="Missing keywords related to the job role" />

            <Reason text="Poor section organization and structure" />

            <Reason text="Images, graphics, and tables confusing the parser" />

            <Reason text="Unclear experience and skills formatting" />

          </div>

        </div>

      </section>

      {/* HOW RESUMELY HELPS */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium">
            <Sparkles size={16} />
            How Resumely Helps
          </div>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Built to help your resume pass ATS
          </h2>

          <p className="mt-5 text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Resumely focuses on clean formatting,
            proper resume structure, and ATS-friendly
            layouts so your application has a better chance
            of reaching recruiters.
          </p>

        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          <FeatureCard
            icon={<ShieldCheck size={24} />}
            title="ATS-Friendly Structure"
            desc="Sections are organized clearly for resume scanners."
          />

          <FeatureCard
            icon={<Zap size={24} />}
            title="Fast Resume Building"
            desc="Create professional resumes in minutes."
          />

          <FeatureCard
            icon={<FileCheck size={24} />}
            title="Clean Formatting"
            desc="Simple layouts designed for readability and parsing."
          />

          <FeatureCard
            icon={<Sparkles size={24} />}
            title="Beginner-Friendly"
            desc="No design or resume experience needed."
          />

        </div>

      </section>

      {/* CTA */}
      <section className="pb-24 px-6">

        <div className="max-w-4xl mx-auto bg-primary-500 rounded-3xl p-10 text-center text-white">

          <h2 className="text-3xl font-bold text-secondary-600">
            Ready to build your ATS-friendly resume?
          </h2>

          <p className="mt-4 text-primary-100 leading-relaxed">
            Create professional resumes that are optimized
            for recruiters and Applicant Tracking Systems.
          </p>

          <div className="mt-8">

            <Link
              href="/resume"
              className="inline-flex px-6 py-3 rounded-xl bg-white text-primary-600 font-medium hover:bg-slate-100 transition"
            >
              Start Building
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

/* -------------------------
   FEATURE CARD
--------------------------*/

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

      <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        {desc}
      </p>

    </div>
  );
};

/* -------------------------
   REASON
--------------------------*/

const Reason = ({
  text,
}: {
  text: string;
}) => {
  return (
    <div className="flex items-start gap-3">

      <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />

      <p className="text-slate-700 leading-relaxed">
        {text}
      </p>

    </div>
  );
};

export default LearnPage;