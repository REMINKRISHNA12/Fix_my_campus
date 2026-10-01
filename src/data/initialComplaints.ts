import { Complaint, StudentUser } from '../types';

export const SEED_STUDENT: StudentUser = {
  id: 'usr_arun_cet_001',
  studentId: 'MCA2026001',
  fullName: 'Arun Kumar',
  email: 'arunkumar@cet.ac.in',
  phone: '+91 94471 28930',
  collegeId: 'cet',
  collegeName: 'College of Engineering Trivandrum',
  collegeDomain: 'cet.ac.in',
  department: 'Master of Computer Applications (MCA)',
  semester: 'S3',
  isVerifiedInstitutionalEmail: true,
  createdAt: '2026-08-01T08:30:00.000Z'
};

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'fmc_1025',
    complaintId: 'FMC-2026-1025',
    studentId: 'usr_arun_cet_001',
    studentName: 'Arun Kumar',
    collegeName: 'College of Engineering Trivandrum',
    title: 'Hostel Tap is Leaking in Ground Floor Washroom',
    description: 'The primary cold water bibcock tap near Basin 2 in the ground floor ablution wing is steadily leaking and dripping continuously, causing water loss and slippery tiles.',
    category: 'Plumbing',
    location: "Men's Hostel PG Block (Ramanujan) - Ground Floor Washroom",
    priority: 'Normal',
    status: 'IN_PROGRESS',
    submittedAt: '2026-08-12T09:10:00.000Z',
    verifiedAt: '2026-08-12T11:25:00.000Z',
    forwardedAt: '2026-08-12T14:00:00.000Z',
    expectedCompletionDate: '2026-08-14',
    assignedAuthority: 'CET Campus Estate & Plumbing Section',
    technicianAssigned: 'Shaji K. (Senior Plumber, Ward 4)',
    history: [
      {
        id: 'hist_1025_1',
        status: 'SUBMITTED',
        remark: 'Complaint registered by student with photo attachment.',
        timestamp: '2026-08-12T09:10:00.000Z',
        updatedByRole: 'Student'
      },
      {
        id: 'hist_1025_2',
        status: 'VERIFIED',
        remark: 'Complaint verified on-site by Student Union Hostel Welfare Committee.',
        timestamp: '2026-08-12T11:25:00.000Z',
        updatedByRole: 'Student Union'
      },
      {
        id: 'hist_1025_3',
        status: 'FORWARDED',
        remark: 'Forwarded to Estate Office & Physical Plant Maintenance Section.',
        timestamp: '2026-08-12T14:00:00.000Z',
        updatedByRole: 'Office Authority'
      },
      {
        id: 'hist_1025_4',
        status: 'IN_PROGRESS',
        remark: 'Plumber informed and parts indent raised for half-inch brass spindle valve. Expected completion: 14 Aug 2026.',
        timestamp: '2026-08-13T10:00:00.000Z',
        updatedByRole: 'Campus Technician',
        expectedCompletionDate: '2026-08-14',
        technicianName: 'Shaji K.'
      }
    ],
    createdAt: '2026-08-12T09:10:00.000Z',
    updatedAt: '2026-08-13T10:00:00.000Z'
  },
  {
    id: 'fmc_1018',
    complaintId: 'FMC-2026-1018',
    studentId: 'usr_arun_cet_001',
    studentName: 'Arun Kumar',
    collegeName: 'College of Engineering Trivandrum',
    title: 'Ceiling Fan Regulator Malfunction & Sparking',
    description: 'The step regulator for Fan 3 in the MCA department lab emitted mild sparks when switching from level 2 to level 3, and now the fan does not spin.',
    category: 'Electrical',
    location: 'MCA Department Computer Lab - Room 204',
    priority: 'High',
    status: 'RESOLVED',
    submittedAt: '2026-08-08T10:15:00.000Z',
    verifiedAt: '2026-08-08T11:40:00.000Z',
    forwardedAt: '2026-08-08T13:20:00.000Z',
    expectedCompletionDate: '2026-08-10',
    resolvedAt: '2026-08-10T16:20:00.000Z',
    finalResolution: 'Regulator unit and motor capacitor replaced with modular Schneider 4-step electronic regulator. Circuit tested under 240V load and confirmed safe.',
    assignedAuthority: 'CET Electrical Sub-Division',
    technicianAssigned: 'Vinod Nair (Licensed Wireman)',
    studentRating: 5,
    studentFeedback: 'Prompt resolution within 48 hours. The sparks issue was completely resolved and lab fan is working smoothly.',
    history: [
      {
        id: 'hist_1018_1',
        status: 'SUBMITTED',
        remark: 'Complaint filed regarding sparking electrical regulator.',
        timestamp: '2026-08-08T10:15:00.000Z',
        updatedByRole: 'Student'
      },
      {
        id: 'hist_1018_2',
        status: 'VERIFIED',
        remark: 'Urgent verification by Lab Assistant and Union Representative.',
        timestamp: '2026-08-08T11:40:00.000Z',
        updatedByRole: 'Student Union'
      },
      {
        id: 'hist_1018_3',
        status: 'FORWARDED',
        remark: 'High-priority job ticket generated and forwarded to Campus Electrical Sub-Division.',
        timestamp: '2026-08-08T13:20:00.000Z',
        updatedByRole: 'Office Authority'
      },
      {
        id: 'hist_1018_4',
        status: 'IN_PROGRESS',
        remark: 'Wireman dispatched with test gear. Power isolated for safety.',
        timestamp: '2026-08-09T09:30:00.000Z',
        updatedByRole: 'Campus Technician',
        expectedCompletionDate: '2026-08-10',
        technicianName: 'Vinod Nair'
      },
      {
        id: 'hist_1018_5',
        status: 'RESOLVED',
        remark: 'Replacement fitted and tested. Lab in-charge signed off completion.',
        timestamp: '2026-08-10T16:20:00.000Z',
        updatedByRole: 'Chief Maintenance Officer'
      }
    ],
    createdAt: '2026-08-08T10:15:00.000Z',
    updatedAt: '2026-08-10T16:20:00.000Z'
  },
  {
    id: 'fmc_1033',
    complaintId: 'FMC-2026-1033',
    studentId: 'usr_arun_cet_001',
    studentName: 'Arun Kumar',
    collegeName: 'College of Engineering Trivandrum',
    title: 'Wi-Fi Access Point Dropping Packets in Central Library',
    description: 'The ceiling AP "CET-CAMPUS-LIB-02" repeatedly disconnects students during online journal research and KTU portal paper downloads.',
    category: 'Internet & Wi-Fi',
    location: 'Central Library Reading Room - 2nd Floor East Wing',
    priority: 'Normal',
    status: 'FORWARDED',
    submittedAt: '2026-08-14T11:05:00.000Z',
    verifiedAt: '2026-08-14T14:30:00.000Z',
    forwardedAt: '2026-08-15T09:15:00.000Z',
    assignedAuthority: 'CET Computer Center & Campus Network Administration',
    history: [
      {
        id: 'hist_1033_1',
        status: 'SUBMITTED',
        remark: 'Issue registered with library access point details.',
        timestamp: '2026-08-14T11:05:00.000Z',
        updatedByRole: 'Student'
      },
      {
        id: 'hist_1033_2',
        status: 'VERIFIED',
        remark: 'Librarian confirmed periodic signal drop on 5GHz band.',
        timestamp: '2026-08-14T14:30:00.000Z',
        updatedByRole: 'Student Union'
      },
      {
        id: 'hist_1033_3',
        status: 'FORWARDED',
        remark: 'Escalated to Systems Administrator for VLAN switch port & PoE reboot check.',
        timestamp: '2026-08-15T09:15:00.000Z',
        updatedByRole: 'Office Authority'
      }
    ],
    createdAt: '2026-08-14T11:05:00.000Z',
    updatedAt: '2026-08-15T09:15:00.000Z'
  },
  {
    id: 'fmc_1041',
    complaintId: 'FMC-2026-1041',
    studentId: 'usr_arun_cet_001',
    studentName: 'Arun Kumar',
    collegeName: 'College of Engineering Trivandrum',
    title: 'Broken Wooden Armrest on Drawing Desk #14',
    description: 'Drafting desk #14 has a cracked wooden support bracket that tilts when leaning on it, preventing technical drawing drafting.',
    category: 'Furniture & Carpentry',
    location: 'Civil Engineering Dept Seminar Hall & Studio',
    priority: 'Normal',
    status: 'SUBMITTED',
    submittedAt: '2026-08-16T15:45:00.000Z',
    history: [
      {
        id: 'hist_1041_1',
        status: 'SUBMITTED',
        remark: 'Complaint submitted by student. Awaiting Student Union verification.',
        timestamp: '2026-08-16T15:45:00.000Z',
        updatedByRole: 'Student'
      }
    ],
    createdAt: '2026-08-16T15:45:00.000Z',
    updatedAt: '2026-08-16T15:45:00.000Z'
  }
];
