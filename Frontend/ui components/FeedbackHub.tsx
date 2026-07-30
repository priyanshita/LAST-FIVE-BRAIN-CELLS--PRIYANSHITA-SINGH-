import React, { useState } from 'react';
import { MessageSquareQuote, ShieldCheck, MapPin, Lock, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { mockNGOs } from '../data/mockNGOs';

export const FeedbackHub: React.FC = () => {
  const [selectedNGOId, setSelectedNGOId] = useState<string>(mockNGOs[0].id);
  const [reviewerType, setReviewerType] = useState<'Beneficiary' | 'Field Volunteer' | 'Local Community Leader' | 'Donor'>('Beneficiary');
  const [location, setLocation] = useState<string>('Raichur District, Karnataka');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>(
    'The digital learning labs and laptops arrived as promised. Local students have been attending computer classes weekly.'
  );
  const [useGeotag, setUseGeotag] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      alert('Feedback successfully submitted to VeriImpact Ground Feedback Network!');
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Ground Beneficiary Privacy Shield</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-white">Ground Feedback Hub</h2>
        <p className="text-xs lg:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Ground beneficiaries, volunteers, and donors submit real-world feedback. Personal identity (PII) is automatically protected.
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-panel rounded-3xl p-6 lg:p-8 border border-slate-800 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* NGO Select */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-bold">Select Target NGO</label>
            <select
              value={selectedNGOId}
              onChange={(e) => setSelectedNGOId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {mockNGOs.map((ngo) => (
                <option key={ngo.id} value={ngo.id}>
                  {ngo.name} ({ngo.registrationNumber}) — {ngo.category}
                </option>
              ))}
            </select>
          </div>

          {/* Role & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-slate-300 font-bold">Your Role / Relationship</label>
              <select
                value={reviewerType}
                onChange={(e: any) => setReviewerType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Beneficiary">Ground Beneficiary (Aid Recipient)</option>
                <option value="Field Volunteer">Field Volunteer / On-site Worker</option>
                <option value="Local Community Leader">Local Community Leader / Panchayat</option>
                <option value="Donor">Individual / Institutional Donor</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 font-bold">Field Location / Region</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Star Rating */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-bold">Rating (1 to 5 Stars)</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-10 h-10 rounded-xl text-lg font-bold transition-all ${
                    rating >= star
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-bold">Detailed Feedback & Ground Report</label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
              placeholder="Describe your ground observations..."
            />
          </div>

          {/* Geotag Toggle */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200 block text-xs">Attach GPS Location Verification Tag</span>
              <span className="text-[11px] text-slate-400">Proves report originated within 15km of target NGO site</span>
            </div>
            <button
              type="button"
              onClick={() => setUseGeotag(!useGeotag)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                useGeotag ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  useGeotag ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            {submitted ? (
              <span>Publishing Feedback...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Ground Feedback Report</span>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};
