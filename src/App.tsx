/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ComplaintProvider, useComplaints } from './context/ComplaintContext';
import { DedicatedAuthPage } from './components/DedicatedAuthPage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { StudentDealsSection } from './components/StudentDealsSection';
import { StudentDashboard } from './components/StudentDashboard';
import { SubmitComplaintModal } from './components/SubmitComplaintModal';
import { ComplaintDetailsModal } from './components/ComplaintDetailsModal';
import { AuthModal } from './components/AuthModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { Footer } from './components/Footer';
import { CheckCircle2, X, Lock } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { complaints } = useComplaints();

  // Navigation State
  const [activeNav, setActiveNav] = useState<'home' | 'how-it-works' | 'deals' | 'dashboard'>('home');
  const [isGuestPreview, setIsGuestPreview] = useState(false);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Selected complaint for details/tracking modal
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [complaintInitialTab, setComplaintInitialTab] = useState<'overview' | 'track' | 'history' | 'resolution'>('track');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    // If not authenticated and on guest preview, switch back to dedicated login page
    if (!isAuthenticated) {
      setIsGuestPreview(false);
    } else {
      setAuthModalMode(mode);
      setIsAuthModalOpen(true);
    }
  };

  const handleOpenSubmit = () => {
    if (!isAuthenticated) {
      setIsGuestPreview(false);
      return;
    }
    setIsSubmitOpen(true);
  };

  const handleOpenComplaint = (id: string, tab: 'overview' | 'track' | 'history' | 'resolution' = 'track') => {
    setSelectedComplaintId(id);
    setComplaintInitialTab(tab);
  };

  const handleComplaintSuccess = (complaintId: string) => {
    showToast(
      'Complaint Submitted Successfully',
      `Record logged with server timestamp. You can track its progress immediately.`
    );
    handleOpenComplaint(complaintId, 'track');
  };

  // DEDICATED LOGIN / SIGN UP PAGE AS FIRST WHEN LOADS
  if (!isAuthenticated && !isGuestPreview) {
    return (
      <DedicatedAuthPage onEnterGuestPreview={() => setIsGuestPreview(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl bg-white border border-fuchsia-200 p-4 shadow-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-fuchsia-600 shrink-0 mt-0.5" />
          <div className="text-left flex-1">
            <h4 className="text-xs font-bold text-zinc-900">{toastMessage.title}</h4>
            <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{toastMessage.desc}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-zinc-400 hover:text-zinc-600 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Guest Mode Indicator Bar if user explored preview */}
      {!isAuthenticated && isGuestPreview && (
        <div className="bg-fuchsia-50 border-b border-fuchsia-200 px-4 py-2 text-xs text-fuchsia-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-fuchsia-600" />
            <span>
              You are currently viewing in <strong className="font-semibold">Guest Preview Mode</strong>.
            </span>
          </div>
          <button
            onClick={() => setIsGuestPreview(false)}
            className="font-bold text-fuchsia-700 hover:text-fuchsia-800 underline cursor-pointer"
          >
            ← Return to Dedicated Login & Sign Up Page
          </button>
        </div>
      )}

      {/* Top Bar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenSubmit={handleOpenSubmit}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectNav={(nav) => setActiveNav(nav)}
        activeNav={activeNav}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {activeNav === 'dashboard' && isAuthenticated ? (
          <StudentDashboard
            onOpenSubmit={handleOpenSubmit}
            onOpenComplaint={handleOpenComplaint}
            onOpenDeals={() => setActiveNav('deals')}
          />
        ) : activeNav === 'deals' ? (
          <div className="pt-2">
            <StudentDealsSection onOpenAuth={handleOpenAuth} />
          </div>
        ) : activeNav === 'how-it-works' ? (
          <div className="pt-2">
            <HowItWorks />
            <Features />
          </div>
        ) : (
          /* Home view */
          <>
            <Hero
              onOpenSubmit={handleOpenSubmit}
              onOpenTrackDemo={(id) => handleOpenComplaint(id, 'track')}
              onOpenDeals={() => setActiveNav('deals')}
              onOpenAuth={handleOpenAuth}
            />
            
            <StudentDealsSection onOpenAuth={handleOpenAuth} />

            <HowItWorks />

            <Features />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onSelectNav={(nav) => setActiveNav(nav)} />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      <SubmitComplaintModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSuccess={handleComplaintSuccess}
      />

      <ComplaintDetailsModal
        complaintId={selectedComplaintId}
        onClose={() => setSelectedComplaintId(null)}
        initialTab={complaintInitialTab}
      />

      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenDeals={() => {
          setIsProfileOpen(false);
          setActiveNav('deals');
        }}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ComplaintProvider>
        <AppContent />
      </ComplaintProvider>
    </AuthProvider>
  );
}
