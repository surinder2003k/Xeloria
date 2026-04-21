"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/landing/Navbar";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Hero = dynamic(() => import("@/components/landing/Hero").then(m => ({ default: m.Hero })), { ssr: false });
const Subscription = dynamic(() => import("@/components/landing/Subscription").then(m => ({ default: m.Subscription })), { ssr: false });

const Footer = () => (
  <footer className="bg-slate-950 text-white pt-16 pb-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight">Xel<span className="text-indigo-400">oria</span></span>
          </Link>
          <p className="mt-4 text-slate-400 max-w-sm text-sm leading-relaxed">
            The all-in-one platform to showcase your professional journey. Build stunning portfolio sites in minutes and share your live link with the world.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link href="#" className="text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Product</h3>
          <ul className="mt-4 space-y-3">
            <li><Link href="/templates" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Portfolio Themes</Link></li>
            <li><Link href="/blog" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Blog</Link></li>
            <li><Link href="/dashboard/portfolio-builder" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Portfolio Builder</Link></li>
            <li><Link href="/dashboard/portfolio" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Manage Site</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Company</h3>
          <ul className="mt-4 space-y-3">
            <li><Link href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">About</Link></li>
            <li><Link href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Privacy</Link></li>
            <li><Link href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Terms</Link></li>
            <li><Link href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs gap-2">
        <p>© {new Date().getFullYear()} Xeloria. All rights reserved.</p>
        <p>Built with ❤️ for professionals worldwide.</p>
      </div>
    </div>
  </footer>
);

export default function Home() {
  const contentRef = useScrollReveal();

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-white overflow-hidden">
        <Navbar />
        <main className="flex-grow">
        <Hero />

        {/* Features Section */}
        <section id="features" className="py-28 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">Why Xeloria</span>
              <h2 className="mt-6 text-4xl font-extrabold text-slate-900 tracking-tight">Everything you need to stand out</h2>
              <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">From building your profile to sharing your live site — it's all here, beautifully designed and dead simple.</p>
            </div>

            <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Enter Your Info",
                  desc: "Fill in your experience, projects, education, and skills in our guided builder.",
                },
                {
                  step: "02",
                  title: "Pick a Theme",
                  desc: "Choose from stunning, professionally designed portfolio themes — one click to apply.",
                },
                {
                  step: "03",
                  title: "Share Your Link",
                  desc: "Your site is instantly live at a unique URL. Share on LinkedIn, WhatsApp, and beyond.",
                },
              ].map((item) => (
                <div key={item.step} className="custom-reveal bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all group">
                  <div className="text-5xl font-black text-indigo-100 group-hover:text-indigo-600 transition-colors duration-500 mb-4 leading-none">{item.step}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Subscription />
      </main>
      <Footer />
    </div>
    </SmoothScrollProvider>
  );
}
