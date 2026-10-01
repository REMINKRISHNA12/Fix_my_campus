import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentUser } from '../types';
import { SEED_STUDENT } from '../data/initialComplaints';
import { KERALA_COLLEGES } from '../data/keralaColleges';

export interface DecodedJWTPayload {
  userId: string;
  studentId: string;
  role: 'STUDENT';
  fullName: string;
  email: string;
  collegeId: string;
  collegeDomain: string;
  iss: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  user: StudentUser | null;
  token: string | null;
  refreshToken: string | null;
  decodedToken: DecodedJWTPayload | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  quickDemoLogin: (collegeId?: string) => void;
  register: (studentData: {
    fullName: string;
    studentId: string;
    email: string;
    phone: string;
    collegeId: string;
    department: string;
    semester: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  refreshJWT: () => Promise<boolean>;
  verifyInstitutionalEmail: (pinCode?: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<StudentUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'fmc_student_user';
const STORAGE_KEY_TOKEN = 'fmc_jwt_access_token';
const STORAGE_KEY_REFRESH = 'fmc_jwt_refresh_token';

// JWT Generator helper for localhost-optimized JWT simulation
const createJWT = (user: StudentUser, expiresInMinutes = 60): { token: string; refreshToken: string; decoded: DecodedJWTPayload } => {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInMinutes * 60;
  
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload: DecodedJWTPayload = {
    userId: user.id,
    studentId: user.studentId,
    role: 'STUDENT',
    fullName: user.fullName,
    email: user.email,
    collegeId: user.collegeId,
    collegeDomain: user.collegeDomain,
    iss: 'FixMyCampus-Kerala-AuthService',
    iat: now,
    exp
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  // HMAC-SHA256 signature simulation for client-side JWT compliance
  const mockSignature = btoa(`${encodedHeader}.${encodedPayload}.secret_key_fixmycampus_2026`).replace(/=/g, '');

  const token = `${encodedHeader}.${encodedPayload}.${mockSignature}`;
  const refreshToken = `ref_${btoa(`${user.id}_${now}_${Math.random()}`)}`;

  return { token, refreshToken, decoded: payload };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // First load defaults to null so dedicated login/signup page is shown first!
  const [user, setUser] = useState<StudentUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TOKEN);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return null;
  });

  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_REFRESH);
    } catch {
      return null;
    }
  });

  const [decodedToken, setDecodedToken] = useState<DecodedJWTPayload | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(decodeURIComponent(escape(atob(parts[1]))));
          setDecodedToken(payload);
        }
      } catch {
        setDecodedToken(null);
      }
    } else {
      setDecodedToken(null);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  }, [token]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEY_REFRESH, refreshToken);
    } else {
      localStorage.removeItem(STORAGE_KEY_REFRESH);
    }
  }, [refreshToken]);

  const login = async (identifier: string, pass: string, rememberMe = true): Promise<{ success: boolean; error?: string }> => {
    const cleanId = identifier.trim().toLowerCase();
    if (!cleanId || !pass.trim()) {
      return { success: false, error: 'Please enter both Student ID/Email and password.' };
    }

    if (pass.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    // Match with one of the standard Kerala seed students or build session
    let matchedStudent: StudentUser;
    
    if (cleanId.includes('cet') || cleanId.includes('arun') || cleanId === 'mca2026001') {
      matchedStudent = SEED_STUDENT;
    } else if (cleanId.includes('cusat') || cleanId.includes('ananya') || cleanId.includes('csu23')) {
      matchedStudent = {
        id: 'usr_ananya_cusat_002',
        studentId: 'CSU23MCA018',
        fullName: 'Ananya Nair',
        email: 'ananya.nair@cusat.ac.in',
        phone: '+91 98460 33412',
        collegeId: 'cusat',
        collegeName: 'Cochin University of Science and Technology',
        collegeDomain: 'cusat.ac.in',
        department: 'Master of Computer Applications (MCA)',
        semester: 'S4',
        isVerifiedInstitutionalEmail: true,
        createdAt: '2026-08-05T09:00:00.000Z'
      };
    } else if (cleanId.includes('gec') || cleanId.includes('tcr') || cleanId.includes('farhan')) {
      matchedStudent = {
        id: 'usr_farhan_gec_003',
        studentId: 'TCR22CS089',
        fullName: 'Farhan Ali',
        email: 'farhan.ali@gectcr.ac.in',
        phone: '+91 94002 88124',
        collegeId: 'gectcr',
        collegeName: 'Government Engineering College Thrissur',
        collegeDomain: 'gectcr.ac.in',
        department: 'Computer Science & Engineering (CSE)',
        semester: 'S6',
        isVerifiedInstitutionalEmail: true,
        createdAt: '2026-08-10T11:00:00.000Z'
      };
    } else {
      // Dynamic student login
      const college = KERALA_COLLEGES.find(c => cleanId.includes(c.id) || cleanId.includes(c.domain)) || KERALA_COLLEGES[0];
      const isDomainMatch = cleanId.endsWith('.ac.in') || cleanId.endsWith('.edu');
      const studentId = cleanId.includes('@') ? cleanId.split('@')[0].toUpperCase().slice(0, 10) : cleanId.toUpperCase();

      matchedStudent = {
        id: `usr_${Date.now()}`,
        studentId,
        fullName: studentId.startsWith('TVE') ? 'Arun Kumar' : 'Kerala Engineering Student',
        email: cleanId.includes('@') ? cleanId : `${cleanId.toLowerCase()}@${college.domain}`,
        phone: '+91 94471 28930',
        collegeId: college.id,
        collegeName: college.name,
        collegeDomain: college.domain,
        department: 'Master of Computer Applications (MCA)',
        semester: 'S3',
        isVerifiedInstitutionalEmail: isDomainMatch,
        createdAt: new Date().toISOString()
      };
    }

    const { token: jwt, refreshToken: rToken, decoded } = createJWT(matchedStudent);

    setUser(matchedStudent);
    setToken(jwt);
    setRefreshToken(rToken);
    setDecodedToken(decoded);

    return { success: true };
  };

  const quickDemoLogin = (collegeId = 'cet') => {
    let demoUser: StudentUser;
    if (collegeId === 'cet') {
      demoUser = SEED_STUDENT;
    } else if (collegeId === 'cusat') {
      demoUser = {
        id: 'usr_ananya_cusat_002',
        studentId: 'CSU23MCA018',
        fullName: 'Ananya Nair',
        email: 'ananya.nair@cusat.ac.in',
        phone: '+91 98460 33412',
        collegeId: 'cusat',
        collegeName: 'Cochin University of Science and Technology',
        collegeDomain: 'cusat.ac.in',
        department: 'Master of Computer Applications (MCA)',
        semester: 'S4',
        isVerifiedInstitutionalEmail: true,
        createdAt: '2026-08-05T09:00:00.000Z'
      };
    } else {
      demoUser = {
        id: 'usr_farhan_gec_003',
        studentId: 'TCR22CS089',
        fullName: 'Farhan Ali',
        email: 'farhan.ali@gectcr.ac.in',
        phone: '+91 94002 88124',
        collegeId: 'gectcr',
        collegeName: 'Government Engineering College Thrissur',
        collegeDomain: 'gectcr.ac.in',
        department: 'Computer Science & Engineering (CSE)',
        semester: 'S6',
        isVerifiedInstitutionalEmail: true,
        createdAt: '2026-08-10T11:00:00.000Z'
      };
    }

    const { token: jwt, refreshToken: rToken, decoded } = createJWT(demoUser);
    setUser(demoUser);
    setToken(jwt);
    setRefreshToken(rToken);
    setDecodedToken(decoded);
  };

  const register = async (data: {
    fullName: string;
    studentId: string;
    email: string;
    phone: string;
    collegeId: string;
    department: string;
    semester: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!data.fullName.trim() || !data.studentId.trim() || !data.email.trim() || !data.phone.trim()) {
      return { success: false, error: 'All fields are mandatory.' };
    }

    const emailLower = data.email.trim().toLowerCase();
    const college = KERALA_COLLEGES.find(c => c.id === data.collegeId) || KERALA_COLLEGES[0];
    const isInstitutional = emailLower.endsWith('.ac.in') || emailLower.endsWith('.edu') || emailLower.includes(college.domain);

    const newUser: StudentUser = {
      id: `usr_stu_${Date.now()}`,
      studentId: data.studentId.trim().toUpperCase(),
      fullName: data.fullName.trim(),
      email: emailLower,
      phone: data.phone.trim(),
      collegeId: college.id,
      collegeName: college.name,
      collegeDomain: college.domain,
      department: data.department,
      semester: data.semester,
      isVerifiedInstitutionalEmail: isInstitutional,
      createdAt: new Date().toISOString()
    };

    const { token: jwt, refreshToken: rToken, decoded } = createJWT(newUser);

    setUser(newUser);
    setToken(jwt);
    setRefreshToken(rToken);
    setDecodedToken(decoded);
    return { success: true };
  };

  const refreshJWT = async (): Promise<boolean> => {
    if (!user) return false;
    const { token: newJwt, refreshToken: newRef, decoded } = createJWT(user);
    setToken(newJwt);
    setRefreshToken(newRef);
    setDecodedToken(decoded);
    return true;
  };

  const verifyInstitutionalEmail = (): boolean => {
    if (!user) return false;
    const updated = {
      ...user,
      isVerifiedInstitutionalEmail: true
    };
    setUser(updated);
    const { token: newJwt, decoded } = createJWT(updated);
    setToken(newJwt);
    setDecodedToken(decoded);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    setDecodedToken(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_REFRESH);
  };

  const updateProfile = (data: Partial<StudentUser>) => {
    if (!user) return;
    const updated = {
      ...user,
      ...data
    };
    setUser(updated);
    const { token: newJwt, decoded } = createJWT(updated);
    setToken(newJwt);
    setDecodedToken(decoded);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        decodedToken,
        isAuthenticated: !!user && !!token,
        login,
        quickDemoLogin,
        register,
        refreshJWT,
        verifyInstitutionalEmail,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
