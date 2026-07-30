export type TrustLevel = 'Verified Outstanding' | 'High Integrity' | 'Moderate Evidence' | 'Needs Documentation';

export interface ScoreBreakdown {
  documentationQuality: number; // 25%
  financialConsistency: number; // 25%
  visualEvidence: number;       // 20%
  communityFeedback: number;   // 20%
  auditGovernance: number;      // 10%
}

export interface InconsistencyFlag {
  id: string;
  severity: 'high' | 'medium' | 'low' | 'info';
  category: 'Financial Discrepancy' | 'Narrative Anomaly' | 'Duplicate Image' | 'Missing Audit' | 'Shell Company Risk';
  title: string;
  description: string;
  sourceDoc: string;
}

export interface MediaEvidence {
  id: string;
  type?: 'image' | 'video';
  url: string;
  videoUrl?: string;
  duration?: string;
  thumbnail?: string;
  caption: string;
  timestamp: string;
  location: string;
  gpsCoords: [number, number];
  exifVerified: boolean;
  pHashStatus: 'Unique' | 'Flagged Duplicate' | 'Verified Field Photo' | 'Verified Field Video';
  similarityMatch?: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  type: '12A Tax Filing' | 'Annual Audit PDF' | 'Project Impact Report' | 'FCRA Government Filing' | 'Receipt Ledger' | 'GST Return GSTR-2B';
  filingDate: string;
  fileUrl: string;
  verifiedStatus: boolean;
  keyInsights: string[];
}

export interface BeneficiaryReview {
  id: string;
  reviewerType: 'Beneficiary' | 'Field Volunteer' | 'Local Community Leader' | 'Donor';
  location: string;
  date: string;
  rating: number;
  comment: string;
  privacyProtected: boolean;
  verifiedGeotag: boolean;
}

export interface VolunteerOpportunity {
  id: string;
  ngoId: string;
  title: string;
  category: string;
  location: string;
  date: string;
  spotsAvailable: number;
  spotsFilled: number;
  description: string;
  requirements: string[];
  isOpen: boolean;
  contactPerson: string;
  phone: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  officeHours: string;
  whatsapp: string;
}

export interface NGO {
  id: string;
  name: string;
  registrationNumber: string;
  category: 'Reforestation & Environment' | 'Child Education' | 'Clean Water Access' | 'Healthcare & Sanitation' | 'Disaster Relief';
  location: string;
  coordinates: [number, number]; // [lat, lng]
  website: string;
  foundedYear: number;
  yearsInOperation?: number;
  isEligible5Years?: boolean; // Must be >= 5 years operating history
  darpanId?: string; // NITI Aayog Darpan ID
  gstin?: string; // GST Identification Number
  fcraNumber?: string; // Foreign Contribution Regulation Act
  shellCompanyRiskScore?: number; // 0-100 score (0 = clean, >50 = high risk)
  shellCompanyFlags?: string[];
  logo: string;
  summary: string;
  trustScore: number; // 0-100
  impactConfidenceScore: number; // 0-100
  trustLevel: TrustLevel;
  metrics: {
    claimedImpact: string;
    verifiedImpact: string;
    totalBudgetDisclosed: string; // in ₹ INR
    programExpenseRatio: number; // e.g. 88%
  };
  scoreBreakdown: ScoreBreakdown;
  inconsistencyFlags: InconsistencyFlag[];
  documents: DocumentRecord[];
  media: MediaEvidence[];
  reviews: BeneficiaryReview[];
  contactInfo: ContactInfo;
  volunteerOpportunities: VolunteerOpportunity[];
}

export interface UserLocation {
  lat: number;
  lng: number;
  city: string;
  state: string;
  address: string;
  granted: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  authMethod?: 'email' | 'phone';
  authVerified?: boolean;
  role?: 'donor' | 'volunteer' | 'ngo_rep';
  avatar?: string;
  token?: string;
  location?: UserLocation;
}

export interface FakeBillScanResult {
  invoiceNumber: string;
  vendorGstin: string;
  eWayBillStatus: 'Verified Active' | 'Missing / Fake e-Way Bill' | 'Unregistered Transporter';
  gstr1Match: boolean;
  circularPaymentRisk: 'Zero Risk' | 'High Risk - Round Tripping';
  addressMatch: boolean;
  findings: string[];
  overallResult: 'Clean Procurement Invoice' | 'FLAGGED - Potential Fake Bill / Shell Vendor';
}

export interface ShellCompanyAuditResult {
  ngoName: string;
  riskScore: number;
  riskTier: 'Low / Clean' | 'Moderate Concern' | 'High Risk Shell Network';
  flaggedTransactionsCount: number;
  auditDetails: string[];
}
