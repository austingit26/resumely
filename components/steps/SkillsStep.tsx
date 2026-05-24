'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSkills,
} from '@/store/slices/resumeSlice';

export default function SkillsStep() {
  const dispatch = useAppDispatch();

  const skills = useAppSelector(
    (state) => state.resume.skills
  );

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

        <Button onClick={addCategory}>
          Add Category
        </Button>
      </div>

      {/* CATEGORY LIST */}
      <div className="space-y-4">
        {skills.map((cat) => (
          <Card key={cat.id} className="p-4 space-y-3">

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
              placeholder="Skills (comma separated: React, Vue, Node)"
              value={cat.skills.join(', ')}
              onChange={(e) =>
                updateSkills(cat.id, e.target.value)
              }
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

          </Card>
        ))}
      </div>
    </div>
  );
}