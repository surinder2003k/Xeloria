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
    <div className="min-h-screen bg-[#030303]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-72 flex flex-col min-h-screen relative">
        {/* Top Header */}
        <header className="h-20 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.05] flex items-center justify-between px-6 md:px-10 sticky top-0 z-[100]">
          <div className="flex items-center gap-4 flex-1 min-w-0">
             <div className="flex items-center gap-4 shrink-0">
               <button 
                 onClick={() => setSidebarOpen(true)}
                 className="lg:hidden p-2 text-slate-400 hover:bg-white/5 rounded-lg transition-all"
               >
                  <Menu className="h-5 w-5" />
               </button>
               <div className="lg:hidden">
                 <XeloriaLogo className="h-7 w-7" />
               </div>
             </div>
             
             {/* Search Bar - Refined */}
             <div className="max-w-xs w-full relative hidden sm:block group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-2.5 pl-11 pr-4 text-xs font-medium text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all"
                />
             </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 shrink-0">
             <button className="hidden xs:flex p-2.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-indigo-500 rounded-full border-2 border-[#030303]" />
             </button>
             
             <div className="hidden xs:block h-6 w-[1px] bg-white/[0.05]" />
             
             <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                   <p className="text-[11px] font-bold text-white leading-none uppercase tracking-wider">Studio Mode</p>
                   <p className="text-[9px] font-medium text-slate-500 uppercase tracking-widest mt-1">Version 1.2.0</p>
                </div>
                <div className="p-0.5 bg-white/[0.05] rounded-full border border-white/[0.1]">
                   <UserButton 
                    appearance={{
                        elements: {
                            avatarBox: "h-8 w-8 rounded-full"
                        }
                    }}
                   />
                </div>
             </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 lg:p-14 max-w-[1600px] mx-auto w-full relative">
            <div className="relative z-10">
              {children}
            </div>
        </main>
      </div>
    </div>
  );
}
