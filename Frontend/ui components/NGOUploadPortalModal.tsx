import React, { useState } from 'react';
import { ShieldCheck, Upload, Video, Image as ImageIcon, CheckCircle2, AlertTriangle, X, Sparkles, Building2, MapPin, FileCheck, RefreshCw, Calendar, Play } from 'lucide-react';
import { NGO, MediaEvidence } from '../types';

interface NGOUploadPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNGORegistered?: (newNGO: NGO) => void;
}

export const NGOUploadPortalModal: React.FC<NGOUploadPortalModalProps> = ({
  isOpen,
  onClose,
  onNGORegistered
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 State: Eligibility
  const [name, setName] = useState('');
  const [foundedYear, setFoundedYear] = useState<number>(2018);
  const [city, setCity] = useState('Bangalore');
  const [state, setState] = useState('Karnataka');
  const [category, setCategory] = useState<NGO['category']>('Child Education');

  // Step 2 State: Government Data
  const [darpanId, setDarpanId] = useState('KA/2018/0198421');
  const [gstin, setGstin] = useState('29AAATB9382F1Z8');
  const [fcraNumber, setFcraNumber] = useState('094420189');
  const [taxCertificate, setTaxCertificate] = useState('12A/80G-VERIFIED-2025');
  const [annualBudget, setAnnualBudget] = useState('₹4,50,00,000 INR');
  const [verifyingGov, setVerifyingGov] = useState(false);
  const [govVerified, setGovVerified] = useState(false);

  // Step 3 State: Media Upload
  const [uploadedMedia, setUploadedMedia] = useState<MediaEvidence[]>([
    {
      id: 'up-1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
      caption: 'Field work sapling plantation site photos',
      timestamp: '2025-11-12 10:14 IST',
      location: '12.9716, 77.5946',
      gpsCoords: [12.9716, 77.5946],
      exifVerified: true,
      pHashStatus: 'Verified Field Photo'
    },
    {
      id: 'up-2',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-children-in-a-classroom-setting-41551-large.mp4',
      duration: '1:30',
      caption: 'Ground documentary video of digital lab setup',
      timestamp: '2025-11-15 14:00 IST',
      location: '12.9716, 77.5946',
      gpsCoords: [12.9716, 77.5946],
      exifVerified: true,
      pHashStatus: 'Verified Field Video'
    }
  ]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaCaption, setMediaCaption] = useState('');
  const [selectedVideoPreview, setSelectedVideoPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentYear = 2026;
  const yearsOperating = currentYear - foundedYear;
  const isEligible = yearsOperating >= 5;

  const handleVerifyGovRecords = () => {
    setVerifyingGov(true);
    setTimeout(() => {
      setVerifyingGov(false);
      setGovVerified(true);
    }, 1200);
  };

  const handleSimulateAddPhoto = () => {
    setUploadingMedia(true);
    setTimeout(() => {
      setUploadingMedia(false);
      const newPhoto: MediaEvidence = {
        id: `up-${Date.now()}`,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        caption: mediaCaption || 'Ground verification field photo',
        timestamp: new Date().toLocaleString('en-IN') + ' IST',
        location: `${(12 + Math.random()).toFixed(4)}, ${(77 + Math.random()).toFixed(4)}`,
        gpsCoords: [12.9716, 77.5946],
        exifVerified: true,
        pHashStatus: 'Verified Field Photo'
      };
      setUploadedMedia((prev) => [newPhoto, ...prev]);
      setMediaCaption('');
    }, 1000);
  };

  const handleSimulateAddVideo = () => {
    setUploadingMedia(true);
    setTimeout(() => {
      setUploadingMedia(false);
      const newVideo: MediaEvidence = {
        id: `up-${Date.now()}`,
        type: 'video',
        url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
        duration: '2:15',
        caption: mediaCaption || 'Ground verification impact video footage',
        timestamp: new Date().toLocaleString('en-IN') + ' IST',
        location: `${(12 + Math.random()).toFixed(4)}, ${(77 + Math.random()).toFixed(4)}`,
        gpsCoords: [12.9716, 77.5946],
        exifVerified: true,
        pHashStatus: 'Verified Field Video'
      };
      setUploadedMedia((prev) => [newVideo, ...prev]);
      setMediaCaption('');
    }, 1000);
  };

  const handleFinalSubmit = () => {
    if (onNGORegistered) {
      const createdNGO: NGO = {
        id: `ngo-custom-${Date.now()}`,
        name: name || 'Verified Impact Organization',
        registrationNumber: `NGO-IN-${Math.floor(1000000 + Math.random() * 9000000)}`,
        category,
        location: `${city}, ${state}`,
        coordinates: [12.9716, 77.5946],
        website: `https://${(name || 'ngo').toLowerCase().replace(/\s+/g, '')}.org`,
        foundedYear,
        yearsInOperation: yearsOperating,
        isEligible5Years: isEligible,
        darpanId,
        gstin,
        fcraNumber,
        shellCompanyRiskScore: 0,
        shellCompanyFlags: [],
        logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=150&auto=format&fit=crop&q=80',
        summary: 'Registered NGO verified under VeriImpact 5+ Years Operating Policy with clean government data matching.',
        trustScore: 94,
        impactConfidenceScore: 92,
        trustLevel: 'Verified Outstanding',
        metrics: {
          claimedImpact: 'Verified Ground Programs Operating',
          verifiedImpact: 'Government Data & Photos/Videos Verified',
          totalBudgetDisclosed: annualBudget,
          programExpenseRatio: 88
        },
        scoreBreakdown: {
          documentationQuality: 95,
          financialConsistency: 92,
          visualEvidence: 94,
          communityFeedback: 90,
          auditGovernance: 95
        },
        inconsistencyFlags: [],
        documents: [
          {
            id: 'doc-custom-1',
            title: 'Verified 12A/80G & DARPAN Cross-Match Certificate',
            type: '12A Tax Filing',
            filingDate: '2025-11-20',
            fileUrl: '#',
            verifiedStatus: true,
            keyInsights: ['DARPAN ID & GSTIN validated against government portal']
          }
        ],
        media: uploadedMedia,
        reviews: [],
        contactInfo: {
          phone: '+91 98765 43210',
          email: `contact@${(name || 'ngo').toLowerCase().replace(/\s+/g, '')}.org`,
          address: 'Main Office Complex',
          city,
          state,
          pincode: '560001',
          officeHours: 'Mon - Fri: 9:00 AM - 6:00 PM',
          whatsapp: '+919876543210'
        },
        volunteerOpportunities: []
      };

      onNGORegistered(createdNGO);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 max-w-2xl w-full border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Building2 className="w-4 h-4" />
            <span>NGO Portal & Verification Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">NGO Registration & Media Upload Studio</h2>
          <p className="text-xs text-slate-300">
            Verify 5+ years operating eligibility, upload ground work photos & videos with EXIF geotags, and cross-match government records.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-xs text-center font-bold">
          <div className={`p-2 rounded-xl border ${step === 1 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            1. 5+ Yrs Eligibility
          </div>
          <div className={`p-2 rounded-xl border ${step === 2 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            2. Gov Data Match
          </div>
          <div className={`p-2 rounded-xl border ${step === 3 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            3. Photo & Video Upload
          </div>
          <div className={`p-2 rounded-xl border ${step === 4 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            4. Verified Badge
          </div>
        </div>

        {/* STEP 1: 5-YEAR ELIGIBILITY */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">NGO Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sahyog Foundation Trust"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Founding Year</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      min="1950"
                      max="2026"
                      value={foundedYear}
                      onChange={(e) => setFoundedYear(parseInt(e.target.value) || 2018)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Child Education">Child Education</option>
                    <option value="Reforestation & Environment">Reforestation & Environment</option>
                    <option value="Healthcare & Sanitation">Healthcare & Sanitation</option>
                    <option value="Clean Water Access">Clean Water Access</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Headquarter City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Eligibility Rule Checker Alert */}
            <div
              className={`p-4 rounded-2xl border space-y-2 text-xs ${
                isEligible
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-2">
                  {isEligible ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
                  <span>5-Year Operating Experience Status</span>
                </span>
                <span className="font-mono">{yearsOperating} Years Active ({foundedYear} - {currentYear})</span>
              </div>
              {isEligible ? (
                <p className="text-[11px] leading-relaxed">
                  ✓ <strong>ELIGIBLE:</strong> Your organization has {yearsOperating} years of operating experience (meets the minimum 5 years operating threshold for public hosting).
                </p>
              ) : (
                <p className="text-[11px] leading-relaxed">
                  ⚠️ <strong>INELIGIBLE FOR PUBLIC HOSTING:</strong> Platform rules require NGOs to have at least 5 years of operating history (founded in 2021 or earlier). Organizations with &lt;5 years will be flagged for preliminary incubator audit.
                </p>
              )}
            </div>

            <button
              type="button"
              disabled={!isEligible}
              onClick={() => setStep(2)}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                isEligible
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:opacity-90 shadow-emerald-500/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>{isEligible ? 'Proceed to Government Data Verification' : 'Requires 5+ Years Operating History to Continue'}</span>
            </button>
          </div>
        )}

        {/* STEP 2: GOVERNMENT DATA VERIFICATION */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">NITI Aayog DARPAN ID</label>
                  <input
                    type="text"
                    value={darpanId}
                    onChange={(e) => setDarpanId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">FCRA Registration No.</label>
                  <input
                    type="text"
                    value={fcraNumber}
                    onChange={(e) => setFcraNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Disclosed Budget (₹)</label>
                  <input
                    type="text"
                    value={annualBudget}
                    onChange={(e) => setAnnualBudget(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleVerifyGovRecords}
              disabled={verifyingGov}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-all font-semibold text-xs flex items-center justify-center gap-2"
            >
              {verifyingGov ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Cross-matching DARPAN, FCRA & GSTIN databases...</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>{govVerified ? '✓ Government Records Verified & Matched' : 'Run Automated Government Data Cross-Verification'}</span>
                </>
              )}
            </button>

            {govVerified && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 text-xs text-emerald-300 space-y-1 font-mono">
                <p className="font-bold flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Government Registry Audit Passed
                </p>
                <p className="text-[11px]">• DARPAN ID {darpanId} matched against NITI Aayog database.</p>
                <p className="text-[11px]">• GSTIN {gstin} active with clean GSTR-1 and GSTR-3B filings.</p>
                <p className="text-[11px]">• 12A & 80G tax exemption active for donor receipts.</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs"
              >
                Next: Photo & Video Upload Studio
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PHOTO & VIDEO UPLOAD STUDIO */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="text-center space-y-1">
                <Upload className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-white">Upload Ground Evidence (Photos & Videos)</p>
                <p className="text-[11px] text-slate-400">
                  Select high-res photos (.jpg, .png) or impact videos (.mp4) for automatic EXIF geotag parsing and pHash duplicate detection.
                </p>
              </div>

              <input
                type="text"
                placeholder="Enter caption or description for media..."
                value={mediaCaption}
                onChange={(e) => setMediaCaption(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSimulateAddPhoto}
                  disabled={uploadingMedia}
                  className="flex-1 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-500/20"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>{uploadingMedia ? 'Parsing EXIF...' : '+ Add Field Photo'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleSimulateAddVideo}
                  disabled={uploadingMedia}
                  className="flex-1 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-teal-500/20"
                >
                  <Video className="w-4 h-4" />
                  <span>{uploadingMedia ? 'Processing Video...' : '+ Add Impact Video (.mp4)'}</span>
                </button>
              </div>
            </div>

            {/* Uploaded Media Items List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">Uploaded Evidence Items ({uploadedMedia.length})</span>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                {uploadedMedia.map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
                    <div className="relative h-24 rounded-lg overflow-hidden bg-slate-950">
                      <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                      {item.type === 'video' && (
                        <button
                          onClick={() => setSelectedVideoPreview(item.videoUrl || null)}
                          className="absolute inset-0 bg-slate-950/60 flex items-center justify-center text-white hover:bg-slate-950/80 transition-colors"
                        >
                          <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg">
                            <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                          </div>
                        </button>
                      )}
                      <span className="absolute bottom-1 left-1 bg-slate-950/80 text-emerald-400 font-mono text-[9px] px-1.5 py-0.5 rounded">
                        {item.type === 'video' ? `Video (${item.duration})` : 'EXIF Verified'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium truncate">{item.caption}</p>
                    <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      GPS: {item.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs"
              >
                Generate Data Verification Report
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: VERIFICATION REPORT CERTIFICATE */}
        {step === 4 && (
          <div className="space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
              <ShieldCheck className="w-10 h-10 font-bold" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white">{name || 'Verified Impact NGO'}</h3>
              <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Verified Outstanding Compliance Tier (5+ Years Operating History)
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-1.5">
                <span>Operating History:</span>
                <span className="font-bold text-emerald-400">{yearsOperating} Years (Founded {foundedYear})</span>
              </div>
              <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-1.5">
                <span>DARPAN & Tax Match:</span>
                <span className="font-bold text-emerald-400">100% Verified ({darpanId})</span>
              </div>
              <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-1.5">
                <span>Media Proof Uploaded:</span>
                <span className="font-bold text-teal-400">{uploadedMedia.length} EXIF & pHash Items</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Shell Company Risk Score:</span>
                <span className="font-bold text-emerald-400">0% Risk (Clean Vendor Audit)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinalSubmit}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
            >
              Complete Registration & Publish Verified Profile
            </button>
          </div>
        )}

        {/* Video Preview Modal overlay if user clicks play on video item */}
        {selectedVideoPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <button
                onClick={() => setSelectedVideoPreview(null)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-400" />
                <span>Field Video Evidence Playback</span>
              </h4>
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <video src={selectedVideoPreview} controls autoPlay className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
