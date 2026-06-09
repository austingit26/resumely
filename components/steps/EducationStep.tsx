'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addEducation, updateEducation, removeEducation } from '@/store/slices/resumeSlice';
import { useEffect, useState } from 'react';
import { EducationItem } from '@/types/resume';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function EducationStep() {
  const dispatch = useAppDispatch();

  const education = useAppSelector(
    (state) => state.resume.education
  );

  const [achievementInputs, setAchievementInputs] = useState<Record<string, string>>({});

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 101 }, (_, i) => String(currentYear - i));

  function normalizeEducationYears(edu: EducationItem): EducationItem {
    const start = edu.startYear ? Number(edu.startYear) : null;
    const end = edu.endYear ? Number(edu.endYear) : null;

    if (start && end && start > end) {
      return {
        ...edu,
        endYear: "",
      };
    }

    return edu;
  }

  const isStartDisabled = (year: string, edu: EducationItem) => {
    const y = Number(year);

    if (edu.endYear) {
      return y > Number(edu.endYear);
    }

    return false;
  };

  const isEndDisabled = (year: string, edu: EducationItem) => {
    const y = Number(year);

    if (edu.startYear) {
      return y < Number(edu.startYear);
    }

    return false;
  };

  useEffect(() => {
    setAchievementInputs((prev) => {
      const next = { ...prev };

      education.forEach((edu) => {
        if (!(edu.id in next)) {
          next[edu.id] = edu.achievements.join(', ');
        }
      });

      return next;
    });
  }, [education]);
  
  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Education</h2>

        <Button
          className='text-white'
          onClick={() =>
            dispatch(
              addEducation({
                id: crypto.randomUUID(),
                degree: 'Bachelor Degree',
                field: '',
                school: '',
                startYear: '',
                endYear: '',
                achievements: [],
              })
            )
          }
        >
          Add Education
        </Button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 space-y-3 rounded-xl border border-zinc-300/50">
            {/* DEGREE */}
            <Input
              placeholder="Degree (e.g. Bachelor Degree)"
              value={edu.degree}
              onChange={(e) =>
                dispatch(
                  updateEducation({
                    ...edu,
                    degree: e.target.value as any,
                  })
                )
              }
            />

            {/* FIELD / PROGRAM */}
            <Input
              placeholder="Field / Program"
              value={edu.field}
              onChange={(e) =>
                dispatch(
                  updateEducation({
                    ...edu,
                    field: e.target.value,
                  })
                )
              }
            />

            {/* SCHOOL */}
            <Input
              placeholder="School"
              value={edu.school}
              onChange={(e) =>
                dispatch(
                  updateEducation({
                    ...edu,
                    school: e.target.value,
                  })
                )
              }
            />

            {/* YEARS */}
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={edu.startYear}
                onValueChange={(value) => {
                  dispatch(
                    updateEducation(
                      normalizeEducationYears({
                        ...edu,
                        startYear: value,
                      })
                    )
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Start Year" />
                </SelectTrigger>

                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year} disabled={isStartDisabled(year, edu)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={edu.endYear}
                onValueChange={(value) => {
                  dispatch(
                    updateEducation(
                      normalizeEducationYears({
                        ...edu,
                        endYear: value,
                      })
                    )
                  );
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="End Year" />
                </SelectTrigger>

                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year} disabled={isEndDisabled(year, edu)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ACHIEVEMENTS (simple comma input style) */}
            <Input
              placeholder="Awards / Achievements (comma separated)"
              value={achievementInputs[edu.id] ?? ''}
              onChange={(e) => {
                const value = e.target.value;

                setAchievementInputs((prev) => ({
                  ...prev,
                  [edu.id]: value,
                }));

                dispatch(
                  updateEducation({
                    ...edu,
                    achievements: value
                      .split(',')
                      .map((a) => a.trim())
                      .filter(Boolean),
                  })
                );
              }}
            />


            {/* REMOVE */}
            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() =>
                  dispatch(removeEducation(edu.id))
                }
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}