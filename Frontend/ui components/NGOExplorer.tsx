import React, { useState } from 'react';
import { NGO, TrustLevel, UserProfile } from '../types';
import { Search, Filter, ShieldCheck, CheckCircle2, MapPin, Award, Phone, MessageSquare, Compass, ArrowRight, Heart, Users, Sparkles, Navigation, Calendar, Video, AlertTriangle } from 'lucide-react';
import { calculateDistanceInKm } from '../utils/distance';

interface NGOExplorerProps {
  ngos: NGO[];
  currentUser: UserProfile | null;
  onSelectNGO: (ngo: NGO) => void;
  onOpenContactModal: (ngo: NGO, tab?: 'chat' | 'call' | 'map' | 'inquiry' | 'donate') => void;
  onOpenVolunteerModal: (ngo: NGO) => void;
  onOpenAuthModal: () => void;
  onOpenNGOPortalModal: () => void;
}

export const NGOExplorer: React.FC<NGOExplorerProps> = ({
  ngos,
  currentUser,
  onSelectNGO,
  onOpenContactModal,
  onOpenVolunteerModal,
  onOpenAuthModal,
  onOpenNGOPortalModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'distance' | 'trust'>('default');

  const categories = ['All', 'Child Education', 'Reforestation & Environment', 'Clean Water Access', 'Healthcare & Sanitation', 'Disaster Relief'];

  const userLat = currentUser?.location?.lat || 12.9716;
  const userLng = currentUser?.location?.lng || 77.5946;

  // Compute distance for each NGO and filter
  const ngosWithDistance = ngos.map((ngo) => {
    const dist = calculateDistanceInKm(userLat, userLng, ngo.coordinates[0], ngo.coordinates[1]);
    return { ...ngo, distanceKm: dist };
  });

  let filteredNGOs = ngosWithDistance.filter((ngo) => {
    const matchesSearch =
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ngo.category === selectedCategory;
    const matchesLevel = filterLevel === 'All' || ngo.trustLevel === filterLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Sorting logic
  if (sortBy === 'distance') {
    filteredNGOs.sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (sortBy === 'trust') {
    filteredNGOs.sort((a, b) => b.trustScore - a.trustScore);
  }

  // Nearest NGOs (top 3 closest)
  const nearbyNGOs = [...ngosWithDistance].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);

  const getTrustBadgeColor = (level: TrustLevel) => {
    switch (level) {
      case 'Verified Outstanding':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'High Integrity':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
      case 'Moderate Evidence':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Needs Documentation':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verifiable Impact Network • Pan-India Rupee (₹ INR) Platform</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Connect & Support Verified NGOs <span className="gradient-text">Across India</span>
            </h2>
            <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
              Discover verified non-profit organizations operating in your city and state. Enforces minimum 5 years operating eligibility, photo/video ground evidence, and shell company forensic audits.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {!currentUser?.isLoggedIn ? (
                <button
                  onClick={onOpenAuthModal}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Enable GPS Location for Nearby NGOs</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Detected Location: <strong>{currentUser.location?.city || 'Selected Location'}</strong></span>
                </div>
              )}

              <button
                onClick={onOpenNGOPortalModal}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-bold text-sm transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>NGO Portal (Register / 5+ Yrs Check)</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
              <span className="text-2xl lg:text-3xl font-extrabold text-emerald-400">5+ Yrs</span>
              <p className="text-xs text-slate-400 mt-1">Operating History Required</p>
            </div>
            <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
              <span className="text-2xl lg:text-3xl font-extrabold text-teal-400">₹ INR</span>
              <p className="text-xs text-slate-400 mt-1">Pan-India Support</p>
            </div>
            <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
              <span className="text-2xl lg:text-3xl font-extrabold text-cyan-400">0% Shell</span>
              <p className="text-xs text-slate-400 mt-1">Forensic Vendor Audits</p>
            </div>
            <div className="glass-panel rounded-2xl p-4 text-center border border-slate-800">
              <span className="text-2xl lg:text-3xl font-extrabold text-amber-400">EXIF</span>
              <p className="text-xs text-slate-400 mt-1">Photo/Video Verification</p>
            </div>
          </div>

        </div>
      </div>

      {/* Suggested Nearby NGOs Section */}
      <div className="glass-panel-glow rounded-3xl p-6 border border-emerald-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Suggested Nearby NGOs</h3>
          </div>
          <span className="text-xs text-slate-400">
            Based on distance to {currentUser?.location?.city || 'Bangalore'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nearbyNGOs.map((ngo) => (
            <div
              key={ngo.id}
              onClick={() => onSelectNGO(ngo)}
              className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={ngo.logo} alt={ngo.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-white line-clamp-1">{ngo.name}</h4>
                    <p className="text-[11px] text-slate-400">{ngo.contactInfo.city}, {ngo.contactInfo.state}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {ngo.distanceKm} km away
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono">
                  {ngo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel rounded-2xl p-4 lg:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search NGO by name, DARPAN ID, registration ID (e.g. KA/2018/0198421), or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category & Sorting Filters */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 shrink-0"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 shrink-0"
            >
              <option value="default">Sort by Recommended</option>
              <option value="distance">📍 Sort by Nearest (Distance)</option>
              <option value="trust">⭐ Sort by Highest Trust Score</option>
            </select>
          </div>

        </div>
      </div>

      {/* NGO Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNGOs.map((ngo) => (
          <div
            key={ngo.id}
            className="glass-panel rounded-2xl p-6 border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group relative"
          >
            {/* Top Row: Category & Distance */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectNGO(ngo)}>
                  <img
                    src={ngo.logo}
                    alt={ngo.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {ngo.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{ngo.registrationNumber}</p>
                  </div>
                </div>
              </div>

              {/* Badges: Trust + 5-Year Eligibility + Shell Risk */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getTrustBadgeColor(ngo.trustLevel)}`}>
                  {ngo.trustLevel}
                </span>

                {ngo.isEligible5Years !== false ? (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    5+ Yrs Verified
                  </span>
                ) : (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    &lt;5 Yrs (Pending)
                  </span>
                )}

                {ngo.shellCompanyRiskScore !== undefined && ngo.shellCompanyRiskScore > 40 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-400" />
                    Flagged Shell Risk
                  </span>
                )}
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {ngo.summary}
              </p>

              {/* Metrics Grid */}
              <div className="bg-slate-900/80 rounded-xl p-3 grid grid-cols-2 gap-2 border border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">DARPAN ID</span>
                  <span className="text-emerald-400 font-semibold line-clamp-1">{ngo.darpanId || 'Verified'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Annual Budget</span>
                  <span className="text-slate-200 font-medium line-clamp-1">{ngo.metrics.totalBudgetDisclosed}</span>
                </div>
              </div>
            </div>

            {/* Interactive Contact & Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => onOpenContactModal(ngo, 'call')}
                  className="py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call</span>
                </button>

                <button
                  onClick={() => onOpenContactModal(ngo, 'chat')}
                  className="py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                  <span>Chat</span>
                </button>

                <button
                  onClick={() => onOpenContactModal(ngo, 'map')}
                  className="py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors font-medium"
                >
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Address</span>
                </button>
              </div>

              {/* Volunteer Drives Button */}
              {ngo.volunteerOpportunities.length > 0 && (
                <button
                  onClick={() => onOpenVolunteerModal(ngo)}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-all font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Register as Volunteer ({ngo.volunteerOpportunities.length} Drive Open)</span>
                </button>
              )}

              {/* Card Footer View Full Details */}
              <button
                onClick={() => onSelectNGO(ngo)}
                className="w-full pt-1 flex items-center justify-between text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <span>View Full NGO Audits & Media Proof</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
