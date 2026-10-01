import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { Complaint, ComplaintStatus } from '../types';
import { 
  PlusCircle, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  Building2, 
  Award,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface StudentDashboardProps {
  onOpenSubmit: () => void;
  onOpenComplaint: (id: string, tab?: 'track' | 'history' | 'resolution' | 'overview') => void;
  onOpenDeals: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onOpenSubmit,
  onOpenComplaint,
  onOpenDeals
}) => {
  const { user } = useAuth();
  const { 
    complaints, 
    activeFilter, 
    setActiveFilter, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    claimedDeals
  } = useComplaints();

  // Metrics
  const totalCount = complaints.length;
  const pendingCount = complaints.filter(c => c.status === 'SUBMITTED' || c.status === 'VERIFIED').length;
  const inProgressCount = complaints.filter(c => c.status === 'FORWARDED' || c.status === 'IN_PROGRESS').length;
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;

  const statusFilters: (ComplaintStatus | 'ALL')[] = [
    'ALL',
    'SUBMITTED',
    'VERIFIED',
    'FORWARDED',
    'IN_PROGRESS',
    'RESOLVED'
  ];

  const categories = [
    'ALL',
    'Electrical',
    'Plumbing',
    'Cleaning & Sanitation',
    'Furniture & Carpentry',
    'Internet & Wi-Fi',
    'Lab Equipment',
    'Hostel & Mess'
  ];

  // Filtering
  const filteredComplaints = complaints.filter(item => {
    if (activeFilter !== 'ALL' && item.status !== activeFilter) return false;
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchId = item.complaintId.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      if (!matchTitle && !matchId && !matchLoc) return false;
    }
    return true;
  });

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

  return (
    <div className="py-10 bg-zinc-100 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header in Pure White Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-fuchsia-600 mb-1">
              <span>Student Service Command Center</span>
              <span>·</span>
              <span className="font-mono bg-fuchsia-50 px-2 py-0.5 rounded border border-fuchsia-200">
                {user?.studentId || 'MCA2026001'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Welcome, {user?.fullName || 'Arun Kumar'}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mt-1">
              <span className="flex items-center gap-1 font-medium text-zinc-700">
                <Building2 className="w-3.5 h-3.5 text-fuchsia-600" />
                {user?.collegeName || 'College of Engineering Trivandrum'}
              </span>
              <span>·</span>
              <span>{user?.department}</span>
              <span>·</span>
              <span className="text-fuchsia-600 font-semibold">{user?.semester}</span>
            </div>
          </div>

          {/* Action CTAs in Magenta + White */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDeals}
              className="px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 hover:border-fuchsia-300 text-xs font-bold text-zinc-700 hover:text-fuchsia-600 transition-colors cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-fuchsia-600" />
              <span>Campus Deals ({claimedDeals.length})</span>
            </button>

            <button
              onClick={onOpenSubmit}
              className="px-5 py-2.5 text-xs font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 rounded-xl shadow-lg shadow-fuchsia-600/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Complaint</span>
            </button>
          </div>
        </div>

        {/* Dashboard 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-sm">
            <span className="text-xs font-semibold text-zinc-500 block mb-1">
              Total Complaints
            </span>
            <div className="text-3xl font-extrabold text-zinc-900 font-mono">
              {totalCount}
            </div>
            <div className="text-[11px] text-zinc-400 mt-2">
              All submitted campus issues
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-sm">
            <span className="text-xs font-semibold text-sky-700 block mb-1">
              Pending Verification
            </span>
            <div className="text-3xl font-extrabold text-sky-800 font-mono">
              {pendingCount}
            </div>
            <div className="text-[11px] text-zinc-400 mt-2">
              Awaiting Student Union check
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-sm">
            <span className="text-xs font-semibold text-amber-700 block mb-1">
              Work In Progress
            </span>
            <div className="text-3xl font-extrabold text-amber-800 font-mono">
              {inProgressCount}
            </div>
            <div className="text-[11px] text-zinc-400 mt-2">
              Technician assigned & repair ETA
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-sm">
            <span className="text-xs font-semibold text-fuchsia-700 block mb-1">
              Resolved & Verified
            </span>
            <div className="text-3xl font-extrabold text-fuchsia-800 font-mono">
              {resolvedCount}
            </div>
            <div className="text-[11px] text-zinc-400 mt-2">
              Signed off and inspected
            </div>
          </div>

        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 mb-8 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Complaint ID, Title, or Campus Block..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-zinc-400" />
              <span className="text-xs text-zinc-600 font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 focus:outline-none focus:border-fuchsia-600 cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c === 'ALL' ? 'All Categories' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Filter Tabs (Button Segmented Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 scrollbar-none">
            <span className="text-xs text-zinc-500 mr-2 shrink-0">Status:</span>
            {statusFilters.map((st) => (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeFilter === st
                    ? 'bg-fuchsia-600 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 border border-zinc-200'
                }`}
              >
                {st === 'ALL' ? 'All Complaints' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

        </div>

        {/* Complaints Listing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
            <span>Showing {filteredComplaints.length} complaints</span>
            <span>Private to your student account</span>
          </div>

          {filteredComplaints.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 mb-1">
                No complaints found
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-5 leading-relaxed">
                {searchQuery || activeFilter !== 'ALL' || selectedCategory !== 'ALL'
                  ? 'No complaints matched your active search or filter criteria.'
                  : 'Report your first campus maintenance issue and track its lifecycle transparently.'}
              </p>
              <button
                onClick={onOpenSubmit}
                className="px-4 py-2 text-xs font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-md shadow-fuchsia-600/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report a Problem</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredComplaints.map((c) => {
                const badge = getStatusBadge(c.status);
                return (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-fuchsia-300 shadow-sm hover:shadow transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1.5">
                      {/* Unboxed Metadata (Zero-pill discipline) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                        <span className="font-mono text-fuchsia-600 font-bold">{c.complaintId}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-zinc-700 font-medium">{c.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {new Date(c.submittedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        {c.expectedCompletionDate && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-700 font-semibold">ETA: {c.expectedCompletionDate}</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-zinc-900 group-hover:text-fuchsia-600 transition-colors">
                        {c.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate">{c.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${badge.class}`}>
                        {badge.label}
                      </div>

                      <button
                        onClick={() => onOpenComplaint(c.id, 'track')}
                        className="px-3.5 py-2 text-xs font-bold text-zinc-700 hover:text-fuchsia-600 bg-zinc-50 hover:bg-fuchsia-50 border border-zinc-200 hover:border-fuchsia-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>Track</span>
                        <ChevronRight className="w-3.5 h-3.5 text-fuchsia-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
