import React from 'react';
import { useTravel } from '../context/TravelContext';
import { 
  ShieldAlert, 
  Download, 
  Trash2, 
  Edit3, 
  QrCode, 
  Lock, 
  EyeOff, 
  Database,
  CheckCircle,
  FileCheck
} from 'lucide-react';

export const PassengerIdPage = () => {
  const { user, addToast } = useTravel();

  const handleDownload = () => {
    addToast("💾 Smart ID downloaded to device storage as EZY-PASS.pkpass", "success");
  };

  const handleDelete = () => {
    addToast("🗑️ Local mock cache cleared. Default data restored.", "info");
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">EzYatra Smart Travel Card</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest">Your Digital Passenger ID</h1>
          <p className="text-brand-forest/65 text-xs sm:text-sm max-w-md mx-auto">
            A unified passenger identity linking physical transit preferences, emergency locks, and access needs. Scan at station checkpoints.
          </p>
        </div>

        {/* Smart ID Hologram Card Mock */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto w-full border border-brand-teal/20 bg-brand-forest text-brand-ivory group">
          {/* Decorative glows */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-teal/20 rounded-full blur-2xl group-hover:bg-brand-orange/20 transition-all duration-500"></div>
          
          <div className="p-6 sm:p-8 flex flex-col gap-6 text-left relative z-10">
            
            {/* Logo and Pass ID */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-brand-gold font-extrabold uppercase tracking-widest leading-none">Smart Travel ID</span>
                <p className="text-xs text-brand-ivory/50 mt-0.5">Ministry of Tourism Sandbox</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-brand-orange text-white px-2 py-0.5 rounded font-black tracking-widest">EZY PASS</span>
              </div>
            </div>

            {/* Middle Info block */}
            <div className="grid grid-cols-12 gap-4 items-center">
              
              {/* Profile Details */}
              <div className="col-span-8 space-y-3.5 text-xs">
                <div>
                  <span className="text-[9px] text-brand-ivory/40 uppercase font-bold tracking-wide">Full Name</span>
                  <p className="font-extrabold text-sm text-white mt-0.5">{user.name}</p>
                </div>
                <div>
                  <span className="text-[9px] text-brand-ivory/40 uppercase font-bold tracking-wide">Unique Passenger ID</span>
                  <p className="font-mono text-xs font-bold text-brand-gold tracking-wider mt-0.5">{user.passengerId}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[9px] text-brand-ivory/40 uppercase font-bold tracking-wide">Age Group</span>
                    <p className="font-bold text-white mt-0.5 text-[10px]">{user.ageGroup}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-brand-ivory/40 uppercase font-bold tracking-wide font-bold">Preferences</span>
                    <span className="bg-brand-teal/30 text-brand-gold text-[8px] font-black uppercase px-1.5 py-0.5 rounded block mt-0.5 text-center truncate">
                      {user.travelPreferences.style}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code Validation */}
              <div className="col-span-4 flex justify-center">
                <div className="bg-white p-2.5 rounded-xl border border-white/10 flex items-center justify-center shadow-inner">
                  <QrCode className="w-16 h-16 text-brand-forest" />
                </div>
              </div>

            </div>

            {/* Bottom info: emergency */}
            <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4 text-[10px] text-brand-ivory/70 font-semibold">
              <div>
                <span className="text-[8px] text-brand-ivory/40 uppercase font-bold">Emergency Contact</span>
                <p className="text-white mt-0.5">{user.emergencyContact.name}</p>
                <p className="text-brand-ivory/50">{user.emergencyContact.phone}</p>
              </div>
              <div>
                <span className="text-[8px] text-brand-ivory/40 uppercase font-bold">Access Aids</span>
                <p className="text-brand-gold mt-0.5">✓ Wheelchair Pre-mapped</p>
                <p className="text-brand-gold">✓ Satvik Food Pref</p>
              </div>
            </div>

          </div>
        </div>

        {/* Sandboxed Prototype Warning */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-left text-amber-800 flex gap-2.5">
          <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-0.5 animate-pulse" />
          <div>
            <h4 className="font-extrabold text-amber-900">Prototype Sandbox Warning</h4>
            <p className="mt-0.5 text-amber-800/80 leading-relaxed">
              EzYatra Passenger ID is an aggregation mockup. <strong>No real Aadhaar details, biometric records, or official credentials are collected here.</strong> It is structured only to demonstrate how profiles can automate ticket checkpoints.
            </p>
          </div>
        </div>

        {/* Security indicators grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-left">
          {[
            { icon: Lock, title: "128-bit Encrypted", desc: "No plaintext local caching" },
            { icon: EyeOff, title: "Privacy First", desc: "Share details only on scan" },
            { icon: Database, title: "Trip Data Only", desc: "We only record route metrics" },
            { icon: Trash2, title: "Delete Anytime", desc: "One-click cache wipeout" }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white rounded-2xl border border-brand-teal/5 shadow-sm space-y-1.5">
              <item.icon className="w-4 h-4 text-brand-teal" />
              <h4 className="font-extrabold text-brand-forest leading-none">{item.title}</h4>
              <p className="text-[10px] text-brand-forest/50 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleDelete}
            className="px-5 py-3 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset Card Cache</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-xl bg-brand-teal hover:bg-brand-forest text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Digital ID</span>
          </button>
        </div>

      </div>
    </div>
  );
};
