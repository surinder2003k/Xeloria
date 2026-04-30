import { ResumeData } from "@/lib/store";

export const ClassicTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-white p-12 shadow-lg min-h-[1122px] w-[794px] text-black font-serif border border-slate-200">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold border-b border-black pb-2">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex justify-center gap-3 text-sm mt-3">
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.email && <span>• {data.personalInfo.email}</span>}
        </div>
        <div className="flex justify-center gap-3 text-sm mt-1">
          {data.personalInfo.website && (
            <a href={data.personalInfo.website.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
              {data.personalInfo.website}
            </a>
          )}
          {data.personalInfo.linkedin && (
            <a href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
              • LinkedIn
            </a>
          )}
          {data.personalInfo.github && (
            <a href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
              • GitHub
            </a>
          )}
          {data.personalInfo.twitter && (
            <a href={data.personalInfo.twitter.startsWith('http') ? data.personalInfo.twitter : `https://${data.personalInfo.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
              • Twitter
            </a>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-2 uppercase italic">Professional Summary</h2>
          <p className="text-sm leading-6 italic text-slate-800">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase italic">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between font-bold">
                  <span>{exp.company}</span>
                  <span>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <div className="italic text-sm mb-2">{exp.position}</div>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {exp.description.split('\n').map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase italic">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between font-bold">
                  <span>{edu.school}</span>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className="text-sm italic">{edu.degree}</p>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black mb-2 uppercase italic">Skills</h2>
          <div className="space-y-2">
            {data.skills.map((skillGroup, i) => (
              <p key={i} className="text-sm leading-6">
                <span className="font-bold">{skillGroup.category}: </span>
                {skillGroup.items.join(", ")}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
