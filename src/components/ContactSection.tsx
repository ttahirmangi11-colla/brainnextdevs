import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { SiteSettings } from '../types/index.js';

interface ContactSectionProps {
  settings: SiteSettings;
  prefilledService?: string;
  prefilledPlan?: string;
  onInquirySubmitted?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  prefilledService = '',
  prefilledPlan = '',
  onInquirySubmitted
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Website Development');
  const [budget, setBudget] = useState('$5,000 - $10,000');
  const [projectDetails, setProjectDetails] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Sync prefilled data
  useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
    }
    if (prefilledPlan) {
      setProjectDetails((prev) => 
        prev ? `${prev}\n[Selected Package: ${prefilledPlan}]` : `Inquiring about ${prefilledPlan} plan.`
      );
    }
  }, [prefilledService, prefilledPlan]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (at least 2 characters).';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid business or personal email address.';
    }
    if (!phone || phone.trim().length < 7) {
      errs.phone = 'Please enter a valid phone number (at least 7 digits).';
    }
    if (!service) {
      errs.service = 'Please select a required service category.';
    }
    if (!projectDetails.trim() || projectDetails.trim().length < 10) {
      errs.projectDetails = 'Please provide at least 10 characters detailing your project goals.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccessMessage(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          service,
          budget,
          projectDetails
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server rejected submission. Please verify fields.');
      }

      setSuccessMessage(data.message || 'Inquiry successfully submitted to Brain The Next Devs.');
      // Reset form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setProjectDetails('');
      if (onInquirySubmitted) {
        onInquirySubmitted();
      }
    } catch (err: any) {
      setApiError(err.message || 'Network error occurred while connecting to backend.');
    } finally {
      setLoading(false);
    }
  };

  const servicesList = [
    'Website Development',
    'Software Development',
    'Mobile App Development',
    'E-commerce Websites',
    'AI Solutions',
    'UI/UX Design',
    'Database Development',
    'Website Maintenance',
    'Custom Enterprise Consulting'
  ];

  const budgetTiers = [
    '< $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
    'Flexible / Undetermined'
  ];

  return (
    <section id="contact" className="py-20 bg-[#030712] relative">
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
            Direct Engineering Inquiry
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
            Start Your Project
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Send your project scope directly to our technical architects. We respond with a tailored feasibility assessment within 24 hours.
          </p>
        </div>

        {/* 2-Column Layout: Left Contact Info, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Company Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800/80">
              <h3 className="text-2xl font-bold text-white mb-2">
                Let&apos;s Build the Future
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-8">
                Whether you need a custom enterprise platform, a mobile application, or an AI copilot, our team is ready to engineer your vision.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Technical Inquiries
                    </div>
                    <a
                      href={`mailto:${settings.email || 'brainnextdeve@gmail.com'}`}
                      className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                    >
                      {settings.email || 'brainnextdeve@gmail.com'}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Direct Phone
                    </div>
                    <div className="text-sm font-semibold text-white">
                      <a
                        href={`tel:${(settings.phone || '+92 03256740073').replace(/\s+/g, '')}`}
                        className="hover:text-cyan-400 transition-colors"
                      >
                        {settings.phone || '+92 03256740073'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Global Tech Hub
                    </div>
                    <div className="text-sm text-slate-300">
                      {settings.address || 'Innovation Tech Park, Suite 400, Global Silicon District'}
                    </div>
                  </div>
                </div>

                {/* Response SLA */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Guaranteed Response Time
                    </div>
                    <div className="text-sm text-cyan-300 font-semibold font-mono">
                      Within 24 Hours on Business Days
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Assurance Notice */}
            <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed font-mono">
              Non-Disclosure Guaranteed: All inquiries, specifications, and project documents are treated under strict proprietary confidentiality.
            </div>

          </div>

          {/* Right Column: Verified Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-slate-950/80 border border-slate-800/80 relative">
            
            {/* Success Banner */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Inquiry Transmitted Successfully!</div>
                  <div className="text-xs text-emerald-200 mt-0.5">{successMessage}</div>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {apiError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Submission Error</div>
                  <div className="text-xs text-rose-200 mt-0.5">{apiError}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alexander Vance"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                      errors.fullName
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alexander@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                      errors.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & Required Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Phone Number <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 019-2834"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                      errors.phone
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Required Service <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer"
                  >
                    {servicesList.map((srv) => (
                      <option key={srv} value={srv} className="bg-slate-900 text-white">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Budget Range */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Estimated Investment Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer font-mono"
                >
                  {budgetTiers.map((b) => (
                    <option key={b} value={b} className="bg-slate-900 text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 4: Project Details */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Project Details & Scope <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Describe your project requirements, target platforms, timelines, or existing systems..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                    errors.projectDetails
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-400'
                  }`}
                />
                {errors.projectDetails && (
                  <p className="text-xs text-rose-400 mt-1 font-mono">{errors.projectDetails}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-98"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Transmitting Inquiry to MongoDB...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-cyan-300" />
                    <span>Send Message &amp; Request Technical Proposal</span>
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
