import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onSelectNav: (section: 'home' | 'how-it-works' | 'deals' | 'dashboard') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNav }) => {
  return (
    <footer className="bg-white border-t border-zinc-200 py-12 text-left text-xs text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-fuchsia-600 flex items-center justify-center text-white shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-zinc-900 tracking-tight">
                FixMyCampus <span className="text-fuchsia-600">Kerala</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-md leading-relaxed">
              Campus Complaint Management System & Verified Institutional Student Perks.
              Digitizing maintenance governance across engineering and technology colleges in Kerala with immutable timestamps and transparent lifecycle tracking.
            </p>
            <div className="text-[11px] text-zinc-400">
              MCA Academic Mini Project · Standard Student Workflow (DFD 1.1–1.7)
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Student Navigation
            </div>
            <div>
              <button
                onClick={() => onSelectNav('home')}
                className="hover:text-fuchsia-600 transition-colors cursor-pointer"
              >
                Home & Overview
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectNav('how-it-works')}
                className="hover:text-fuchsia-600 transition-colors cursor-pointer"
              >
                5-Stage Lifecycle
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectNav('deals')}
                className="hover:text-fuchsia-600 transition-colors cursor-pointer"
              >
                Kerala Student Deals
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectNav('dashboard')}
                className="hover:text-fuchsia-600 transition-colors cursor-pointer"
              >
                Student Complaints Dashboard
              </button>
            </div>
          </div>

          {/* Participating Institutions */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Participating Kerala Campuses
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              College of Engineering Trivandrum (CET) · CUSAT Kochi · NIT Calicut · GEC Thrissur · TKMCE Kollam · RSET · Model Engineering College (MEC) · MACE Kothamangalam.
            </p>
            <div className="pt-2 text-[11px] text-fuchsia-700 font-semibold">
              Verified institutional domains (@*.ac.in / @*.edu) eligible for all campus perks.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © 2026 FixMyCampus Kerala. Built for Academic Demonstration.
          </div>
          <div className="flex items-center gap-4">
            <span>Server-side Timestamps</span>
            <span>·</span>
            <span>Strict Student Ownership</span>
            <span>·</span>
            <span>Zero Public Admin Exposure</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
