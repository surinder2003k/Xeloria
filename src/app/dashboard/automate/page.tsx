"use client";

import { useEffect, useState } from "react";
import { 
  Activity, 
  Cpu, 
  Zap, 
  History, 
  Settings, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCcw,
  Plus,
  Trash2,
  LayoutDashboard,
  Search,
  Filter,
  Globe,
  ChevronDown,
  Check
} from "lucide-react";
import { XeloriaLogo } from "@/components/BrandLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AutomatePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "xyzg135@gmail.com";

  const [logs, setLogs] = useState<any[]>([]);
  const [pilots, setPilots] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["Technology", "Finance", "Health", "SEO", "seo tips"]);
  const [selectedCategory, setSelectedCategory] = useState("seo tips");
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCat, setNewCat] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: logData, error: logError } = await supabase
        .from('automation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (logError) throw logError;
      setLogs(logData || []);

      // Fetch Pilots via Secure Admin API
      const res = await fetch("/api/automate/users");
      const pilotData = await res.json();
      
      if (!pilotData.error) {
        setPilots(pilotData);
      }

      // Fetch Categories
      const { data: catData } = await supabase
        .from('app_settings')
        .select('*')
        .eq('key', 'blog_categories')
        .single();
      
      if (catData?.value) setCategories(catData.value);

      // Fetch Selected Category
      const { data: selData } = await supabase
        .from('app_settings')
        .select('*')
        .eq('key', 'autopost_category')
        .single();
      
      if (selData?.value) setSelectedCategory(selData.value);

    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateSelectedCategory = async (cat: string) => {
    setSelectedCategory(cat);
    await supabase
      .from('app_settings')
      .upsert({ key: 'autopost_category', value: cat }, { onConflict: 'key' });
    toast.success(`Active target: ${cat}`);
  };

  const addCategory = async () => {
    if (!newCat) return;
    const updated = [...categories, newCat];
    const { error } = await supabase
      .from('app_settings')
      .upsert({ key: 'blog_categories', value: updated }, { onConflict: 'key' });
    
    if (!error) {
      setCategories(updated);
      setNewCat("");
      setShowAddCategory(false);
      toast.success("Sector expanded.");
    }
  };

  const createPosts = async () => {
    setIsGenerating(true);
    const loadingToast = toast.loading("Synthesizing 2 assets...");
    
    try {
      for (let i = 0; i < 2; i++) {
        const res = await fetch("/api/ai/generate-blog", {
          method: "POST",
          body: JSON.stringify({ 
            prompt: `Latest trends and tips in ${selectedCategory} for 2026`,
            category: selectedCategory 
          }),
        });
        
        const { blog } = await res.json();
        
        // Save to DB
        const slug = blog.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const { error } = await supabase.from("blogs").insert({
          title: blog.title,
          content: blog.content,
          excerpt: blog.excerpt,
          category: selectedCategory,
          slug,
          is_published: true,
          featured_image: blog.content.match(/!\[.*?\]\((.*?)\)/)?.[1] || null
        });

        if (error) throw error;

        // Log it
        await supabase.from("automation_logs").insert({
          action: "AI_GENERATION_SUCCESS",
          status: "success",
          details: `Generated: ${blog.title}`
        });
      }
      
      toast.dismiss(loadingToast);
      toast.success("2 Assets synthesized and broadcasted.");
      fetchData();
    } catch (e: any) {
      toast.dismiss(loadingToast);
      toast.error("Asset synthesis failed.");
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateRole = async (pilotId: string, newRole: string) => {
    const res = await fetch("/api/automate/users", {
      method: "PATCH",
      body: JSON.stringify({ userId: pilotId, role: newRole }),
    });
    
    if (res.ok) {
      toast.success(`Access level updated: ${newRole.toUpperCase()}`);
      fetchData();
    } else {
      toast.error("Security update failed.");
    }
  };

  const deletePilot = async (pilotId: string) => {
    if (!confirm("Decommission this pilot? Access will be revoked.")) return;
    const res = await fetch("/api/automate/users", {
      method: "DELETE",
      body: JSON.stringify({ userId: pilotId }),
    });
    
    if (res.ok) {
      toast.success("Pilot decommissioned.");
      fetchData();
    } else {
      toast.error("Decommissioning failed.");
    }
  };

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push("/dashboard");
    } else if (isLoaded && isAdmin) {
      fetchData();
    }
  }, [isLoaded, isAdmin, router]);

  if (!isLoaded || (isLoaded && !isAdmin)) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Activity className="h-10 w-10 animate-pulse text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white -m-4 md:-m-12 p-4 md:p-12 relative">
      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider w-fit">
           <LayoutDashboard className="h-4 w-4" /> Dashboard / Automation
        </Link>

        {/* Professional Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">
              Autonomous <span className="text-indigo-500">Manager</span>
            </h1>
            <p className="text-slate-500 text-xs font-medium">Configure and monitor your AI-driven editorial pipeline.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
               <Activity className="h-3 w-3 animate-pulse" /> System Online
            </div>
            <Button 
              onClick={createPosts}
              disabled={isGenerating}
              className="h-11 px-6 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-lg disabled:opacity-50"
            >
              {isGenerating ? "Synthesizing..." : "Create 2 Post"}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="h-10 w-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
               <Clock className="h-5 w-5" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Scheduled Sync</p>
               <h3 className="text-lg font-bold text-white mt-1">Tomorrow, 08:00 AM</h3>
            </div>
          </div>

          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
               <History className="h-5 w-5" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Success</p>
               <h3 className="text-lg font-bold text-white mt-1">
                 {logs.find(l => l.status === 'success')?.created_at 
                   ? new Date(logs.find(l => l.status === 'success')!.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                   : "No recent success"}
               </h3>
            </div>
          </div>

          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="h-10 w-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/20">
               <Cpu className="h-5 w-5" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Topics</p>
               <h3 className="text-lg font-bold text-white mt-1">{categories.length} Targeted</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Controls */}
          <div className="lg:col-span-8 space-y-10">
            {/* Neural Pilots Section */}
            <section className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                <h2 className="text-lg font-black text-white uppercase tracking-tight">Neural Pilots</h2>
                <Button variant="outline" className="h-9 px-4 rounded-lg border-white/10 text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-white">Add Pilot</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/[0.02]">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Pilot</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Role</th>
                      <th className="px-8 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pilots.map((pilot, idx) => (
                      <tr key={pilot.id} className="hover:bg-white/[0.01] transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden relative">
                               <img src={pilot.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${pilot.username}`} alt="" className="w-full h-full object-cover" />
                               {pilot.role === 'admin' && <div className="absolute inset-0 border-2 border-indigo-500 rounded-full animate-pulse" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white flex items-center gap-2">
                                {pilot.full_name || pilot.username}
                                {user?.id === pilot.id && <span className="px-1.5 py-0.5 bg-indigo-500 text-[8px] font-black rounded uppercase">YOU</span>}
                              </p>
                              <p className="text-[10px] text-slate-500">{pilot.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest border transition-all ${
                            pilot.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]' : 
                            'bg-slate-500/10 text-slate-400 border-white/10'
                          }`}>
                            {pilot.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                              {pilot.id !== user?.id && (
                                <>
                                  {pilot.role === 'user' ? (
                                    <Button 
                                      onClick={() => updateRole(pilot.id, 'admin')}
                                      variant="ghost" className="h-8 px-3 text-[10px] font-bold text-emerald-500 hover:text-emerald-400 uppercase"
                                    >
                                      Promote
                                    </Button>
                                  ) : (
                                    <Button 
                                      onClick={() => updateRole(pilot.id, 'user')}
                                      variant="ghost" className="h-8 px-3 text-[10px] font-bold text-amber-500 hover:text-amber-400 uppercase"
                                    >
                                      Demote
                                    </Button>
                                  )}
                                  <Button 
                                    onClick={() => deletePilot(pilot.id)}
                                    variant="ghost" className="h-8 px-3 text-[10px] font-bold text-red-500/50 hover:text-red-400 uppercase"
                                  >
                                    Revoke
                                  </Button>
                                </>
                              )}
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Telemetry Section */}
            <section className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden flex flex-col h-fit">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Telemetric Stream</h3>
                <div className="flex items-center gap-2 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                  <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live Stream
                </div>
              </div>
              <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar space-y-2 font-mono">
                {loading ? (
                   <div className="p-10 text-center text-slate-600 text-xs uppercase font-bold">Initializing stream...</div>
                ) : logs.length > 0 ? (
                   logs.map((log) => (
                     <div key={log.id} className="flex gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                        <span className="text-slate-600 text-[10px] shrink-0">[{new Date(log.created_at).toLocaleTimeString()}]</span>
                        <div className="flex-1">
                           <p className={`text-[11px] font-bold uppercase tracking-wide ${log.status === 'success' ? 'text-indigo-400' : 'text-red-400'}`}>
                             {log.action}
                           </p>
                           <p className="text-[10px] text-slate-500 mt-0.5">{log.details || "Protocol cycle complete."}</p>
                        </div>
                     </div>
                   ))
                ) : (
                   <div className="p-20 text-center text-slate-600 text-xs uppercase font-bold">No telemetry data available.</div>
                )}
              </div>
            </section>
          </div>

          {/* Configuration Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/5 space-y-8">
              <div className="space-y-1">
                 <h3 className="text-sm font-black text-white uppercase tracking-wider">Sync Protocols</h3>
                 <p className="text-[10px] font-bold text-slate-500 uppercase">Automation logic gates</p>
              </div>
              <div className="space-y-6">
                 {[
                   { label: "Auto-Publish", desc: "Bypass moderation", active: true },
                   { label: "Regional Sync", desc: "India Cluster", active: false, locked: true },
                   { label: "High Frequency", desc: "Daily cycle (8AM)", active: true },
                 ].map((protocol, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div>
                         <p className="text-[11px] font-black text-white uppercase">{protocol.label}</p>
                         <p className="text-[9px] font-medium text-slate-500 uppercase">{protocol.desc}</p>
                      </div>
                      {protocol.locked ? (
                        <div className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Locked</div>
                      ) : (
                        <div className={`h-5 w-9 rounded-full p-1 flex transition-all cursor-pointer ${protocol.active ? 'bg-indigo-500 justify-end' : 'bg-slate-800 justify-start'}`}>
                           <div className="h-3 w-3 bg-white rounded-full shadow-sm" />
                        </div>
                      )}
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-3xl p-8 border border-white/5 space-y-8">
              <div className="space-y-1">
                 <h3 className="text-sm font-black text-white uppercase tracking-wider">AUTO-POST CATEGORY</h3>
                 <p className="text-[10px] font-bold text-slate-500 uppercase">Target sector for 8AM generation</p>
              </div>
              
              <div className="space-y-4">
                 <div className="relative group">
                    <select 
                      value={selectedCategory}
                      onChange={(e) => {
                        if (e.target.value === "ADD_NEW") {
                          setShowAddCategory(true);
                        } else {
                          updateSelectedCategory(e.target.value);
                        }
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[11px] font-black text-white focus:outline-none focus:border-indigo-500 transition-all uppercase appearance-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#0a0a0a]">{cat}</option>
                      ))}
                      <option value="ADD_NEW" className="bg-[#0a0a0a] text-indigo-400 font-black italic">Add Category...</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                 </div>

                 {showAddCategory && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 pt-2"
                    >
                       <input 
                         type="text" 
                         placeholder="NEW CATEGORY NAME..." 
                         value={newCat}
                         onChange={(e) => setNewCat(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] font-bold text-white focus:outline-none focus:border-indigo-500 transition-all uppercase placeholder:text-slate-600"
                       />
                       <div className="flex gap-2">
                          <Button onClick={addCategory} className="flex-1 bg-white text-black text-[9px] font-black uppercase h-9 rounded-lg">Add</Button>
                          <Button variant="ghost" onClick={() => setShowAddCategory(false)} className="px-3 text-[9px] font-bold text-slate-500 uppercase h-9 rounded-lg">Cancel</Button>
                       </div>
                    </motion.div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
