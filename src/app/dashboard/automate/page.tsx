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
  Trash2
} from "lucide-react";
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
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTopic, setNewTopic] = useState("");

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push("/dashboard");
    } else if (isLoaded && isAdmin) {
      fetchData();
    }
  }, [isLoaded, isAdmin, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Logs
      const { data: logData, error: logError } = await supabase
        .from('automation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (logError) throw logError;
      setLogs(logData || []);

      // Fetch Topics
      const { data: settingsData, error: settingsError } = await supabase
        .from('app_settings')
        .select('*')
        .eq('key', 'blog_topics')
        .single();

      if (settingsError && settingsError.code !== 'PGRST116') throw settingsError;
      setTopics(settingsData?.value || []);

    } catch (e: any) {
      toast.error("Failed to fetch system data");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const addTopic = async () => {
    if (!newTopic) return;
    const updatedTopics = [...topics, newTopic];
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({ key: 'blog_topics', value: updatedTopics }, { onConflict: 'key' });

      if (error) throw error;
      setTopics(updatedTopics);
      setNewTopic("");
      toast.success("Node target added");
    } catch (e: any) {
      toast.error("Failed to update targets");
    }
  };

  const removeTopic = async (index: number) => {
    const updatedTopics = topics.filter((_, i) => i !== index);
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({ key: 'blog_topics', value: updatedTopics }, { onConflict: 'key' });

      if (error) throw error;
      setTopics(updatedTopics);
      toast.info("Target removed");
    } catch (e: any) {
      toast.error("Removal failed");
    }
  };

  if (!isLoaded || (isLoaded && !isAdmin)) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Activity className="h-10 w-10 animate-pulse text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full w-fit border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Automated Protocol Active</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight uppercase italic">
            Neural <span className="text-emerald-500">Automation</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            System Autonomous Engine // Cycle v1.0.42
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={fetchData}
            variant="ghost" 
            className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group"
          >
            <RefreshCcw className="h-5 w-5 text-slate-400 group-hover:rotate-180 transition-all duration-700" />
          </Button>
          <Button className="h-14 px-10 rounded-2xl bg-white text-black font-black text-[11px] uppercase tracking-widest hover:bg-slate-200">
            Force System Cycle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left Column: Automation Config */}
        <div className="xl:col-span-5 space-y-10">
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/10 p-10 space-y-8"
          >
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                  <Settings className="h-6 w-6 text-indigo-400" />
               </div>
               <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Blog Generation Targets</h3>
            </div>

            <div className="space-y-6">
               <div className="relative">
                  <Plus className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="DEFINE NEW TOPIC TARGET..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-24 text-[11px] font-black text-white focus:outline-none focus:border-indigo-500 transition-all uppercase placeholder:text-slate-700"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTopic()}
                  />
                  <button onClick={addTopic} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-6 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">ADD</button>
               </div>

               <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {topics.map((topic, i) => (
                      <motion.div 
                        key={topic}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl group hover:border-white/10 transition-all"
                      >
                         <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">{topic}</span>
                         <button onClick={() => removeTopic(i)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-500 transition-all">
                            <Trash2 className="h-4 w-4" />
                         </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>
            </div>
          </motion.section>

          <section className="grid grid-cols-2 gap-6">
             <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-4">
                <Cpu className="h-8 w-8 text-indigo-400" />
                <div>
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Neural Load</p>
                   <p className="text-2xl font-black text-white tracking-tight">12.4%</p>
                </div>
             </div>
             <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-4">
                <Zap className="h-8 w-8 text-emerald-400" />
                <div>
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Threads</p>
                   <p className="text-2xl font-black text-white tracking-tight">4 PARALLEL</p>
                </div>
             </div>
          </section>
        </div>

        {/* Right Column: Logs */}
        <div className="xl:col-span-7">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.02] backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-10 border-b border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <History className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight">System Logs</h3>
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Updates</span>
            </div>

            <div className="max-h-[700px] overflow-y-auto custom-scrollbar">
               {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="p-10 border-b border-white/5 animate-pulse flex gap-6">
                       <div className="h-10 w-10 bg-white/5 rounded-xl" />
                       <div className="flex-1 space-y-4">
                          <div className="h-4 w-1/4 bg-white/5 rounded" />
                          <div className="h-4 w-3/4 bg-white/5 rounded" />
                       </div>
                    </div>
                  ))
               ) : logs.length > 0 ? (
                  logs.map((log) => (
                    <div key={log.id} className="p-10 border-b border-white/5 hover:bg-white/[0.02] transition-all flex gap-8 items-start group">
                       <div className={`mt-1 p-3 rounded-xl border flex items-center justify-center ${
                          log.status === 'success' 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                          : 'bg-red-500/10 border-red-500/20 text-red-500'
                       }`}>
                          {log.status === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                       </div>
                       
                       <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                             <h4 className="text-[13px] font-black text-white uppercase tracking-wider">{log.action}</h4>
                             <div className="flex items-center gap-2 text-slate-500">
                                <Clock className="h-3 w-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest">{new Date(log.created_at).toLocaleString()}</span>
                             </div>
                          </div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                             {log.details || "No telemetry details provided by the execution engine."}
                          </p>
                       </div>
                    </div>
                  ))
               ) : (
                  <div className="p-20 text-center space-y-6">
                     <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                        <History className="h-10 w-10 text-slate-700" />
                     </div>
                     <p className="text-slate-500 font-black text-xs uppercase tracking-widest">No system telemetry recorded.</p>
                  </div>
               )}
            </div>
            
            <div className="p-10 bg-white/5 flex items-center justify-center">
               <Button variant="ghost" className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-white">
                  Load Historical Telemetry
               </Button>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
