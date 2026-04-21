import { ResumeData } from "@/lib/store";
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Award, Cpu } from "lucide-react";

export const EliteModernTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-[#fcfdfd] min-h-[1122px] w-[794px] text-slate-800 font-sans shadow-2xl relative overflow-hidden flex flex-col">
      {/* Premium Header */}
      <header className="bg-[#0f172a] text-white pt-14 pb-12 px-12 relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute -right-20 top-0 w-64 h-64 bg-[#d4af37] blur-[100px] opacity-20 rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex justify-between items-center">
          <div className="max-w-[75%]">
            <h1 className="text-[3.5rem] font-black tracking-tighter text-white leading-[1.1] mb-2 uppercase">
              {data.personalInfo.fullName || "YOUR NAME"}
            </h1>
            <p className="text-xl text-[#d4af37] font-semibold tracking-widest uppercase flex items-center gap-4">
               {data.personalInfo.jobTitle || "EXECUTIVE PROFESSIONAL"}
               <span className="w-16 h-[2px] bg-[#d4af37]"></span>
            </p>
          </div>
          
          {data.personalInfo.avatar && (
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-0 border-2 border-[#d4af37] rotate-3 rounded-lg transform scale-105"></div>
              <img 
                src={data.personalInfo.avatar} 
                alt={data.personalInfo.fullName} 
                className="w-28 h-28 rounded-lg object-cover relative z-10 border-4 border-[#0f172a] shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-[32%] bg-[#1e293b] text-slate-300 p-10 flex flex-col gap-10">
          <div className="space-y-4">
            <h2 className="text-[#d4af37] text-xs font-black tracking-[0.2em] uppercase border-b border-slate-600/50 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Contact
            </h2>
            <div className="space-y-4 text-xs font-semibold tracking-wide">
              {data.personalInfo.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" /> 
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" /> 
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" /> 
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-[#d4af37] text-xs font-black tracking-[0.2em] uppercase border-b border-slate-600/50 pb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Expertise
              </h2>
              <div className="space-y-3">
                {data.skills.map((skill, i) => (
                  <div key={i} className="flex justify-between items-center gap-2">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-200">{skill}</span>
                    <div className="h-1 flex-1 bg-slate-700/50 ml-2 rounded-full overflow-hidden">
                      <div className="h-full bg-[#d4af37]" style={{ width: `${80 + (Math.random() * 20)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
             <div className="space-y-6">
               <h2 className="text-[#d4af37] text-xs font-black tracking-[0.2em] uppercase border-b border-slate-600/50 pb-2 flex items-center gap-2">
                 <GraduationCap className="w-4 h-4" /> Education
               </h2>
               <div className="space-y-5">
                 {data.education.map((edu, i) => (
                   <div key={i} className="relative pl-4 border-l border-slate-600">
                     <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#d4af37]"></div>
                     <p className="text-[11px] font-black text-white uppercase leading-tight mb-1">{edu.degree}</p>
                     <p className="text-[10px] text-slate-400 font-bold tracking-wider">{edu.school}</p>
                     <p className="text-[9px] text-[#d4af37] mt-1 font-semibold">{edu.startDate} – {edu.endDate}</p>
                   </div>
                 ))}
               </div>
             </div>
          )}
        </aside>

        {/* Main Column */}
        <main className="w-[68%] bg-white p-10 pt-12 flex flex-col gap-10 border-l border-slate-200">
          
          {data.summary && (
            <section className="relative">
              <h2 className="text-xl font-black text-[#0f172a] uppercase tracking-wider mb-4 flex items-center gap-3">
                Profile
                <div className="h-[2px] flex-1 bg-slate-100"></div>
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 font-medium whitespace-pre-wrap text-justify">
                {data.summary}
              </p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-[#0f172a] uppercase tracking-wider mb-8 flex items-center gap-3">
                Experience
                <div className="h-[2px] flex-1 bg-slate-100"></div>
              </h2>
              <div className="space-y-8">
                {data.experience.map((exp, i) => (
                  <div key={i} className="group relative">
                    <div className="flex justify-between items-end mb-1">
                      <h3 className="font-black text-lg text-[#0f172a] uppercase tracking-wide group-hover:text-[#d4af37] transition-colors">{exp.position}</h3>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-sm uppercase tracking-widest whitespace-nowrap">
                        {exp.startDate} – {exp.current ? "PRESENT" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#d4af37] mb-3 uppercase tracking-widest flex items-center gap-2">
                       {exp.company}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap mt-2 pl-4 border-l-2 border-[#f1f5f9] group-hover:border-[#d4af37]/30 transition-colors">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
               <h2 className="text-xl font-black text-[#0f172a] uppercase tracking-wider mb-6 flex items-center gap-3">
                Key Initiatives
                <div className="h-[2px] flex-1 bg-slate-100"></div>
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {data.projects.map((proj, i) => (
                  <div key={i} className="p-5 border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#d4af37]/50 hover:shadow-lg hover:shadow-[#d4af37]/5 transition-all">
                    <h3 className="font-black text-slate-900 uppercase text-sm tracking-wide mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#d4af37]" /> {proj.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
};
