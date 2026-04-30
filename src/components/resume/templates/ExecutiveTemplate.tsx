import { ResumeData } from "@/lib/store";

export const ExecutiveTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-white p-12 shadow-lg min-h-[1122px] w-[794px] text-[#2d3436] border-t-[12px] border-slate-900 border-x border-b border-slate-200">
      <header className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">{data.personalInfo.fullName || "Your Name"}</h1>
        <p className="text-xl text-slate-500 font-serif italic mt-1">{data.personalInfo.jobTitle || "Executive Professional / Director"}</p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <span>{data.personalInfo.location}</span>
          <a href={`mailto:${data.personalInfo.email}`} className="hover:text-slate-900 transition-colors">{data.personalInfo.email}</a>
          <span>{data.personalInfo.phone}</span>
          {data.personalInfo.website && (
            <a href={data.personalInfo.website.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Website</a>
          )}
          {data.personalInfo.linkedin && (
            <a href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">LinkedIn</a>
          )}
          {data.personalInfo.github && (
            <a href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">GitHub</a>
          )}
          {data.personalInfo.twitter && (
            <a href={data.personalInfo.twitter.startsWith('http') ? data.personalInfo.twitter : `https://${data.personalInfo.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Twitter</a>
          )}
        </div>
      </header>

      <div className="space-y-10">
        {data.summary && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-4 border-b-2 border-slate-900 pb-1 w-fit">Executive Profile</h2>
            <p className="text-sm leading-7 text-slate-600 font-medium whitespace-pre-wrap">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-6 border-b-2 border-slate-900 pb-1 w-fit">Professional Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-base font-bold text-slate-900">{exp.company}</h3>
                    <span className="text-xs font-bold text-slate-400">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-sm font-bold text-indigo-700 italic mb-3">{exp.position}</p>
                  <p className="text-sm leading-6 text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12">
          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-4 border-b-2 border-slate-900 pb-1 w-fit">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-bold text-slate-900">{edu.school}</h3>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-4 border-b-2 border-slate-900 pb-1 w-fit">Core Competencies</h2>
              <ul className="grid grid-cols-1 gap-1 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                {data.skills.map((skill, i) => (
                  <li key={i} className="mb-2">
                    <span className="text-[10px] text-slate-400 block mb-1">{skill.category}</span>
                    <span className="block">• {skill.items.join(", ")}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
