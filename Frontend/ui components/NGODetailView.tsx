import React, { useState } from 'react';
import { NGO, InconsistencyFlag, UserProfile } from '../types';
import { ShieldCheck, ArrowLeft, AlertTriangle, FileText, Image as ImageIcon, MapPin, CheckCircle2, Info, Download, Phone, MessageSquare, Mail, Heart, PlusCircle, Users, Calendar, Clock, ExternalLink, Video, Play, X, Receipt } from 'lucide-react';
import { calculateDistanceInKm } from '../utils/distance';

interface NGODetailViewProps {
  ngo: NGO;
  currentUser: UserProfile | null;
  onBack: () => void;
  onNavigateToFeedback: () => void;
  onOpenContactModal: (tab?: 'chat' | 'call' | 'map' | 'inquiry' | 'donate') => void;
  onOpenVolunteerModal: () => void;
  onOpenNewDriveModal: () => void;
}

export const NGODetailView: React.FC<NGODetailViewProps> = ({
  ngo,
  currentUser,
  onBack,
  onNavigateToFeedback,
  onOpenContactModal,
  onOpenVolunteerModal,
  onOpenNewDriveModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'volunteer' | 'evidence' | 'documents' | 'reviews'>('overview');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const userLat = currentUser?.location?.lat || 12.9716;
  const userLng = currentUser?.location?.lng || 77.5946;
  const distanceKm = calculateDistanceInKm(userLat, userLng, ngo.coordinates[0], ngo.coordinates[1]);

  return (
    <div className="space-y-8">
      {/* Top Back Navigation & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to NGO Explorer</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenContactModal('donate')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-rose-500/20"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Support NGO (₹ INR)</span>
          </button>

          <button
            onClick={() => alert(`Generated Verified Transparency Report for ${ngo.name}. PDF preview downloaded.`)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Verified Audit (PDF)</span>
          </button>
        </div>
      </div>

      {/* Header Profile Hero Card */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <img
              src={ngo.logo}
              alt={ngo.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl lg:text-3xl font-extrabold text-white">{ngo.name}</h1>
                <span className="text-xs px-3 py-1 rounded-full gradient-badge text-emerald-300 font-semibold">
                  {ngo.trustLevel}
                </span>

                {ngo.isEligible5Years !== false ? (
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    5+ Yrs Verified
                  </span>
                ) : (
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Pending 5-Year Operating History
                  </span>
                )}
              </div>

              <p className="text-xs font-mono text-slate-400 mt-1">
                Reg: {ngo.registrationNumber} • Founded {ngo.foundedYear} • DARPAN: {ngo.darpanId || 'Verified'} • {ngo.location}
              </p>
              <p className="text-xs text-slate-300 mt-2 max-w-2xl">{ngo.summary}</p>
            </div>
          </div>

          {/* Trust Score Display */}
          <div className="flex items-center gap-4 self-stretch lg:self-auto">
            <div className="glass-panel rounded-2xl p-4 text-center border border-emerald-500/30 min-w-[140px] flex-1 lg:flex-initial">
              <span className="text-3xl font-extrabold text-emerald-400">{ngo.trustScore}/100</span>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider mt-1">
                Transparency Score
              </span>
            </div>
          </div>

        </div>

        {/* Government Compliance Identifiers & Shell Risk Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">NITI Aayog DARPAN:</span>
            <span className="text-emerald-400 font-bold">{ngo.darpanId || 'Verified'}</span>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">GSTIN Tax Status:</span>
            <span className="text-emerald-400 font-bold">{ngo.gstin || 'Active GSTR-1'}</span>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Shell Company Risk:</span>
            <span className={`font-bold ${ngo.shellCompanyRiskScore && ngo.shellCompanyRiskScore > 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {ngo.shellCompanyRiskScore !== undefined ? `${ngo.shellCompanyRiskScore}% Risk` : '0% Risk (Clean)'}
            </span>
          </div>
        </div>

        {/* Interactive Direct Communication Bar */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span className="font-mono">{ngo.contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-teal-400" />
              <span>{ngo.contactInfo.email}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => onOpenContactModal('call')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white flex items-center gap-1.5 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Phone</span>
            </button>

            <button
              onClick={() => onOpenContactModal('chat')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white flex items-center gap-1.5 font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
              <span>WhatsApp Chat</span>
            </button>

            <button
              onClick={() => onOpenContactModal('map')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white flex items-center gap-1.5 font-medium transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Address & Map</span>
            </button>

            <button
              onClick={() => onOpenContactModal('inquiry')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white flex items-center gap-1.5 font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Inquiry</span>
            </button>
          </div>
        </div>

        {/* Highlighted Metrics Bar in ₹ INR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 text-xs font-medium block">Claimed Impact</span>
            <span className="text-white font-bold text-sm">{ngo.metrics.claimedImpact}</span>
          </div>
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 text-xs font-medium block">Verified Metric</span>
            <span className="text-emerald-400 font-bold text-sm">{ngo.metrics.verifiedImpact}</span>
          </div>
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 text-xs font-medium block">Disclosed Budget</span>
            <span className="text-white font-bold text-sm">{ngo.metrics.totalBudgetDisclosed}</span>
          </div>
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
            <span className="text-slate-400 text-xs font-medium block">Program Ratio</span>
            <span className="text-teal-400 font-bold text-sm">{ngo.metrics.programExpenseRatio}% Direct Output</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-800 gap-4 overflow-x-auto text-sm font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors shrink-0 ${
            activeTab === 'overview'
              ? 'border-b-2 border-emerald-500 text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview & Audit Breakdown
        </button>

        <button
          onClick={() => setActiveTab('volunteer')}
          className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
            activeTab === 'volunteer'
              ? 'border-b-2 border-emerald-500 text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Volunteer Drives ({ngo.volunteerOpportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`pb-3 transition-colors shrink-0 flex items-center gap-1.5 ${
            activeTab === 'evidence'
              ? 'border-b-2 border-emerald-500 text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Photos & Videos ({ngo.media.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 transition-colors shrink-0 ${
            activeTab === 'documents'
              ? 'border-b-2 border-emerald-500 text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Public Filings & 80G Audits
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 transition-colors shrink-0 ${
            activeTab === 'reviews'
              ? 'border-b-2 border-emerald-500 text-emerald-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Ground Reviews ({ngo.reviews.length})
        </button>
      </div>

      {/* Tab Contents */}

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Factor Breakdown & Compliance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-300">Documentation Quality</span>
                  <span className="text-emerald-400 font-bold">{ngo.scoreBreakdown.documentationQuality}/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${ngo.scoreBreakdown.documentationQuality}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 pt-1">12A, 80G tax filings, auditor opinion, itemized budget ledgers.</p>
              </div>

              <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-300">Financial Consistency</span>
                  <span className="text-teal-400 font-bold">{ngo.scoreBreakdown.financialConsistency}/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400" style={{ width: `${ngo.scoreBreakdown.financialConsistency}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 pt-1">Financial audit consistency matching claimed outputs against expenditures.</p>
              </div>

              <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-300">Visual & Field Evidence</span>
                  <span className="text-cyan-400 font-bold">{ngo.scoreBreakdown.visualEvidence}/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${ngo.scoreBreakdown.visualEvidence}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 pt-1">Geotagged project photos and verified field site logs.</p>
              </div>

              <div className="space-y-1 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-300">Ground Community Feedback</span>
                  <span className="text-amber-400 font-bold">{ngo.scoreBreakdown.communityFeedback}/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: `${ngo.scoreBreakdown.communityFeedback}%` }} />
                </div>
                <p className="text-[11px] text-slate-400 pt-1">Crowdsourced beneficiary and volunteer reports from local region.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VOLUNTEER HUB TAB */}
      {activeTab === 'volunteer' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  Volunteer Drives & Registration Openings
                </h3>
              </div>

              <button
                onClick={onOpenNewDriveModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20 shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Open New Volunteer Drive (NGO Manager)</span>
              </button>
            </div>

            <div className="space-y-4">
              {ngo.volunteerOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-white">{opp.title}</h4>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                          {opp.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          {opp.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-teal-400" />
                          {opp.location}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={onOpenVolunteerModal}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-md shadow-emerald-500/20 shrink-0"
                    >
                      Register as Volunteer
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{opp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VISUAL EVIDENCE TAB WITH VIDEO PLAYER */}
      {activeTab === 'evidence' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-400" />
              Field Evidence Gallery (Photos & Video Footage)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ngo.media.map((item) => (
                <div key={item.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 space-y-3">
                  <div className="relative h-48 bg-slate-950">
                    <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                    
                    {item.type === 'video' && item.videoUrl && (
                      <button
                        onClick={() => setActiveVideoUrl(item.videoUrl || null)}
                        className="absolute inset-0 bg-slate-950/50 flex items-center justify-center text-white hover:bg-slate-950/70 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                          <Play className="w-6 h-6 fill-slate-950 ml-1" />
                        </div>
                      </button>
                    )}

                    <span className="absolute bottom-2 left-2 bg-slate-950/80 text-emerald-400 font-mono text-xs px-2 py-0.5 rounded border border-slate-800">
                      {item.type === 'video' ? `Video (${item.duration})` : 'EXIF Photo Verified'}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <p className="font-semibold text-white">{item.caption}</p>
                    <div className="space-y-1 font-mono text-slate-400 text-[11px]">
                      <p className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        GPS: {item.location}
                      </p>
                      <p>Timestamp: {item.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-2xl">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-emerald-400" />
              <span>Verified Field Impact Video Playback</span>
            </h4>
            <div className="aspect-video rounded-2xl overflow-hidden bg-black">
              <video src={activeVideoUrl} controls autoPlay className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTS TAB */}
      {activeTab === 'documents' && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            Disclosed Public Filings & 80G Audits
          </h3>
          <div className="space-y-3">
            {ngo.documents.map((doc) => (
              <div key={doc.id} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white">{doc.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {doc.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Filed on {doc.filingDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REVIEWS TAB */}
      {activeTab === 'reviews' && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Community & Ground Beneficiary Feedback</h3>
            <button
              onClick={onNavigateToFeedback}
              className="text-xs text-emerald-400 font-semibold hover:underline"
            >
              + Submit Ground Feedback
            </button>
          </div>

          <div className="space-y-4">
            {ngo.reviews.map((rev) => (
              <div key={rev.id} className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{rev.reviewerType}</span>
                    <span className="text-xs text-slate-400">({rev.location})</span>
                  </div>
                  <span className="text-amber-400 font-bold text-xs">★ {rev.rating}/5</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
