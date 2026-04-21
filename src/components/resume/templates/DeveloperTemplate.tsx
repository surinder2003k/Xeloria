import { ResumeData } from "@/lib/store";
import { Github, Code2, Cpu, Terminal } from "lucide-react";

export const DeveloperTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-slate-50 p-8 shadow-lg min-h-[1122px] w-[794px] text-slate-800 border border-slate-200 font-mono">
      <header className="bg-slate-900 text-white p-6 rounded-t-lg border-b-4 border-indigo-500">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter text-indigo-400">
              <span className="text-white">&lt;</span>
              {data.personalInfo.fullName || "YourName"}
              <span className="text-white"> /&gt;</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1"># {data.personalInfo.jobTitle || "Full Stack Developer"}</p>
          </div>
          <div className="text-right text-[10px] space-y-1">
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.website}</p>
            <p>{data.personalInfo.location}</p>
          </div>
        </div>
      </header>

      <div className="bg-white p-8 rounded-b-lg border border-t-0 border-slate-200 grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-8">
          {data.summary && (
            <section>
              <div className="flex items-center gap-2 mb-3 text-indigo-600">
                <Terminal className="h-4 w-4" />
                <h2 className="text-xs font-bold uppercase tracking-widest">About Me</h2>
              </div>
              <p className="text-xs leading-5 text-slate-600 border-l-2 border-slate-100 pl-4">{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-indigo-600">
                <Cpu className="h-4 w-4" />
                <h2 className="text-xs font-bold uppercase tracking-widest">Experience.log</h2>
              </div>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i} className="relative pl-4 border-l-2 border-indigo-100">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-slate-900">{exp.position}</h3>
                      <span className="text-[10px] font-bold text-slate-400">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                    </div>
                    <p className="text-xs text-indigo-600 font-bold mb-2">@ {exp.company}</p>
                    <p className="text-[11px] leading-5 text-slate-600 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-indigo-600">
                <Github className="h-4 w-4" />
                <h2 className="text-xs font-bold uppercase tracking-widest">Projects.js</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {data.projects.map((proj, i) => (
                  <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                       {proj.name} 
                       {proj.link && <span className="text-[10px] font-normal text-indigo-500 underline">link</span>}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-8">
          {data.skills.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-indigo-600">
                <Code2 className="h-4 w-4" />
                <h2 className="text-xs font-bold uppercase tracking-widest">Tech Stack</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 bg-slate-900 text-slate-200 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-100 pb-2">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold text-slate-800">{edu.degree}</p>
                    <p className="text-[10px] text-slate-500">{edu.school}</p>
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
