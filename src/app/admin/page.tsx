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
    { label: "Total Users", value: "24,592", icon: Users, trend: "+12.5%", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Resumes", value: "82,104", icon: FileText, trend: "+18.2%", color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Public Portfolios", value: "15,203", icon: Globe, trend: "+5.4%", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Blog Posts", value: "482", icon: BookOpen, trend: "+2.1%", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="h-16 w-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
                <ShieldCheck className="h-10 w-10" />
             </div>
             <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                   Super Admin <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded uppercase tracking-tighter">System</span>
                </h1>
                <p className="text-slate-500 font-medium">Platform-wide health and infrastructure overview.</p>
             </div>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="rounded-full border-slate-200"><Settings className="h-4 w-4 mr-2" /> Global Config</Button>
          </div>
        </header>

        {/* Platform Pulse */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {platformStats.map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden"
             >
                <div className="flex justify-between items-start relative z-10">
                   <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                      <stat.icon className="h-7 w-7" />
                   </div>
                   <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> {stat.trend}
                   </span>
                </div>
                <div className="mt-6 relative z-10">
                   <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                   <p className="text-xs font-black text-slate-400 mt-1 uppercase tracking-[0.2em]">{stat.label}</p>
                </div>
                <div className="absolute -bottom-4 -right-4 h-32 w-32 bg-slate-50 rounded-full blur-2xl opacity-50" />
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Recent Activity Table */}
           <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Users</h2>
                    <div className="relative">
                       <Input placeholder="Search users..." className="rounded-full bg-white border-slate-200 pl-10 h-10 w-64" />
                       <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    </div>
                 </div>
                 <div className="divide-y divide-slate-50">
                    {[
                      { name: "Jessica Lane", email: "jessica@example.com", status: "Pro", joined: "2 hours ago" },
                      { name: "Marcus Thorne", email: "marcus@domain.io", status: "Free", joined: "5 hours ago" },
                      { name: "Sarah Connor", email: "future@resistance.com", status: "Pro", joined: "1 day ago" },
                      { name: "Robert Fox", email: "fox@nature.co", status: "Free", joined: "1 day ago" },
                    ].map((user) => (
                      <div key={user.email} className="p-6 flex items-center justify-between hover:bg-slate-50/80 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center font-black text-indigo-600">
                               {user.name.charAt(0)}
                            </div>
                            <div>
                               <p className="font-bold text-slate-900">{user.name}</p>
                               <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-8">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                user.status === 'Pro' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-400'
                             }`}>
                                {user.status}
                             </span>
                             <span className="text-xs font-bold text-slate-400 italic">{user.joined}</span>
                             <Button variant="ghost" size="icon" className="rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                             </Button>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
                    <Button variant="link" className="text-indigo-600 font-black">View All Users <ArrowRight className="h-4 w-4 ml-2" /></Button>
                 </div>
              </section>
           </div>

           {/* Moderation Sidebar */}
           <div className="space-y-8">
              <section className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative shadow-2xl shadow-indigo-900/40 overflow-hidden">
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-2">
                       <AlertCircle className="h-5 w-5 text-amber-400" />
                       <h2 className="text-xl font-black tracking-tight">Requires Review</h2>
                    </div>
                    <div className="space-y-4">
                       {[1, 2].map(i => (
                         <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                            <p className="text-sm font-bold truncate">Potentially Inappropriate Blog Title {i}</p>
                            <p className="text-[10px] uppercase font-black text-white/40 mt-1">Reported by User #{i}482</p>
                            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                               <Button size="sm" className="h-7 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-[10px]">Approve</Button>
                               <Button size="sm" className="h-7 rounded-lg bg-rose-500 hover:bg-rose-600 text-[10px]">Flag</Button>
                            </div>
                         </div>
                       ))}
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl border-white/20 text-white hover:bg-white/10 font-bold h-12">
                       Moderation Queue
                    </Button>
                 </div>
                 <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full" />
              </section>

              <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
                 <h3 className="text-lg font-black text-slate-900 mb-6 tracking-tight">Platform Health</h3>
                 <div className="space-y-6">
                    {[
                      { name: "Server Performance", status: "Healthy", color: "text-emerald-500" },
                      { name: "Database Load", status: "14%", color: "text-slate-400" },
                      { name: "Email Delivery", status: "99.8%", color: "text-emerald-500" },
                    ].map(h => (
                      <div key={h.name} className="flex justify-between items-center">
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{h.name}</span>
                         <span className={`text-xs font-black ${h.color}`}>{h.status}</span>
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
