'use client';

import React from 'react';
import Image from 'next/image';
import {
  FileText,
  Sparkles,
  Zap,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/common/navbar';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <Navbar />

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 mt-14">

        <h2 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight text-slate-900">
          Build resumes that pass ATS and impress recruiters.
        </h2>

        <p className="mt-5 text-lg max-w-2xl text-slate-700 leading-relaxed">
          Stop getting ignored by automated hiring systems.
          Create clean, professional, ATS-friendly resumes
          in minutes — no design experience needed.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/learn"
            className="px-6 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition font-medium"
          >
            Learn More
          </Link>
          <Link
            href="/resume"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
          >
            Build Resume Free
          </Link>
        </div>

      </section>

      {/* BENEFITS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 px-6 mt-16 max-w-6xl mx-auto w-full">
        <Card
          icon={<FileText size={22} />}
          title="ATS-Friendly"
          desc="Optimized for automated resume screening systems."
        />

        <Card
          icon={<Sparkles size={22} />}
          title="Beginner-Friendly"
          desc="Simple and easy resume building for everyone."
        />

        <Card
          icon={<Zap size={22} />}
          title="Quick Creation"
          desc="Create polished resumes in just a few minutes."
        />

        <Card
          icon={<UserCheck size={22} />}
          title="Free & Unlimited"
          desc="No subscriptions. No hidden limits."
        />

      </section>

      {/* STATS */}
      <section className="mt-20 bg-secondary-500 py-12 border-y border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <Stat
            value="12,500+"
            label="Active Users"
          />

          <Stat
            value="98%"
            label="Recommendations"
          />

          <Stat
            value="45,000+"
            label="Resume Downloads"
          />

        </div>

      </section>

      {/* FOOTER CTA */}
      <section className="py-16 px-6 text-center">

        <h3 className="text-2xl font-semibold text-slate-900">
          Your next opportunity starts with a better resume.
        </h3>

        <p className="mt-3 text-slate-600">
          Create your ATS-friendly resume today.
        </p>
      </section>

    </div>
  );
};

/* -------------------------
   CARD
--------------------------*/

const Card = ({
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

      <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
        {desc}
      </p>

    </div>
  );
};

/* -------------------------
   STATS
--------------------------*/

const Stat = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  return (
    <div>

      <div className="text-3xl font-bold text-slate-900">
        {value}
      </div>

      <div className="mt-1 text-slate-600">
        {label}
      </div>

    </div>
  );
};

export default Landing;