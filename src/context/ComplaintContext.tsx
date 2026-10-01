import React, { createContext, useContext, useState, useEffect } from 'react';
import { Complaint, ComplaintCategory, ComplaintStatus, PriorityLevel, StudentDeal } from '../types';
import { INITIAL_COMPLAINTS } from '../data/initialComplaints';
import { STUDENT_DEALS } from '../data/studentDeals';
import { useAuth } from './AuthContext';

interface NewComplaintData {
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  priority: PriorityLevel;
  imageUrl?: string;
}

interface ComplaintContextType {
  complaints: Complaint[];
  allDeals: StudentDeal[];
  claimedDeals: string[]; // deal IDs
  activeFilter: ComplaintStatus | 'ALL';
  selectedCategory: string | 'ALL';
  searchQuery: string;
  setActiveFilter: (filter: ComplaintStatus | 'ALL') => void;
  setSelectedCategory: (category: string | 'ALL') => void;
  setSearchQuery: (query: string) => void;
  submitComplaint: (data: NewComplaintData) => Promise<Complaint>;
  getComplaintById: (id: string) => Complaint | undefined;
  rateComplaint: (complaintId: string, rating: number, feedback: string) => void;
  claimStudentDeal: (dealId: string) => boolean;
  // Academic evaluation helper: simulates progression through stages without exposing admin credentials on navbar
  advanceLifecycleStage: (complaintId: string) => void;
  resetToInitialDemo: () => void;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

const STORAGE_KEY_COMPLAINTS = 'fmc_student_complaints_v1';
const STORAGE_KEY_DEALS = 'fmc_claimed_deals_v1';

export const ComplaintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_COMPLAINTS;
  });

  const [claimedDeals, setClaimedDeals] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DEALS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['ksum-dev-pass', 'ktu-cloud-pack'];
  });

  const [activeFilter, setActiveFilter] = useState<ComplaintStatus | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
    } catch {
      // ignore
    }
  }, [complaints]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DEALS, JSON.stringify(claimedDeals));
    } catch {
      // ignore
    }
  }, [claimedDeals]);

  // Strict student ownership filtering: student only accesses their own complaints
  const studentComplaints = complaints.filter(c => {
    if (!user) return false;
    // Match either by student id or if seeded for demo user
    return c.studentId === user.id || (user.id.startsWith('usr_arun') && c.studentId === 'usr_arun_cet_001');
  });

  const submitComplaint = async (data: NewComplaintData): Promise<Complaint> => {
    const nextNumber = 1042 + complaints.length;
    const complaintId = `FMC-2026-${nextNumber}`;
    const nowIso = new Date().toISOString();

    const newRecord: Complaint = {
      id: `fmc_${Date.now()}`,
      complaintId,
      studentId: user?.id || 'usr_guest',
      studentName: user?.fullName || 'Kerala Student',
      collegeName: user?.collegeName || 'College of Engineering Trivandrum',
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category,
      location: data.location.trim(),
      priority: data.priority,
      imageUrl: data.imageUrl,
      status: 'SUBMITTED',
      submittedAt: nowIso,
      history: [
        {
          id: `hist_${Date.now()}_1`,
          status: 'SUBMITTED',
          remark: 'Complaint registered digitally with campus maintenance cell. Timestamp logged.',
          timestamp: nowIso,
          updatedByRole: 'Student'
        }
      ],
      createdAt: nowIso,
      updatedAt: nowIso
    };

    setComplaints(prev => [newRecord, ...prev]);
    return newRecord;
  };

  const getComplaintById = (id: string): Complaint | undefined => {
    return complaints.find(c => c.id === id || c.complaintId === id);
  };

  const rateComplaint = (complaintId: string, rating: number, feedback: string) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId || c.complaintId === complaintId) {
          return {
            ...c,
            studentRating: rating,
            studentFeedback: feedback,
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );
  };

  const claimStudentDeal = (dealId: string): boolean => {
    if (!claimedDeals.includes(dealId)) {
      setClaimedDeals(prev => [...prev, dealId]);
    }
    return true;
  };

  // Academic lifecycle simulation tool: lets evaluators experience DFD 1.1-1.7 transitions
  const advanceLifecycleStage = (complaintId: string) => {
    setComplaints(prev =>
      prev.map(item => {
        if (item.id !== complaintId && item.complaintId !== complaintId) return item;

        const now = new Date().toISOString();
        const current = item.status;

        if (current === 'SUBMITTED') {
          return {
            ...item,
            status: 'VERIFIED',
            verifiedAt: now,
            updatedAt: now,
            history: [
              ...item.history,
              {
                id: `hist_${Date.now()}`,
                status: 'VERIFIED',
                remark: 'Complaint verified on campus by Student Union & General Secretary.',
                timestamp: now,
                updatedByRole: 'Student Union'
              }
            ]
          };
        } else if (current === 'VERIFIED') {
          return {
            ...item,
            status: 'FORWARDED',
            forwardedAt: now,
            assignedAuthority: `${item.collegeName} Estate & Maintenance Office`,
            updatedAt: now,
            history: [
              ...item.history,
              {
                id: `hist_${Date.now()}`,
                status: 'FORWARDED',
                remark: `Official requisition order raised and forwarded to ${item.collegeName} Estate Office.`,
                timestamp: now,
                updatedByRole: 'Office Authority'
              }
            ]
          };
        } else if (current === 'FORWARDED') {
          const expectedDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          return {
            ...item,
            status: 'IN_PROGRESS',
            expectedCompletionDate: expectedDate,
            technicianAssigned: 'K. Sreedharan (Chief Maintenance Technician)',
            updatedAt: now,
            history: [
              ...item.history,
              {
                id: `hist_${Date.now()}`,
                status: 'IN_PROGRESS',
                remark: `Assigned to K. Sreedharan. Parts ordered. Expected completion: ${expectedDate}.`,
                timestamp: now,
                updatedByRole: 'Campus Technician',
                expectedCompletionDate: expectedDate,
                technicianName: 'K. Sreedharan'
              }
            ]
          };
        } else if (current === 'IN_PROGRESS') {
          return {
            ...item,
            status: 'RESOLVED',
            resolvedAt: now,
            finalResolution: `Comprehensive repairs completed at ${item.location}. Electrical/mechanical inspection cleared and verified operational.`,
            updatedAt: now,
            history: [
              ...item.history,
              {
                id: `hist_${Date.now()}`,
                status: 'RESOLVED',
                remark: 'Work inspected and marked resolved. Ready for student verification.',
                timestamp: now,
                updatedByRole: 'Chief Maintenance Officer'
              }
            ]
          };
        }

        return item;
      })
    );
  };

  const resetToInitialDemo = () => {
    setComplaints(INITIAL_COMPLAINTS);
    setClaimedDeals(['ksum-dev-pass', 'ktu-cloud-pack']);
    localStorage.removeItem(STORAGE_KEY_COMPLAINTS);
    localStorage.removeItem(STORAGE_KEY_DEALS);
  };

  return (
    <ComplaintContext.Provider
      value={{
        complaints: studentComplaints,
        allDeals: STUDENT_DEALS,
        claimedDeals,
        activeFilter,
        selectedCategory,
        searchQuery,
        setActiveFilter,
        setSelectedCategory,
        setSearchQuery,
        submitComplaint,
        getComplaintById,
        rateComplaint,
        claimStudentDeal,
        advanceLifecycleStage,
        resetToInitialDemo
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};
