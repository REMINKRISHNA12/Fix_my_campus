import React from 'react';
import { 
  Clock, 
  ShieldCheck, 
  Activity, 
  History, 
  CheckCircle, 
  Award, 
  Layers
} from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      title: 'Easy Complaint Submission',
      desc: 'Intuitive forms with auto-categorization for Electrical, Plumbing, Labs, Wi-Fi, and Hostel wings across Kerala campuses.',
      icon: Layers
    },
    {
      title: 'Transparent Tracking Timeline',
      desc: 'Visual milestone pipeline from submission, physical verification, work-order dispatch to technician assignment.',
      icon: Activity
    },
    {
      title: 'Automatic Server Timestamps',
      desc: 'Zero browser tampering. Every stage transition logs exact immutable UTC/IST timestamps for complete institutional accountability.',
      icon: Clock
    },
    {
      title: 'Immutable Complaint History',
      desc: 'Append-only audit trail recording every inspection remark, work delay note, and authority reassignment without retroactive alteration.',
      icon: History
    },
    {
      title: 'Verified Resolution Proof',
      desc: 'Final inspection sign-off, technician diagnostic notes, before-and-after photo verification, and student feedback rating.',
      icon: CheckCircle
    },
    {
      title: 'Kerala Student Perks & Deals',
      desc: 'Exclusive discounts on KSRTC student passes, Kerala Startup Mission fab-labs, KTU developer packs, and campus canteen meal cards.',
      icon: Award
    }
  ];

  return (
    <section className="py-16 bg-zinc-100/60 relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold text-fuchsia-600 uppercase tracking-wider mb-2">
            Engineered for Campus Governance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Features Built for Student Trust
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-2 leading-relaxed">
            Eliminating bureaucratic opacity with real-time lifecycle tracking, strict student privacy, and verified institutional perks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-3xl bg-white border border-zinc-200/90 hover:border-fuchsia-300 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow group"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 text-fuchsia-600 border border-zinc-200 flex items-center justify-center mb-5 group-hover:bg-fuchsia-600 group-hover:text-white transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-2 group-hover:text-fuchsia-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
