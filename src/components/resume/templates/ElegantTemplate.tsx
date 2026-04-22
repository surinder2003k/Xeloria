import { ResumeData } from "@/lib/store";

export const ElegantTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white p-12 shadow-lg min-h-[1122px] w-[794px] text-slate-700 border border-slate-100 font-serif">
    <header className="text-center mb-12">
      <h1 className="text-4xl font-light tracking-[0.15em] uppercase text-slate-800 mb-2">{data.personalInfo.fullName}</h1>
      <div className="h-0.5 w-16 bg-slate-300 mx-auto mb-4" />
      <p className="text-sm font-medium tracking-widest uppercase text-slate-400">{data.personalInfo.jobTitle}</p>
      <p className="text-[10px] mt-4 tracking-tighter text-slate-400">
        {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}
      </p>
    </header>

    <div className="space-y-12">
      {data.summary && (
        <section className="text-center max-w-xl mx-auto">
          <p className="text-sm leading-7 italic opacity-80">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 text-center mb-8">Professional Background</h2>
          <div className="space-y-10">
            {data.experience.map((e, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">{e.position}</h3>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{e.startDate} — {e.endDate}</span>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-3">{e.company}</p>
                <p className="text-xs leading-6 text-slate-500 font-sans">{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-16 border-t border-slate-100 pt-12">
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="text-xs font-bold uppercase tracking-tight text-slate-800">{edu.degree}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1">{edu.school}</p>
                  <p className="text-[9px] font-bold text-slate-300 mt-1">{edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Expertise</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="mb-3">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">{skill.category}</p>
                  <p className="text-[10px] font-bold uppercase tracking-tight text-slate-500">{skill.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
);

export const BoldTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white shadow-lg min-h-[1122px] w-[794px] text-slate-900 border border-slate-200">
    <div className="bg-indigo-600 text-white p-12">
      <h1 className="text-5xl font-black tracking-tighter uppercase">{data.personalInfo.fullName || "Your Name"}</h1>
      <p className="text-xl font-bold opacity-80 mt-2 uppercase tracking-widest">{data.personalInfo.jobTitle || "Job Title"}</p>
    </div>
    <div className="p-12 grid grid-cols-3 gap-12">
      <div className="col-span-1 space-y-8">
        <section>
          <h2 className="text-xs font-black uppercase text-indigo-600 mb-4 tracking-widest">Contact</h2>
          <div className="text-sm space-y-2 font-bold">
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.phone}</p>
            <p>{data.personalInfo.location}</p>
          </div>
        </section>
        <section>
          <h2 className="text-xs font-black uppercase text-indigo-600 mb-4 tracking-widest">Skills</h2>
          <div className="space-y-4">
            {data.skills.map((skill, i) => (
              <div key={i}>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{skill.category}</p>
                <div className="flex flex-col gap-1 font-bold text-sm">
                  {skill.items.map((item, j) => (
                    <span key={j}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-10">
        <section>
          <p className="text-lg font-medium leading-relaxed text-slate-700 italic border-l-4 border-indigo-600 pl-6">{data.summary}</p>
        </section>
        <section>
          <h2 className="text-xl font-black uppercase mb-6 tracking-tighter text-slate-800">Work History</h2>
          <div className="space-y-8">
            {data.experience.map((e, i) => (
              <div key={i}>
                <h3 className="text-lg font-black">{e.position}</h3>
                <p className="text-sm font-bold text-indigo-600 uppercase mb-2">{e.company} / {e.startDate} - {e.endDate}</p>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);
