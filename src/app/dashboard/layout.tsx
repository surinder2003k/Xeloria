"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Search, Bell, Menu, Sparkles, LayoutDashboard } from "lucide-react";
import { XeloriaLogo } from "@/components/BrandLogo";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-80 flex flex-col min-h-screen relative">
        {/* Top Header */}
        <header className="h-20 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-4 md:px-10 sticky top-0 z-[100]">
          <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
             <div className="flex items-center gap-4 shrink-0">
               <button 
                 onClick={() => setSidebarOpen(true)}
                 className="lg:hidden p-2 text-slate-400 hover:bg-white/5 rounded-xl transition-all"
               >
                  <Menu className="h-6 w-6" />
               </button>
               <div className="lg:hidden flex items-center gap-2">
                 <XeloriaLogo className="h-8 w-8 drop-shadow-xl" />
               </div>
             </div>
             
             {/* Search Bar - Stylized */}
             <div className="max-w-md w-full relative hidden sm:block group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Query system assets..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all"
                />
             </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6 shrink-0">
             <button className="hidden xs:flex p-3 text-slate-500 hover:text-indigo-400 hover:bg-white/5 rounded-xl transition-all relative group">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 h-1.5 w-1.5 bg-indigo-500 rounded-full border-2 border-[#050505] shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
             </button>
             
             <div className="hidden xs:block h-8 w-[1px] bg-white/5 mx-1" />
             
             <div className="flex items-center gap-3 md:gap-5 pl-1">
                <div className="text-right hidden md:block">
                   <p className="text-[9px] font-black text-white leading-none tracking-widest uppercase">System Online</p>
                   <div className="flex items-center justify-end gap-1.5 mt-1.5">
                      <span className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Node 0x7F</p>
                   </div>
                </div>
                <div className="bg-white/5 p-1 rounded-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all">
                   <UserButton 
                    appearance={{
                        elements: {
                            avatarBox: "h-8 w-8 md:h-9 md:w-9 rounded-lg"
                        }
                    }}
                   />
                </div>
             </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto w-full relative">
           {/* Subtle Noise Texture */}
           <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
           
           <div className="relative z-10">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
}
