'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addProject,
  updateProject,
  removeProject,
} from '@/store/slices/resumeSlice';
import { useEffect, useState } from 'react';

export default function ProjectsStep() {
  const dispatch = useAppDispatch();

  const projects = useAppSelector(
    (state) => state.resume.projects
  );

  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    setTechInputs((prev) => {
      const next = { ...prev };

      projects.forEach((proj) => {
        if (!(proj.id in next)) {
          next[proj.id] = proj.technologies.join(', ');
        }
      });

      return next;
    });
  }, [projects]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Projects</h2>

        <Button
          className='text-white'
          onClick={() =>
            dispatch(
              addProject({
                id: crypto.randomUUID(),
                title: '',
                description: '',
                technologies: [],
                link: '',
              })
            )
          }
        >
          Add Project
        </Button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 space-y-3 rounded-xl border border-zinc-300/50">

            {/* TITLE */}
            <Input
              placeholder="Project Title"
              value={project.title}
              onChange={(e) =>
                dispatch(
                  updateProject({
                    ...project,
                    title: e.target.value,
                  })
                )
              }
            />

            {/* DESCRIPTION */}
            <textarea
              className="w-full border border-zinc-200 rounded p-2 text-sm outline-none focus:border-zinc-400 focus:ring-0"
              rows={4}
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                dispatch(
                  updateProject({
                    ...project,
                    description: e.target.value,
                  })
                )
              }
            />

            {/* TECHNOLOGIES */}
            <Input
              placeholder="Tools and Technologies (comma separated)"
              value={techInputs[project.id] ?? ''}
              onChange={(e) => {
                const value = e.target.value;

                setTechInputs((prev) => ({
                  ...prev,
                  [project.id]: value,
                }));

                dispatch(
                  updateProject({
                    ...project,
                    technologies: value
                      .split(',')
                      .map((a) => a.trim())
                      .filter(Boolean),
                  })
                );
              }}
            />

            {/* LINK */}
            <Input
              placeholder="Project Link (optional)"
              value={project.link}
              onChange={(e) =>
                dispatch(
                  updateProject({
                    ...project,
                    link: e.target.value,
                  })
                )
              }
            />

            {/* TECHNOLOGY PREVIEW CHIPS */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-gray-100 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* REMOVE */}
            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() =>
                  dispatch(removeProject(project.id))
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