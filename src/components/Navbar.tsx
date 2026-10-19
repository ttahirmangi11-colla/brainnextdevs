import React, { useState } from 'react';
import { Cpu, Menu, X, ArrowRight, Shield } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuote: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenQuote,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'products', label: 'Products' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-900/30 bg-[#030712]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Brand Wordmark & Circuit Icon */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -inset-0.5 rounded-xl bg-cyan-400/10 blur-sm pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
                Brain <span className="text-cyan-400">Next Devs</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono -mt-1 hidden sm:block">
                Think Beyond. Build the Future.
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 text-sm tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Admin portal & Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              title={isAdminLoggedIn ? "Admin Portal (Connected)" : "Admin Portal"}
              className={`p-2 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer ${
                isAdminLoggedIn
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 bg-slate-900/60'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isAdminLoggedIn ? 'Admin Panel' : 'Admin'}</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] hover:bg-right transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.55)] flex items-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-300 hover:text-white rounded-lg border border-slate-800 bg-slate-900/50 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-cyan-900/40 bg-[#030712]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-2 px-3 text-left text-sm rounded-lg transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20'
                    : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-center text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg cursor-pointer"
            >
              Get a Quote
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 px-4 rounded-lg text-xs font-mono text-center text-slate-400 bg-slate-900/80 border border-slate-800 hover:text-cyan-400 cursor-pointer"
            >
              Administrator Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
