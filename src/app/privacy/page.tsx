import { Navbar } from "@/components/landing/Navbar";
import { Shield, Terminal, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[150px] rounded-full" />
      </div>

      <main className="pt-40 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
               <Shield className="h-3 w-3" /> Data Shield Active
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase italic leading-none">Privacy <span className="text-indigo-500">Protocol</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">REVISION: APRIL 22, 2024 // SYSTEM SECURE</p>
          </header>

          <div className="prose prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase prose-headings:italic prose-p:text-slate-500 prose-p:leading-relaxed prose-p:font-bold prose-p:uppercase prose-p:tracking-widest prose-p:text-[11px] prose-strong:text-white bg-white/[0.02] backdrop-blur-3xl p-12 md:p-20 rounded-[3rem] border border-white/5 shadow-2xl">
            <h2>1. Data Acquisition</h2>
            <p>
              WHEN YOU INITIALIZE XELORIA, WE CAPTURE METADATA PROVIDED DIRECTLY BY THE OPERATOR. THIS INCLUDES CORE IDENTITY LABELS, EMAIL PROTOCOLS, AND NARRATIVE ASSETS UPLOADED TO THE CLOUD.
            </p>

            <h2>2. Optimization Usage</h2>
            <p>
              WE UTILIZE COLLECTED INTELLIGENCE TO MAINTAIN, SCALE, AND REFINE THE XELORIA ARCHITECTURE. YOUR PUBLIC ASSETS ARE DEPLOYED ACCORDING TO YOUR SPECIFIC ACCESS PERMISSIONS.
            </p>

            <h2>3. Intelligence Sharing</h2>
            <p>
              XELORIA DOES NOT LIQUIDATE PERSONAL DATA. WE MAY COORDINATE WITH SUB-PROCESSORS WHO FACILITATE CORE SYSTEM FUNCTIONS, OR WHEN MANDATED BY GLOBAL LEGAL FRAMEWORKS.
            </p>

            <h2>4. Operator Autonomy</h2>
            <p>
              YOU RETAIN FULL COMMAND OVER YOUR ACCOUNT DATA. ACCESS, MODIFICATION, OR TERMINATION OF DATA STREAMS IS AVAILABLE VIA THE PRIMARY CONTROL CENTER.
            </p>

            <h2>5. Fortification</h2>
            <p>
              WE IMPLEMENT MULTI-LAYERED DEFENSIVE MEASURES TO SHIELD YOUR DATA STREAMS FROM UNAUTHORIZED INTERCEPTION OR EXTRUSION.
            </p>

            <h2>6. Direct Uplink</h2>
            <p>
              FOR QUERIES REGARDING DATA SHIELD PROTOCOLS, CONTACT THE SECURITY UNIT AT: PRIVACY@XELORIA.IO.
            </p>
            
            <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-center gap-3 opacity-50">
               <ShieldCheck className="h-4 w-4 text-emerald-500" />
               <span className="text-[8px] font-black uppercase tracking-[0.4em]">All encryption layers verified nominal</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
