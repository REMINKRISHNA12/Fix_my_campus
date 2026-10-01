import React from 'react';
import { UserCheck, FileEdit, CheckCircle2, Search, CheckSquare } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Institutional Registration',
      subtitle: 'Verified Campus Identity',
      description: 'Register with your official Kerala college email (@cet.ac.in, @cusat.ac.in, etc.) and KTU student ID. Unlocks instant institutional perks.',
      icon: UserCheck
    },
    {
      step: '02',
      title: 'Submit Complaint',
      subtitle: 'Automated Record Creation',
      description: 'Choose from 8 maintenance categories, specify campus block/room, attach photo evidence. System instantly issues an immutable complaint ID.',
      icon: FileEdit
    },
    {
      step: '03',
      title: 'Campus Verification',
      subtitle: 'Student Union Validation',
      description: 'Designated campus welfare representatives physically verify the issue on-site and append official verification remarks.',
      icon: CheckCircle2
    },
    {
      step: '04',
      title: 'Authority Forwarding & ETA',
      subtitle: 'Work Order & Scheduling',
      description: 'Forwarded to Estate Office, PWD, or Campus Maintenance Cell. A licensed technician and targeted completion date are assigned.',
      icon: Search
    },
    {
      step: '05',
      title: 'Resolution & Sign-Off',
      subtitle: 'Transparent Closeout',
      description: 'Technician executes repairs, authority conducts final sign-off, and student views complete before/after resolution notes.',
      icon: CheckSquare
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-bold text-fuchsia-600 uppercase tracking-wider mb-2">
            The Student Lifecycle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            How FixMyCampus Works
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-2 leading-relaxed">
            A 5-stage transparent digital pipeline adhering to academic complaint governance standards.
            No lost papers, no manual runarounds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 rounded-3xl bg-zinc-50 border border-zinc-200/90 hover:border-fuchsia-300 transition-all flex flex-col justify-between shadow-sm hover:shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-bold text-zinc-300 group-hover:text-fuchsia-600 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white text-fuchsia-600 flex items-center justify-center border border-zinc-200 shadow-sm group-hover:bg-fuchsia-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-fuchsia-700 mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-zinc-300 font-bold">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
