import { ResumeData } from "@/lib/store";

export const ProfessionalTemplate = ({ data }: { data: ResumeData }) => (
  <div className="bg-white p-10 shadow-lg min-h-[1122px] w-[794px] text-slate-800 border border-slate-200">
    <div className="text-center border-b-2 border-slate-900 pb-6 mb-8">
      <h1 className="text-3xl font-bold uppercase tracking-widest">{data.personalInfo.fullName}</h1>
      <p className="text-sm mt-2 text-slate-500 font-medium">
        {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
      </p>
      {data.personalInfo.linkedin && <p className="text-xs mt-1 text-indigo-600 font-bold">{data.personalInfo.linkedin}</p>}
    </div>

    <div className="space-y-10">
      {data.summary && (
        <section>
          <h2 className="text-sm font-black uppercase text-slate-900 bg-slate-50 px-4 py-1 mb-4 border-l-4 border-slate-900">Professional Summary</h2>
          <p className="text-sm leading-6 px-1">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <h2 className="text-sm font-black uppercase text-slate-900 bg-slate-50 px-4 py-1 mb-6 border-l-4 border-slate-900">Relevant Experience</h2>
          <div className="space-y-8 px-1">
            {data.experience.map((e, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-slate-900">{e.position}</h3>
                  <span className="text-xs font-bold text-slate-400">{e.startDate} – {e.endDate}</span>
                </div>
                <p className="text-sm font-bold text-slate-600 mb-2">{e.company}</p>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-10">
        {data.education.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase text-slate-900 bg-slate-50 px-4 py-1 mb-4 border-l-4 border-slate-900">Education</h2>
            <div className="space-y-4 px-1">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="text-sm font-bold text-slate-800">{edu.school}</h3>
                  <p className="text-xs text-slate-500 font-bold">{edu.degree} ({edu.endDate})</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase text-slate-900 bg-slate-50 px-4 py-1 mb-4 border-l-4 border-slate-900">Core Skills</h2>
            <div className="flex flex-wrap gap-2 px-1">
              {data.skills.map((s, i) => (
                <span key={i} className="text-xs border border-slate-200 px-2 py-1 rounded bg-white font-medium">{s}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
);
