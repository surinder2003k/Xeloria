import { Navbar } from "@/components/landing/Navbar";
import { Scale, Terminal, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />
      </div>

      <main className="pt-40 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em]">
               <Scale className="h-3 w-3" /> System Governance
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase italic leading-none">Terms of <span className="text-purple-500">Service</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">REVISION: APRIL 22, 2024 // ALL PROTOCOLS ENFORCED</p>
          </header>

          <div className="prose prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase prose-headings:italic prose-p:text-slate-500 prose-p:leading-relaxed prose-p:font-bold prose-p:uppercase prose-p:tracking-widest prose-p:text-[11px] prose-strong:text-white bg-white/[0.02] backdrop-blur-3xl p-12 md:p-20 rounded-[3rem] border border-white/5 shadow-2xl">
            <h2>1. Protocol Acceptance</h2>
            <p>
              BY INITIALIZING OR INTERACTING WITH THE XELORIA ARCHITECTURE, YOU AGREE TO BE BOUND BY THESE GOVERNANCE PROTOCOLS AND ALL APPLICABLE REGULATORY FRAMEWORKS.
            </p>

            <h2>2. Asset Ownership</h2>
            <p>
              YOU RETAIN ALL CORE RIGHTS TO THE NARRATIVE ASSETS UPLOADED TO XELORIA. BY DEPLOYING ASSETS, YOU GRANT THE SYSTEM A NON-EXCLUSIVE LICENSE TO RENDER, DISPLAY, AND DISTRIBUTE THAT CONTENT GLOBALLY.
            </p>

            <h2>3. Restricted Actions</h2>
            <p>
              OPERATORS MUST NOT UTILIZE THE SYSTEM FOR ILLICIT OPERATIONS OR ACTIONS THAT IMPAIR CORE ARCHITECTURE. THIS INCLUDES THE INJECTION OF MALICIOUS CODE OR HARASSMENT OF OTHER OPERATORS.
            </p>

            <h2>4. Command Termination</h2>
            <p>
              THE SYSTEM ADMINISTRATORS RESERVE THE RIGHT TO SUSPEND OR TERMINATE OPERATOR ACCESS AT OUR DISCRETION, WITHOUT PRIOR SIGNAL, FOR ACTIONS THAT DEVIATE FROM THESE PROTOCOLS.
            </p>

            <h2>5. Service Disclaimer</h2>
            <p>
              THE ARCHITECTURE IS PROVIDED "AS IS" WITHOUT WARRANTY. WE DO NOT GUARANTEE THAT DATA TRANSMISSIONS WILL BE UNINTERRUPTED OR DEVOID OF PROTOCOL ERRORS.
            </p>

            <h2>6. Liability Constraints</h2>
            <p>
              XELORIA SHALL NOT BE HELD LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM OPERATOR INTERACTION WITH THE CORE SYSTEM.
            </p>
            
            <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-center gap-3 opacity-50">
               <ShieldCheck className="h-4 w-4 text-purple-500" />
               <span className="text-[8px] font-black uppercase tracking-[0.4em]">Governance layers verified nominal</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
