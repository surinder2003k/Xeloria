import { ResumeData } from "@/lib/store";

export const MinimalTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-white p-12 shadow-lg min-h-[1122px] w-[794px] text-slate-800 border border-slate-100 flex flex-col gap-10">
      <header>
        <h1 className="text-3xl font-light tracking-[0.2em] uppercase text-slate-900 border-b border-slate-200 pb-4">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex gap-4 text-[10px] uppercase tracking-widest text-slate-400 mt-4 font-semibold">
          <span>{data.personalInfo.jobTitle}</span>
          <span>{data.personalInfo.location}</span>
          <span>{data.personalInfo.email}</span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-4 space-y-8">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4">Contact</h2>
            <div className="space-y-2 text-xs">
              <p className="font-medium text-slate-500">{data.personalInfo.phone}</p>
              {data.personalInfo.website && (
                <p className="font-medium text-slate-500 hover:text-slate-900 transition-colors">
                  <a href={data.personalInfo.website.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer">Website</a>
                </p>
              )}
              {data.personalInfo.linkedin && (
                <p className="font-medium text-slate-500 hover:text-slate-900 transition-colors">
                  <a href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </p>
              )}
              {data.personalInfo.github && (
                <p className="font-medium text-slate-500 hover:text-slate-900 transition-colors">
                  <a href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
                </p>
              )}
              {data.personalInfo.twitter && (
                <p className="font-medium text-slate-500 hover:text-slate-900 transition-colors">
                  <a href={data.personalInfo.twitter.startsWith('http') ? data.personalInfo.twitter : `https://${data.personalInfo.twitter}`} target="_blank" rel="noopener noreferrer">Twitter</a>
                </p>
              )}
            </div>
          </section>

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4">Skills</h2>
              <div className="flex flex-col gap-2">
                {data.skills.map((skill, i) => (
                  <div key={i} className="mb-2">
                    <p className="text-[10px] text-slate-300 font-bold mb-1 uppercase tracking-tighter">{skill.category}</p>
                    <p className="text-xs font-medium text-slate-600">
                      {skill.items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-8 space-y-10">
          {data.summary && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4">Profile</h2>
              <p className="text-sm leading-7 text-slate-600 font-light">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Experience</h2>
              <div className="space-y-8">
                {data.experience.map((exp, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold tracking-tight text-slate-900 uppercase">{exp.position}</h3>
                      <span className="text-[10px] font-bold text-slate-300 italic">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{exp.company}</p>
                    <p className="text-xs leading-6 text-slate-600 font-light whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Education</h2>
              <div className="space-y-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-slate-900 uppercase">{edu.degree}</h3>
                      <span className="text-[10px] font-bold text-slate-300 italic">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
