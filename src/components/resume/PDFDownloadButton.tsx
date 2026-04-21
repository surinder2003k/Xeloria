"use client";

import { Button } from "@/components/ui/button";
import { FileText, FileDown, Loader2 } from "lucide-react";
import { ResumeData } from "@/lib/store";
import { useState } from "react";
import { toast } from "sonner";
import { useResumeStore } from "@/lib/store";
import { downloadAsDocx } from "@/lib/docx-export";

export const PDFDownloadButton = ({ data }: { data: ResumeData }) => {
  const { templateId } = useResumeStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadDocx = () => {
    try {
      downloadAsDocx(data, templateId || "modern");
      toast.success("Word document downloaded!");
    } catch (error) {
      console.error("Docx error:", error);
      toast.error("Failed to download Word document.");
    }
  };

  const handleDownloadPDF = async () => {
    const originalElement = document.getElementById("resume-content");
    if (!originalElement) {
      toast.error("Resume content not found!");
      return;
    }

    setIsDownloading(true);
    const toastId = toast.loading("Generating professional PDF...");

    // Create a temporary container for the capture
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "794px"; // Exact A4 width in pixels at standard DPI
    container.style.zIndex = "-1000";
    container.style.background = "white";
    document.body.appendChild(container);

    try {
      // Import libraries
      const [jspdf, html2canvasExports] = await Promise.all([
        import("jspdf"),
        import("html2canvas")
      ]);
      const jsPDF = jspdf.default;
      const html2canvas = html2canvasExports.default;

      // Clone the element into our fixed-width container
      const clone = originalElement.cloneNode(true) as HTMLElement;
      clone.id = "resume-capture-clone";
      
      // RESET STYLES FOR CAPTURE
      clone.style.transform = "none";
      clone.style.margin = "0";
      clone.style.width = "794px";
      clone.style.minHeight = "1122px"; // A4 height
      clone.style.boxShadow = "none";
      clone.style.border = "none";
      clone.style.opacity = "1";
      clone.style.visibility = "visible";
      clone.style.display = "block";
      
      container.appendChild(clone);

      // 1. Wait for fonts and brief render cycle
      await document.fonts.ready;
      await new Promise(r => setTimeout(r, 100));

      // 2. Comprehensive Color Clean (lab, oklch)
      const modernColorRegex = /(oklch|oklab|lab)\([^)]+\)/g;
      const allElements = clone.querySelectorAll("*");
      
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const style = window.getComputedStyle(htmlEl);
        
        // Clean standard props
        const colorProps = ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke'];
        colorProps.forEach(prop => {
          const val = (style as any)[prop];
          if (val && val.match(modernColorRegex)) {
            htmlEl.style.setProperty(prop.replace(/([A-Z])/g, "-$1").toLowerCase(), '#000000', 'important');
          }
        });

        // Clean CSS variables (Tailwind 4)
        const cssVars = Array.from(style).filter(p => p.startsWith('--'));
        cssVars.forEach(v => {
          const val = style.getPropertyValue(v);
          if (val && val.match(modernColorRegex)) {
            htmlEl.style.setProperty(v, '#000000', 'important');
          }
        });
      });

      // 3. CAPTURE
      const canvas = await html2canvas(clone, {
        scale: 3, // High DPI for crisp text
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 794,
        height: clone.offsetHeight,
        onclone: (clonedDoc) => {
          // Final safety check inside canvas clone
          const captureEl = clonedDoc.getElementById("resume-capture-clone");
          if (captureEl) captureEl.style.display = "block";
        }
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 3, canvas.height / 3] // Scale back to correct pixel size
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 3, canvas.height / 3);
      pdf.save(`${data.personalInfo.fullName || "Resume"}_Xeloria.pdf`);

      toast.success("PDF generated successfully!", { id: toastId });
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("Quality export failed. Please try again.", { id: toastId });
    } finally {
      // Cleanup
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button 
        onClick={handleDownloadPDF}
        disabled={isDownloading}
        variant="outline"
        className="w-full bg-white hover:bg-slate-50 text-slate-700 border-slate-200 gap-2 h-11"
      >
        {isDownloading ? <Loader2 className="h-4 w-4 animate-spin text-red-500" /> : <FileText className="h-4 w-4 text-red-500" />}
        {isDownloading ? "Generating..." : "Download PDF"}
      </Button>
      
      <Button 
        onClick={handleDownloadDocx}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-100 h-11"
      >
        <FileDown className="h-4 w-4" />
        Download Word
      </Button>

    </div>
  );
};
