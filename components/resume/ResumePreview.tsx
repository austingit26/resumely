'use client';

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

  const renderArray = (arr: any[], renderItem: (item: any, i: number) => any) => {
    if (!arr || arr.length === 0) return null;
    return arr.map(renderItem);
  };

  const renderSection = (section: string) => {
    switch (section) {

      /* ================= PERSONAL ================= */
      case 'personal':
        return (
          <div key="personal">
            <h2 className="font-bold uppercase border-b mb-3">
              Personal Information
            </h2>

            <div className="grid grid-cols-3 gap-2">
              <p><b>First Name:</b> {renderValue(personal.firstName)}</p>
              <p><b>Middle Name:</b> {renderValue(personal.middleName)}</p>
              <p><b>Last Name:</b> {renderValue(personal.lastName)}</p>

              <p><b>Email:</b> {renderValue(personal.email)}</p>
              <p><b>Phone:</b> {renderValue(personal.phone)}</p>
              <p><b>Address:</b> {renderValue(personal.address)}</p>
            </div>

            <div className="mt-3">
              <p><b>Summary:</b></p>
              <p className="pl-2">{renderValue(personal.summary)}</p>
            </div>

            {personal.socialLinks?.length > 0 && (
              <div className="mt-3">
                <p><b>Social Links:</b></p>

                {personal.socialLinks.map((link, i) => (
                  <div key={i} className="pl-2">
                    <p><b>Label:</b> {renderValue(link.label)}</p>
                    <p><b>URL:</b> {renderValue(link.url)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      /* ================= EXPERIENCE ================= */
      case 'experience':
        return (
          <div key="experience">
            <h2 className="font-bold uppercase border-b mb-3">
              Experience
            </h2>

            {renderArray(experience, (exp, i) => (
              <div key={exp?.id || i} className="mb-4 border p-2 rounded">
                <p><b>Company:</b> {renderValue(exp?.company)}</p>
                <p><b>Role:</b> {renderValue(exp?.role)}</p>
                <p><b>Location:</b> {renderValue(exp?.location)}</p>

                <p>
                  <b>Start Date:</b> {renderValue(exp?.startDate)} {' '}
                  <b>End Date:</b>{' '}
                  {exp?.currentlyWorking ? 'Present' : renderValue(exp?.endDate)}
                </p>

                {exp?.bullets?.length > 0 && (
                  <ul className="list-disc ml-5 mt-2">
                    {exp.bullets.map((b: string, idx: number) => (
                      <li key={idx}>{renderValue(b)}</li>
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
            <h2 className="font-bold uppercase border-b mb-3">
              Education
            </h2>

            {renderArray(education, (edu, i) => (
              <div key={edu?.id || i} className="mb-4 border p-2 rounded">
                <p><b>Degree:</b> {renderValue(edu?.degree)}</p>
                <p><b>Field:</b> {renderValue(edu?.field)}</p>
                <p><b>School:</b> {renderValue(edu?.school)}</p>

                <p>
                  <b>Start Year:</b> {renderValue(edu?.startYear)} {' '}
                  <b>End Year:</b> {renderValue(edu?.endYear)}
                </p>

                {edu?.achievements?.length > 0 && (
                  <ul className="list-disc ml-5 mt-2">
                    {edu.achievements.map((a: string, idx: number) => (
                      <li key={idx}>{renderValue(a)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        );

      /* ================= SKILLS ================= */
      case 'skills':
        return (
          <div key="skills">
            <h2 className="font-bold uppercase border-b mb-3">
              Skills
            </h2>

            {renderArray(skills, (cat, i) => (
              <div key={cat?.id || i} className="mb-2">
                <p><b>Category:</b> {renderValue(cat?.category)}</p>
                <p>
                  <b>Skills:</b>{' '}
                  {cat?.skills?.length ? cat.skills.join(', ') : ''}
                </p>
              </div>
            ))}
          </div>
        );

      /* ================= PROJECTS ================= */
      case 'projects':
        return (
          <div key="projects">
            <h2 className="font-bold uppercase border-b mb-3">
              Projects
            </h2>

            {renderArray(projects, (p, i) => (
              <div key={p?.id || i} className="mb-4 border p-2 rounded">
                <p><b>Title:</b> {renderValue(p?.title)}</p>
                <p><b>Description:</b> {renderValue(p?.description)}</p>

                <p>
                  <b>Technologies:</b>{' '}
                  {p?.technologies?.length
                    ? p.technologies.join(', ')
                    : ''}
                </p>

                <p><b>Link:</b> {renderValue(p?.link)}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 text-sm text-black space-y-8">
      {sectionOrder.map((section) => (
        <div key={section}>{renderSection(section)}</div>
      ))}
    </div>
  );
}