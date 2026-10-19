import React, { useState } from 'react';
import { ExternalLink, Eye, Code, Layers, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types/index.js';

interface PortfolioSectionProps {
  projects: ProjectItem[];
  onOpenProjectDetails: (project: ProjectItem) => void;
  onOpenLiveDemo: (project: ProjectItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
  onOpenProjectDetails,
  onOpenLiveDemo
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Websites' | 'Applications' | 'Software'>('All');

  const filterCategories = ['All', 'Websites', 'Applications', 'Software'] as const;

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-[#02050e] relative border-b border-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
            Portfolio & Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
            Our Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Engineered proof of technical competence. Demonstration systems and interactive models.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat === 'All' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Category Pill & Demo tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-slate-950/90 border border-cyan-500/30 px-2.5 py-0.5 rounded-md">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-300 bg-slate-900/80 border border-slate-700 px-2 py-0.5 rounded-md">
                      Demonstration
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {project.shortDesc}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-slate-300 bg-slate-900/90 border border-slate-800/90 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] font-mono text-slate-500 px-1 py-0.5">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Details & Live Demo */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => onOpenProjectDetails(project)}
                  className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Details</span>
                </button>

                {project.isDemoAvailable && (
                  <button
                    onClick={() => onOpenLiveDemo(project)}
                    className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
