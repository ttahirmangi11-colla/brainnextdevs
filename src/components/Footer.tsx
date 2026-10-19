import React from 'react';
import { Cpu, Mail, Phone, MapPin, ArrowUp, Shield } from 'lucide-react';
import { SiteSettings } from '../types/index.js';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenAdmin
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#02050e] border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-lg font-bold text-white">
                Brain <span className="text-cyan-400">Next Devs</span>
              </div>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Think Beyond. Build the Future. We engineer high-performance web platforms, custom enterprise software, mobile applications, and AI systems that power global businesses.
            </p>

            <div className="text-[11px] font-mono text-slate-500">
              ISO 9001 &amp; OWASP Compliant Engineering Standards
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Navigation
            </div>
            <ul className="space-y-2">
              {['home', 'about', 'services', 'portfolio', 'products', 'pricing', 'blog', 'contact'].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => onNavigate(s)}
                    className="hover:text-cyan-400 transition-colors capitalize cursor-pointer"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Core Capabilities
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>Website Development</li>
              <li>Software Engineering</li>
              <li>Mobile App Engineering</li>
              <li>Enterprise AI Solutions</li>
              <li>UI/UX Design Systems</li>
              <li>Database Architecture</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Headquarters
            </div>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{settings.address || 'Innovation Tech Park, Global Silicon District'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${settings.email || 'brainnextdeve@gmail.com'}`} className="hover:text-white transition-colors truncate">
                  {settings.email || 'brainnextdeve@gmail.com'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${(settings.phone || '+92 03256740073').replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {settings.phone || '+92 03256740073'}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Dashboard Portal</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Brain The Next Devs. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Security Architecture</span>
            
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 text-slate-400 ml-2 transition-colors cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
