import { useResumeStore } from "@/lib/store";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { StandardPDFTemplate } from "./templates/StandardPDFTemplate";
import { EliteMinimalTemplate } from "./templates/EliteMinimalTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { DeveloperTemplate } from "./templates/DeveloperTemplate";
import { ElegantTemplate } from "./templates/ElegantTemplate";
import { EliteModernTemplate } from "./templates/EliteModernTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { MinimalProTemplate } from "./templates/MinimalProTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { PremiumProTemplate } from "./templates/PremiumProTemplate";
import { PremiumTemplate } from "./templates/PremiumTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { SimpleTemplate } from "./templates/SimpleTemplate";

export const ResumePreview = () => {
  const { data, templateId } = useResumeStore();

  const renderTemplate = () => {
    switch (templateId) {
      case "standard_pdf":
        return <StandardPDFTemplate data={data} />;
      case "elite_minimal":
        return <EliteMinimalTemplate data={data} />;
      case "elite_modern":
        return <EliteModernTemplate data={data} />;
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      case "minimal_pro":
        return <MinimalProTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      case "developer":
        return <DeveloperTemplate data={data} />;
      case "elegant":
        return <ElegantTemplate data={data} />;
      case "executive":
        return <ExecutiveTemplate data={data} />;
      case "modern":
        return <ModernTemplate data={data} />;
      case "premium":
        return <PremiumTemplate data={data} />;
      case "premium_pro":
        return <PremiumProTemplate data={data} />;
      case "professional":
        return <ProfessionalTemplate data={data} />;
      case "simple":
        return <SimpleTemplate data={data} />;
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
