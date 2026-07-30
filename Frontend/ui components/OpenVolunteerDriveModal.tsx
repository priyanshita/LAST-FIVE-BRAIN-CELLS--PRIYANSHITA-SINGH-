import React, { useState } from 'react';
import { NGO, VolunteerOpportunity } from '../types';
import { X, PlusCircle, Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';

interface OpenVolunteerDriveModalProps {
  isOpen: boolean;
  ngo: NGO | null;
  onClose: () => void;
  onDriveCreated: (newDrive: VolunteerOpportunity) => void;
}

export const OpenVolunteerDriveModal: React.FC<OpenVolunteerDriveModalProps> = ({
  isOpen,
  ngo,
  onClose,
  onDriveCreated,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Community Support');
  const [location, setLocation] = useState(ngo?.location || '');
  const [date, setDate] = useState('Upcoming Weekend (9:00 AM)');
  const [spotsAvailable, setSpotsAvailable] = useState(25);
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState(ngo?.contactInfo.phone || '');

  if (!isOpen || !ngo) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDrive: VolunteerOpportunity = {
      id: `vol-${Date.now()}`,
      ngoId: ngo.id,
      title: title || 'Community Volunteer Initiative',
      category,
      location: location || ngo.location,
      date,
      spotsAvailable: Number(spotsAvailable) || 20,
      spotsFilled: 0,
      description: description || 'Join our field team for an impactful volunteer drive.',
      requirements: requirements ? requirements.split(',').map((r) => r.trim()) : ['Volunteering spirit'],
      isOpen: true,
      contactPerson: contactPerson || 'NGO Volunteer Desk',
      phone: phone || ngo.contactInfo.phone,
    };

    onDriveCreated(newDrive);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 max-w-lg w-full border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-semibold flex items-center gap-1.5 w-fit">
            <PlusCircle className="w-4 h-4" />
            NGO Administrator Portal
          </span>
          <h2 className="text-2xl font-extrabold text-white">Open New Volunteer Drive</h2>
          <p className="text-xs text-slate-300">
            Publish an active volunteer opportunity for <strong className="text-emerald-400">{ngo.name}</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Volunteer Drive Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Rural Literacy Boot Camp / Tree Planting Drive"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Education & Mentorship">Education & Mentorship</option>
                <option value="Environmental Plantation">Environmental Plantation</option>
                <option value="Healthcare & Support">Healthcare & Support</option>
                <option value="Relief Logistics">Relief Logistics</option>
                <option value="Community Support">Community Support</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Volunteers Needed (Spots)</label>
              <input
                type="number"
                min={1}
                required
                value={spotsAvailable}
                onChange={(e) => setSpotsAvailable(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Drive Date & Time</label>
              <input
                type="text"
                required
                placeholder="e.g. Next Saturday (10 AM - 2 PM)"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Reporting Location</label>
              <input
                type="text"
                required
                placeholder="Site address / Landmark"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Drive Description</label>
            <textarea
              rows={3}
              required
              placeholder="Describe the tasks, goals, and logistics for volunteers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Requirements (Comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Basic computer skills, Enthusiasm, Water bottle"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Contact Coordinator Person</label>
              <input
                type="text"
                required
                placeholder="Name of Lead Coordinator"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Coordinator Phone</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20"
          >
            Publish Open Registration Drive Live
          </button>
        </form>
      </div>
    </div>
  );
};
