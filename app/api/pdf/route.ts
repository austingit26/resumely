import puppeteer from "puppeteer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const p = data.personal ?? {};

    const fullName =
      `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`.trim() ||
      "Anonymous";

    // =========================
    // HEADER
    // =========================
    const header = `
      <div style="text-align:center; margin-bottom:18px;">
        <div style="font-size:22px; font-weight:bold;">
          ${fullName}
        </div>

        ${
          p.role
            ? `<div style="font-size:13px; margin-top:4px; color:#333;">
                ${p.role}
              </div>`
            : ""
        }
      </div>
    `;

    // =========================
    // PERSONAL INFO
    // =========================
    const personalInfoItems = [p.email, p.phone, p.address].filter(Boolean);

    const personalInfo = `
      <div style="text-align:center; font-size:12px; margin-bottom:18px;">
        ${personalInfoItems.join(" • ")}

        ${
          p.socialLinks?.length
            ? `
            <div style="margin-top:8px; display:flex; justify-content:center; flex-wrap:wrap; gap:10px;">
              ${p.socialLinks
                .map(
                  (s: any) => `
                    <span style="font-size:11px;">
                      ${s.label}: ${s.url}
                    </span>
                  `
                )
                .join("")}
            </div>
          `
            : ""
        }
      </div>
    `;

    // =========================
    // SUMMARY
    // =========================
    const summarySection = p.summary
      ? `
      <div style="margin-bottom:14px;">
        <div style="font-weight:bold; border-bottom:1px solid #000; margin-bottom:8px;">
          Professional Summary
        </div>

        <div style="padding-left:12px; font-size:12px;">
          ${p.summary}
        </div>
      </div>
    `
      : "";

    // =========================
    // EXPERIENCE
    // =========================
    const experienceSection =
      data.experience?.length > 0
        ? `
      <div style="margin-bottom:14px;">
        <div style="font-weight:bold; border-bottom:1px solid #000; margin-bottom:8px;">
          Professional Experience
        </div>

        <div style="padding-left:12px;">
          ${data.experience
            .map(
              (e: any) => `
            <div style="margin-bottom:12px;">

              <div style="font-weight:bold;">
                ${e.company || ""}
              </div>

              <div style="display:flex; justify-content:space-between; font-size:12px;">
                <div>${e.role || ""}</div>
                <div style="color:#555;">
                  ${e.startDate || ""} - ${
                e.currentlyWorking ? "Present" : e.endDate || ""
              }
                </div>
              </div>

              ${
                e.location
                  ? `<div style="font-size:11px; color:#666;">
                      ${e.location}
                    </div>`
                  : ""
              }

              ${
                e.bullets?.length
                  ? `
                <ul style="margin:6px 0 0 16px;">
                  ${e.bullets.map((b: string) => `<li>${b}</li>`).join("")}
                </ul>
              `
                  : ""
              }

            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
        : "";

    // =========================
    // EDUCATION
    // =========================
    const educationSection =
      data.education?.length > 0
        ? `
      <div style="margin-bottom:14px;">
        <div style="font-weight:bold; border-bottom:1px solid #000; margin-bottom:8px;">
          Education
        </div>

        <div style="padding-left:12px;">
          ${data.education
            .map((e: any) => {
              const year =
                e.startYear || e.endYear
                  ? `${e.startYear || ""} - ${e.endYear || ""}`
                  : "";

              const awards = e.achievements?.length
                ? e.achievements.join(" • ")
                : "";

              return `
              <div style="margin-bottom:12px;">

                <div style="display:flex; justify-content:space-between;">
                  <div style="font-weight:bold;">
                    ${e.school || ""}
                  </div>
                  <div style="font-size:11px; color:#555;">
                    ${year}
                  </div>
                </div>

                <div style="display:flex; justify-content:space-between;">
                  <div style="font-size:12px;">
                    ${e.degree || ""}${e.field ? ` - ${e.field}` : ""}
                  </div>

                  ${
                    awards
                      ? `<div style="font-size:11px; color:#555; text-align:right;">
                          ${awards}
                        </div>`
                      : `<div></div>`
                  }
                </div>

              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `
        : "";

    // =========================
    // SKILLS
    // =========================
    const skillsSection =
      data.skills?.length > 0
        ? `
      <div style="margin-bottom:14px;">
        <div style="font-weight:bold; border-bottom:1px solid #000; margin-bottom:8px;">
          Skills
        </div>

        <div style="padding-left:12px;">
          ${data.skills
            .map(
              (s: any) => `
            <div style="margin-bottom:6px;">
              <b>${s.category}</b>: ${s.skills?.join(", ") || ""}
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
        : "";

    // =========================
    // PROJECTS (TITLE CLICKABLE)
    // =========================
const projectsSection =
  data.projects?.length > 0
    ? `
  <div style="margin-bottom:14px;">
    <div style="font-weight:bold; border-bottom:1px solid #000; margin-bottom:8px;">
      Projects
    </div>

    <div style="padding-left:12px;">
      ${data.projects
        .map(
          (p: any) => `
        <div style="margin-bottom:14px;">

          ${
            p.link
              ? `<a href="${p.link}" style="font-weight:bold; color:#000; text-decoration:none;">
                  ${p.title || ""}
                </a>`
              : `<div style="font-weight:bold;">
                  ${p.title || ""}
                </div>`
          }

          ${
            p.description
              ? `<div style="margin-top:4px; margin-left:10px; font-size:12px;">
                  ${p.description}
                </div>`
              : ""
          }

          ${
            p.technologies?.length
              ? `<div style="margin-top:4px; margin-left:10px; font-size:11px; color:#555;">
                  <b>Tech:</b> ${p.technologies.join(", ")}
                </div>`
              : ""
          }

        </div>
      `
        )
        .join("")}
    </div>
  </div>
`
    : "";

    // =========================
    // FINAL HTML
    // =========================
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #000;
              font-size: 12px;
              line-height: 1.4;
            }

            a {
              color: #000;
              text-decoration: none;
            }
          </style>
        </head>

        <body>
          ${header}
          ${personalInfo}
          ${summarySection}
          ${experienceSection}
          ${educationSection}
          ${skillsSection}
          ${projectsSection}
        </body>
      </html>
    `;

    // =========================
    // PUPPETEER
    // =========================
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "PDF generation failed" }),
      { status: 500 }
    );
  }
}