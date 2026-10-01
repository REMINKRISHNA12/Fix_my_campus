import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { KERALA_COLLEGES, KERALA_DEPARTMENTS, SEMESTERS } from '../data/keralaColleges';
import { 
  X, 
  ShieldCheck, 
  GraduationCap, 
  AlertCircle, 
  Building2, 
  Lock, 
  Mail, 
  User, 
  Phone,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const { login, register, quickDemoLogin } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCollegeId, setRegCollegeId] = useState('cet');
  const [regDepartment, setRegDepartment] = useState(KERALA_DEPARTMENTS[0]);
  const [regSemester, setRegSemester] = useState('S3');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setError('Please enter your Student ID or institutional email.');
      return;
    }
    setIsLoading(true);
    setError(null);
    const res = await login(loginIdentifier, loginPassword);
    setIsLoading(false);
    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Invalid credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regStudentId.trim() || !regEmail.trim()) {
      setError('All fields are required.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setError(null);
    const res = await register({
      fullName: regFullName,
      studentId: regStudentId,
      email: regEmail,
      phone: regPhone,
      collegeId: regCollegeId,
      department: regDepartment,
      semester: regSemester,
      password: regPassword
    });
    setIsLoading(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Registration failed.');
    }
  };

  const handleQuickDemo = (collegeId: string) => {
    quickDemoLogin(collegeId);
    onClose();
  };

  const selectedCollege = KERALA_COLLEGES.find(c => c.id === regCollegeId) || KERALA_COLLEGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 text-left shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Kerala Student Authentication</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'login' ? 'Student Portal Login' : 'Register Student Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Access your maintenance complaints & verified Kerala campus perks.'
              : 'Sign up with your Kerala institutional email to unlock student discounts.'}
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950/80 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              mode === 'register'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register Account
          </button>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Student ID or Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="e.g. MCA2026001 or arunkumar@cet.ac.in"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer font-medium mt-2"
            >
              {isLoading ? 'Verifying Student Session...' : 'Authenticate & Sign In'}
            </button>

            {/* Quick Demo Logins for Examiner/Evaluator testing */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Fast Evaluation Student Logins (1-Click)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('cet')}
                  className="p-2 text-left rounded-lg bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-emerald-400 text-[11px]">Arun Kumar</div>
                  <div className="text-[10px] text-slate-500">CET Trivandrum</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('cusat')}
                  className="p-2 text-left rounded-lg bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-teal-400 text-[11px]">Ananya Nair</div>
                  <div className="text-[10px] text-slate-500">CUSAT Kochi</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('gectcr')}
                  className="p-2 text-left rounded-lg bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="font-semibold text-indigo-400 text-[11px]">Farhan Ali</div>
                  <div className="text-[10px] text-slate-500">GEC Thrissur</div>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Arun Kumar"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Student ID / KTU Reg No *
                </label>
                <input
                  type="text"
                  required
                  value={regStudentId}
                  onChange={(e) => setRegStudentId(e.target.value)}
                  placeholder="e.g. TVE23MC042"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>
            </div>

            {/* College Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Kerala Institution / College *
              </label>
              <select
                value={regCollegeId}
                onChange={(e) => setRegCollegeId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
              >
                {KERALA_COLLEGES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.district})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Institutional Email *
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder={`student@${selectedCollege.domain}`}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                />
                <span className="text-[10px] text-emerald-400/80 block mt-0.5">
                  Matches @{selectedCollege.domain} for perks
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 94470 00000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Department *
                </label>
                <select
                  value={regDepartment}
                  onChange={(e) => setRegDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                >
                  {KERALA_DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Semester *
                </label>
                <select
                  value={regSemester}
                  onChange={(e) => setRegSemester(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                >
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer font-medium mt-3"
            >
              {isLoading ? 'Creating Verified Account...' : 'Complete Student Registration'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
