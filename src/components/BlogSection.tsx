import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { BlogPostItem } from '../types/index.js';

interface BlogSectionProps {
  blogs: BlogPostItem[];
  onReadArticle: (blog: BlogPostItem) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogs, onReadArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Software Development', 'AI Solutions', 'Website Development', 'Mobile Applications'];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  return (
    <section id="blog" className="py-20 bg-[#02050e] relative border-b border-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
            Engineering Insights & Articles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
            Tech Blog & Tutorials
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Insights, architectural patterns, and practical guides from the engineers at Brain The Next Devs.
          </p>
          <div className="text-[11px] font-mono text-slate-500 mt-2">
            * Sample publication articles for demonstration.
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]"
            >
              <div>
                {/* Image */}
                {blog.imageUrl && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-slate-950/90 border border-cyan-500/30 px-2 py-0.5 rounded">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {blog.publishDate}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {blog.summary}
                  </p>
                </div>
              </div>

              {/* Author & Read More button */}
              <div className="p-5 pt-0 border-t border-slate-900 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono truncate max-w-[120px]">
                  <User className="w-3.5 h-3.5 text-cyan-500" />
                  {blog.author}
                </span>

                <button
                  onClick={() => onReadArticle(blog)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
