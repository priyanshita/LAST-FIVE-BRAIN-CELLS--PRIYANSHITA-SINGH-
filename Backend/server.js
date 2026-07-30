import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory OTP storage: key = target (email or phone), value = { otp, expiresAt, name, role, method }
const otpStore = new Map();

// Helper to generate 6-digit numeric OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'VeriImpact Backend Auth & Forensic Service', timestamp: new Date().toISOString() });
});

// Send OTP Endpoint
app.post('/api/auth/send-otp', (req, res) => {
  const { target, method, name, role, type } = req.body;

  if (!target || !method) {
    return res.status(400).json({ success: false, error: 'Target (email or mobile number) and method are required.' });
  }

  // Basic validation
  if (method === 'email' && !target.includes('@')) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }

  if (method === 'phone' && target.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit mobile number.' });
  }

  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

  otpStore.set(target.trim(), {
    otp,
    expiresAt,
    name: name || (method === 'email' ? target.split('@')[0] : 'User'),
    role: role || 'donor',
    method,
    type: type || 'signin'
  });

  console.log(`[VERIIMPACT BACKEND] 📩 OTP generated for ${method.toUpperCase()} [${target}]: ${otp} (Expires in 5 min)`);

  // Return success response with dynamic simulated OTP in response for interactive demo UI
  res.json({
    success: true,
    message: `Verification OTP sent to ${target} via ${method === 'email' ? 'Email Dispatch' : 'SMS Gateway'}`,
    target,
    method,
    demoOtp: otp, // Returned for instant demo testing banner & toast auto-fill
    expiresInSeconds: 300,
    timestamp: new Date().toISOString()
  });
});

// Verify OTP Endpoint
app.post('/api/auth/verify-otp', (req, res) => {
  const { target, otp } = req.body;

  if (!target || !otp) {
    return res.status(400).json({ success: false, error: 'Target and OTP code are required.' });
  }

  const record = otpStore.get(target.trim());

  if (!record) {
    return res.status(400).json({ success: false, error: 'No active OTP request found for this contact. Please request a new code.' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(target.trim());
    return res.status(400).json({ success: false, error: 'OTP has expired (5-minute limit). Please request a new code.' });
  }

  if (record.otp !== otp.trim()) {
    return res.status(400).json({ success: false, error: 'Invalid 6-digit OTP code. Please check and try again.' });
  }

  // OTP is valid! Consume OTP
  otpStore.delete(target.trim());

  const token = `vimp_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  const userProfile = {
    name: record.name || 'Verified User',
    email: record.method === 'email' ? target : `${target.replace(/\D/g, '')}@veriimpact.org`,
    phone: record.method === 'phone' ? target : '+91 98765 43210',
    isLoggedIn: true,
    authMethod: record.method,
    authVerified: true,
    role: record.role || 'donor',
    avatar: record.name ? record.name.charAt(0).toUpperCase() : 'V',
    token
  };

  console.log(`[VERIIMPACT BACKEND] ✅ Verification successful for [${target}]. Issued token: ${token}`);

  res.json({
    success: true,
    verified: true,
    message: 'OTP verified successfully!',
    token,
    userProfile
  });
});

// Resend OTP Endpoint
app.post('/api/auth/resend-otp', (req, res) => {
  const { target, method } = req.body;

  if (!target || !method) {
    return res.status(400).json({ success: false, error: 'Target and method required.' });
  }

  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  const existing = otpStore.get(target.trim());
  otpStore.set(target.trim(), {
    ...existing,
    otp,
    expiresAt,
    method
  });

  console.log(`[VERIIMPACT BACKEND] 🔄 Resent OTP for [${target}]: ${otp}`);

  res.json({
    success: true,
    message: `Resent new verification OTP code to ${target}`,
    demoOtp: otp,
    expiresInSeconds: 300
  });
});

app.listen(PORT, () => {
  console.log(`🚀 VeriImpact Express Backend running on http://localhost:${PORT}`);
});
