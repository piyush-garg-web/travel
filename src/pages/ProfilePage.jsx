import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  ShieldCheck, 
  CreditCard, 
  Bell, 
  AlertTriangle,
  Bookmark,
  CheckCircle,
  FileText
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, setUser, savedStays, savedExperiences, addToast } = useTravel();
  const [activeTab, setActiveTab] = useState('Personal'); // Personal, Preferences, Payments, Security

  const [formFields, setFormFields] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    emergencyName: user.emergencyContact.name,
    emergencyPhone: user.emergencyContact.phone
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: formFields.name,
      email: formFields.email,
      phone: formFields.phone,
      emergencyContact: {
        ...prev.emergencyContact,
        name: formFields.emergencyName,
        phone: formFields.emergencyPhone
      }
    }));
    addToast("Profile details updated successfully!", "success");
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Account & Safety Settings</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Profile Dashboard</h1>
        <p className="text-brand-forest/65 mt-2 max-w-xl leading-relaxed">
          Manage your personal details, access aids, linked payment channels, and emergency dispatch targets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Tabs Left */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-brand-teal/5 p-4 space-y-1.5 shadow-premium">
          {[
            { id: 'Personal', label: 'Personal Information', icon: User },
            { id: 'Preferences', label: 'Travel Preferences', icon: Settings },
            { id: 'Payments', label: 'Payment Channels', icon: CreditCard },
            { id: 'Security', label: 'Privacy & Security', icon: ShieldCheck }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === item.id 
                  ? 'bg-brand-teal text-white shadow-sm' 
                  : 'text-brand-forest/70 hover:bg-brand-mint'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="h-px bg-brand-teal/10 my-2"></div>
          <Link
            to="/passenger-id"
            className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 hover:bg-brand-mint text-brand-orange transition-all"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Open Digital Passport</span>
          </Link>
        </div>

        {/* Tab Content Panels Right */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-brand-teal/5 p-6 sm:p-8 shadow-premium text-xs text-brand-forest">
          
          {/* A. Personal Information Form */}
          {activeTab === 'Personal' && (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <h3 className="font-extrabold text-base text-brand-forest uppercase tracking-wider">Contact & Credentials</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-bold text-brand-forest/70 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={formFields.name}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    className="p-3 border border-brand-teal/15 rounded-xl font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal bg-[#FFFDF8]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-bold text-brand-forest/70 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={formFields.email}
                    onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                    className="p-3 border border-brand-teal/15 rounded-xl font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal bg-[#FFFDF8]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brand-teal/10 pt-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-bold text-brand-forest/70 uppercase">Phone Number</label>
                  <input
                    type="text"
                    value={formFields.phone}
                    onChange={(e) => setFormFields({ ...formFields, phone: e.target.value })}
                    className="p-3 border border-brand-teal/15 rounded-xl font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal bg-[#FFFDF8]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-bold text-brand-forest/70 uppercase">Passenger ID</label>
                  <input
                    type="text"
                    value={user.passengerId}
                    disabled
                    className="p-3 border border-brand-teal/10 bg-gray-50 rounded-xl font-mono font-bold text-brand-teal cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="border-t border-brand-teal/10 pt-4 space-y-4">
                <h4 className="font-extrabold text-sm text-brand-orange flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> Emergency Alert Recipient
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="font-bold text-brand-forest/70 uppercase">Contact Name (Relation)</label>
                    <input
                      type="text"
                      value={formFields.emergencyName}
                      onChange={(e) => setFormFields({ ...formFields, emergencyName: e.target.value })}
                      className="p-3 border border-brand-teal/15 rounded-xl font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal bg-[#FFFDF8]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="font-bold text-brand-forest/70 uppercase">Contact Phone Number</label>
                    <input
                      type="text"
                      value={formFields.emergencyPhone}
                      onChange={(e) => setFormFields({ ...formFields, emergencyPhone: e.target.value })}
                      className="p-3 border border-brand-teal/15 rounded-xl font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal bg-[#FFFDF8]"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Save Profile Changes
              </button>
            </form>
          )}

          {/* B. Travel Preferences */}
          {activeTab === 'Preferences' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-base text-brand-forest uppercase tracking-wider">Access Needs & Diet</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-left">
                <div className="p-4 bg-brand-mint/40 border border-brand-teal/10 rounded-2xl space-y-3">
                  <p className="font-bold text-brand-teal">Accessibility Options Active:</p>
                  <p className="flex items-center gap-1.5 font-semibold">
                    ✓ Prefers Senior Citizen Speed (Slow)
                  </p>
                  <p className="flex items-center gap-1.5 font-semibold">
                    ✓ Direct transit only (Zero bus splits)
                  </p>
                  <p className="flex items-center gap-1.5 font-semibold">
                    ✓ Ground-floor elevator rooms mapped
                  </p>
                </div>

                <div className="p-4 bg-brand-mint/40 border border-brand-teal/10 rounded-2xl space-y-3">
                  <p className="font-bold text-brand-teal">Food & Dietary Preferences:</p>
                  <p className="flex items-center gap-1.5 font-semibold">
                    ✓ Pure Vegetarian / Satvik Meals pre-selected
                  </p>
                  <p className="flex items-center gap-1.5 font-semibold">
                    ✓ Direct clean water dispensers in hotel
                  </p>
                </div>
              </div>

              <div className="pt-2 text-left">
                <button
                  onClick={() => addToast("Preferences page locked for prototype", "info")}
                  className="px-5 py-2.5 bg-brand-teal hover:bg-brand-forest text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Configure Preferences
                </button>
              </div>
            </div>
          )}

          {/* C. Payment Channels */}
          {activeTab === 'Payments' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-base text-brand-forest uppercase tracking-wider">Linked UPI & Cards</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-left">
                {/* UPI block */}
                <div className="p-4 bg-white border border-brand-teal/10 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] text-emerald-700 font-extrabold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">UPI Primary</span>
                    <h4 className="font-extrabold text-sm text-brand-forest mt-2">rajeshkumar@okaxis</h4>
                    <p className="text-[10px] text-brand-forest/50">Linked to Axis Bank account</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                </div>

                {/* Card block */}
                <div className="p-4 bg-white border border-brand-teal/10 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] text-blue-600 font-extrabold uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Credit Card</span>
                    <h4 className="font-extrabold text-sm text-brand-forest mt-2">Visa Platinum •••• 8201</h4>
                    <p className="text-[10px] text-brand-forest/50">Exp: 09/29 &bull; HDFC Card</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                </div>
              </div>

              <div className="pt-2 text-left">
                <button
                  onClick={() => addToast("Card enrollment requires PCI compliance. Blocked for prototype.", "info")}
                  className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  + Add Payment Method
                </button>
              </div>
            </div>
          )}

          {/* D. Security Settings */}
          {activeTab === 'Security' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-base text-brand-forest uppercase tracking-wider">Privacy & Sandbox Credentials</h3>
              
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-2xl text-xs text-left text-yellow-800 space-y-2">
                <p className="font-bold text-yellow-900">Prototype Sandbox Status Enabled:</p>
                <p>
                  Your profile operates in a sandboxed mock cache. Clear history or reset passenger ID records to revert variables to default state. No data is stored externally on server nodes.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => addToast("Digital encryption key refreshed!", "success")}
                  className="px-4.5 py-2.5 border border-brand-teal/20 text-brand-forest hover:bg-brand-mint font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Rotate Encryptions
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
