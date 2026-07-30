import React, { useState } from 'react';
import { NGO, UserProfile } from '../types';
import { X, Phone, MessageSquare, MapPin, Mail, Heart, Send, CheckCircle2, Navigation, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { calculateDistanceInKm } from '../utils/distance';

interface ContactNGOModalProps {
  isOpen: boolean;
  ngo: NGO | null;
  currentUser: UserProfile | null;
  initialTab?: 'chat' | 'call' | 'map' | 'inquiry' | 'donate';
  onClose: () => void;
}

export const ContactNGOModal: React.FC<ContactNGOModalProps> = ({
  isOpen,
  ngo,
  currentUser,
  initialTab = 'chat',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'call' | 'map' | 'inquiry' | 'donate'>(initialTab);

  // Chat State
  const [messages, setMessages] = useState<{ sender: 'user' | 'ngo'; text: string; time: string }[]>([
    {
      sender: 'ngo',
      text: `Namaste! Welcome to ${ngo?.name || 'our NGO'}. How can we assist you with our programs or volunteer opportunities today?`,
      time: 'Just now',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Direct Inquiry State
  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryBody, setInquiryBody] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Donation State in INR
  const [donationAmount, setDonationAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donationDone, setDonationDone] = useState(false);

  if (!isOpen || !ngo) return null;

  const userLat = currentUser?.location?.lat || 12.9716;
  const userLng = currentUser?.location?.lng || 77.5946;
  const distanceKm = calculateDistanceInKm(userLat, userLng, ngo.coordinates[0], ngo.coordinates[1]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = { sender: 'user' as const, text: inputMsg, time: 'Just now' };
    setMessages((prev) => [...prev, newMsg]);
    setInputMsg('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ngo',
          text: `Thank you for reaching out! Our coordinator at ${ngo.contactInfo.city} office has received your message and will respond shortly. You can also call us directly at ${ngo.contactInfo.phone}.`,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  const handleProcessDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationDone(true);
  };

  const finalDonationAmt = customAmount ? Number(customAmount) : donationAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 max-w-2xl w-full border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4">
          <img src={ngo.logo} alt={ngo.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
          <div>
            <h2 className="text-xl font-bold text-white">{ngo.name}</h2>
            <p className="text-xs text-slate-400 font-mono">
              Reg ID: {ngo.registrationNumber} • {ngo.contactInfo.city}, {ngo.contactInfo.state}
            </p>
            <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
              📍 Distance from you: {distanceKm} km
            </p>
          </div>
        </div>

        {/* Action Tabs Bar */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp / Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('call')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'call'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Info</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'map'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Address & Map</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiry')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'inquiry'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Inquiry</span>
          </button>

          <button
            onClick={() => setActiveTab('donate')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'donate'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold'
                : 'text-rose-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Support (₹ INR)</span>
          </button>
        </div>

        {/* TAB 1: WHATSAPP / INSTANT CHAT SIMULATION */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 h-64 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs ${
                      m.sender === 'user'
                        ? 'bg-emerald-500 text-slate-950 font-medium rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <span className="text-[9px] opacity-70 block text-right mt-1">{m.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message to NGO..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: CALL INFO */}
        {activeTab === 'call' && (
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <Phone className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Direct Phone Contact</h3>
              <p className="text-xs text-slate-400">Call the NGO office directly during working hours</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 inline-block max-w-sm w-full">
              <span className="text-slate-400 text-xs block">Official Contact Line</span>
              <a
                href={`tel:${ngo.contactInfo.phone}`}
                className="text-2xl font-mono font-extrabold text-emerald-400 hover:underline block"
              >
                {ngo.contactInfo.phone}
              </a>
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>Office Hours: {ngo.contactInfo.officeHours}</span>
              </div>
            </div>

            <div>
              <a
                href={`tel:${ngo.contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:opacity-90 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now (+91 Line)</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: ADDRESS & MAP VIEW */}
        {activeTab === 'map' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Official Registered Office Address</h3>
                  <p className="text-slate-300 mt-1">{ngo.contactInfo.address}</p>
                  <p className="text-slate-400 font-mono mt-0.5">
                    {ngo.contactInfo.city}, {ngo.contactInfo.state} - {ngo.contactInfo.pincode}
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold shrink-0">
                  📍 {distanceKm} km away
                </span>
              </div>

              {/* Mock Map Representation */}
              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-pulse">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-white">{ngo.name} HQ Location</p>
                  <p className="text-[11px] font-mono text-slate-400">
                    GPS Coordinates: {ngo.coordinates[0]}, {ngo.coordinates[1]}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1">
                <span>Nearest City Center: {ngo.contactInfo.city}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${ngo.coordinates[0]},${ngo.coordinates[1]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DIRECT INQUIRY FORM */}
        {activeTab === 'inquiry' && (
          <div>
            {!inquirySubmitted ? (
              <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSR Collaboration / Program Inquiry"
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your questions or details for the NGO administration..."
                    value={inquiryBody}
                    onChange={(e) => setInquiryBody(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Send Official Inquiry to NGO Director
                </button>
              </form>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-emerald-300 text-base">Inquiry Submitted Successfully</h3>
                <p className="text-xs text-slate-300">
                  Your message has been delivered to <strong>{ngo.contactInfo.email}</strong>. A confirmation email has been logged.
                </p>
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: DONATE IN INR (₹) */}
        {activeTab === 'donate' && (
          <div>
            {!donationDone ? (
              <form onSubmit={handleProcessDonation} className="space-y-4 text-xs">
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-sm">Direct Verified Contribution in Indian Rupees (₹)</h3>
                  <p className="text-slate-300">100% of your contribution goes directly to verified programs.</p>
                </div>

                {/* Preset Preset Amounts */}
                <div className="grid grid-cols-4 gap-2">
                  {[500, 1000, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setDonationAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 rounded-xl font-bold border transition-all ${
                        donationAmount === amt && !customAmount
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Custom Amount (₹ INR)</label>
                  <input
                    type="number"
                    placeholder="Enter custom amount in ₹"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Tax Benefit Pill */}
                <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-slate-300">
                  <span>80G Tax Exemption Benefit (50% Tax Save):</span>
                  <span className="font-bold text-emerald-400">
                    Save ₹{Math.round(finalDonationAmt * 0.15).toLocaleString('en-IN')} tax
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
                >
                  Proceed to Support ₹{finalDonationAmt.toLocaleString('en-IN')} INR
                </button>
              </form>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-emerald-300 text-lg">Thank You for Your Contribution!</h3>
                <p className="text-xs text-slate-300">
                  Your donation of <strong>₹{finalDonationAmt.toLocaleString('en-IN')} INR</strong> to {ngo.name} has been processed successfully. An 80G tax receipt has been generated.
                </p>
                <button
                  onClick={() => setDonationDone(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  Make Another Contribution
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
