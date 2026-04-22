import { ResumeData } from "@/lib/store";

export const EliteMinimalTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-[#FAF9F6] min-h-[1122px] w-[794px] text-[#1c1c1c] font-sans shadow-2xl relative overflow-hidden flex flex-col px-16 py-16 box-border font-serif">
      {/* Ultra-minimal Header */}
      <header className="mb-14 flex flex-col items-center text-center">
        <h1 className="text-[4rem] font-medium tracking-normal text-[#111] leading-none mb-4 lowercase" style={{ fontVariant: 'small-caps' }}>
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-[#555] font-sans tracking-[0.3em] uppercase mb-8">
           {data.personalInfo.jobTitle || "Professional Title"}
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-sans text-[#666] tracking-widest uppercase">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 space-y-12">
        {/* Profile */}
        {data.summary && (
          <section className="text-center max-w-[85%] mx-auto">
            <p className="text-[13px] leading-[2] text-[#444] text-center font-sans">
              {data.summary}
            </p>
          </section>
        )}

        <div className="w-8 h-[1px] bg-[#ddd] mx-auto my-12 hidden"></div>

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <div className="flex items-center gap-6 mb-8">
               <h2 className="text-[11px] font-sans tracking-[0.4em] uppercase text-[#888] whitespace-nowrap">Experience</h2>
               <div className="h-[1px] flex-1 bg-[#eaeaea]"></div>
            </div>
            
            <div className="space-y-8">
              {data.experience.map((exp, i) => (
                <div key={i} className="grid grid-cols-[140px,1fr] gap-8 items-baseline">
                  <div className="text-[10px] font-sans text-[#777] uppercase tracking-widest bg-transparent">
                    {exp.startDate} <span className="text-[#ccc] mx-1">—</span> {exp.current ? "Present" : exp.endDate}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-base font-semibold text-[#111] tracking-wide">{exp.position}</h3>
                      <span className="text-[11px] font-sans text-[#888] uppercase tracking-wider">{exp.company}</span>
                    </div>
                    <p className="text-[12px] leading-[1.8] text-[#555] font-sans">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills Split */}
        <div className="grid grid-cols-2 gap-16 pt-6">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <div className="mb-6">
                 <h2 className="text-[11px] font-sans tracking-[0.4em] uppercase text-[#888]">Education</h2>
              </div>
              <div className="space-y-6">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold text-[#111] mb-1">{edu.degree}</h3>
                    <p className="text-[11px] font-sans text-[#666] uppercase tracking-wider mb-1">{edu.school}</p>
                    <p className="text-[10px] font-sans text-[#999] tracking-widest">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <div className="mb-6">
                 <h2 className="text-[11px] font-sans tracking-[0.4em] uppercase text-[#888]">Expertise</h2>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {data.skills.map((skill, i) => (
                  <div key={i} className="w-full">
                    <p className="text-[9px] font-sans text-[#aaa] uppercase tracking-[0.2em] mb-2">{skill.category}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {skill.items.map((item, j) => (
                        <span key={j} className="text-[11px] font-sans text-[#444] capitalize">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {data.projects.length > 0 && (
          <section className="pt-6">
             <div className="flex items-center gap-6 mb-8">
               <h2 className="text-[11px] font-sans tracking-[0.4em] uppercase text-[#888] whitespace-nowrap">Selected Works</h2>
               <div className="h-[1px] flex-1 bg-[#eaeaea]"></div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-[#111] mb-2">{proj.name}</h3>
                  <p className="text-[11px] leading-[1.8] text-[#555] font-sans mb-3">
                    {proj.description}
                  </p>
                  <p className="text-[9px] font-sans text-[#888] tracking-widest uppercase">
                    {proj.technologies.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};
