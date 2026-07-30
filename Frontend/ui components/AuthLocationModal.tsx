import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, User, Mail, Phone, CheckCircle2, ShieldCheck, X, Compass, ArrowRight, RefreshCw, KeyRound, Sparkles, Building2, Heart } from 'lucide-react';
import { UserProfile, UserLocation } from '../types';
import { authApi } from '../utils/authApi';

interface AuthLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (profile: UserProfile) => void;
}

const PRESET_CITIES: { city: string; state: string; lat: number; lng: number; address: string }[] = [
  { city: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946, address: 'Indiranagar, Bangalore, Karnataka' },
  { city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, address: 'Bandra West, Mumbai, Maharashtra' },
  { city: 'New Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090, address: 'Connaught Place, New Delhi' },
  { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, address: 'Anna Salai, Chennai, Tamil Nadu' },
  { city: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lng: 85.8245, address: 'Saheed Nagar, Bhubaneswar, Odisha' },
  { city: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, address: 'HITEC City, Hyderabad, Telangana' },
  { city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, address: 'Park Street, Kolkata, West Bengal' },
];

export const AuthLocationModal: React.FC<AuthLocationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [step, setStep] = useState<'details' | 'otp' | 'location'>('details');

  // Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'donor' | 'volunteer' | 'ngo_rep'>('donor');

  // OTP State
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [demoOtpCode, setDemoOtpCode] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Location State
  const [locating, setLocating] = useState(false);
  const [selectedCity, setSelectedCity] = useState(PRESET_CITIES[0]);
  const [locationState, setLocationState] = useState<UserLocation | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);

  // Verification profile holder
  const [verifiedProfile, setVerifiedProfile] = useState<UserProfile | null>(null);

  // Timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const target = method === 'email' ? email : phone;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    if (method === 'email' && (!email || !email.includes('@'))) {
      setOtpError('Please enter a valid email address.');
      return;
    }
    if (method === 'phone' && (!phone || phone.replace(/\D/g, '').length < 10)) {
      setOtpError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSendingOtp(true);
    const res = await authApi.sendOtp({
      target,
      method,
      name: authMode === 'signup' ? name : undefined,
      role,
      type: authMode
    });
    setIsSendingOtp(false);

    if (res.success) {
      setDemoOtpCode(res.demoOtp || '482910');
      setResendTimer(30);
      setStep('otp');
    } else {
      setOtpError(res.error || 'Failed to send verification code.');
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 6) {
      setOtpError('Please enter full 6-digit OTP code.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError(null);

    const res = await authApi.verifyOtp({ target, otp: enteredOtp });
    setIsVerifyingOtp(false);

    if (res.success && res.userProfile) {
      setVerifiedProfile(res.userProfile);
      setStep('location');
    } else {
      setOtpError(res.error || 'Invalid OTP verification code.');
    }
  };

  const handleAutoFillOtp = () => {
    if (demoOtpCode && demoOtpCode.length === 6) {
      setOtpDigits(demoOtpCode.split(''));
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setOtpError(null);
    const res = await authApi.resendOtp({ target, method });
    if (res.success) {
      setDemoOtpCode(res.demoOtp || '739104');
      setResendTimer(30);
    }
  };

  const handleRequestBrowserLocation = () => {
    setLocating(true);
    setLocationDenied(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          setLocationState({
            lat,
            lng,
            city: 'Your Current City',
            state: 'India',
            address: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
            granted: true,
          });
          setLocating(false);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setLocationDenied(true);
          setLocating(false);
          setLocationState({
            lat: selectedCity.lat,
            lng: selectedCity.lng,
            city: selectedCity.city,
            state: selectedCity.state,
            address: selectedCity.address,
            granted: false,
          });
        },
        { timeout: 8000 }
      );
    } else {
      setLocationDenied(true);
      setLocating(false);
      setLocationState({
        lat: selectedCity.lat,
        lng: selectedCity.lng,
        city: selectedCity.city,
        state: selectedCity.state,
        address: selectedCity.address,
        granted: false,
      });
    }
  };

  const handleCompleteAuth = () => {
    const finalLocation: UserLocation = locationState || {
      lat: selectedCity.lat,
      lng: selectedCity.lng,
      city: selectedCity.city,
      state: selectedCity.state,
      address: selectedCity.address,
      granted: false,
    };

    const finalProfile: UserProfile = verifiedProfile || {
      name: name || (method === 'email' ? email.split('@')[0] : 'Indian Donor'),
      email: method === 'email' ? email : `${phone.replace(/\D/g, '')}@veriimpact.org`,
      phone: method === 'phone' ? phone : '+91 98765 43210',
      isLoggedIn: true,
      authMethod: method,
      authVerified: true,
      role,
      token: `token_${Date.now()}`,
      location: finalLocation
    };

    finalProfile.location = finalLocation;
    onSuccess(finalProfile);
    onClose();
  };

  const handleQuickDemoLogin = (presetName: string, presetEmail: string, presetPhone: string, cityObj: typeof PRESET_CITIES[0]) => {
    const demoProfile: UserProfile = {
      name: presetName,
      email: presetEmail,
      phone: presetPhone,
      isLoggedIn: true,
      authMethod: 'phone',
      authVerified: true,
      role: 'donor',
      token: `demo_token_${Date.now()}`,
      location: {
        lat: cityObj.lat,
        lng: cityObj.lng,
        city: cityObj.city,
        state: cityObj.state,
        address: cityObj.address,
        granted: true
      }
    };
    onSuccess(demoProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 max-w-md w-full border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges & Mode Tabs */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Backend OTP Authentication</span>
          </div>

          {step === 'details' && (
            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  authMode === 'signin'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 rounded-xl transition-all ${
                  authMode === 'signup'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          <h2 className="text-2xl font-extrabold text-white">
            {step === 'details' && (authMode === 'signin' ? 'Sign In to VeriImpact' : 'Register New Account')}
            {step === 'otp' && 'Enter 6-Digit OTP Code'}
            {step === 'location' && 'Set Your Active City'}
          </h2>
        </div>

        {/* STEP 1: CONTACT DETAILS INPUT */}
        {step === 'details' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {/* Method Switcher: Email vs Mobile */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-slate-800 pb-2">
              <span>Choose Verification Method:</span>
              <div className="flex items-center gap-3 text-white">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    checked={method === 'email'}
                    onChange={() => setMethod('email')}
                    className="accent-emerald-500"
                  />
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    checked={method === 'phone'}
                    onChange={() => setMethod('phone')}
                    className="accent-emerald-500"
                  />
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mobile (+91)</span>
                </label>
              </div>
            </div>

            {/* Inputs */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {method === 'email' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (India +91)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>
            )}

            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="donor">Individual Donor</option>
                  <option value="volunteer">Ground Volunteer</option>
                  <option value="ngo_rep">NGO Representative</option>
                </select>
              </div>
            )}

            {otpError && (
              <p className="text-xs text-rose-400 font-semibold">{otpError}</p>
            )}

            <button
              type="submit"
              disabled={isSendingOtp}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              {isSendingOtp ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Dispatching OTP via Express Backend...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Get Verification Code (OTP)</span>
                </>
              )}
            </button>

            {/* Quick Demo Presets */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-[11px] text-slate-400 font-semibold block">Quick Demo One-Click Logins:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('Rahul Sharma', 'rahul@veriimpact.org', '+91 98765 43210', PRESET_CITIES[0])}
                  className="py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-left transition-colors"
                >
                  <span className="text-xs font-bold text-white block">Rahul Sharma</span>
                  <span className="text-[10px] text-emerald-400">Bangalore</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('Priya Patel', 'priya@veriimpact.org', '+91 98200 11223', PRESET_CITIES[1])}
                  className="py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-left transition-colors"
                >
                  <span className="text-xs font-bold text-white block">Priya Patel</span>
                  <span className="text-[10px] text-teal-400">Mumbai</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {/* Live Backend OTP Dispatch Toast Banner */}
            {demoOtpCode && (
              <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-2xl p-3.5 text-xs text-emerald-300 space-y-1.5 animate-bounce-short">
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Simulated SMS / Email Notification
                  </span>
                  <span className="font-mono text-emerald-400 text-sm">OTP: {demoOtpCode}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Code sent to <strong>{target}</strong> via {method === 'email' ? 'Email' : 'SMS Gateway'}.
                </p>
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="text-[10px] uppercase font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-2.5 py-1 rounded-lg transition-colors inline-block mt-1"
                >
                  ⚡ Auto-Fill Demo OTP ({demoOtpCode})
                </button>
              </div>
            )}

            {/* 6 OTP Input Boxes */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Enter 6-Digit Code</label>
              <div className="flex items-center justify-between gap-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const nextDigits = [...otpDigits];
                      nextDigits[idx] = val;
                      setOtpDigits(nextDigits);
                      if (val && idx < 5) {
                        const nextInput = document.getElementById(`otp-input-${idx + 1}`);
                        if (nextInput) nextInput.focus();
                      }
                    }}
                    className="w-11 h-12 text-center bg-slate-900 border border-slate-800 rounded-xl text-lg font-bold font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                ))}
              </div>
            </div>

            {otpError && <p className="text-xs text-rose-400 font-semibold">{otpError}</p>}

            <button
              type="submit"
              disabled={isVerifyingOtp}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              {isVerifyingOtp ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code with Backend Server...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify OTP & Continue</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="hover:text-white underline"
              >
                ← Change Number / Email
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
                className={resendTimer > 0 ? 'text-slate-600' : 'text-emerald-400 font-semibold hover:underline'}
              >
                {resendTimer > 0 ? `Resend Code in ${resendTimer}s` : 'Resend Code'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: LOCATION PERMISSION & CITY SELECTOR */}
        {step === 'location' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Location Permission Request
                </span>
                {locationState?.granted && (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    ✓ Granted
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleRequestBrowserLocation}
                disabled={locating}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-all font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Navigation className={`w-4 h-4 ${locating ? 'animate-bounce' : ''}`} />
                <span>{locating ? 'Detecting GPS Location...' : 'Use My Current GPS Location'}</span>
              </button>

              {locationDenied && (
                <p className="text-[11px] text-amber-300">
                  Location access was denied or timed out. Choose your city manually below.
                </p>
              )}

              <div className="pt-2 border-t border-slate-800">
                <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                  Select Active City (Manual Selector)
                </label>
                <select
                  value={selectedCity.city}
                  onChange={(e) => {
                    const cityObj = PRESET_CITIES.find((c) => c.city === e.target.value) || PRESET_CITIES[0];
                    setSelectedCity(cityObj);
                    setLocationState({
                      lat: cityObj.lat,
                      lng: cityObj.lng,
                      city: cityObj.city,
                      state: cityObj.state,
                      address: cityObj.address,
                      granted: false,
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {PRESET_CITIES.map((c) => (
                    <option key={c.city} value={c.city}>
                      📍 {c.city}, {c.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompleteAuth}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Complete Sign In & Explore Nearby NGOs</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
