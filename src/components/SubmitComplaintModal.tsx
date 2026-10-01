import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { ComplaintCategory, PriorityLevel } from '../types';
import { KERALA_COLLEGES } from '../data/keralaColleges';
import { 
  X, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  Building2
} from 'lucide-react';

interface SubmitComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (complaintId: string) => void;
}

export const SubmitComplaintModal: React.FC<SubmitComplaintModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { submitComplaint, complaints } = useComplaints();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('Plumbing');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('Normal');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentCollege = KERALA_COLLEGES.find(c => c.id === user?.collegeId) || KERALA_COLLEGES[0];
  const nextComplaintId = `FMC-2026-${1042 + complaints.length}`;

  const categories: ComplaintCategory[] = [
    'Electrical',
    'Plumbing',
    'Cleaning & Sanitation',
    'Furniture & Carpentry',
    'Internet & Wi-Fi',
    'Lab Equipment',
    'Hostel & Mess',
    'Other'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please upload an image file (JPEG, PNG, or WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size must be less than 5MB.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.length < 5) {
      setError('Please enter a clear title (at least 5 characters).');
      return;
    }
    if (!location.trim()) {
      setError('Please specify the campus location (e.g., Hostel Block B Room 102).');
      return;
    }
    if (!description.trim() || description.length < 15) {
      setError('Please describe the issue in detail (at least 15 characters).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const created = await submitComplaint({
        title,
        category,
        location,
        priority,
        description,
        imageUrl: imagePreview || undefined
      });

      setIsSubmitting(false);
      onSuccess(created.id);
      onClose();
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err?.message || 'Failed to submit complaint. Please retry.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 text-left shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-600 font-bold mb-1">
            <span>Next Auto-Generated ID: {nextComplaintId}</span>
            <span>·</span>
            <span>Server Timestamp Enforced</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Report Campus Maintenance Issue
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
            <Building2 className="w-3.5 h-3.5 text-fuchsia-600" />
            <span>{user?.collegeName || currentCollege.name}</span>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
              Complaint Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken Water Bibcock Tap in Ground Floor Washroom"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 transition-colors"
            />
          </div>

          {/* Category & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Issue Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 transition-colors cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Priority Level *
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 transition-colors cursor-pointer"
              >
                <option value="Normal">Normal</option>
                <option value="High">High (Affects Lab/Class)</option>
                <option value="Urgent">Urgent (Safety/Water/Power Risk)</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                Campus Location / Room / Block *
              </label>
              <span className="text-[11px] text-zinc-400">Be as specific as possible</span>
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Men's Hostel Block A, 2nd Floor Room 214"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 transition-colors"
            />

            {/* Quick Location Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] text-zinc-400 self-center">Suggestions:</span>
              {currentCollege.popularLocations.slice(0, 3).map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className="text-[11px] px-2 py-0.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
              Detailed Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the symptom, exact device/fixture affected, and when the issue started..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 transition-colors resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
              Photo Evidence (Optional, max 5MB)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 border-2 border-dashed border-zinc-300 hover:border-fuchsia-400 rounded-2xl p-3.5 flex items-center justify-center gap-2 cursor-pointer bg-zinc-50 text-zinc-500 hover:text-zinc-800 transition-colors">
                <Upload className="w-4 h-4 text-fuchsia-600" />
                <span className="text-xs font-medium">Attach image (PNG, JPG, WEBP)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-fuchsia-300 shrink-0 shadow-sm">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute inset-0 bg-zinc-900/70 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
            <div className="text-[11px] text-zinc-400">
              Initial status: <span className="text-zinc-700 font-bold">SUBMITTED</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-50 rounded-xl shadow-md shadow-fuchsia-600/25 transition-all cursor-pointer flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Logging Record...</span>
                ) : (
                  <>
                    <span>Submit Complaint</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
