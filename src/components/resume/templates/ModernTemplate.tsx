import { ResumeData } from "@/lib/store";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

export const ModernTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-white p-12 shadow-2xl min-h-[1122px] w-[794px] text-slate-800 font-sans border border-slate-100 relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
      
      <header className="relative mb-10 flex justify-between items-start">
        <div className="max-w-[70%]">
          <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-none">
            {data.personalInfo.fullName || "YOUR NAME"}
          </h1>
          <p className="text-xl text-indigo-600 font-bold mt-4 uppercase tracking-[0.2em]">
            {data.personalInfo.jobTitle || "PROFESSIONAL"}
          </p>
          
          <div className="flex flex-wrap gap-y-2 gap-x-4 mt-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <Mail className="h-3.5 w-3.5" /> {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <Phone className="h-3.5 w-3.5" /> {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                <MapPin className="h-3.5 w-3.5" /> {data.personalInfo.location}
              </div>
            )}
          </div>
        </div>
        
        {data.personalInfo.avatar && (
          <div className="flex-shrink-0 z-10">
            <img 
              src={data.personalInfo.avatar} 
              alt={data.personalInfo.fullName} 
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl shadow-indigo-100 rotate-2"
            />
          </div>
        )}
      </header>
      
      <main className="relative space-y-10">
        {data.summary && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Executive Summary</h2>
              <div className="h-px flex-1 bg-indigo-50" />
            </div>
            <p className="text-sm leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">{data.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-8 space-y-10">
            {data.experience.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Professional Experience</h2>
                  <div className="h-px flex-1 bg-indigo-50" />
                </div>
                <div className="space-y-8">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-black text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{exp.position}</h3>
                        <span className="text-[10px] font-black text-slate-300 group-hover:text-indigo-400">{exp.startDate} — {exp.current ? "PRESENT" : exp.endDate}</span>
                      </div>
                      <p className="text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">{exp.company}</p>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.projects.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Selected Projects</h2>
                  <div className="h-px flex-1 bg-indigo-50" />
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {data.projects.map((proj, i) => (
                    <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-indigo-50/50 hover:border-indigo-100 transition-all">
                      <h3 className="font-black text-slate-900">{proj.name}</h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-4 space-y-10">
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-5">Key Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700 font-bold border border-slate-200/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-5">Education</h2>
                <div className="space-y-6">
                  {data.education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-xs font-black text-slate-900 leading-tight">{edu.degree}</p>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase italic opacity-70">{edu.school}</p>
                      <p className="text-[9px] font-bold text-slate-400 mt-1">{edu.startDate} – {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
