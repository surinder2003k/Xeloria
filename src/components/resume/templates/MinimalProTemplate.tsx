import { ResumeData } from "@/lib/store";
import { Mail, Phone, MapPin, Globe, ArrowRight } from "lucide-react";

export const MinimalProTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-white shadow-2xl min-h-[1122px] w-[794px] text-[#1a1a1a] p-16 font-sans border border-slate-100">
      {/* Top Header */}
      <header className="flex justify-between items-end mb-20">
        <div className="max-w-[70%]">
          <h1 className="text-6xl font-black tracking-tight leading-[0.9] text-black italic">
            {data.personalInfo.fullName || "YOUR NAME"}
          </h1>
          <p className="text-lg font-bold text-indigo-600 mt-6 tracking-widest uppercase">
            {data.personalInfo.jobTitle || "PROFESSIONAL"}
          </p>
        </div>
        {data.personalInfo.avatar && (
          <div className="flex-shrink-0">
            <img 
              src={data.personalInfo.avatar} 
              alt={data.personalInfo.fullName} 
              className="w-32 h-32 object-cover rounded-none grayscale"
            />
          </div>
        )}
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-16">
        {/* Left Column: Info */}
        <div className="col-span-4 space-y-12">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-300">Contact</h2>
            <div className="space-y-4 text-xs font-bold leading-relaxed">
              {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
              {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
              {data.personalInfo.linkedin && <p className="text-indigo-600">linkedin.com/in/user</p>}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-300">Expertise</h2>
            <div className="flex flex-col gap-3 font-bold text-xs">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {data.education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-300">Education</h2>
              <div className="space-y-6">
                {data.education.map((edu, i) => (
                  <div key={i} className="text-xs space-y-1">
                    <p className="font-black text-black">{edu.degree}</p>
                    <p className="font-bold text-slate-400">{edu.school}</p>
                    <p className="text-[10px] font-bold text-indigo-600 italic mt-1">{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Main */}
        <div className="col-span-8 space-y-16">
          {data.summary && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-300 italic">Statement</h2>
              <p className="text-xl font-medium tracking-tight leading-snug text-slate-800">
                {data.summary}
              </p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-slate-300 italic">Experience</h2>
              <div className="space-y-16">
                {data.experience.map((exp, i) => (
                  <div key={i} className="group relative">
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="text-2xl font-black italic">{exp.position}</h3>
                      <span className="text-[10px] font-black text-indigo-600">{exp.startDate} / {exp.current ? "NOW" : exp.endDate}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-0.5 w-10 bg-indigo-600" />
                      <p className="text-sm font-black uppercase tracking-widest text-slate-400">{exp.company}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-300">
        <span>Generated by Xeloria</span>
        <span>Portfolio: {data.personalInfo.fullName?.toLowerCase().replace(/\s+/g, '')}.summitcv.io</span>
      </footer>
    </div>
  );
};
