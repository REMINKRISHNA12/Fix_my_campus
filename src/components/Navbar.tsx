import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, PlusCircle, User, LogOut, CheckCircle2, KeyRound } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenSubmit: () => void;
  onOpenProfile: () => void;
  onSelectNav: (section: 'home' | 'how-it-works' | 'deals' | 'dashboard') => void;
  activeNav: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenSubmit,
  onOpenProfile,
  onSelectNav,
  activeNav
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 border-b border-zinc-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectNav('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-fuchsia-600 text-white flex items-center justify-center shadow-md shadow-fuchsia-600/25 group-hover:bg-fuchsia-700 transition-colors">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-zinc-900 block leading-none">
              FixMyCampus <span className="text-fuchsia-600 font-bold">Kerala</span>
            </span>
            <span className="text-[11px] text-zinc-500 block mt-1 tracking-wide">
              Campus Complaint & Student Perks
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600">
          <button
            onClick={() => onSelectNav('home')}
            className={`hover:text-fuchsia-600 transition-colors cursor-pointer ${
              activeNav === 'home' ? 'text-fuchsia-600 font-semibold' : ''
            }`}
          >
            Home
          </button>
          {isAuthenticated && (
            <button
              onClick={() => onSelectNav('dashboard')}
              className={`hover:text-fuchsia-600 transition-colors cursor-pointer ${
                activeNav === 'dashboard' ? 'text-fuchsia-600 font-semibold' : ''
              }`}
            >
              My Complaints
            </button>
          )}
          <button
            onClick={() => onSelectNav('deals')}
            className={`hover:text-fuchsia-600 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeNav === 'deals' ? 'text-fuchsia-600 font-semibold' : ''
            }`}
          >
            <span>Kerala Student Deals</span>
            <span className="w-2 h-2 rounded-full bg-fuchsia-600 animate-pulse"></span>
          </button>
          <button
            onClick={() => onSelectNav('how-it-works')}
            className={`hover:text-fuchsia-600 transition-colors cursor-pointer ${
              activeNav === 'how-it-works' ? 'text-fuchsia-600 font-semibold' : ''
            }`}
          >
            How It Works
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenSubmit}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-fuchsia-600 hover:bg-fuchsia-700 rounded-lg shadow-md shadow-fuchsia-600/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report Problem</span>
              </button>

              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 hover:border-fuchsia-300 transition-colors cursor-pointer text-left"
                title="View Profile and Claimed Perks"
              >
                <div className="w-7 h-7 rounded-full bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200 flex items-center justify-center text-xs font-bold">
                  {user.fullName.charAt(0)}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-zinc-800 leading-none truncate max-w-[120px]">
                    {user.fullName}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1 truncate max-w-[120px] flex items-center gap-1">
                    <span>{user.studentId}</span>
                    {user.isVerifiedInstitutionalEmail && (
                      <CheckCircle2 className="w-2.5 h-2.5 text-fuchsia-600" />
                    )}
                  </div>
                </div>
              </button>

              <button
                onClick={logout}
                className="p-2 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-fuchsia-600 hover:bg-fuchsia-700 rounded-lg shadow-md shadow-fuchsia-600/20 transition-all cursor-pointer whitespace-nowrap"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
