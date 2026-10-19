import React from 'react';
import { Linkedin, Github, Twitter, Crown, Sparkles } from 'lucide-react';
import { TeamMemberItem } from '../types/index.js';

interface TeamSectionProps {
  team: TeamMemberItem[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
  // Ensure exactly 3 members are displayed
  const displayTeam = team.slice(0, 3);

  return (
    <section id="team" className="py-20 bg-[#02050e] relative border-b border-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
            Leadership & Core Talent
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 mb-4">
            Our Core Team
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Guided by visionary leadership and senior engineering craft.
          </p>
        </div>

        {/* Exactly 3 Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {displayTeam.map((member) => {
            const isCEO = member.isFounder || member.role.toLowerCase().includes('ceo');

            return (
              <div
                key={member.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isCEO
                    ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-[#030712] border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.35)] lg:-translate-y-2'
                    : 'bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                }`}
              >
                {/* Special CEO badge indicator */}
                {isCEO && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold font-mono tracking-wider text-slate-950 bg-gradient-to-r from-cyan-300 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                      <Crown className="w-3.5 h-3.5 text-slate-950" />
                      CEO &amp; FOUNDER
                    </span>
                  </div>
                )}

                <div>
                  {/* Portrait with decorative ring */}
                  <div className="relative mb-6 mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden group">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
                        isCEO ? 'ring-2 ring-cyan-400/80' : 'ring-1 ring-slate-700'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Name and Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <div
                      className={`text-xs font-semibold font-mono tracking-wider uppercase ${
                        isCEO ? 'text-cyan-300' : 'text-slate-400'
                      }`}
                    >
                      {member.role}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-center mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-slate-900/90 flex items-center justify-center gap-3">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
