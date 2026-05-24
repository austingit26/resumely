'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addEducation, updateEducation, removeEducation } from '@/store/slices/resumeSlice';

export default function EducationStep() {
  const dispatch = useAppDispatch();

  const education = useAppSelector(
    (state) => state.resume.education
  );

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Education</h2>

        <Button
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
          <Card key={edu.id} className="p-4 space-y-3">
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
              <Input
                placeholder="Start Year"
                value={edu.startYear}
                onChange={(e) =>
                  dispatch(
                    updateEducation({
                      ...edu,
                      startYear: e.target.value,
                    })
                  )
                }
              />

              <Input
                placeholder="End Year"
                value={edu.endYear}
                onChange={(e) =>
                  dispatch(
                    updateEducation({
                      ...edu,
                      endYear: e.target.value,
                    })
                  )
                }
              />
            </div>

            {/* ACHIEVEMENTS (simple comma input style) */}
            <Input
              placeholder="Awards / Achievements (comma separated)"
              value={edu.achievements.join(', ')}
              onChange={(e) =>
                dispatch(
                  updateEducation({
                    ...edu,
                    achievements: e.target.value
                      .split(',')
                      .map((a) => a.trim())
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
                  dispatch(removeEducation(edu.id))
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