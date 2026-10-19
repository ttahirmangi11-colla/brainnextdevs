import React from 'react';
import { Check, Shield, Sparkles, Send, Layers } from 'lucide-react';
import { ProductItem } from '../types/index.js';

interface ProductsSectionProps {
  products: ProductItem[];
  onRequestDemo: (product: ProductItem) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onRequestDemo
}) => {
  return (
    <section id="products" className="py-20 bg-[#030712] relative border-b border-slate-900">
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
            Proprietary Architecture & Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
            Software Products
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Engineered software systems designed for high-scale enterprise operations and institution automation.
          </p>
          <div className="text-[11px] font-mono text-slate-500 mt-2">
            * Sample software product frameworks ready for customized enterprise deployment.
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-12">
          {products.map((product, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={product.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Media Screen Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] group bg-slate-900">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full aspect-video object-cover object-center group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-300 bg-slate-950/90 border border-cyan-500/30 px-3 py-1 rounded-md">
                        {product.status} Deployment
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 flex flex-col items-start ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                    Enterprise Solution
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium text-cyan-200/90 mb-4">
                    {product.tagline}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Modules Pills */}
                  {product.modules && product.modules.length > 0 && (
                    <div className="mb-6 w-full">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                        Included Modules:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.modules.map((m, i) => (
                          <span
                            key={i}
                            className="text-xs text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  <div className="space-y-2 mb-8 w-full">
                    {product.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={() => onRequestDemo(product)}
                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <Send className="w-4 h-4 text-cyan-300" />
                    <span>Request a Demo of {product.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
