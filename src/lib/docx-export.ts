import { ResumeData } from "./store";

export const downloadAsDocx = (data: ResumeData, templateId: string = "modern") => {
  console.log("Exporting DOCX with templateId:", templateId);

  const safe = (val: any, fallback: string = "") => (val === undefined || val === null || val === "undefined" ? fallback : val);

  // PRECISE MAPPING to match the UI templates exactly
  const getStyles = (tid: string) => {
    switch (tid) {
      case "standard_pdf":
      case "minimal":
        return {
          font: "'Calibri', 'Arial', sans-serif",
          primaryColor: "#0f172a", // Dark Slate
          textAlign: "center" as const,
          sidebar: false,
          accentColor: "#475569", // Slate 600
          nameSize: "28pt",
          sectionBorder: "2px solid #f1f5f9"
        };
      case "classic":
      case "elite_minimal":
        return {
          font: "'Times New Roman', serif",
          primaryColor: "#111111",
          textAlign: "center" as const,
          sidebar: false,
          accentColor: "#666666",
          nameSize: "30pt",
          sectionBorder: "1px solid #111111"
        };
      default:
        return {
          font: "'Calibri', 'Arial', sans-serif",
          primaryColor: "#2563eb",
          textAlign: "left" as const,
          sidebar: false,
          accentColor: "#2563eb",
          nameSize: "28pt",
          sectionBorder: "2px solid #e2e8f0"
        };
    }
  };

  const s = getStyles(templateId);

  const contactText = [
    safe(data.personalInfo.email),
    safe(data.personalInfo.phone),
    safe(data.personalInfo.location),
    data.personalInfo.linkedin ? `LinkedIn: ${data.personalInfo.linkedin}` : "",
    data.personalInfo.github ? `GitHub: ${data.personalInfo.github}` : ""
  ].filter(Boolean).join(" | ");

  const header = `
    <div style="text-align: ${s.textAlign || 'center'}; margin-bottom: 25px; border-bottom: 3px solid ${s.primaryColor}; padding-bottom: 15px;">
      <div style="font-size: ${s.nameSize}; font-weight: bold; color: ${s.primaryColor}; line-height: 1.1;">${safe(data.personalInfo.fullName, "Your Name").toUpperCase()}</div>
      <div style="font-size: 14pt; color: ${s.accentColor}; font-weight: bold; margin-top: 5px; margin-bottom: 8px;">${safe(data.personalInfo.jobTitle).toUpperCase()}</div>
      <div style="font-size: 10pt; color: #444444;">${contactText}</div>
    </div>
  `;

  const sectionHeader = (title: string) => `
    <div style="font-size: 13pt; font-weight: bold; color: ${s.primaryColor}; margin-top: 20px; margin-bottom: 8px; border-bottom: 1px solid #cccccc; padding-bottom: 2px; text-transform: uppercase;">
      ${title}
    </div>
  `;

  const experienceList = data.experience.map(exp => `
    <div style="margin-bottom: 15px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-weight: bold; font-size: 11pt;">${safe(exp.position)} at ${safe(exp.company)}</td>
          <td style="text-align: right; font-size: 10pt; color: #666666;">${safe(exp.startDate)} — ${safe(exp.endDate, "Present")}</td>
        </tr>
      </table>
      <div style="font-size: 10pt; line-height: 1.4; color: #333333;">${safe(exp.description)}</div>
    </div>
  `).join("");

  const educationList = data.education.map(edu => `
    <div style="margin-bottom: 12px;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-weight: bold; font-size: 11pt;">${safe(edu.degree)}</td>
          <td style="text-align: right; font-size: 10pt; color: #666666;">${safe(edu.startDate)} — ${safe(edu.endDate)}</td>
        </tr>
      </table>
      <div style="font-size: 10pt; color: #444444;">${safe(edu.school)}</div>
    </div>
  `).join("");

  const skillsList = data.skills.map(skill => `
    <div style="margin-bottom: 10px;">
      <div style="font-weight: bold; font-size: 11pt; color: ${s.primaryColor};">${safe(skill.category)}</div>
      <div style="font-size: 10pt; color: #333333;">${skill.items.join(" • ")}</div>
    </div>
  `).join("");
 
  const projectsList = data.projects.map(proj => `
    <div style="margin-bottom: 12px;">
      <div style="font-weight: bold; font-size: 11pt; color: ${s.primaryColor};">${safe(proj.name)}</div>
      ${proj.link ? `<div style="font-size: 9pt; color: #666666; margin-bottom: 3px;">${safe(proj.link)}</div>` : ""}
      <div style="font-size: 10pt; line-height: 1.4; color: #444444;">${safe(proj.description)}</div>
      ${proj.technologies && proj.technologies.length > 0 ? `
        <div style="font-size: 9pt; font-weight: bold; color: ${s.accentColor}; margin-top: 4px;">
          Technologies: ${proj.technologies.join(", ")}
        </div>
      ` : ""}
    </div>
  `).join("");

  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <style>
        body { 
          font-family: 'Cambria', 'Georgia', serif; 
          line-height: 1.5;
        }
        @page {
          margin: 1in;
        }
      </style>
    </head>
    <body style="padding: 40px; background-color: #ffffff;">
      ${header}
      
      ${data.summary ? `
        ${sectionHeader("Professional Summary")}
        <div style="font-size: 10.5pt; text-align: justify;">${safe(data.summary)}</div>
      ` : ""}

      ${data.experience.length > 0 ? `
        ${sectionHeader("Experience")}
        ${experienceList}
      ` : ""}

      ${data.education.length > 0 ? `
        ${sectionHeader("Education")}
        ${educationList}
      ` : ""}

      ${data.skills.length > 0 ? `
        ${sectionHeader("Skills & Expertise")}
        ${skillsList}
      ` : ""}

      ${data.projects.length > 0 ? `
        ${sectionHeader("Projects")}
        ${projectsList}
      ` : ""}
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", content], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safe(data.personalInfo.fullName, "Resume")}_Professional.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
