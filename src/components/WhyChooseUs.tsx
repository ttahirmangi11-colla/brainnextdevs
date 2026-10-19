import React from 'react';
import {
  Cpu,
  CheckCircle,
  Smartphone,
  Shield,
  Clock,
  Headphones
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: 'Modern Technology',
      description: 'We harness state-of-the-art tech stacks including React, Node.js, TypeScript, cloud microservices, and cutting-edge generative AI.'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-cyan-400" />,
      title: 'Quality Development',
      description: 'Rigorous unit testing, modular clean code conventions, and high-performance standards ensure defect-free, scalable deployments.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
      title: 'Responsive Design',
      description: 'Pixel-perfect typography and fluid viewports tailored seamlessly for smartphones, tablets, laptops, and ultra-wide desktop monitors.'
    },
    {
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      title: 'Secure Solutions',
      description: 'End-to-end data encryption, role-based access control, OWASP compliance, and database protection built in from day zero.'
    },
    {
      icon: <Clock className="w-6 h-6 text-cyan-400" />,
      title: 'On-Time Delivery',
      description: 'Disciplined agile sprints with transparent milestone reporting keep your development cycle strictly on target and on budget.'
    },
    {
      icon: <Headphones className="w-6 h-6 text-cyan-400" />,
      title: 'Ongoing Support',
      description: 'Dedicated post-launch warranty, continuous uptime monitoring, security patching, and rapid-response technical SLA coverage.'
    }
  ];

  return (
    <section className="py-20 bg-[#02050e] relative border-b border-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
            Our Competitive Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
            Why Choose Us
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            We bridge visionary design with mission-critical software engineering to deliver measurable commercial velocity.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] transition-all duration-300 group backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {pt.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {pt.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {pt.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
