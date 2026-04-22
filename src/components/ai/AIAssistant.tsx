"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Send, 
  X, 
  Minus, 
  Sparkles, 
  Cpu, 
  Loader2, 
  MessageSquare,
  Zap,
  RefreshCw
} from "lucide-react";
import { useResumeStore } from "@/lib/store";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const store = useResumeStore();
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleAction = (action: any) => {
    console.log("Executing AI Action:", action);
    try {
      switch (action.type) {
        case "updatePersonalInfo":
          store.updatePersonalInfo(action.payload);
          break;
        case "updateSummary":
          store.updateSummary(action.payload);
          break;
        case "addExperience":
          store.addExperience(action.payload);
          break;
        case "addEducation":
          store.addEducation(action.payload);
          break;
        case "addProject":
          store.addProject(action.payload);
          break;
        case "updateSkills":
          store.updateSkills(action.payload);
          break;
        case "addSkill":
          store.addSkill(action.payload);
          break;
        default:
          console.warn("Unknown AI action type:", action.type);
      }
    } catch (err) {
      console.error("Action execution failed:", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          currentData: store.data
        })
      });

      const data = await response.json();

      if (data.actions && Array.isArray(data.actions)) {
        data.actions.forEach(handleAction);
        toast.success("AI updated your portfolio settings.");
      }

      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (err) {
      toast.error("Failed to connect to Xeloria AI");
      setMessages(prev => [...prev, { role: "assistant", content: "I encountered a communication delay. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[calc(100vw-2rem)] md:w-[400px] h-[500px] md:h-[550px] bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                    XELORIA AI <Sparkles className="h-3 w-3 text-indigo-400" />
                  </h3>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Link: Synced</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <Minus className="h-4 w-4 text-slate-500" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-4">
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                    <Cpu className="h-10 w-10 text-indigo-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                      I can help you fill your details. Just say something like:<br/>
                      <span className="text-indigo-300 mt-2 block">"My name is Surinder and I'm a developer"</span>
                    </p>
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                    m.role === "user" 
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20" 
                      : "bg-white/5 border border-white/10 text-slate-300 rounded-tl-none"
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Processing Data...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Tell me your details..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 pr-14"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-500 transition-all disabled:opacity-50 shadow-lg shadow-indigo-600/20"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-indigo-600/90 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 shadow-2xl"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" /> Need Help? Ask AI
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className={`h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transition-all relative border-2 ${
            isOpen ? "bg-white text-black border-white" : "bg-indigo-600 text-white border-indigo-400/50"
          }`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-7 w-7" />}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-purple-500 rounded-full border-2 border-[#050505] flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
};
