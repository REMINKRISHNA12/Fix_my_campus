import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../types';
import { useComplaints } from '../context/ComplaintContext';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Star, 
  PlayCircle,
  History,
  FileText,
  Activity,
  Check
} from 'lucide-react';

interface ComplaintDetailsModalProps {
  complaintId: string | null;
  onClose: () => void;
  initialTab?: 'track' | 'history' | 'resolution' | 'overview';
}

export const ComplaintDetailsModal: React.FC<ComplaintDetailsModalProps> = ({
  complaintId,
  onClose,
  initialTab = 'track'
}) => {
  const { getComplaintById, advanceLifecycleStage, rateComplaint } = useComplaints();
  const [activeTab, setActiveTab] = useState<'overview' | 'track' | 'history' | 'resolution'>(initialTab);
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState<string>('');
  const [hasRated, setHasRated] = useState(false);

  if (!complaintId) return null;
  const complaint = getComplaintById(complaintId);
  if (!complaint) return null;

  const isResolved = complaint.status === 'RESOLVED';

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'SUBMITTED':
        return { label: 'SUBMITTED', class: 'bg-zinc-100 text-zinc-700 border-zinc-300' };
      case 'VERIFIED':
        return { label: 'VERIFIED', class: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'FORWARDED':
        return { label: 'FORWARDED', class: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'IN_PROGRESS':
        return { label: 'IN PROGRESS', class: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'RESOLVED':
        return { label: 'RESOLVED', class: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' };
      case 'REJECTED':
        return { label: 'REJECTED', class: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
  };

  const currentBadge = getStatusBadge(complaint.status);

  // Stepper milestones
  const steps = [
    {
      key: 'SUBMITTED',
      title: 'Complaint Submitted',
      role: 'Student Initial Filing',
      isCompleted: true,
      time: complaint.submittedAt,
      remark: 'Digital complaint logged with server timestamp.'
    },
    {
      key: 'VERIFIED',
      title: 'Campus Verification',
      role: 'Student Union Welfare Rep',
      isCompleted: ['VERIFIED', 'FORWARDED', 'IN_PROGRESS', 'RESOLVED'].includes(complaint.status),
      time: complaint.verifiedAt,
      remark: complaint.verifiedAt ? 'Issue physically inspected on-site by union representative.' : 'Pending on-site verification'
    },
    {
      key: 'FORWARDED',
      title: 'Forwarded to Office Authority',
      role: 'Estate / Maintenance Office',
      isCompleted: ['FORWARDED', 'IN_PROGRESS', 'RESOLVED'].includes(complaint.status),
      time: complaint.forwardedAt,
      remark: complaint.forwardedAt ? `Requisition passed to ${complaint.assignedAuthority || 'Campus Works Cell'}.` : 'Pending administrative dispatch'
    },
    {
      key: 'IN_PROGRESS',
      title: 'Work / Repair In Progress',
      role: 'Assigned Campus Technician',
      isCompleted: ['IN_PROGRESS', 'RESOLVED'].includes(complaint.status),
      time: complaint.expectedCompletionDate ? `Target ETA: ${complaint.expectedCompletionDate}` : undefined,
      remark: complaint.technicianAssigned ? `Assigned to ${complaint.technicianAssigned}. Parts dispatched.` : 'Work scheduling in queue'
    },
    {
      key: 'RESOLVED',
      title: 'Issue Resolved & Sign-Off',
      role: 'Chief Maintenance Officer',
      isCompleted: complaint.status === 'RESOLVED',
      time: complaint.resolvedAt,
      remark: complaint.finalResolution ? complaint.finalResolution : 'Awaiting physical fix and sign-off'
    }
  ];

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    rateComplaint(complaint.id, rating, feedback);
    setHasRated(true);
  };

  const handleSimulateNext = () => {
    advanceLifecycleStage(complaint.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 text-left shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
              <span className="font-mono text-fuchsia-600 font-bold">{complaint.complaintId}</span>
              <span>·</span>
              <span>{complaint.category}</span>
              <span>·</span>
              <span>Priority: {complaint.priority}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
              {complaint.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>{complaint.location}</span>
              <span>·</span>
              <span>{complaint.collegeName}</span>
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${currentBadge.class}`}>
            {currentBadge.label}
          </div>
        </div>

        {/* Tabs Bar on Grey Base */}
        <div className="flex items-center gap-2 border-b border-zinc-100 pt-3 pb-3">
          <button
            onClick={() => setActiveTab('track')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'track'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>1.5 Track Lifecycle</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1.4 Details</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>1.6 Audit History ({complaint.history.length})</span>
          </button>

          {isResolved && (
            <button
              onClick={() => setActiveTab('resolution')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'resolution'
                  ? 'bg-fuchsia-600 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>1.7 View Resolution</span>
            </button>
          )}
        </div>

        {/* Tab 1: Track Complaint (1.5) */}
        {activeTab === 'track' && (
          <div className="py-6 space-y-6">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-zinc-700">
                  Current Status: <span className="text-fuchsia-700">{complaint.status}</span>
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Expected Completion: <span className="text-zinc-900 font-semibold">{complaint.expectedCompletionDate || 'Under scheduling review'}</span>
                </div>
              </div>

              {/* Academic Lifecycle Tester for Evaluator demonstration */}
              {!isResolved && (
                <button
                  onClick={handleSimulateNext}
                  className="px-3.5 py-2 text-xs font-bold text-fuchsia-700 hover:text-fuchsia-800 bg-fuchsia-50 hover:bg-fuchsia-100 border border-fuchsia-200 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  title="Simulates workflow advance for academic evaluation"
                >
                  <PlayCircle className="w-4 h-4 text-fuchsia-600" />
                  <span>Advance Stage (Demo)</span>
                </button>
              )}
            </div>

            {/* Visual Step Timeline */}
            <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
              {steps.map((step, idx) => {
                const isActive = step.isCompleted;

                return (
                  <div key={step.key} className="relative">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-fuchsia-600 text-white ring-4 ring-fuchsia-100'
                          : 'bg-zinc-100 text-zinc-400 border border-zinc-300'
                      }`}
                    >
                      {isActive ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className={`text-sm font-bold ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`}>
                          {step.title}
                        </h4>
                        {step.time && (
                          <span className="text-[11px] font-mono text-zinc-400">
                            {new Date(step.time).toLocaleString('en-IN', {
                              dateStyle: 'medium',
                              timeStyle: 'short'
                            })}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-fuchsia-700 font-semibold mt-0.5">
                        {step.role}
                      </div>

                      <p className="text-xs text-zinc-600 mt-1 leading-relaxed bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                        {step.remark}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Details (1.4) */}
        {activeTab === 'overview' && (
          <div className="py-6 space-y-5 text-sm">
            <div>
              <div className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-1.5">
                Issue Description
              </div>
              <p className="text-zinc-800 text-sm leading-relaxed bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                {complaint.description}
              </p>
            </div>

            {/* Photo Evidence if present */}
            {complaint.imageUrl && (
              <div>
                <div className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">
                  Attached Photo Evidence
                </div>
                <div className="rounded-2xl overflow-hidden border border-zinc-200 max-h-64 max-w-sm shadow-sm">
                  <img
                    src={complaint.imageUrl}
                    alt="Complaint Evidence"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="text-xs text-zinc-400 block mb-0.5">Registered Student:</span>
                <span className="font-bold text-zinc-900">{complaint.studentName}</span>
                <span className="text-xs text-zinc-500 block mt-0.5">ID: {complaint.studentId}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="text-xs text-zinc-400 block mb-0.5">Assigned Maintenance Wing:</span>
                <span className="font-bold text-fuchsia-700">
                  {complaint.assignedAuthority || 'Campus Works Office (Pending allocation)'}
                </span>
                {complaint.technicianAssigned && (
                  <span className="text-xs text-zinc-500 block mt-0.5">
                    Lead Technician: {complaint.technicianAssigned}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: History (1.6) */}
        {activeTab === 'history' && (
          <div className="py-6 space-y-4">
            <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
              Immutable Digital Audit Trail
            </div>

            <div className="space-y-3">
              {complaint.history.map((h, i) => (
                <div
                  key={h.id || i}
                  className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-fuchsia-700">{h.status}</span>
                    <span className="font-mono text-zinc-400">
                      {new Date(h.timestamp).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-700 mb-1">{h.remark}</div>
                  <div className="text-[11px] text-zinc-400">
                    Logged by: <span className="text-zinc-600 font-semibold">{h.updatedByRole}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Resolution (1.7) */}
        {activeTab === 'resolution' && isResolved && (
          <div className="py-6 space-y-6">
            <div className="p-5 rounded-3xl bg-fuchsia-50/60 border border-fuchsia-200 space-y-3">
              <div className="flex items-center gap-2 text-fuchsia-700 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" />
                <span>Final Resolution & Campus Sign-Off</span>
              </div>

              <div className="text-sm font-bold text-zinc-900">
                Work Execution Report
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-fuchsia-100 shadow-sm">
                {complaint.finalResolution || 'Repairs executed and inspected on-site by campus facilities officer.'}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs text-zinc-600 pt-2 border-t border-fuchsia-200">
                <div>
                  <span className="text-zinc-400 block">Resolved At:</span>
                  <span className="font-mono text-zinc-800 font-semibold">
                    {new Date(complaint.resolvedAt!).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Assigned Technician:</span>
                  <span className="text-zinc-800 font-semibold">{complaint.technicianAssigned || 'Senior Maintenance Officer'}</span>
                </div>
              </div>
            </div>

            {/* Student Feedback & Rating */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
              <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                Student Satisfaction Rating
              </div>

              {complaint.studentRating || hasRated ? (
                <div className="text-xs text-fuchsia-800 flex items-center gap-2 bg-fuchsia-50 p-3 rounded-xl border border-fuchsia-200">
                  <Star className="w-4 h-4 fill-fuchsia-600 text-fuchsia-600" />
                  <span>
                    Rated: {complaint.studentRating || rating}/5 Stars — Thank you for helping improve Kerala campus facilities!
                  </span>
                </div>
              ) : (
                <form onSubmit={handleRatingSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-zinc-300 hover:text-amber-500 transition-colors cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating ? 'fill-amber-400 text-amber-500' : 'text-zinc-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-zinc-500 ml-2 font-medium">{rating} out of 5</span>
                  </div>

                  <input
                    type="text"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Optional feedback remark on the repair work..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-300 text-zinc-800 focus:outline-none focus:border-fuchsia-600"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 rounded-xl transition-colors cursor-pointer shadow-sm shadow-fuchsia-600/20"
                  >
                    Submit Student Sign-Off Rating
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
          <span>Campus Complaint Management System</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
