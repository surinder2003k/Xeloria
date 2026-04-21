import { useResumeStore } from "@/lib/store";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { StandardPDFTemplate } from "./templates/StandardPDFTemplate";
import { EliteMinimalTemplate } from "./templates/EliteMinimalTemplate";

export const ResumePreview = () => {
  const { data, templateId } = useResumeStore();

  const renderTemplate = () => {
    switch (templateId) {
      case "standard_pdf":
        return <StandardPDFTemplate data={data} />;
      case "elite_minimal":
        return <EliteMinimalTemplate data={data} />;
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      default:
        return <StandardPDFTemplate data={data} />;
    }
  };

  return (
    <div className="flex justify-center bg-slate-100 p-8 min-h-screen overflow-auto">
      <div id="resume-content" className="transform scale-[0.6] sm:scale-[0.8] lg:scale-100 origin-top bg-white shadow-2xl">
        {renderTemplate()}
      </div>
    </div>
  );
};
