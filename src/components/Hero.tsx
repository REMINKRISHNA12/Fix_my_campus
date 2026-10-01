import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowRight, 
  Check, 
  Clock, 
  MapPin, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Tag,
  Sparkles
} from 'lucide-react';
import { KERALA_COLLEGES } from '../data/keralaColleges';

interface HeroProps {
  onOpenSubmit: () => void;
  onOpenTrackDemo: (complaintId: string) => void;
  onOpenDeals: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSubmit,
  onOpenTrackDemo,
  onOpenDeals,
  onOpenAuth
}) => {
  const { isAuthenticated } = useAuth();

  const handleReportClick = () => {
    if (isAuthenticated) {
      onOpenSubmit();
    } else {
      onOpenAuth('login');
    }
  };

  const handleTrackClick = () => {
    onOpenTrackDemo('fmc_1025');
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-zinc-100/60 border-b border-zinc-200">
      {/* Light Theme Magenta Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-fuchsia-500/10 via-pink-400/10 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[300px] bg-gradient-to-br from-fuchsia-600/10 via-pink-500/5 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Kerala Institutional Banner */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-fuchsia-200 text-xs text-fuchsia-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-fuchsia-600 animate-ping" />
              <span className="font-semibold">Live across Kerala Higher Education & Engineering Campuses</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.12]">
              Fix Campus Issues.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700">
                Track Every Resolution.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed">
              Report campus maintenance issues, track progress, and stay informed from submission to resolution.
              Powered by verifiable digital complaint records, automatic timestamps, and exclusive campus perks for verified institutional student emails.
            </p>

            {/* CTAs in Magenta + White */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleReportClick}
                className="px-6 py-3.5 text-sm font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 rounded-xl shadow-lg shadow-fuchsia-600/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Report a Problem</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleTrackClick}
                className="px-6 py-3.5 text-sm font-semibold text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Track Complaint</span>
                <Clock className="w-4 h-4 text-fuchsia-600" />
              </button>

              <button
                onClick={onOpenDeals}
                className="px-4 py-3.5 text-sm font-semibold text-fuchsia-700 hover:text-fuchsia-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Tag className="w-4 h-4" />
                <span>Verified Student Deals</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center gap-6 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-fuchsia-600" />
                <span className="font-medium text-zinc-700">Strict Student Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>Server-Side Timestamps</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-fuchsia-600" />
                <span>Verified .ac.in / .edu Perks</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card in Pure White on Grey Base */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white border border-zinc-200/90 rounded-3xl p-6 shadow-xl shadow-zinc-300/40 text-left transition-all hover:border-fuchsia-400">
              
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                    <span className="font-mono text-fuchsia-600 font-bold">Complaint #FMC1025</span>
                    <span>·</span>
                    <span>Plumbing</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 leading-snug">
                    Hostel Tap is Leaking
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span>College of Engineering Trivandrum (CET)</span>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 border border-amber-200 text-amber-700">
                  In Progress
                </div>
              </div>

              {/* Location & Meta */}
              <div className="py-3 flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-100">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Hostel Block A · Basin #2</span>
                </div>
                <div>
                  ETA: <span className="text-zinc-800 font-semibold">14 Aug 2026</span>
                </div>
              </div>

              {/* Lifecycle Visual Timeline */}
              <div className="py-4 space-y-3">
                <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Complaint Lifecycle
                </div>

                <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
                  
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-fuchsia-600 text-white flex items-center justify-center text-[10px] font-bold">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <div className="text-xs font-semibold text-zinc-800">Complaint Submitted</div>
                    <div className="text-[11px] text-zinc-500">12 Aug 2026, 09:10 AM</div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-fuchsia-600 text-white flex items-center justify-center text-[10px] font-bold">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <div className="text-xs font-semibold text-zinc-800">Complaint Verified</div>
                    <div className="text-[11px] text-zinc-500">Student Union Welfare Rep</div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-fuchsia-600 text-white flex items-center justify-center text-[10px] font-bold">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <div className="text-xs font-semibold text-zinc-800">Forwarded to Office Authority</div>
                    <div className="text-[11px] text-zinc-500">CET Estate Maintenance Cell</div>
                  </div>

                  {/* Step 4: Active */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-amber-100 animate-pulse">
                      ●
                    </div>
                    <div className="text-xs font-bold text-amber-800">Repair Scheduled / In Progress</div>
                    <div className="text-[11px] text-zinc-500">Plumber assigned (Shaji K.)</div>
                  </div>

                  {/* Step 5: Upcoming */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-400 flex items-center justify-center text-[10px]">
                      ○
                    </div>
                    <div className="text-xs font-medium text-zinc-400">Resolved & Final Sign-off</div>
                    <div className="text-[11px] text-zinc-400">Pending physical inspection</div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-zinc-100">
                <button
                  onClick={handleTrackClick}
                  className="w-full py-2.5 text-xs font-bold text-fuchsia-700 hover:text-fuchsia-800 bg-fuchsia-50 hover:bg-fuchsia-100/80 border border-fuchsia-200 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Open Interactive Life-cycle Inspector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Participating Kerala Colleges Strip */}
        <div className="mt-14 pt-8 border-t border-zinc-200">
          <div className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-4">
            Partnered Institutions & Campuses Across Kerala
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {KERALA_COLLEGES.slice(0, 6).map((college) => (
              <div
                key={college.id}
                className="p-3 rounded-xl bg-white border border-zinc-200/90 hover:border-fuchsia-300 text-left transition-all shadow-sm group"
              >
                <div className="text-xs font-bold text-zinc-800 group-hover:text-fuchsia-600 transition-colors truncate">
                  {college.shortName}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                  {college.district} · {college.domain}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
