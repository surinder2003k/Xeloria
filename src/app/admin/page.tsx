"use client";

import { useUser } from "@clerk/nextjs";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Globe, 
  AlertCircle,
  MoreHorizontal,
  Search,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";

export default function AdminDashboardPage() {
  const { user, isLoaded } = useUser();

  // Security check: Only xyzg135@gmail.com can see this
  if (isLoaded && user?.primaryEmailAddress?.emailAddress !== "xyzg135@gmail.com") {
    return notFound();
  }

  const platformStats = [
    { label: "Total Users", value: "24,592", icon: Users, trend: "+12.5%", color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Total Resumes", value: "82,104", icon: FileText, trend: "+18.2%", color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { label: "Public Portfolios", value: "15,203", icon: Globe, trend: "+5.4%", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Blog Posts", value: "482", icon: BookOpen, trend: "+2.1%", color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <header className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="h-16 w-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl">
                <ShieldCheck className="h-10 w-10 text-indigo-400" />
             </div>
             <div>
                <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3 uppercase italic">
                   Super Admin <span className="text-[10px] bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-widest font-black">System</span>
                </h1>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Platform-wide health and infrastructure overview.</p>
             </div>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10"><Settings className="h-4 w-4 mr-2" /> Global Config</Button>
          </div>
        </header>

        {/* Platform Pulse */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {platformStats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-indigo-500/50 transition-all"
              >
                 <div className="flex justify-between items-start relative z-10">
                    <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl border border-white/5`}>
                       <stat.icon className="h-7 w-7" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20 uppercase tracking-widest">
                       <TrendingUp className="h-3 w-3" /> {stat.trend}
                    </span>
                 </div>
                 <div className="mt-6 relative z-10">
                    <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                    <p className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-[0.2em]">{stat.label}</p>
                 </div>
                 <div className="absolute -bottom-4 -right-4 h-32 w-32 bg-indigo-500/5 rounded-full blur-3xl opacity-50 group-hover:bg-indigo-500/10 transition-all" />
              </motion.div>
            ))}
         </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity Table */}
            <div className="lg:col-span-2 space-y-8">
               <section className="bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
                  <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                     <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">Recent Users</h2>
                     <div className="relative">
                        <Input placeholder="SEARCH PROTOCOLS..." className="rounded-xl bg-white/5 border-white/10 pl-10 h-10 w-64 text-xs font-bold text-white placeholder:text-slate-600 focus:ring-indigo-500/20" />
                        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                     </div>
                  </div>
                  <div className="divide-y divide-white/[0.02]">
                     {[
                       { name: "Jessica Lane", email: "jessica@example.com", status: "Pro", joined: "2 hours ago" },
                       { name: "Marcus Thorne", email: "marcus@domain.io", status: "Free", joined: "5 hours ago" },
                       { name: "Sarah Connor", email: "future@resistance.com", status: "Pro", joined: "1 day ago" },
                       { name: "Robert Fox", email: "fox@nature.co", status: "Free", joined: "1 day ago" },
                     ].map((user) => (
                       <div key={user.email} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-all group">
                          <div className="flex items-center gap-4">
                             <div className="h-12 w-12 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center font-black text-white group-hover:border-indigo-500 transition-colors">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <p className="font-bold text-white">{user.name}</p>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none mt-1">{user.email}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-8">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                 user.status === 'Pro' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-500'
                              }`}>
                                 {user.status}
                              </span>
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">{user.joined}</span>
                              <Button variant="ghost" size="icon" className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
                                 <MoreHorizontal className="h-4 w-4" />
                              </Button>
                          </div>
                       </div>
                     ))}
                 </div>
                  <div className="p-6 bg-white/[0.02] border-t border-white/5 text-center">
                     <Button variant="link" className="text-indigo-400 font-black uppercase tracking-widest text-[10px] hover:text-indigo-300 transition-colors">View All Users <ArrowRight className="h-4 w-4 ml-2" /></Button>
                  </div>
               </section>
            </div>

            {/* Moderation Sidebar */}
            <div className="space-y-8">
               <section className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative shadow-2xl shadow-indigo-600/20 overflow-hidden">
                  <div className="relative z-10 space-y-6">
                     <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                        <h2 className="text-xl font-black tracking-tight uppercase italic">Requires Review</h2>
                     </div>
                     <div className="space-y-4">
                        {[1, 2].map(i => (
                          <div key={i} className="bg-white/10 border border-white/10 p-4 rounded-2xl hover:bg-white/20 transition-colors cursor-pointer group">
                             <p className="text-sm font-bold truncate">Potentially Inappropriate Blog Title {i}</p>
                             <p className="text-[9px] uppercase font-black text-white/40 mt-1 tracking-widest">Reported by User #{i}482</p>
                             <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" className="h-8 rounded-xl bg-white text-black hover:bg-slate-200 text-[10px] font-black uppercase tracking-widest">Approve</Button>
                                <Button size="sm" className="h-8 rounded-xl bg-black/40 hover:bg-black/60 text-white text-[10px] font-black uppercase tracking-widest border border-white/10">Flag</Button>
                             </div>
                          </div>
                        ))}
                     </div>
                     <Button variant="outline" className="w-full rounded-2xl border-white/20 text-white hover:bg-white/10 font-black text-[10px] uppercase tracking-widest h-12 transition-all">
                        Moderation Queue
                     </Button>
                  </div>
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
               </section>

               <section className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 shadow-2xl">
                  <h3 className="text-lg font-black text-white mb-6 tracking-tight uppercase italic">Platform Health</h3>
                  <div className="space-y-6">
                     {[
                       { name: "Server Performance", status: "Healthy", color: "text-emerald-400" },
                       { name: "Database Load", status: "14%", color: "text-slate-500" },
                       { name: "Email Delivery", status: "99.8%", color: "text-emerald-400" },
                     ].map(h => (
                       <div key={h.name} className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{h.name}</span>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${h.color}`}>{h.status}</span>
                       </div>
                     ))}
                  </div>
               </section>
           </div>
        </div>
      </main>
    </div>
  );
}
