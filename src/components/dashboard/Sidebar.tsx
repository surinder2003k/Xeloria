"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  ShieldCheck, 
  User,
  X,
  Globe,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

const commonItems = [
  { label: "Main Portal", href: "/dashboard", icon: LayoutDashboard },
  { label: "Portfolio Builder", href: "/dashboard/portfolio-builder", icon: FileText },
  { label: "Pick Theme", href: "/dashboard/templates", icon: Palette },
  { label: "My Portfolio", href: "/dashboard/portfolio", icon: Globe },
];

const adminOnlyItems = [
  { label: "All Stories", href: "/dashboard/blog", icon: Layers },
  { label: "Create Story", href: "/dashboard/blog/new", icon: PlusCircle },
  { label: "Autonomous", href: "/dashboard/automate", icon: Activity },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "xyzg135@gmail.com";

  const navigationItems = isAdmin ? [...commonItems, ...adminOnlyItems] : commonItems;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-screen w-80 bg-[#0a0a0a] border-r border-white/5 z-[70] transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-[20px_0_50px_-20px_rgba(0,0,0,0.5)]",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />

        <div className="flex flex-col h-full p-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-12 px-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl shadow-indigo-600/20">X</div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white leading-none">XELORIA</span>
                <span className="text-[10px] font-black tracking-[0.4em] text-indigo-500 uppercase mt-1">NEXUS CORE</span>
              </div>
            </Link>
            <button onClick={onClose} className="lg:hidden p-2 text-slate-500 hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6 px-4">Navigation Flow</p>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group relative overflow-hidden",
                    isActive 
                      ? "text-white bg-white/5 border border-white/10 shadow-2xl" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-500 rounded-full"
                    />
                  )}
                  <item.icon className={cn(
                    "h-5 w-5 transition-transform duration-500",
                    isActive ? "text-indigo-400" : "text-slate-600 group-hover:scale-110 group-hover:text-slate-400"
                  )} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Footer */}
          <div className="mt-auto pt-8 border-t border-white/5">
            <div className="p-5 bg-white/[0.03] rounded-[2rem] border border-white/5 flex items-center gap-4 hover:bg-white/[0.05] transition-all cursor-pointer group">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-white font-black overflow-hidden border border-white/10 shadow-2xl ring-2 ring-indigo-500/0 group-hover:ring-indigo-500/20 transition-all">
                {user?.imageUrl ? (
                  <img src={user.imageUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                   <User className="h-6 w-6 text-slate-400" />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-black text-white truncate uppercase tracking-tight">{user?.fullName || "Nexus User"}</p>
                <div className="flex items-center gap-1 mt-1">
                   <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", isAdmin ? "bg-purple-500" : "bg-emerald-500")} />
                   <p className="text-[9px] font-bold text-slate-500 truncate uppercase tracking-widest">
                     {isAdmin ? "Privileged Admin" : "Active Node"}
                   </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 px-4">
               <div className="flex items-center justify-between text-[9px] font-black text-slate-700 uppercase tracking-widest">
                  <span>System Load</span>
                  <span className="text-indigo-500">Normal</span>
               </div>
               <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                  <div className="h-full w-[40%] bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
               </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
