import { launchBrowser } from "@/lib/browser";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const p = data.personal ?? {};

    const fullName =
      `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`.trim() ||
      "Anonymous";

    // ================= HEADER =================
    const header = `
      <div style="text-align:center; margin-bottom:18px;">
        <div style="font-size:22px; font-weight:bold;">${fullName}</div>
        ${p.role ? `<div style="font-size:13px; color:#333;">${p.role}</div>` : ""}
      </div>
    `;

    // ================= PERSONAL INFO =================
    const personalInfoItems = [p.email, p.phone, p.address].filter(Boolean);

    const personalInfo = `
      <div style="text-align:center; font-size:12px; margin-bottom:18px;">
        ${personalInfoItems.join(" • ")}
      </div>
    `;

    // ================= SUMMARY =================
    const summarySection = p.summary
      ? `
      <div style="margin-bottom:14px; padding-left:14px;">
        <div style="font-weight:bold; border-bottom:1px solid #000;">Professional Summary</div>
        <div style="padding-left:8px;">${p.summary}</div>
      </div>
    `
      : "";

    // ================= EXPERIENCE =================
    const experienceSection =
      data.experience?.length > 0
        ? `
      <div style="margin-bottom:14px; padding-left:14px;">
        <div style="font-weight:bold; border-bottom:1px solid #000;">Experience</div>

        ${data.experience
          .map(
            (e: any) => `
            <div style="margin-bottom:12px; padding-left:10px;">
              <div style="font-weight:bold;">${e.company || ""}</div>

              <div style="display:flex; justify-content:space-between;">
                <span>${e.role || ""}</span>
                <span style="color:#555;">
                  ${e.startDate || ""} - ${e.currentlyWorking ? "Present" : e.endDate || ""}
                </span>
              </div>

              ${e.location ? `<div style="font-size:11px;">${e.location}</div>` : ""}

              ${
                e.bullets?.length
                  ? `<ul style="margin-left:18px;">
                      ${e.bullets.map((b: string) => `<li>${b}</li>`).join("")}
                    </ul>`
                  : ""
              }
            </div>
          `
          )
          .join("")}
      </div>
    `
        : "";

    // ================= EDUCATION =================
    const educationSection =
      data.education?.length > 0
        ? `
      <div style="margin-bottom:14px; padding-left:14px;">
        <div style="font-weight:bold; border-bottom:1px solid #000;">Education</div>

        ${data.education
          .map(
            (e: any) => `
            <div style="margin-bottom:12px; padding-left:10px;">
              <div style="display:flex; justify-content:space-between;">
                <b>${e.school || ""}</b>
                <span style="font-size:11px;">${e.startYear} - ${e.endYear}</span>
              </div>

              <div style="display:flex; justify-content:space-between;">
                <span>${e.degree} ${e.field ? `- ${e.field}` : ""}</span>
                <span style="font-size:11px;">${e.achievements?.join(" • ") || ""}</span>
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    `
        : "";

    // ================= SKILLS =================
    const skillsSection =
      data.skills?.length > 0
        ? `
      <div style="margin-bottom:14px; padding-left:14px;">
        <div style="font-weight:bold; border-bottom:1px solid #000;">Skills</div>

        ${data.skills
          .map(
            (s: any) => `
            <div style="padding-left:10px; margin-top:6px;">
              <b>${s.category}</b>: ${s.skills?.join(", ")}
            </div>
          `
          )
          .join("")}
      </div>
    `
        : "";

    // ================= PROJECTS =================
    const projectsSection =
      data.projects?.length > 0
        ? `
      <div style="margin-bottom:14px; padding-left:14px;">
        <div style="font-weight:bold; border-bottom:1px solid #000;">Projects</div>

        ${data.projects
          .map(
            (p: any) => `
            <div style="margin-bottom:12px; padding-left:10px;">
              <div style="font-weight:bold;">${p.title}</div>

              <div style="padding-left:8px;">${p.description || ""}</div>

              <div style="font-size:11px; padding-left:8px;">
                ${p.technologies?.join(", ") || ""}
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    `
        : "";

    // ================= FINAL HTML =================
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial;
              padding: 40px;
              font-size: 12px;
              line-height: 1.4;
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

    // ========================
    // BROWSER (FIXED)
    // ========================
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "load" });

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
     console.error("PDF ERROR:");
  console.error(err);
  console.error(err?.stack);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}