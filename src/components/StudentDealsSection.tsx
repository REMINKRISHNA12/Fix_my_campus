import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintContext';
import { StudentDeal } from '../types';
import { 
  Tag, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  X
} from 'lucide-react';

interface StudentDealsSectionProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const StudentDealsSection: React.FC<StudentDealsSectionProps> = ({ onOpenAuth }) => {
  const { user, isAuthenticated, verifyInstitutionalEmail } = useAuth();
  const { allDeals, claimedDeals, claimStudentDeal } = useComplaints();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeDealModal, setActiveDealModal] = useState<StudentDeal | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  const categories = ['ALL', 'Tech & Dev', 'Canteen & Food', 'Travel & Transit', 'Academics & Books', 'Hostel Life'];

  const filteredDeals = allDeals.filter(d => {
    if (selectedCategory === 'ALL') return true;
    return d.category === selectedCategory;
  });

  const isVerified = user?.isVerifiedInstitutionalEmail ?? false;

  const handleClaim = (deal: StudentDeal) => {
    if (!isAuthenticated) {
      onOpenAuth('login');
      return;
    }
    if (!isVerified) {
      setVerificationFeedback('Please verify your Kerala college email to unlock this perk.');
      return;
    }
    claimStudentDeal(deal.id);
    setActiveDealModal(deal);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleInstantVerify = () => {
    verifyInstitutionalEmail();
    setVerificationFeedback('Institutional email verified successfully! All student perks are now active.');
    setTimeout(() => setVerificationFeedback(null), 4000);
  };

  return (
    <section id="deals" className="py-16 bg-zinc-50 relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header & Verification Status Card */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-xs font-bold text-fuchsia-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>Kerala Student Privilege Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Exclusive Campus Deals & Perks
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Subsidized transit, cloud dev tool grants, canteen waivers, and state-wide innovation passes exclusively for verified Kerala institution emails (<span className="text-fuchsia-700 font-semibold">.ac.in / .edu</span>).
            </p>
          </div>

          {/* Verification Status Card */}
          <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-sm max-w-md w-full">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isVerified ? 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {isVerified ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">
                      {user.collegeName}
                    </div>
                    <div className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                      <span className="font-mono">{user.email}</span>
                      {isVerified && <span className="text-fuchsia-600 font-bold">· Verified</span>}
                    </div>
                  </div>
                </div>

                {!isVerified && (
                  <button
                    onClick={handleInstantVerify}
                    className="px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100 bg-amber-50 border border-amber-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Verify Email
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-zinc-600">
                  Sign in with your Kerala college email to unlock all passes.
                </div>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  Verify Now
                </button>
              </div>
            )}

            {verificationFeedback && (
              <div className="mt-2 text-xs text-fuchsia-700 bg-fuchsia-50 p-2 rounded-lg border border-fuchsia-200">
                {verificationFeedback}
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/20'
                  : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200 shadow-sm'
              }`}
            >
              {cat === 'ALL' ? 'All Campus Perks' : cat}
            </button>
          ))}
        </div>

        {/* Deals Cards Grid in Pure White on Grey Base */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDeals.map((deal) => {
            const isClaimed = claimedDeals.includes(deal.id);
            return (
              <div
                key={deal.id}
                className="relative rounded-3xl bg-white border border-zinc-200/90 hover:border-fuchsia-300 p-5 flex flex-col justify-between transition-all shadow-sm hover:shadow-md group hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-fuchsia-700 bg-fuchsia-50 px-2 py-0.5 rounded border border-fuchsia-200">
                      {deal.category}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      {deal.perkBadge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 mb-1 group-hover:text-fuchsia-600 transition-colors">
                    {deal.title}
                  </h3>

                  <div className="text-xs font-bold text-fuchsia-600 mb-2">
                    {deal.discount}
                  </div>

                  <div className="text-xs text-zinc-500 mb-4 line-clamp-3 leading-relaxed">
                    {deal.description}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <div className="text-[11px] text-zinc-400 mb-3 truncate">
                    Partner: <span className="text-zinc-700 font-medium">{deal.provider}</span>
                  </div>

                  <button
                    onClick={() => handleClaim(deal)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isClaimed
                        ? 'bg-zinc-100 text-fuchsia-700 border border-fuchsia-200'
                        : 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-md shadow-fuchsia-600/20'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-fuchsia-600" />
                        <span>View Claimed Voucher</span>
                      </>
                    ) : (
                      <>
                        <Tag className="w-3.5 h-3.5" />
                        <span>Unlock Student Deal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Deal Voucher Modal in White + Grey */}
      {activeDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 text-left shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setActiveDealModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-600 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Kerala Institutional Student Perk</span>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mb-1">
              {activeDealModal.title}
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              Issued for: {user?.fullName || 'Verified Student'} · {user?.collegeName || 'Kerala College'}
            </p>

            {/* Voucher Code Box */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 mb-5 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-0.5">
                  Exclusive Promo / Voucher Token
                </div>
                <div className="font-mono text-base font-extrabold text-fuchsia-700 tracking-wider">
                  {activeDealModal.code}
                </div>
              </div>

              <button
                onClick={() => handleCopy(activeDealModal.code)}
                className="px-3 py-1.5 rounded-xl bg-white border border-zinc-300 text-zinc-800 hover:border-fuchsia-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-fuchsia-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Terms and Instructions */}
            <div className="space-y-3 mb-5">
              <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                How to Redeem
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                {activeDealModal.claimInstructions}
              </p>

              <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider mt-3">
                Terms & Conditions
              </div>
              <ul className="text-xs text-zinc-500 space-y-1.5 pl-4 list-disc">
                {activeDealModal.terms.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-3 border-t border-zinc-100">
              <span>Valid through: {activeDealModal.expiresOn}</span>
              <button
                onClick={() => setActiveDealModal(null)}
                className="px-4 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Close Voucher
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
