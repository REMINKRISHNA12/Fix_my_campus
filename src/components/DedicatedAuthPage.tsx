import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { KERALA_COLLEGES, KERALA_DEPARTMENTS, SEMESTERS } from '../data/keralaColleges';
import { 
  ShieldCheck, 
  GraduationCap, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  KeyRound, 
  ArrowRight, 
  AlertCircle,
  Clock,
  Layers,
  Check
} from 'lucide-react';

interface DedicatedAuthPageProps {
  onEnterGuestPreview?: () => void;
}

export const DedicatedAuthPage: React.FC<DedicatedAuthPageProps> = ({ onEnterGuestPreview }) => {
  const { login, register, quickDemoLogin } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('arunkumar@cet.ac.in');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

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

  const selectedCollege = KERALA_COLLEGES.find(c => c.id === regCollegeId) || KERALA_COLLEGES[0];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setError('Please provide your Student ID or institutional email.');
      return;
    }
    setIsLoading(true);
    setError(null);
    const res = await login(loginIdentifier, loginPassword, rememberMe);
    setIsLoading(false);
    if (!res.success) {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regStudentId.trim() || !regEmail.trim()) {
      setError('All fields are mandatory.');
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
    if (!res.success) {
      setError(res.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 flex flex-col justify-between relative overflow-hidden">
      
      {/* Light Theme Background Decorative Ambient Accents */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-fuchsia-500/10 via-fuchsia-400/5 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[300px] bg-gradient-to-t from-pink-500/10 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

      {/* Top Header Bar */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-zinc-200/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-fuchsia-600 text-white flex items-center justify-center shadow-md shadow-fuchsia-600/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-zinc-900 block leading-tight">
                FixMyCampus <span className="text-fuchsia-600">Kerala</span>
              </span>
              <span className="text-[11px] text-zinc-500 block">
                Campus Maintenance & Verified Institutional Deals
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex text-xs text-zinc-500 bg-zinc-200/70 px-2.5 py-1 rounded-md font-mono">
              JWT Auth · Localhost 8000/3000
            </span>
            {onEnterGuestPreview && (
              <button
                onClick={onEnterGuestPreview}
                className="text-xs font-semibold text-zinc-600 hover:text-fuchsia-600 px-3 py-1.5 rounded-lg border border-zinc-300 hover:border-fuchsia-300 bg-white transition-colors cursor-pointer"
              >
                Guest Portal Preview →
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Dedicated Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 my-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Campus Trust & 1-Click Fast Evaluation Logins */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-xs font-semibold text-fuchsia-700">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>Dedicated Student Portal Login</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
              Kerala Campus Issue Tracking &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700">
                Verified Student Deals
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Sign in with your verified Kerala engineering or university credentials to submit maintenance complaints, track real-time resolution timelines, and unlock exclusive discounts across Kerala campuses.
            </p>

            {/* Feature Highlights on Grey / White UI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 mb-1">
                  <Clock className="w-4 h-4 text-fuchsia-600 shrink-0" />
                  <span>Server Timestamps</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  Immutable lifecycle milestones from verification to final sign-off.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 mb-1">
                  <GraduationCap className="w-4 h-4 text-fuchsia-600 shrink-0" />
                  <span>Institutional Perks</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  KSUM FabLab waivers, KSRTC bus pass fast-track, and canteen discounts.
                </p>
              </div>
            </div>

            {/* 1-Click Fast Evaluation Student Logins */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Fast Evaluation Profiles (1-Click Sign In)
                </span>
                <span className="text-[11px] text-fuchsia-600 font-medium">Localhost optimized</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => quickDemoLogin('cet')}
                  className="p-3 rounded-xl border border-zinc-200 hover:border-fuchsia-400 bg-zinc-50 hover:bg-fuchsia-50/50 transition-all text-left cursor-pointer group"
                >
                  <div className="text-xs font-bold text-zinc-900 group-hover:text-fuchsia-600 transition-colors">
                    Arun Kumar
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">CET Trivandrum</div>
                  <div className="text-[9px] text-fuchsia-600 font-mono mt-1">@cet.ac.in</div>
                </button>

                <button
                  type="button"
                  onClick={() => quickDemoLogin('cusat')}
                  className="p-3 rounded-xl border border-zinc-200 hover:border-fuchsia-400 bg-zinc-50 hover:bg-fuchsia-50/50 transition-all text-left cursor-pointer group"
                >
                  <div className="text-xs font-bold text-zinc-900 group-hover:text-fuchsia-600 transition-colors">
                    Ananya Nair
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">CUSAT Kochi</div>
                  <div className="text-[9px] text-fuchsia-600 font-mono mt-1">@cusat.ac.in</div>
                </button>

                <button
                  type="button"
                  onClick={() => quickDemoLogin('gectcr')}
                  className="p-3 rounded-xl border border-zinc-200 hover:border-fuchsia-400 bg-zinc-50 hover:bg-fuchsia-50/50 transition-all text-left cursor-pointer group"
                >
                  <div className="text-xs font-bold text-zinc-900 group-hover:text-fuchsia-600 transition-colors">
                    Farhan Ali
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">GEC Thrissur</div>
                  <div className="text-[9px] text-fuchsia-600 font-mono mt-1">@gectcr.ac.in</div>
                </button>
              </div>
            </div>

            {/* Participating Colleges List */}
            <div className="text-xs text-zinc-500 pt-1">
              Active in: <span className="text-zinc-700 font-medium">CET, CUSAT, NIT Calicut, GEC Thrissur, TKMCE Kollam, RSET, MEC, MACE</span>
            </div>
          </div>

          {/* Right Column: Proper Dedicated Login / Sign Up Card */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-zinc-300/40 text-left">
              
              {/* Segmented Mode Selector */}
              <div className="flex items-center p-1 bg-zinc-100 rounded-xl mb-6 border border-zinc-200">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(null); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                    mode === 'login'
                      ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  Student Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(null); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                    mode === 'register'
                      ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  Register New Account
                </button>
              </div>

              {/* Form Title */}
              <div className="mb-5">
                <h2 className="text-xl font-bold text-zinc-900">
                  {mode === 'login' ? 'Sign In to FixMyCampus' : 'Create Student Account'}
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  {mode === 'login'
                    ? 'Authenticate using your Student ID or institutional email.'
                    : 'Select your Kerala institution to automatically verify student perks.'}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form: LOGIN */}
              {mode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Student ID or Institutional Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. MCA2026001 or arunkumar@cet.ac.in"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-fuchsia-600 focus:ring-2 focus:ring-fuchsia-600/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-fuchsia-600 focus:ring-2 focus:ring-fuchsia-600/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-600">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-zinc-300 text-fuchsia-600 focus:ring-fuchsia-500"
                      />
                      <span>Remember session on localhost</span>
                    </label>
                    <span className="text-[11px] text-zinc-400">HS256 JWT Token</span>
                  </div>

                  {/* Primary Action Button in Magenta + White */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 text-xs font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 active:bg-fuchsia-800 rounded-xl shadow-lg shadow-fuchsia-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {isLoading ? (
                      <span>Validating JWT Credentials...</span>
                    ) : (
                      <>
                        <span>Sign In with JWT Auth</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-3 text-center">
                    <span className="text-xs text-zinc-500">
                      New student from Kerala?{' '}
                      <button
                        type="button"
                        onClick={() => { setMode('register'); setError(null); }}
                        className="text-fuchsia-600 font-semibold hover:underline cursor-pointer"
                      >
                        Register your account
                      </button>
                    </span>
                  </div>
                </form>
              ) : (
                /* Form: REGISTER */
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        placeholder="e.g. Arun Kumar"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Student ID / KTU Reg No *
                      </label>
                      <input
                        type="text"
                        required
                        value={regStudentId}
                        onChange={(e) => setRegStudentId(e.target.value)}
                        placeholder="e.g. TVE23MC042"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs font-mono focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600"
                      />
                    </div>
                  </div>

                  {/* College Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Kerala Institution / College *
                    </label>
                    <select
                      value={regCollegeId}
                      onChange={(e) => setRegCollegeId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 cursor-pointer"
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
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder={`student@${selectedCollege.domain}`}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600"
                      />
                      <span className="text-[10px] text-fuchsia-700 font-medium block mt-0.5">
                        Matches @{selectedCollege.domain}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+91 94470 00000"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Department *
                      </label>
                      <select
                        value={regDepartment}
                        onChange={(e) => setRegDepartment(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-fuchsia-600 cursor-pointer"
                      >
                        {KERALA_DEPARTMENTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Semester *
                      </label>
                      <select
                        value={regSemester}
                        onChange={(e) => setRegSemester(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-fuchsia-600 cursor-pointer"
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
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-fuchsia-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs focus:outline-none focus:border-fuchsia-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 text-xs font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 active:bg-fuchsia-800 rounded-xl shadow-lg shadow-fuchsia-600/25 transition-all cursor-pointer font-medium mt-3"
                  >
                    {isLoading ? 'Creating Verified Account...' : 'Register Student & Issue JWT'}
                  </button>

                  <div className="pt-2 text-center">
                    <span className="text-xs text-zinc-500">
                      Already registered?{' '}
                      <button
                        type="button"
                        onClick={() => { setMode('login'); setError(null); }}
                        className="text-fuchsia-600 font-semibold hover:underline cursor-pointer"
                      >
                        Sign in here
                      </button>
                    </span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full bg-white border-t border-zinc-200 py-4 text-center text-xs text-zinc-500">
        FixMyCampus Kerala · Academic Mini Project · JWT Authentication & Strict Role Separation
      </footer>

    </div>
  );
};
