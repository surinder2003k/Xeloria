import { ResumeData } from "@/lib/store";

export const StandardPDFTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-white p-12 shadow-lg min-h-[1122px] w-[794px] text-black font-sans border border-slate-100 mx-auto overflow-hidden">
      <header className="text-center mb-8 border-b-2 border-slate-100 pb-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-3 underline-offset-8">{data.personalInfo.fullName || "Your Name"}</h1>
        <p className="text-xl text-slate-700 font-medium mb-4">{data.personalInfo.location || "Location"}</p>
        <div className="text-sm text-slate-500 flex flex-wrap justify-center items-center gap-x-2">
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.phone && (data.personalInfo.email || data.personalInfo.website || data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.twitter) && <span>|</span>}
          
          {data.personalInfo.email && (
            <>
              <a href={`mailto:${data.personalInfo.email}`} className="hover:text-black">{data.personalInfo.email}</a>
              {(data.personalInfo.website || data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.twitter) && <span>|</span>}
            </>
          )}

          {data.personalInfo.website && (
            <>
              <a href={data.personalInfo.website.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-black">Website</a>
              {(data.personalInfo.linkedin || data.personalInfo.github || data.personalInfo.twitter) && <span>|</span>}
            </>
          )}

          {data.personalInfo.linkedin && (
            <>
              <a href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-black">LinkedIn</a>
              {(data.personalInfo.github || data.personalInfo.twitter) && <span>|</span>}
            </>
          )}

          {data.personalInfo.github && (
            <>
              <a href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-black">GitHub</a>
              {data.personalInfo.twitter && <span>|</span>}
            </>
          )}

          {data.personalInfo.twitter && (
            <a href={data.personalInfo.twitter.startsWith('http') ? data.personalInfo.twitter : `https://${data.personalInfo.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-black">Twitter</a>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3 border-b-2 border-slate-100 pb-1 uppercase tracking-wide">Professional Summary</h2>
          <p className="text-[13px] leading-6 text-slate-800 text-justify">{data.summary}</p>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-1 uppercase tracking-wide">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="block overflow-hidden">
                <div className="mb-1">
                  <span className="text-[15px] font-bold text-slate-900 float-left">{edu.school}</span>
                  <span className="text-slate-500 font-medium text-sm float-right">{edu.startDate} - {edu.endDate}</span>
                  <div className="clear-both"></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm font-medium text-slate-700">{edu.degree}</p>
                  {edu.description && <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{edu.description}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Adding Certificates if any (mapped to a custom field or list) */}
      
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-1 uppercase tracking-wide">Internship & Training</h2>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="block overflow-hidden">
                <div className="mb-1">
                  <span className="font-bold text-[15px] text-slate-900 float-left">{exp.position}</span>
                  <span className="text-slate-500 text-sm font-medium float-right">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                  <div className="clear-both"></div>
                </div>
                <p className="text-sm font-bold text-indigo-600 mb-2">{exp.company}</p>
                <ul className="list-disc ml-5 space-y-2">
                  {(exp.description || "").split('\n').map((line, idx) => (
                    <li key={idx} className="text-[13px] text-slate-700 leading-relaxed">{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {(data.skills && data.skills.length > 0) && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3 border-b-2 border-slate-100 pb-1 uppercase tracking-wide">Technical Skills</h2>
          <div className="space-y-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-[13px] text-slate-700 leading-relaxed">
                <span className="font-bold">{skill.category}:</span> {skill.items.join(", ")}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-1 uppercase tracking-wide">Projects</h2>
          <div className="space-y-5">
            {data.projects.map((proj, i) => (
              <div key={i} className="block overflow-hidden mb-6">
                <div className="mb-1">
                  <span className="font-bold text-[15px] text-slate-900 float-left">{proj.name}</span>
                  {proj.link && <span className="text-[10px] font-bold text-slate-400 font-mono float-right truncate max-w-[200px]">{proj.link.replace(/^https?:\/\//, '')}</span>}
                  <div className="clear-both"></div>
                </div>
                <p className="text-[13px] text-slate-700 leading-relaxed mb-1.5">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.technologies.map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-bold">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
