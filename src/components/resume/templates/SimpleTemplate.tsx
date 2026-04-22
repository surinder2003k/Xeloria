// SimpleTemplate.tsx
// BoldTemplate.tsx
// ElegantTemplate.tsx
// ProfessionalTemplate.tsx

import { ResumeData } from "@/lib/store";

export const SimpleTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white p-10 shadow-lg min-h-[1122px] w-[794px] text-slate-800 border border-slate-200">
    <h1 className="text-2xl font-bold border-b-2 border-slate-800 pb-2 mb-4">{data.personalInfo.fullName}</h1>
    <p className="text-sm mb-6">{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}</p>
    
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-bold uppercase border-b border-slate-200 mb-2">Summary</h2>
        <p className="text-sm">{data.summary}</p>
      </section>
      <section>
        <h2 className="text-lg font-bold uppercase border-b border-slate-200 mb-2">Experience</h2>
        {data.experience.map((e, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between font-bold text-sm">
              <span>{e.position} - {e.company}</span>
              <span>{e.startDate} - {e.current ? "Present" : e.endDate}</span>
            </div>
            <p className="text-sm whitespace-pre-wrap mt-1">{e.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-lg font-bold uppercase border-b border-slate-200 mb-2">Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-2 text-sm flex justify-between">
            <span>{edu.degree} from {edu.school}</span>
            <span>{edu.endDate}</span>
          </div>
        ))}
      </section>
    </div>
  </div>
);

export const BoldTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white shadow-lg min-h-[1122px] w-[794px] text-slate-900 border border-slate-200">
    <div className="bg-indigo-600 text-white p-12">
      <h1 className="text-5xl font-black tracking-tighter uppercase">{data.personalInfo.fullName}</h1>
      <p className="text-xl font-bold opacity-80 mt-2 uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
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
          <h2 className="text-xl font-black uppercase mb-6 tracking-tighter">Work History</h2>
          <div className="space-y-8">
            {data.experience.map((e, i) => (
              <div key={i}>
                <h3 className="text-lg font-black">{e.position}</h3>
                <p className="text-sm font-bold text-indigo-600 uppercase mb-2">{e.company} / {e.startDate} - {e.endDate}</p>
                <p className="text-sm text-slate-600">{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);
