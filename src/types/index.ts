export type ComplaintStatus = 
  | 'SUBMITTED' 
  | 'VERIFIED' 
  | 'FORWARDED' 
  | 'IN_PROGRESS' 
  | 'RESOLVED' 
  | 'REJECTED';

export type ComplaintCategory = 
  | 'Electrical' 
  | 'Plumbing' 
  | 'Cleaning & Sanitation' 
  | 'Furniture & Carpentry' 
  | 'Internet & Wi-Fi' 
  | 'Lab Equipment' 
  | 'Hostel & Mess' 
  | 'Other';

export type PriorityLevel = 'Normal' | 'High' | 'Urgent';

export interface KeralaCollege {
  id: string;
  name: string;
  shortName: string;
  district: string;
  domain: string;
  affiliation: string;
  established: number;
  popularLocations: string[];
}

export interface StudentUser {
  id: string;
  studentId: string; // e.g. TVE23MC042 or MCA2026001
  fullName: string;
  email: string;
  phone: string;
  collegeId: string;
  collegeName: string;
  collegeDomain: string;
  department: string;
  semester: string;
  isVerifiedInstitutionalEmail: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface ComplaintHistoryEntry {
  id: string;
  status: ComplaintStatus;
  remark: string;
  timestamp: string;
  updatedByRole: 'Student' | 'Student Union' | 'Office Authority' | 'Chief Maintenance Officer' | 'Campus Technician';
  expectedCompletionDate?: string;
  technicianName?: string;
}

export interface Complaint {
  id: string;
  complaintId: string; // e.g. FMC-2026-1025
  studentId: string;
  studentName: string;
  collegeName: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  priority: PriorityLevel;
  imageUrl?: string;
  status: ComplaintStatus;
  submittedAt: string;
  verifiedAt?: string;
  forwardedAt?: string;
  expectedCompletionDate?: string;
  resolvedAt?: string;
  finalResolution?: string;
  assignedAuthority?: string;
  technicianAssigned?: string;
  studentRating?: number;
  studentFeedback?: string;
  history: ComplaintHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface StudentDeal {
  id: string;
  title: string;
  provider: string;
  discount: string;
  category: 'Tech & Dev' | 'Canteen & Food' | 'Travel & Transit' | 'Academics & Books' | 'Hostel Life';
  description: string;
  eligibleDomains: string[]; // e.g. ["cet.ac.in", "cusat.ac.in", "all_kerala_ac_in"]
  code: string;
  expiresOn: string;
  perkBadge: string;
  terms: string[];
  claimInstructions: string;
  popularIn: string; // e.g. "CET, CUSAT, GEC Thrissur"
}
