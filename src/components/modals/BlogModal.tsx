import React from 'react';
import { X, Calendar, Clock, User, Share2 } from 'lucide-react';
import { BlogPostItem } from '../../types/index.js';

interface BlogModalProps {
  blog: BlogPostItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ blog, isOpen, onClose }) => {
  if (!isOpen || !blog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950 border border-cyan-500/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Title */}
        <div className="mb-6 pr-8">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded">
            {blog.category}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 leading-snug">
            {blog.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-4 pb-4 border-b border-slate-900">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              {blog.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {blog.publishDate}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {blog.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {blog.imageUrl && (
          <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full mb-8 bg-slate-900 border border-slate-800">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p className="font-semibold text-slate-200 text-base sm:text-lg leading-relaxed">
            {blog.summary}
          </p>
          <p>{blog.content}</p>
          <p>
            In modern production architectures, maintaining separation of concerns while fostering cross-system telemetry is vital. High-concurrency services must remain resilient against network partitions, while user experience demands low cognitive friction and fast paint times.
          </p>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            Key Takeaway: Prioritize resilient domain models and automated continuous integration before scaling horizontal workloads.
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Published by Brain The Next Devs Editorial
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
          >
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
};
