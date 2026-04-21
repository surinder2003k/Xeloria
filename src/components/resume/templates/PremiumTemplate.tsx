import { ResumeData } from "@/lib/store";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export const PremiumTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white shadow-lg min-h-[1122px] w-[794px] text-slate-800 border border-slate-200">
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[30%] bg-[#242424] text-white p-8">
        <div className="h-40 w-full bg-slate-700 mb-8 rounded" />
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-white/10 pb-1">Contact</h2>
            <div className="space-y-3 text-[10px]">
              <p className="flex items-center gap-2"><Mail className="h-3 w-3" /> {data.personalInfo.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-3 w-3" /> {data.personalInfo.phone}</p>
              <p className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {data.personalInfo.location}</p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-white/10 pb-1">Expertise</h2>
            <div className="flex flex-col gap-2 text-[10px]">
              {data.skills.map((s, i) => <span key={i} className="bg-white/5 p-2 rounded">{s}</span>)}
            </div>
          </section>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{data.personalInfo.fullName}</h1>
          <p className="text-lg text-indigo-600 font-semibold mt-1 uppercase tracking-wide">{data.personalInfo.jobTitle}</p>
        </header>

        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-400 mb-4">About Me</h2>
          <p className="text-sm leading-6 text-slate-600 italic font-medium">{data.summary}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-400 mb-6">Work Experience</h2>
          <div className="space-y-8">
            {data.experience.map((e, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-slate-900">{e.position}</h3>
                  <span className="text-xs font-bold text-slate-400">{e.startDate} - {e.endDate}</span>
                </div>
                <p className="text-sm font-bold text-indigo-600 mb-2 uppercase">{e.company}</p>
                <p className="text-sm text-slate-600">{e.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-[.2em] text-slate-400 mb-6">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between font-bold text-sm text-slate-900">
                  <span>{edu.degree}</span>
                  <span>{edu.endDate}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
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
          <div className="flex flex-col gap-2 font-bold text-sm">
            {data.skills.map((s, i) => <span key={i}>{s}</span>)}
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
