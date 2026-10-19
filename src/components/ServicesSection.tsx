import React from 'react';
import {
  Globe,
  Code,
  Smartphone,
  ShoppingCart,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { ServiceItem } from '../types/index.js';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onRequestQuoteWithService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
  onRequestQuoteWithService
}) => {
  // Helper to map icon names to Lucide icons
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe className="w-6 h-6 text-cyan-400" />;
      case 'Code': return <Code className="w-6 h-6 text-cyan-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-cyan-400" />;
      case 'ShoppingCart': return <ShoppingCart className="w-6 h-6 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-cyan-400" />;
      case 'Database': return <Database className="w-6 h-6 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      default: return <Code className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#030712] relative border-b border-slate-900">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
            Capabilities & Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Complete digital solutions to help your business succeed.
          </p>
        </div>

        {/* 8 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 backdrop-blur-sm"
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Micro Features list */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-1.5 mb-6 pt-4 border-t border-slate-900">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Links */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-900 mt-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onRequestQuoteWithService(service.title)}
                  className="text-[11px] font-medium text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services / Inquire CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 shadow-md cursor-pointer transition-all"
          >
            <span>View All Services & Request Custom Proposal</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
