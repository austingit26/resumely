'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addExperience,
  updateExperience,
  removeExperience,
} from '@/store/slices/resumeSlice';

export default function ExperienceStep() {
  const dispatch = useAppDispatch();

  const experience = useAppSelector(
    (state) => state.resume.experience
  );

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Experience</h2>

        <Button
          onClick={() =>
            dispatch(
              addExperience({
                id: crypto.randomUUID(),
                company: '',
                role: '',
                location: '',
                startDate: '',
                endDate: '',
                currentlyWorking: false,
                bullets: [],
              })
            )
          }
        >
          Add Experience
        </Button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {experience.map((exp) => (
          <Card key={exp.id} className="p-4 space-y-3">

            {/* ROLE */}
            <Input
              placeholder="Job Title / Role"
              value={exp.role}
              onChange={(e) =>
                dispatch(
                  updateExperience({
                    ...exp,
                    role: e.target.value,
                  })
                )
              }
            />

            {/* COMPANY */}
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                dispatch(
                  updateExperience({
                    ...exp,
                    company: e.target.value,
                  })
                )
              }
            />

            {/* LOCATION */}
            <Input
              placeholder="Location"
              value={exp.location}
              onChange={(e) =>
                dispatch(
                  updateExperience({
                    ...exp,
                    location: e.target.value,
                  })
                )
              }
            />

            {/* DATES */}
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Start Date (e.g. Jan 2023)"
                value={exp.startDate}
                onChange={(e) =>
                  dispatch(
                    updateExperience({
                      ...exp,
                      startDate: e.target.value,
                    })
                  )
                }
              />

              <Input
                placeholder="End Date (or Present)"
                value={exp.endDate}
                onChange={(e) =>
                  dispatch(
                    updateExperience({
                      ...exp,
                      endDate: e.target.value,
                    })
                  )
                }
              />
            </div>

            {/* CURRENTLY WORKING */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={exp.currentlyWorking}
                onChange={(e) =>
                  dispatch(
                    updateExperience({
                      ...exp,
                      currentlyWorking: e.target.checked,
                    })
                  )
                }
              />
              Currently working here
            </label>

            {/* BULLETS (simple textarea for now) */}
            <textarea
              className="w-full border rounded p-2 text-sm"
              rows={4}
              placeholder="Responsibilities (one per line)"
              value={exp.bullets.join('\n')}
              onChange={(e) =>
                dispatch(
                  updateExperience({
                    ...exp,
                    bullets: e.target.value
                      .split('\n')
                      .map((b) => b.trim())
                      .filter(Boolean),
                  })
                )
              }
            />

            {/* REMOVE */}
            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() =>
                  dispatch(removeExperience(exp.id))
                }
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