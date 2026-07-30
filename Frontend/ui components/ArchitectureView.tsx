import React from 'react';
import { Layers, ShieldCheck, Cpu, Database, Network, Key, Target, Rocket, DollarSign, CheckCircle2, AlertTriangle, FileCode, Workflow } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-12">
      
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full gradient-badge text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Full Hackathon Technical Blueprint & Architecture</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
          VeriImpact AI: System Architecture & Strategy
        </h2>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          Comprehensive design for a privacy-first, consent-based, explainable NGO trust verification platform that replaces invasive banking access with multi-modal AI verification.
        </p>
      </div>

      {/* Section 1: Problem Statement & Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-bold text-lg">
            <AlertTriangle className="w-6 h-6" />
            <h3>1. Problem Statement</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5 list-disc list-inside leading-relaxed">
            <li><strong className="text-white">Lack of NGO Transparency:</strong> Donors struggle to verify whether contributions convert to real-world outcomes versus administrative overhead.</li>
            <li><strong className="text-white">Privacy & Legal Barriers:</strong> Direct banking tracking violates donor privacy, PII regulations (GDPR/CCPA), and requires unauthorized access to private financial accounts.</li>
            <li><strong className="text-white">Impact-Washing & Fake Proof:</strong> Unscrupulous entities re-use stock photographs or copy-paste annual reports across different disaster campaigns.</li>
            <li><strong className="text-white">Slow Audit Cycles:</strong> Traditional financial auditing takes 12–18 months, offering zero real-time feedback to ongoing donor campaigns.</li>
          </ul>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
            <ShieldCheck className="w-6 h-6" />
            <h3>2. Unique Value Proposition (UVP)</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2.5 list-disc list-inside leading-relaxed">
            <li><strong className="text-white">Verification over Accusation:</strong> Never accuses an NGO of fraud; assigns an objective Evidence Strength Index and highlights documentation coverage.</li>
            <li><strong className="text-white">Multi-Modal AI Pipeline:</strong> Combines NLP document cross-consistency, perceptual photo hashing (pHash), EXIF metadata, and satellite growth indices.</li>
            <li><strong className="text-white">Collaborative Trust Network:</strong> Beneficiaries and ground volunteers submit geotagged, zero-knowledge anonymous feedback.</li>
            <li><strong className="text-white">100% Explainable AI (XAI):</strong> Transparent score formulas with clickable audit trails down to exact page numbers and image metadata.</li>
          </ul>
        </div>

      </div>

      {/* Section 2: AI Models & Technical Engine */}
      <div className="glass-panel rounded-3xl p-6 lg:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-cyan-400 font-bold text-xl">
          <Cpu className="w-6 h-6" />
          <h3>3. Core AI Models & Computer Vision Engines</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
            <span className="text-emerald-400 font-extrabold text-sm block">A. NLP Narrative & Financial Model</span>
            <p className="text-slate-300 leading-relaxed">
              Gemini 1.5/2.0 Flash + PyMuPDF OCR pipeline. Extracts financial metrics (Form 990, PwC audits) and compares them against claimed narrative outputs (e.g., saplings planted, vaccinations given). Detects numerical variance anomalies and unit cost outliers.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
            <span className="text-teal-400 font-extrabold text-sm block">B. Visual Integrity Engine</span>
            <p className="text-slate-300 leading-relaxed">
              Perceptual Hashing (64-bit dHash/pHash) + CLIP Cosine Embedding Similarity. Compares uploaded project photos against a global index of 5M+ non-profit news photos to flag duplicate/recycled media across different campaigns.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
            <span className="text-cyan-400 font-extrabold text-sm block">C. Hardware Metadata & ELA</span>
            <p className="text-slate-300 leading-relaxed">
              Error Level Analysis (ELA) for Photoshop/Canva compression forgery detection + EXIF header validation (GPS coordinates, camera model, hardware timestamp matching claimed deployment dates).
            </p>
          </div>

        </div>
      </div>

      {/* Section 3: Database Schema & APIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Schema */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-purple-400 font-bold text-lg">
            <Database className="w-5 h-5" />
            <h3>4. Relational & Vector Database Schema</h3>
          </div>
          <pre className="bg-slate-950 p-4 rounded-2xl font-mono text-[11px] text-slate-300 border border-slate-800 overflow-x-auto">
{`-- NGOs Core Entity
CREATE TABLE ngos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reg_number VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  trust_score INT CHECK (trust_score BETWEEN 0 AND 100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Evidence Media Log (pHash & EXIF)
CREATE TABLE media_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID REFERENCES ngos(id),
  phash_fingerprint VARCHAR(64) INDEX,
  gps_coords POINT,
  exif_timestamp TIMESTAMP,
  phash_status VARCHAR(50) DEFAULT 'Unique'
);

-- Zero-Knowledge Beneficiary Reviews
CREATE TABLE beneficiary_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID REFERENCES ngos(id),
  zk_anon_hash VARCHAR(128) NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  geotag_verified BOOLEAN DEFAULT TRUE
);`}
          </pre>
        </div>

        {/* APIs */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-bold text-lg">
            <Network className="w-5 h-5" />
            <h3>5. REST & GraphQL API Endpoints</h3>
          </div>
          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold">GET /api/v1/ngos/{`{id}`}</span>
              <p className="text-slate-400 text-[11px] font-sans mt-1">Fetches explainable score vector, trust level badge, and inconsistency alerts.</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold">POST /api/v1/verify/document</span>
              <p className="text-slate-400 text-[11px] font-sans mt-1">Accepts PDF/Form 990 file, executes OCR & Gemini financial-to-narrative check.</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold">POST /api/v1/verify/media</span>
              <p className="text-slate-400 text-[11px] font-sans mt-1">Computes 64-bit pHash, queries vector DB for duplicates, and parses EXIF GPS tags.</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold">POST /api/v1/feedback/submit</span>
              <p className="text-slate-400 text-[11px] font-sans mt-1">Submits anonymized PII-stripped beneficiary review with optional GPS proof.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Section 4: Roadmap & Business Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
            <Rocket className="w-5 h-5" />
            <h3>6. Step-by-Step Implementation Roadmap</h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold">Phase 1 (Hackathon MVP - Completed):</span>
              <p className="text-slate-300">Web dashboard, Explainable Trust Score engine, pHash image duplicate simulator, LLM text consistency check, and beneficiary feedback hub.</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-teal-400 font-bold">Phase 2 (Q4 2026 - Integration):</span>
              <p className="text-slate-300">Automated web scrapers for IRS 990 / NGO Darpan / FCRA APIs, Sentinel-2 satellite imagery ingestion for forestry & crop projects.</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold">Phase 3 (2027 - Scale):</span>
              <p className="text-slate-300">Zero-Knowledge proof protocol (Semaphore/zk-SNARKs) for anonymous whistleblower validation and corporate CSR API widgets.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3 text-cyan-400 font-bold text-lg">
            <DollarSign className="w-5 h-5" />
            <h3>7. Business & Sustainability Model</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-3 list-disc list-inside leading-relaxed">
            <li><strong className="text-white">Corporate CSR Transparency API:</strong> Corporate donors pay a monthly SaaS tier ($499/mo) to verify multi-million dollar CSR grant deployment before disbursing tranches.</li>
            <li><strong className="text-white">Verified Impact Seal for NGOs:</strong> High-scoring NGOs pay a nominal verification fee for downloadable badging and certified audit reports for their website.</li>
            <li><strong className="text-white">Philanthropic Foundation Intelligence:</strong> Institutional grantmakers purchase deep-dive analytical dashboards to discover vetted grassroot NGOs.</li>
          </ul>
        </div>

      </div>

    </div>
  );
};
