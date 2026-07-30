import React, { useState } from 'react';
import { Cpu, FileText, Image as ImageIcon, UploadCloud, CheckCircle2, AlertTriangle, RefreshCw, ShieldCheck, Sparkles, Sliders, Search, Receipt, FileSpreadsheet, Building } from 'lucide-react';
import { FakeBillScanResult } from '../types';

export const AIVerificationStudio: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<'document' | 'image' | 'shell' | 'calculator'>('shell');
  
  // Shell Company & Fake Bill Scanner State
  const [invoiceNo, setInvoiceNo] = useState('INV-2025-9941');
  const [vendorGstin, setVendorGstin] = useState('27AAACG8492E1Z2');
  const [ewayBillNo, setEwayBillNo] = useState('EWB-39201948201');
  const [invoiceAmount, setInvoiceAmount] = useState('₹18,50,000 INR');
  const [scanningBill, setScanningBill] = useState(false);
  const [billScanResult, setBillScanResult] = useState<FakeBillScanResult | null>(null);

  // Document Engine State
  const [docText, setDocText] = useState<string>(
    `PROJECT COMPLETION REPORT - GREEN FORESTS INITIATIVE 2025
Budget Allocated: ₹1,50,00,000 INR
Claimed Trees Planted: 50,000 Saplings
Location: Western Ghats Reforestation Site

Receipt Summary:
- Nursery Sapling Procurement: 48,500 saplings purchased at ₹210/sapling (₹1,01,85,000)
- Community Labor Wages: ₹38,00,000 paid to 85 workers over 3 months
- Transport & Logistics: ₹10,15,000 (e-Way Bill #EWB-39201948201 Verified)

Auditor Note: All invoices match bank disbursements with zero unaccounted variance.`
  );
  const [docScanning, setDocScanning] = useState(false);
  const [docScanResult, setDocScanResult] = useState<any>(null);

  // Image Engine State
  const [imageFile, setImageFile] = useState<string | null>(
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
  );
  const [imageScanning, setImageScanning] = useState(false);
  const [imageScanResult, setImageScanResult] = useState<any>(null);

  // Calculator State
  const [weights, setWeights] = useState({
    doc: 90,
    fin: 88,
    visual: 92,
    community: 85,
    audit: 95,
  });

  const handleRunBillScan = (preset?: 'clean' | 'fake') => {
    setScanningBill(true);
    setBillScanResult(null);

    const isFakePreset = preset === 'fake';

    setTimeout(() => {
      setScanningBill(false);

      if (isFakePreset) {
        setBillScanResult({
          invoiceNumber: 'INV-FAKE-8821',
          vendorGstin: '21AAATA5520D1Z6 (SUSPENDED)',
          eWayBillStatus: 'Missing / Fake e-Way Bill',
          gstr1Match: false,
          circularPaymentRisk: 'High Risk - Round Tripping',
          addressMatch: false,
          findings: [
            '❌ Vendor GSTIN was suspended for non-filing of GSTR-3B tax returns.',
            '⚠️ No mandatory e-Way Bill found for transport of goods >₹50,000.',
            '🚨 Vendor registered business address shares physical location with NGO trustee.',
            '💸 Circular Money Trail: Vendor account transferred ₹17.5 Lakhs back to trustee personal account within 48 hours.'
          ],
          overallResult: 'FLAGGED - Potential Fake Bill / Shell Vendor'
        });
      } else {
        setBillScanResult({
          invoiceNumber: invoiceNo || 'INV-2025-9941',
          vendorGstin: vendorGstin || '27AAACG8492E1Z2',
          eWayBillStatus: 'Verified Active',
          gstr1Match: true,
          circularPaymentRisk: 'Zero Risk',
          addressMatch: true,
          findings: [
            '✓ Active e-Way Bill #EWB-39201948201 matched with truck vehicle logs.',
            '✓ Vendor GSTIN verified on GST Portal with clean GSTR-1 output tax filing.',
            '✓ Independent commercial vendor address (no related-party trustee overlap).',
            '✓ Bank NEFT payment reconciled directly against CA UDIN audit report.'
          ],
          overallResult: 'Clean Procurement Invoice'
        });
      }
    }, 1300);
  };

  const handleRunDocScan = (customText?: string) => {
    const textToScan = customText || docText;
    setDocScanning(true);
    setDocScanResult(null);

    setTimeout(() => {
      setDocScanning(false);
      const containsInconsistency = textToScan.toLowerCase().includes('duplicate') || textToScan.toLowerCase().includes('variance') || textToScan.toLowerCase().includes('unaccounted');

      if (containsInconsistency) {
        setDocScanResult({
          status: 'Flagged Anomaly',
          confidence: 96.2,
          claimedOutput: 'Extracted from text',
          inconsistencyDetails: 'Detected budget variance mismatch exceeding 5% tolerance threshold against receipt items.',
          extractedMetrics: {
            claimedUnits: '50,000 Units',
            receiptValidatedUnits: '38,200 Units',
            unaccountedDelta: '₹18,40,000 INR'
          }
        });
      } else {
        setDocScanResult({
          status: 'Passed Consistency Verification',
          confidence: 98.4,
          claimedOutput: '50,000 Saplings',
          extractedMetrics: {
            claimedUnits: '50,000 Units',
            receiptValidatedUnits: '48,500 Units (+3% free nursery yield)',
            unaccountedDelta: '₹0 INR (100% Reconciliation)'
          }
        });
      }
    }, 1200);
  };

  const handleRunImageScan = (sampleType: 'clean' | 'duplicate') => {
    setImageScanning(true);
    setImageScanResult(null);

    if (sampleType === 'clean') {
      setImageFile('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80');
    } else {
      setImageFile('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80');
    }

    setTimeout(() => {
      setImageScanning(false);
      if (sampleType === 'clean') {
        setImageScanResult({
          pHash: 'a83f-99c2-11e4-bf80',
          duplicateStatus: 'Unique Image (0 Matches in Global NGO Index)',
          exifGPS: 'Verified: 18.5204, 73.8567 (Western Ghats, Maharashtra)',
          exifTimestamp: 'Verified: 2025-09-14 10:23 IST',
          manipulationScore: '0.04 (No ELA alterations detected)',
          verificationOutcome: 'PASSED - High Visual Evidence Integrity'
        });
      } else {
        setImageScanResult({
          pHash: 'f420-11aa-99b2-c481',
          duplicateStatus: '⚠️ DUPLICATE MATCH DETECTED (98.4% Similarity)',
          matchedSource: 'Image matched to 2022 Disaster Archive ID #99281',
          exifGPS: 'Missing / Stripped Metadata',
          exifTimestamp: 'Modified: 2025-07-01 (Header mismatch)',
          manipulationScore: '0.78 (High Risk - Metadata alteration)',
          verificationOutcome: 'FLAGGED - Visual Evidence Inconsistency'
        });
      }
    }, 1400);
  };

  const computedTrustScore = Math.round(
    weights.doc * 0.25 +
    weights.fin * 0.25 +
    weights.visual * 0.20 +
    weights.community * 0.20 +
    weights.audit * 0.10
  );

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">AI Forensic Verification Studio</h2>
            <p className="text-xs text-slate-300">
              Interactive sandbox for fake bill & shell company detection, document cross-consistency NLP checks, perceptual image hashing (pHash), EXIF geotags, and explainable trust scores.
            </p>
          </div>
        </div>

        {/* Engine Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveEngine('shell')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeEngine === 'shell'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Fake Bill & Shell Vendor Forensic Engine</span>
          </button>

          <button
            onClick={() => setActiveEngine('document')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeEngine === 'document'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Document & Financial NLP Scan</span>
          </button>

          <button
            onClick={() => setActiveEngine('image')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeEngine === 'image'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Visual Evidence Integrity (pHash)</span>
          </button>

          <button
            onClick={() => setActiveEngine('calculator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeEngine === 'calculator'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Live Score Simulation Weighting</span>
          </button>
        </div>
      </div>

      {/* 1. SHELL COMPANY & FAKE BILL SCANNER */}
      {activeEngine === 'shell' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Fake Bill & Shell Company Forensic Audit</span>
              <span className="text-xs text-emerald-400 font-mono">GSTIN / e-Way Bill Validator</span>
            </h3>
            <p className="text-xs text-slate-300">
              Input vendor procurement receipts, GSTIN, and e-Way Bill details to test automated paper-invoice and shell company detection.
            </p>

            {/* Presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-semibold">Test Presets:</span>
              <button
                onClick={() => {
                  setInvoiceNo('INV-2025-9941');
                  setVendorGstin('27AAACG8492E1Z2');
                  setEwayBillNo('EWB-39201948201');
                  setInvoiceAmount('₹18,50,000 INR');
                  handleRunBillScan('clean');
                }}
                className="text-[11px] px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-bold"
              >
                Clean Vendor Invoice
              </button>

              <button
                onClick={() => {
                  setInvoiceNo('INV-FAKE-8821');
                  setVendorGstin('21AAATA5520D1Z6');
                  setEwayBillNo('MISSING-EWAY-BILL');
                  setInvoiceAmount('₹1,85,00,000 INR');
                  handleRunBillScan('fake');
                }}
                className="text-[11px] px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 font-bold"
              >
                Fake Bill & Shell Company Red-Flag Demo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Vendor GSTIN</label>
                <input
                  type="text"
                  value={vendorGstin}
                  onChange={(e) => setVendorGstin(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">e-Way Bill Number</label>
                <input
                  type="text"
                  value={ewayBillNo}
                  onChange={(e) => setEwayBillNo(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Invoice Billed Amount (₹)</label>
                <input
                  type="text"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={() => handleRunBillScan()}
              disabled={scanningBill}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
            >
              {scanningBill ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Auditing e-Way Bills, GSTR-1 Filings & Circular Payment Trails...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Forensic Invoice & Shell Company Audit</span>
                </>
              )}
            </button>
          </div>

          {/* Result Output */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Audit Result Log</h3>

            {!billScanResult && !scanningBill && (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-2xl">
                <Receipt className="w-10 h-10 text-slate-600 mb-2" />
                <p className="text-xs text-slate-400">Click "Run Forensic Invoice Audit" to test fake bill detection.</p>
              </div>
            )}

            {scanningBill && (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <p className="text-xs text-slate-300 font-mono">Cross-checking GST Portal, MCA Company Registry & e-Way Bill logs...</p>
              </div>
            )}

            {billScanResult && (
              <div className="space-y-4 text-xs">
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    billScanResult.overallResult.includes('Clean')
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5 text-sm">
                      {billScanResult.overallResult.includes('Clean') ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-rose-400" />}
                      {billScanResult.overallResult}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono">
                    e-Way Bill Status: <strong>{billScanResult.eWayBillStatus}</strong> | GSTR-1 Tax Match: <strong>{billScanResult.gstr1Match ? 'PASSED' : 'FAILED'}</strong>
                  </p>
                </div>

                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 text-[11px]">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Forensic Audit Findings</p>
                  {billScanResult.findings.map((f, i) => (
                    <p key={i} className="text-slate-200 leading-relaxed font-mono">• {f}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DOCUMENT NLP SCANNER */}
      {activeEngine === 'document' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Text / Document Verification Sandbox</span>
              <span className="text-xs text-slate-400 font-mono">LLM Cross-Consistency Engine</span>
            </h3>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold font-mono">Presets:</span>
              <button
                onClick={() => {
                  const sample = `PROJECT COMPLETION REPORT - GREEN FORESTS INITIATIVE 2025
Budget Allocated: ₹1,50,00,000 INR
Claimed Trees Planted: 50,000 Saplings
Location: Western Ghats Reforestation Site

Receipt Summary:
- Nursery Sapling Procurement: 48,500 saplings purchased at ₹210/sapling (₹1,01,85,000)
- Community Labor Wages: ₹38,00,000 paid to 85 workers over 3 months
- Transport & Logistics: ₹10,15,000 (e-Way Bill #EWB-39201948201 Verified)

Auditor Note: All invoices match bank disbursements with zero unaccounted variance.`;
                  setDocText(sample);
                  handleRunDocScan(sample);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-bold"
              >
                Clean Report Demo
              </button>

              <button
                onClick={() => {
                  const sample = `DISASTER RELIEF DISTRIBUTION DISCLOSURE Q3
Budget Disclosed: ₹6,25,00,000 INR
Claimed Relief Kits: 50,000 Food Packets

Receipts Uploaded:
- Invoice #881: ₹1,85,00,000 INR for food grains.
- Unaccounted Variance: ₹18,40,000 INR missing line item breakdown.
- Duplicate Image flag detected on distribution photos.`;
                  setDocText(sample);
                  handleRunDocScan(sample);
                }}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 font-bold"
              >
                Inconsistent Report Demo
              </button>
            </div>

            <textarea
              rows={8}
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />

            <button
              onClick={() => handleRunDocScan()}
              disabled={docScanning}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              {docScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Running LLM Cross-Consistency Analysis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Live AI Consistency Scan</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">AI Analysis Output Log</h3>

            {!docScanResult && !docScanning && (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-2xl">
                <FileText className="w-10 h-10 text-slate-600 mb-2" />
                <p className="text-xs text-slate-400">Click "Run Live AI Consistency Scan" to view NLP results.</p>
              </div>
            )}

            {docScanning && (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <p className="text-xs text-slate-300 font-mono">Parsing financial entities & comparing with narrative claims...</p>
              </div>
            )}

            {docScanResult && (
              <div className="space-y-4 text-xs">
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    docScanResult.status.includes('Passed')
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      {docScanResult.status.includes('Passed') ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      {docScanResult.status}
                    </span>
                    <span className="font-mono">{docScanResult.confidence}% Confidence</span>
                  </div>
                  {docScanResult.inconsistencyDetails && (
                    <p className="text-[11px] leading-relaxed pt-1">{docScanResult.inconsistencyDetails}</p>
                  )}
                </div>

                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 font-mono text-[11px]">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Extracted Metrics Matrix</p>
                  <div className="flex justify-between text-slate-200">
                    <span>Claimed Output:</span>
                    <span className="font-bold text-white">{docScanResult.extractedMetrics.claimedUnits}</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Receipt Backed:</span>
                    <span className="font-bold text-emerald-400">{docScanResult.extractedMetrics.receiptValidatedUnits}</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Unaccounted Delta:</span>
                    <span className="font-bold text-amber-400">{docScanResult.extractedMetrics.unaccountedDelta}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* IMAGE INTEGRITY SCANNER */}
      {activeEngine === 'image' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Visual Evidence & Perceptual Hashing (pHash)</h3>
            <p className="text-xs text-slate-400">
              Test image duplicate detection and EXIF sensor validation. Select a test image to simulate server-side perceptual hash generation.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleRunImageScan('clean')}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs hover:bg-emerald-500/20"
              >
                Test Genuine Field Photo
              </button>
              <button
                onClick={() => handleRunImageScan('duplicate')}
                className="flex-1 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-xs hover:bg-rose-500/20"
              >
                Test Re-used / Duplicate Photo
              </button>
            </div>

            {imageFile && (
              <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-800">
                <img src={imageFile} alt="Test Evidence" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">pHash & EXIF Inspection Report</h3>

            {imageScanning && (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <p className="text-xs text-slate-300 font-mono">Computing 64-bit Perceptual Hash (pHash) & checking global image database...</p>
              </div>
            )}

            {!imageScanning && !imageScanResult && (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-2xl">
                <ImageIcon className="w-10 h-10 text-slate-600 mb-2" />
                <p className="text-xs text-slate-400">Select a test image above to run perceptual hash verification.</p>
              </div>
            )}

            {imageScanResult && (
              <div className="space-y-4 text-xs font-mono">
                <div
                  className={`p-4 rounded-2xl border space-y-1 ${
                    imageScanResult.verificationOutcome.includes('PASSED')
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <p className="font-bold text-sm">{imageScanResult.verificationOutcome}</p>
                  <p className="text-[11px]">{imageScanResult.duplicateStatus}</p>
                </div>

                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 text-[11px]">
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Metadata & Hashing Attributes</p>
                  <p><span className="text-slate-400">Perceptual Hash Fingerprint:</span> <span className="text-emerald-400">{imageScanResult.pHash}</span></p>
                  <p><span className="text-slate-400">EXIF GPS Header:</span> <span className="text-slate-200">{imageScanResult.exifGPS}</span></p>
                  <p><span className="text-slate-400">EXIF Hardware Timestamp:</span> <span className="text-slate-200">{imageScanResult.exifTimestamp}</span></p>
                  <p><span className="text-slate-400">Error Level Analysis (ELA):</span> <span className="text-cyan-400">{imageScanResult.manipulationScore}</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SCORE CALCULATOR SIMULATOR */}
      {activeEngine === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white">Adjust Sub-Score Variables</h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-300">Documentation Quality (25%)</span>
                  <span className="text-emerald-400">{weights.doc}/100</span>
                </div>
                <input
                  type="range" min="0" max="100" value={weights.doc}
                  onChange={(e) => setWeights({ ...weights, doc: parseInt(e.target.value) })}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-300">Financial-to-Outcome Narrative Consistency (25%)</span>
                  <span className="text-teal-400">{weights.fin}/100</span>
                </div>
                <input
                  type="range" min="0" max="100" value={weights.fin}
                  onChange={(e) => setWeights({ ...weights, fin: parseInt(e.target.value) })}
                  className="w-full accent-teal-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-300">Visual & Field Evidence Density (20%)</span>
                  <span className="text-cyan-400">{weights.visual}/100</span>
                </div>
                <input
                  type="range" min="0" max="100" value={weights.visual}
                  onChange={(e) => setWeights({ ...weights, visual: parseInt(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-300">Ground Beneficiary Feedback (20%)</span>
                  <span className="text-amber-400">{weights.community}/100</span>
                </div>
                <input
                  type="range" min="0" max="100" value={weights.community}
                  onChange={(e) => setWeights({ ...weights, community: parseInt(e.target.value) })}
                  className="w-full accent-amber-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-300">Audit Governance (10%)</span>
                  <span className="text-purple-400">{weights.audit}/100</span>
                </div>
                <input
                  type="range" min="0" max="100" value={weights.audit}
                  onChange={(e) => setWeights({ ...weights, audit: parseInt(e.target.value) })}
                  className="w-full accent-purple-400"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-center items-center text-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Simulated Explainable Trust Score</span>
            <div className="text-6xl font-extrabold gradient-text">{computedTrustScore}</div>
            <span className="text-xs font-semibold px-4 py-1 rounded-full gradient-badge text-emerald-300">
              {computedTrustScore >= 90 ? 'Verified Outstanding Tier' : computedTrustScore >= 80 ? 'High Integrity Tier' : computedTrustScore >= 70 ? 'Moderate Evidence Tier' : 'Needs Documentation Tier'}
            </span>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Formula: 0.25(Doc) + 0.25(Fin) + 0.20(Visual) + 0.20(Community) + 0.10(Audit). Completely open, deterministic, and auditable.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
