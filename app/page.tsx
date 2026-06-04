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
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.webp"
          alt="bg"
          fill
          priority
          className="object-cover opacity-75"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-primary-400/15 via-primary-400/5 to-transparent h-[25vh] opacity-60" />
      </div>
      
      <section className="flex flex-col items-center text-center px-6 z-99">
        <div className='lg:h-[80vh] md:h-[70vh] h-[80vh] flex flex-col justify-center gap-y-12'>
          <h2 className="text-2xl md:text-5xl font-bold max-w-3xl leading-tight text-zinc-50">
            Build resumes that pass ATS and impress recruiters.
          </h2>
          <div className='flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base'>
            <Link
              href="/learn"
              className="py-2 md:py-3 md:px-6 md:w-max w-full bg-transparent border border-zinc-600 rounded-lg hover:bg-zinc-50/5 transition font-medium"
            >
              Learn More
            </Link>
            <Link
              href="/resume"
              className="py-2 md:py-3 md:px-6 md:w-max w-full bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
            >
              Build Resume
            </Link>
          </div>
        </div>
        <div className="relative w-screen md:mt-12 mt-2 px-1.5 pb-1.5 sm:px-12 sm:pb-12 md:px-24 md:pb-24 lg:px-44 lg:pb-44">
          <Image
            src="/folder.png"
            alt="logo"
            width={1920}
            height={1080}
            priority
            className="w-full h-auto"
          />

          {/* CONTENT INSIDE FOLDER */}
          <div className="absolute inset-0 px-[8%] pt-[10%] pb-[12%] flex flex-col justify-center items-center">
            <section className="grid grid-cols-2 lg:gap-6 xl:gap-12 w-max">
              <Card icon={<FileText className="w-4 h-4 md:w-[22px] md:h-[22px]" />} title="ATS-Friendly" desc="Optimized for automated resume screening systems." />
              <Card icon={<Sparkles className="w-4 h-4 md:w-[22px] md:h-[22px]" />} title="Beginner-Friendly" desc="Simple and easy resume building for everyone." />
              <Card icon={<Zap className="w-4 h-4 md:w-[22px] md:h-[22px]" />} title="Quick Creation" desc="Create polished resumes in just a few minutes." />
              <Card icon={<UserCheck className="w-4 h-4 md:w-[22px] md:h-[22px]" />} title="Free & Unlimited" desc="No subscriptions. No hidden limits." />
            </section>
          </div>
        </div>
      </section>

   

      {/* STATS */}
      <section className="mt-20 bg-zinc-800/75 py-12">
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

        <h3 className="text-2xl font-semibold text-zinc-200">
          Your next opportunity starts with a better resume.
        </h3>

        <p className="mt-3 text-zinc-400">
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
    <div className="flex md:flex-col flex-row gap-2 justify-center items-center rounded-2xl md:p-6 p-2">
      <div className="md:w-11 w-6 md:h-11 h-6 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
        {icon}
      </div>

      <div className='flex flex-col gap-y-0.5'>
        <h3 className="font-semibold text-secondary-600 md:text-base text-[10px]">
          {title}
        </h3>

        <p className="text-sm text-gray-200/90 leading-relaxed md:flex hidden">
          {desc}
        </p>
      </div>
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
      <div className="text-3xl font-bold text-secondary-600">
        {value}
      </div>

      <div className="mt-1 text-zinc-500">
        {label}
      </div>

    </div>
  );
};

export default Landing;