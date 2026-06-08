'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSkills,
  updateSkillCategory,
} from '@/store/slices/resumeSlice';
import { useEffect, useState } from 'react';

export default function SkillsStep() {
  const dispatch = useAppDispatch();

  const skills = useAppSelector(
    (state) => state.resume.skills
  );

  
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    setSkillInputs((prev) => {
      const next = { ...prev };

      skills.forEach((skls) => {
        if (!(skls.id in next)) {
          next[skls.id] = skls.skills.join(', ');
        }
      });

      return next;
    });
  }, [skills]);
  
  // ADD CATEGORY
  const addCategory = () => {
    dispatch(
      setSkills([
        ...skills,
        {
          id: crypto.randomUUID(),
          category: '',
          skills: [],
        },
      ])
    );
  };

  // REMOVE CATEGORY
  const removeCategory = (id: string) => {
    dispatch(
      setSkills(skills.filter((c) => c.id !== id))
    );
  };

  // UPDATE CATEGORY NAME
  const updateCategory = (id: string, value: string) => {
    dispatch(
      setSkills(
        skills.map((c) =>
          c.id === id ? { ...c, category: value } : c
        )
      )
    );
  };

  // UPDATE SKILLS STRING → ARRAY
  const updateSkills = (id: string, value: string) => {
    dispatch(
      setSkills(
        skills.map((c) =>
          c.id === id
            ? {
                ...c,
                skills: value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              }
            : c
        )
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Skills</h2>

        <Button onClick={addCategory} className='text-white'>
          Add Category
        </Button>
      </div>

      {/* CATEGORY LIST */}
      <div className="space-y-4">
        {skills.map((cat) => (
          <div key={cat.id} className="p-4 space-y-3 rounded-xl border border-zinc-300/50">

            {/* CATEGORY NAME */}
            <Input
              placeholder="Category (e.g. Frontend, Backend, Tools)"
              value={cat.category}
              onChange={(e) =>
                updateCategory(cat.id, e.target.value)
              }
            />

            {/* SKILLS INPUT */}
            <Input
              placeholder="Skills (comma separated)"
              value={skillInputs[cat.id] ?? ''}
              onChange={(e) => {
                const value = e.target.value;

                setSkillInputs((prev) => ({
                  ...prev,
                  [cat.id]: value,
                }));

                dispatch(
                  updateSkillCategory({
                    ...cat,
                    skills: value
                      .split(',')
                      .map((a) => a.trim())
                      .filter(Boolean),
                  })
                );
              }}
            />

            {/* PREVIEW CHIPS (optional but useful UX) */}
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-gray-100 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* REMOVE CATEGORY */}
            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() => removeCategory(cat.id)}
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