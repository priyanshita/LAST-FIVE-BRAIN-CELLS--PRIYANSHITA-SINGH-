import React, { useState } from 'react';
import { ShieldCheck, Search, MessageSquareQuote, Building2, MapPin, UserCheck, LogIn, UploadCloud, LogOut, CheckCircle2, User } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'explorer' | 'detail' | 'feedback';
  setActiveTab: (tab: 'explorer' | 'detail' | 'feedback') => void;
  selectedNGOName?: string;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenNGOPortalModal: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedNGOName,
  currentUser,
  onOpenAuthModal,
  onOpenNGOPortalModal,
  onLogout,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explorer')}>
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl tracking-tight text-white">VeriImpact</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Pan-India Network (₹ INR)
              </span>
            </div>
            <p className="text-xs text-slate-400">Verified NGO Transparency & Real-World Impact Network</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80 text-sm font-medium">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'explorer'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>NGO Explorer</span>
          </button>

          {selectedNGOName && (
            <button
              onClick={() => setActiveTab('detail')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'detail'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="max-w-[140px] truncate">{selectedNGOName}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'feedback'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Feedback</span>
          </button>
        </nav>

        {/* Action Controls: NGO Portal & User Profile */}
        <div className="flex items-center gap-2.5">
          {/* NGO Upload & Eligibility Portal Button */}
          <button
            onClick={onOpenNGOPortalModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 text-xs font-bold transition-all"
          >
            <UploadCloud className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">NGO Portal (5+ Yrs)</span>
          </button>

          {/* User Auth & Profile Menu */}
          {currentUser?.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 text-xs bg-slate-900 border border-emerald-500/40 rounded-xl px-3.5 py-2 hover:border-emerald-400 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  {currentUser.avatar || currentUser.name.charAt(0)}
                </div>
                <div className="text-left">
                  <span className="text-slate-200 font-bold block leading-tight flex items-center gap-1">
                    {currentUser.name}
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3" />
                    {currentUser.location?.city || 'Bangalore'}
                  </span>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 glass-panel border border-slate-800 rounded-2xl p-3 shadow-2xl space-y-3 z-50 animate-fade-in text-xs">
                  <div className="border-b border-slate-800 pb-2 space-y-1">
                    <p className="font-bold text-white text-sm">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    <p className="text-[10px] font-mono text-emerald-400">{currentUser.phone}</p>
                    <div className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold mt-1">
                      ✓ Verified via {currentUser.authMethod === 'email' ? 'Email Address' : 'Mobile SMS (+91)'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenAuthModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 font-medium"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Update Active Location</span>
                    </button>

                    {onLogout && (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out / Switch Account</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-md shadow-emerald-500/20"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In & Location</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
