import { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Xeloria Insights",
  description: "Career advice, resume tips, and professional portfolio guides to help you land your dream job.",
};

const posts = [
  {
    title: "How to Build an ATS-Friendly Resume in 2024",
    excerpt: "Learn the secrets of beating the robots and getting your resume seen by human recruiters.",
    date: "Oct 24, 2024",
    readTime: "5 min read",
    slug: "how-to-build-ats-friendly-resume",
    category: "Career Advice",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Why Your Portfolio Needs a Personal Brand",
    excerpt: "Standalone projects aren't enough anymore. Discover how to wrap your work in a compelling narrative.",
    date: "Oct 20, 2024",
    readTime: "8 min read",
    slug: "portfolio-personal-brand",
    category: "Design",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export default function BlogArchivePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-20 text-center space-y-4">
          <span className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-xs">Resources & Insights</span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">The Xeloria Blog</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Expert advice on career growth, personal branding, and the art of professional storytelling.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post) => (
            <article key={post.slug} className="group cursor-pointer">
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-slate-100 mb-8 relative">
                   <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                   <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-black text-slate-900 border border-white">
                        {post.category}
                      </span>
                   </div>
                </div>
                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="pt-4">
                    <Button variant="link" className="p-0 text-indigo-600 font-black flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read Full Article <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] border border-slate-200 text-center space-y-8 shadow-2xl shadow-slate-200/50">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Career insights delivered weekly.</h2>
          <p className="text-slate-500 text-lg">Join 10,000+ professionals leveling up their careers.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
             <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-6 py-4 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-medium"
             />
             <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-10 py-7 font-bold text-lg">
               Subscribe
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
