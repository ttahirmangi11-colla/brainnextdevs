import React from 'react';
import { Rocket, Search, ArrowRight, Sparkles } from 'lucide-react';
import { StatsRow } from './StatsRow.js';
import { SiteStats } from '../types/index.js';

interface HeroProps {
  stats: SiteStats;
  notice?: string;
  onStartProject: () => void;
  onExploreSolutions: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  notice,
  onStartProject,
  onExploreSolutions
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#030712] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-900">
      
      {/* Background Graphic Elements: Abstract connected polygon lines, cyan network edges, subtle radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Radial Electric Blue Glows */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute -top-20 left-10 w-[450px] h-[450px] bg-blue-700/10 rounded-full blur-[130px]" />
        
        {/* Subtle SVG Connected Polygon / Circuit Mesh */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15 stroke-cyan-500/30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="circuit-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 0 60 L 40 60 L 60 40 L 90 40 L 120 40" fill="none" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 30 120 L 30 90 L 50 70 L 50 0" fill="none" strokeWidth="0.8" />
              <circle cx="60" cy="40" r="2.5" className="fill-cyan-400" />
              <circle cx="50" cy="70" r="2" className="fill-blue-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>

        {/* Ambient floating node lights */}
        <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#06b6d4] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_14px_#3b82f6] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Split: Content on Left, AI Face on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headings & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Small Label & Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
                Welcome to Brain Next Devs
              </span>
              <span className="text-[11px] font-medium text-slate-300 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Innovative IT Solutions
              </span>
              <span className="text-[11px] font-medium text-slate-300 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-md">
                Modern Digital Technology
              </span>
            </div>

            {/* Brand Headline Sub-kicker */}
            <div className="text-sm sm:text-base font-bold tracking-wider mb-2 uppercase font-mono text-slate-300">
              <span className="text-white">Brain Next Devs</span> — <span className="text-cyan-400">Think Beyond. Build the Future.</span>
            </div>

            {/* Main Dominant Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Digital{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                Transformation
              </span>
              <br />
              Experts
            </h1>

            {/* Concise Subtitle Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              We transform innovative ideas into powerful websites, custom software, mobile applications, and AI-powered digital solutions that help businesses grow.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Primary Button */}
              <button
                onClick={onStartProject}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-cyan-200" />
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Button */}
              <button
                onClick={onExploreSolutions}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/40 hover:bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400/70 flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-sm"
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Explore Our Solutions</span>
              </button>
            </div>

          </div>

          {/* Right Column: High-Impact Digital AI Face Illustration */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Multi-layered Glowing Backdrops */}
            <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -inset-4 rounded-3xl border border-cyan-500/20 pointer-events-none shadow-[inset_0_0_40px_rgba(6,182,212,0.1)]" />

            {/* AI Human Digital Mesh Container */}
            <div className="relative w-full max-w-[440px] aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950/80 to-[#030712] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] group">
              
              <img
                src="/src/assets/images/hero_ai_digital_face_1792395886799.jpg"
                alt="Brain The Next Devs Futuristic Digital AI Neural Wireframe"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Deep Vignette Scrim that seamlessly fades into pure black background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/70 via-transparent to-[#030712]/70 pointer-events-none" />
              
              {/* Luminous Cyber Circuit Overlay Marks */}
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-cyan-400/70 uppercase">
                NEURAL ARCHITECTURE // v4
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 font-mono text-[10px] text-cyan-300/80 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                AI CORE ONLINE
              </div>
            </div>

          </div>

        </div>

        {/* Section 8: Statistics Row directly below hero */}
        <StatsRow stats={stats} notice={notice} />

      </div>
    </section>
  );
};
