import React from 'react';
import { SiteStats } from '../types/index.js';

interface StatsRowProps {
  stats: SiteStats;
  notice?: string;
}

export const StatsRow: React.FC<StatsRowProps> = ({ stats, notice }) => {
  const statItems = [
    { value: stats.projectsCompleted || '250+', label: 'PROJECTS COMPLETED' },
    { value: stats.happyClients || '180+', label: 'HAPPY CLIENTS' },
    { value: stats.yearsExperience || '8+', label: 'YEARS OF EXPERIENCE' },
    { value: stats.technicalSupport || '24/7', label: 'TECHNICAL SUPPORT' }
  ];

  return (
    <div className="w-full mt-10 sm:mt-14 pt-8 border-t border-slate-800/80">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-800/60">
        {statItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center md:items-start ${
              index === 0 ? 'md:pl-0' : 'md:px-6 lg:px-8'
            } py-2`}
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-mono tabular-nums">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                {item.value}
              </span>
            </div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-400 mt-1 uppercase">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      {notice && (
        <div className="text-[10px] text-slate-500 text-center md:text-left mt-3 font-mono">
          * {notice}
        </div>
      )}
    </div>
  );
};
