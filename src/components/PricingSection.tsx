import React from 'react';
import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { PricingPlanItem } from '../types/index.js';

interface PricingSectionProps {
  plans: PricingPlanItem[];
  onSelectPlan: (plan: PricingPlanItem) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ plans, onSelectPlan }) => {
  return (
    <section id="pricing" className="py-20 bg-[#030712] relative border-b border-slate-900">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
            Investment & Packages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
            Transparent Project Pricing
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Predictable engineering investments tailored to your development scope. All plans include dedicated SLA options.
          </p>
          <div className="text-[11px] font-mono text-slate-500 mt-2">
            * Illustrative guide rates. Custom scoping and admin adjustments available.
          </div>
        </div>

        {/* 3 Pricing Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-[#030712] border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.3)] lg:-translate-y-2'
                    : 'bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold font-mono tracking-wider text-slate-950 bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                      <Sparkles className="w-3.5 h-3.5" />
                      MOST POPULAR CHOICE
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-extrabold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-8 pb-6 border-b border-slate-900 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight tabular-nums">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      / {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Deliverables Included:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Support Terms */}
                  {plan.supportTerms && (
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-8 text-xs text-slate-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{plan.supportTerms}</span>
                    </div>
                  )}
                </div>

                {/* Get Started Button */}
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 px-6 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                    isPopular
                      ? 'text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                      : 'text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40'
                  }`}
                >
                  <span>Get Started with {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
