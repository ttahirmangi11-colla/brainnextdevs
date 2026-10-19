import React from 'react';
import { Target, Compass, Zap, Shield, ArrowRight, Check } from 'lucide-react';

interface AboutSectionProps {
  onStartProject: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onStartProject }) => {
  const coreValues = [
    {
      title: 'Relentless Innovation',
      desc: 'We explore frontiers in AI, cloud-native architecture, and web performance to keep clients years ahead of their competitors.'
    },
    {
      title: 'Engineering Rigor',
      desc: 'Clean code architecture, comprehensive automated testing, and strict security hardening are non-negotiable standards.'
    },
    {
      title: 'Client Velocity',
      desc: 'Agile sprints with rapid feedback loops ensure software delivers tangible business ROI from the very first release.'
    },
    {
      title: 'Security-First Mindset',
      desc: 'Enterprise data sovereignty, role-based protection, and robust compliance guidelines protect your assets unconditionally.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      name: 'Discovery & Blueprint',
      desc: 'We dissect your business workflow, technical requirements, user personas, and performance benchmarks into an executable roadmap.'
    },
    {
      step: '02',
      name: 'System Architecture',
      desc: 'Crafting resilient database schemas, API contracts, infrastructure blueprints, and interactive UI/UX wireframes.'
    },
    {
      step: '03',
      name: 'Agile Engineering',
      desc: 'Bi-weekly sprint deliverables with clean modular code, continuous integration, and frequent stakeholder demonstration reviews.'
    },
    {
      step: '04',
      name: 'Quality Assurance',
      desc: 'Rigorous cross-device stress testing, security audits, database indexing, and performance optimization for sub-second speeds.'
    },
    {
      step: '05',
      name: 'Deployment & SLA Support',
      desc: 'Zero-downtime production launch, automated cloud backups, ongoing security maintenance, and dedicated technical SLAs.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#030712] relative border-b border-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
            About Brain The Next Devs
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Think Beyond. Build the Future.
          </p>
        </div>

        {/* Company Introduction & Mission / Vision Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          
          {/* Main Story Box */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                Our Genesis & Drive
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
                Pioneering the Next Era of Digital Engineering
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                Brain The Next Devs was founded on a singular conviction: that modern digital products require more than just writing code—they demand deep architectural foresight, cutting-edge AI integration, and flawless human-centric design.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                From high-conversion web platforms to mission-critical ERP systems and intelligent AI copilots, we partner with visionary enterprises, high-growth startups, and academic institutions to transform ambitious ideas into market-defining technology.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-900 flex flex-wrap items-center gap-6">
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">In-House Engineering</div>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block" />
              <div>
                <div className="text-2xl font-bold font-mono text-white">99.8%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">On-Time Milestones</div>
              </div>
              <div className="h-8 w-px bg-slate-800 hidden sm:block" />
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400">&lt;1.5s</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Median Page Load</div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Stack */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            {/* Mission */}
            <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800/90 flex-1 flex flex-col justify-center">
              <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-500/40 flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Our Mission</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                To empower forward-thinking organizations worldwide with robust, secure, and intuitive digital solutions that eliminate complexity and accelerate sustainable scale.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800/90 flex-1 flex flex-col justify-center">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5 text-cyan-300" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Our Vision</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                To be the global benchmark for next-generation software development, celebrated for unyielding technical craftsmanship, ethical innovation, and tangible client success.
              </p>
            </div>
          </div>

        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Core Principles Guiding Every Commit
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                <div className="text-xs font-mono text-cyan-400 mb-2">0{idx + 1}</div>
                <h4 className="text-base font-bold text-white mb-2">{val.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Development Process (5 steps) */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
              Methodology
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Our 5-Stage Development Process
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between group hover:border-cyan-500/40 transition-all"
              >
                <div>
                  <div className="text-2xl font-black font-mono text-cyan-500/40 group-hover:text-cyan-400 transition-colors mb-3">
                    {step.step}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{step.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-950 to-cyan-950/40 border border-cyan-500/30 text-center flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to Engineer Your Next Digital Breakthrough?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-6">
            Consult directly with our senior development team to scope your architecture, timeline, and investment.
          </p>
          <button
            onClick={onStartProject}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>Start Your Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
