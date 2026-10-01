import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { 
  X, 
  Building2, 
  CheckCircle2, 
  LogOut,
  Check
} from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDeals: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenDeals
}) => {
  const { user, logout, updateProfile, verifyInstitutionalEmail } = useAuth();
  const { claimedDeals, allDeals } = useComplaints();

  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const userClaimedList = allDeals.filter(d => claimedDeals.includes(d.id));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ phone });
    setIsEditing(false);
    setSuccessMsg('Profile updated successfully.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleVerify = () => {
    verifyInstitutionalEmail();
    setSuccessMsg('Kerala institutional email verified! All campus perks unlocked.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 text-left shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-100">
          <div className="w-14 h-14 rounded-2xl bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200 flex items-center justify-center text-xl font-extrabold shadow-sm">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
              <span>{user.fullName}</span>
              {user.isVerifiedInstitutionalEmail && (
                <span title="Verified Institutional Email">
                  <CheckCircle2 className="w-4 h-4 text-fuchsia-600" />
                </span>
              )}
            </h2>
            <div className="text-xs text-zinc-500 font-mono mt-0.5">
              KTU / Student ID: <span className="text-zinc-900 font-bold">{user.studentId}</span>
            </div>
            <div className="text-xs text-fuchsia-700 font-medium mt-1 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>{user.collegeName}</span>
            </div>
          </div>
        </div>

        {successMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-800 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-fuchsia-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Institutional Verification Status Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-zinc-800">
                Kerala Institutional Email
              </div>
              <div className="text-xs text-zinc-500 font-mono mt-0.5">
                {user.email}
              </div>
            </div>

            {user.isVerifiedInstitutionalEmail ? (
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200">
                Verified
              </span>
            ) : (
              <button
                onClick={handleVerify}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition-colors cursor-pointer shadow-sm shadow-fuchsia-600/20"
              >
                Verify Now
              </button>
            )}
          </div>
        </div>

        {/* Academic Details Grid */}
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-zinc-400 block mb-0.5">Department:</span>
              <span className="text-zinc-800 font-semibold">{user.department}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-zinc-400 block mb-0.5">Current Semester:</span>
              <span className="text-zinc-800 font-semibold">{user.semester}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-zinc-400">Contact Phone:</span>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-fuchsia-600 font-semibold hover:underline text-[11px] cursor-pointer"
                >
                  Edit Phone
                </button>
              )}
            </div>
            {isEditing ? (
              <form onSubmit={handleSave} className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-2.5 py-1 bg-white border border-zinc-300 rounded-lg text-zinc-900 text-xs flex-1 focus:outline-none focus:border-fuchsia-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-fuchsia-600 text-white font-bold rounded-lg text-xs cursor-pointer hover:bg-fuchsia-700"
                >
                  Save
                </button>
              </form>
            ) : (
              <span className="text-zinc-800 font-semibold">{user.phone}</span>
            )}
          </div>
        </div>

        {/* Claimed Perks Section */}
        <div className="mb-6 pt-4 border-t border-zinc-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
              Claimed Campus Perks ({userClaimedList.length})
            </span>
            <button
              onClick={() => { onClose(); onOpenDeals(); }}
              className="text-xs text-fuchsia-600 font-bold hover:underline cursor-pointer"
            >
              Browse All Deals
            </button>
          </div>

          <div className="space-y-2">
            {userClaimedList.map((d) => (
              <div
                key={d.id}
                className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-zinc-900">{d.title}</div>
                  <div className="text-[11px] text-fuchsia-700 font-mono font-semibold">{d.code}</div>
                </div>
                <span className="text-[10px] text-zinc-500 font-medium">{d.discount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-[11px] text-zinc-400">FixMyCampus Student Session</span>
          <button
            onClick={() => { logout(); onClose(); }}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>

      </div>
    </div>
  );
};
