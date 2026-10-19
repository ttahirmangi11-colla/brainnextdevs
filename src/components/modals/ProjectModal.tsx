import React, { useState } from 'react';
import { X, ExternalLink, Check, Code, Laptop, Play } from 'lucide-react';
import { ProjectItem } from '../../types/index.js';

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuoteWithProject: (title: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onRequestQuoteWithProject
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation'>('overview');
  const [simState, setSimState] = useState<{ step: number; log: string[] }>({
    step: 1,
    log: ['System initialized. Awaiting user input.']
  });

  if (!isOpen || !project) return null;

  const runSimulationAction = (actionName: string) => {
    setSimState(prev => ({
      step: prev.step + 1,
      log: [`[${new Date().toLocaleTimeString()}] Executed: ${actionName} -> 200 OK`, ...prev.log]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-100 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Demonstration Project
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 border-b border-slate-900 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            System Overview &amp; Specs
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'simulation'
                ? 'bg-cyan-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Interactive Demo Sandbox
          </button>
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden aspect-video max-h-72 w-full bg-slate-900 border border-slate-800">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                Project Architecture & Scope
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.fullDesc}
              </p>
            </div>

            {/* Key Technical Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                  Key Technical Achievements
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Technology Stack Utilized
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-800/40"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Demo Sandbox simulation */
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-semibold text-white">
                    Live Demo Simulator // {project.title}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Mock Node Active
                </span>
              </div>

              <div className="text-xs text-slate-300 mb-4">
                Interact with this live demo environment to test mock endpoint response velocity and state transitions:
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => runSimulationAction('Query Realtime Records')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                >
                  Trigger Data Fetch
                </button>
                <button
                  onClick={() => runSimulationAction('Run Diagnostic Check')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  Run Diagnostics
                </button>
                <button
                  onClick={() => runSimulationAction('Simulate Transaction Load')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 transition-colors cursor-pointer"
                >
                  Simulate High Concurrency
                </button>
              </div>

              {/* Console log output */}
              <div className="p-4 rounded-xl bg-black font-mono text-[11px] text-cyan-400/90 border border-slate-800 max-h-36 overflow-y-auto space-y-1">
                <div className="text-slate-500">// Execution telemetry stream:</div>
                {simState.log.map((line, i) => (
                  <div key={i} className="leading-tight">{line}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer CTA */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Want a tailored version of this architecture for your company?
          </div>
          <button
            onClick={() => {
              onClose();
              onRequestQuoteWithProject(project.title);
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md cursor-pointer"
          >
            Request Project Scope Like This
          </button>
        </div>

      </div>
    </div>
  );
};
