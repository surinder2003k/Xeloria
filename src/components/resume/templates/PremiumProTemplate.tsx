import { ResumeData } from "@/lib/store";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Award } from "lucide-react";

export const PremiumProTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-white shadow-2xl min-h-[1122px] w-[794px] text-slate-900 flex overflow-hidden font-sans border border-slate-100">
      {/* Accent Bar */}
      <div className="w-2 bg-indigo-600" />
      
      {/* Sidebar */}
      <div className="w-[300px] bg-slate-50 p-10 flex flex-col">
        {data.personalInfo.avatar && (
          <div className="mb-10">
            <img 
              src={data.personalInfo.avatar} 
              alt={data.personalInfo.fullName} 
              className="w-full aspect-square object-cover rounded-2xl shadow-xl grayscale hover:grayscale-0 transition-all duration-500 border-4 border-white"
            />
          </div>
        )}
        
        <div className="space-y-10">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-5 pb-2 border-b-2 border-indigo-100">Contact Details</h2>
            <div className="space-y-4 text-[11px]">
              {data.personalInfo.email && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Email</span>
                  <a href={`mailto:${data.personalInfo.email}`} className="font-bold text-slate-700 hover:text-indigo-600 transition-colors">{data.personalInfo.email}</a>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Phone</span>
                  <p className="font-bold text-slate-700">{data.personalInfo.phone}</p>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Address</span>
                  <p className="font-bold text-slate-700">{data.personalInfo.location}</p>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Website</span>
                  <a href={data.personalInfo.website.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-indigo-600 transition-colors">Portfolio</a>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">LinkedIn</span>
                  <a href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-indigo-600 transition-colors">Profile</a>
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">GitHub</span>
                  <a href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-indigo-600 transition-colors">Repositories</a>
                </div>
              )}
              {data.personalInfo.twitter && (
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Twitter</span>
                  <a href={data.personalInfo.twitter.startsWith('http') ? data.personalInfo.twitter : `https://${data.personalInfo.twitter}`} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-indigo-600 transition-colors">Feed</a>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-5 pb-2 border-b-2 border-indigo-100">Core Expertise</h2>
            <div className="space-y-4">
              {data.skills.map((skill, i) => (
                <div key={i}>
                  <p className="text-[9px] font-black text-slate-400 mb-2 uppercase tracking-widest">{skill.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, j) => (
                      <span key={j} className="text-[10px] bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {data.certifications?.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-5 pb-2 border-b-2 border-indigo-100">Recognition</h2>
              <div className="space-y-4">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-[11px] font-black text-slate-800 leading-tight">{cert.name}</p>
                    <p className="text-[10px] text-indigo-600 font-bold uppercase">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-14 pt-20">
        <header className="mb-14">
          <h1 className="text-5xl font-black text-slate-900 leading-none tracking-tighter">
            {data.personalInfo.fullName?.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? 'text-indigo-600' : ''}>{word} </span>
            ))}
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="h-1px flex-1 bg-slate-100" />
            <p className="text-xl text-slate-400 font-bold uppercase tracking-[0.3em]">{data.personalInfo.jobTitle || "Executive Professional"}</p>
          </div>
        </header>

        <main className="space-y-14">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Globe className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 underline decoration-indigo-200 decoration-4 underline-offset-8">Executive Profile</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">{data.summary}</p>
          </section>

          {data.experience.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-900">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 underline decoration-slate-200 decoration-4 underline-offset-8">Career Trajectory</h2>
              </div>
              <div className="space-y-10 border-l-2 border-slate-100 pl-8 ml-4">
                {data.experience.map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-sm" />
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">{exp.position}</h3>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{exp.startDate} – {exp.current ? "Actual" : exp.endDate}</span>
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{exp.company}</p>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-900">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 underline decoration-slate-200 decoration-4 underline-offset-8">Academic Foundation</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black text-slate-900">{edu.degree}</h3>
                        <p className="text-sm font-bold text-indigo-600 mt-1">{edu.school}</p>
                      </div>
                      <span className="text-[10px] font-black text-slate-400">{edu.startDate} – {edu.endDate}</span>
                    </div>
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
