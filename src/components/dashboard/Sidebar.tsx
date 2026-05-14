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
import { XeloriaLogo } from "@/components/BrandLogo";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

const commonItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

const adminOnlyItems = [
  { label: "Journal", href: "/dashboard/blog", icon: Layers },
  { label: "New Story", href: "/dashboard/blog/new", icon: PlusCircle },
  { label: "System Health", href: "/dashboard/automate", icon: Activity },
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden" 
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 h-screen w-72 bg-[#030303] border-r border-white/[0.05] z-[110] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6 md:p-8 relative z-10 noise-bg">
          {/* Header */}
          <div className="flex items-center justify-between mb-12 px-2">
            <Link href="/" className="flex items-center gap-3 group">
               <XeloriaLogo className="h-9 w-9 group-hover:scale-105 transition-transform" />
               <span className="text-xl font-bold tracking-tight text-white leading-none">Xeloria</span>
            </Link>
            <button onClick={onClose} className="lg:hidden p-2 text-slate-500 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 px-4">Menu</p>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3.5 px-5 py-3 rounded-xl text-xs font-semibold transition-all group relative",
                    isActive 
                      ? "text-white bg-white/5 border border-white/[0.05]" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                  )}
                >
                  <item.icon className={cn(
                    "h-4.5 w-4.5 transition-transform duration-300",
                    isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                  )} />
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 top-3 bottom-3 w-0.5 bg-indigo-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Footer */}
          <div className="mt-auto pt-8 border-t border-white/[0.05]">
            <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/[0.05] flex items-center gap-3 hover:bg-white/[0.04] transition-all cursor-pointer group">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold overflow-hidden border border-white/10">
                {user?.imageUrl ? (
                  <img src={user.imageUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                   <User className="h-5 w-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[13px] font-bold text-white truncate">{user?.fullName || "Creator"}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <div className={cn("h-1.5 w-1.5 rounded-full", isAdmin ? "bg-purple-500" : "bg-emerald-500")} />
                   <p className="text-[10px] font-medium text-slate-500 truncate uppercase tracking-wider">
                     {isAdmin ? "Admin" : "Free Plan"}
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
