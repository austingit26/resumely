'use client';

import { formatMonthYear } from '@/lib/utils';
import { useAppSelector } from '@/store/hooks';

export default function ResumePreview() {
  const resume = useAppSelector((state) => state.resume);

  const {
    sectionOrder,
    personal,
    experience,
    education,
    skills,
    projects,
  } = resume;

  const renderValue = (value: any) => {
    if (value === '' || value === null || value === undefined) return '';
    return value;
  };

  const isPresent = (endDate?: string, currentlyWorking?: boolean) => {
    if (currentlyWorking) return true;
    if (!endDate) return true;

    const end = new Date(endDate);
    const now = new Date();

    return (
      end.getFullYear() === now.getFullYear() &&
      end.getMonth() === now.getMonth()
    );
  };

  const renderSection = (section: string) => {
    switch (section) {

      /* ================= PERSONAL ================= */
      case 'personal':
        return (
          <div key="personal" className="text-center mb-6">
            <h1 className="text-2xl font-bold">
              {personal.firstName} {personal.middleName} {personal.lastName}
            </h1>

            {personal.role && (
              <p className="text-sm text-gray-700 mt-1">
                {personal.role}
              </p>
            )}

            {/* CONTACT */}
            <div className="text-sm mt-2">
              {[
                personal.email,
                personal.phone,
                personal.address,
              ]
                .filter(Boolean)
                .join(' • ')}
            </div>

            {/* SOCIALS */}
            {personal.socialLinks?.length > 0 && (
              <div className="mt-2 flex justify-center gap-3 flex-wrap text-xs">
                {personal.socialLinks.map((link, i) => (
                  <span key={i}>
                    {link.label}: {link.url}
                  </span>
                ))}
              </div>
            )}

            {/* SUMMARY */}
            {personal.summary && (
              <div className="mt-5 text-left">
                <h2 className="font-bold border-b mb-2">
                  Professional Summary
                </h2>
                <p className="pl-3 text-sm">
                  {renderValue(personal.summary)}
                </p>
              </div>
            )}
          </div>
        );

      /* ================= EXPERIENCE ================= */
      case 'experience':
        return (
          <div key="experience">
            <h2 className="font-bold border-b mb-3">
              Experience
            </h2>

            {experience?.map((exp, i) => (
              <div key={exp.id || i} className="mb-4 pl-3">
                <div className="font-semibold">
                  {exp.company}
                </div>

                <div className="flex justify-between text-sm">
                  <span>{exp.role}</span>
                  <span className="text-gray-600">
                    {formatMonthYear(exp.startDate)} -{' '}
                    {isPresent(exp.endDate, exp.currentlyWorking)
                      ? 'Present'
                      : formatMonthYear(exp.endDate)}
                  </span>
                </div>

                {exp.location && (
                  <div className="text-xs text-gray-600">
                    {exp.location}
                  </div>
                )}

                {exp.bullets?.length > 0 && (
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );

      /* ================= EDUCATION ================= */
      case 'education':
        return (
          <div key="education">
            <h2 className="font-bold border-b mb-3">
              Education
            </h2>

            {education?.map((edu, i) => (
              <div key={edu.id || i} className="mb-4 pl-3">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    {edu.school}
                  </span>
                  <span className="text-xs text-gray-600">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>
                    {edu.degree} {edu.field ? `- ${edu.field}` : ''}
                  </span>

                  {edu.achievements?.length > 0 && (
                    <span className="text-xs text-gray-600">
                      {edu.achievements.join(' • ')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      /* ================= SKILLS ================= */
      case 'skills':
        return (
          <div key="skills">
            <h2 className="font-bold border-b mb-3">
              Skills
            </h2>

            {skills?.map((cat, i) => (
              <div key={cat.id || i} className="mb-2 pl-3 text-sm">
                <span className="font-semibold">
                  {cat.category}
                </span>
                {cat.skills?.join(', ')}
              </div>
            ))}
          </div>
        );

      /* ================= PROJECTS ================= */
      case 'projects':
        return (
          <div key="projects">
            <h2 className="font-bold border-b mb-3">
              Projects
            </h2>

            {projects?.map((p, i) => (
              <div key={p.id || i} className="mb-4 pl-3">
                <div className="font-semibold">
                  {p.title}
                </div>

                <p className="text-sm mt-1">
                  {p.description}
                </p>

                {p.technologies?.length > 0 && (
                  <div className="text-xs text-gray-600 mt-1">
                    Tech: {p.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 text-black text-sm space-y-6">
      {sectionOrder.map((section) => (
        <div key={section}>{renderSection(section)}</div>
      ))}
    </div>
  );
}