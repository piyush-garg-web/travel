import React from 'react';
import { useTravel } from '../context/TravelContext';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  MapPin, 
  Share2, 
  PhoneCall, 
  Users, 
  ShieldCheck, 
  Activity, 
  LifeBuoy,
  XCircle,
  Link as LinkIcon
} from 'lucide-react';

export const SafetyPage = () => {
  const { user, sosActive, triggerSOS, cancelSOS, addToast } = useTravel();

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="max-w-md w-full bg-white border border-brand-teal/15 rounded-3xl p-8 text-center shadow-lg">
          <span className="text-5xl mb-4 block">🔒</span>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-600 text-sm mb-6">
            Please register or sign in to access safety features and emergency companion tracking.
          </p>
          <Link 
            to="/login" 
            className="px-6 py-3 rounded-xl bg-brand-teal hover:bg-brand-forest text-white font-bold transition-all block cursor-pointer"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/trip/live-tracking-mock`);
    addToast("🔗 Live tracking link copied to clipboard! Share with family.", "success");
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="text-left space-y-2">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck className="w-4.5 h-4.5 text-brand-green" /> 24/7 Security Shield
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest">Your Safety Travels With You</h1>
          <p className="text-brand-forest/65 text-xs sm:text-sm max-w-2xl leading-relaxed">
            JanYatri integrates emergency geofenced alerts, live companion coordinates, and paramedic ties directly into your passenger passport.
          </p>
        </div>

        {/* SOS Emergency Simulator Center */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: The Big Red Button */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-brand-teal/5 shadow-premium flex flex-col items-center justify-center text-center gap-6">
            <div>
              <h3 className="font-extrabold text-lg text-brand-forest">Emergency SOS</h3>
              <p className="text-[10px] text-brand-forest/50 mt-1">Press to dispatch current GPS coordinates to contacts & local police.</p>
            </div>

            {/* Glowing SOS Button */}
            <div className="relative flex items-center justify-center">
              {sosActive && (
                <>
                  <div className="absolute w-36 h-36 rounded-full bg-red-600/30 animate-ping"></div>
                  <div className="absolute w-28 h-28 rounded-full bg-red-600/40 animate-pulse"></div>
                </>
              )}
              
              <button
                onClick={sosActive ? cancelSOS : triggerSOS}
                className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center text-white font-black text-sm tracking-wider cursor-pointer shadow-lg transition-transform active:scale-95 duration-300
                  ${sosActive 
                    ? 'bg-red-700 shadow-red-700/30 animate-bounce' 
                    : 'bg-red-600 hover:bg-red-500 shadow-red-600/20'}`}
              >
                <AlertTriangle className="w-6 h-6 mb-1 text-white" />
                <span>{sosActive ? "CANCEL" : "SOS"}</span>
              </button>
            </div>

            <div className="text-xs">
              {sosActive ? (
                <span className="text-red-600 font-extrabold flex items-center gap-1 justify-center">
                  ⚠️ Dispatching active warnings...
                </span>
              ) : (
                <span className="text-brand-forest/45 font-semibold">
                  Pressing registers 4-sec countdown
                </span>
              )}
            </div>
          </div>

          {/* Right Block: Live Log warning dispatches */}
          <div className="md:col-span-7 bg-white border border-brand-border backdrop-blur-md text-brand-forest rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 text-left shadow-premium">
            <div>
              <span className="text-[10px] text-brand-secondary font-extrabold uppercase tracking-widest">Active Dispatch Log</span>
              
              {sosActive ? (
                <div className="mt-4 space-y-3.5 text-xs text-brand-muted">
                  <p className="flex items-center gap-2 text-brand-forest font-bold">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    Alerting emergency contact Amit Kumar (+91 91234 56789)...
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    Transmitting lat/long coords to local station Dehradun Highway...
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    Broadcasting live GPS tracker map to pre-linked phone numbers...
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    Connecting with National Tourism Helpline 1363...
                  </p>
                </div>
              ) : (
                <div className="mt-4 p-4 rounded-2xl bg-brand-cream border border-brand-border text-xs text-brand-muted space-y-2">
                  <p className="font-bold text-brand-forest">🛡️ Safety Shields Armed:</p>
                  <p>• Geofenced safety zones mapped out for {user.travelPreferences.defaultSource} → Dehradun.</p>
                  <p>• Emergency contacts pre-cleared: <strong>{user.emergencyContact.name} ({user.emergencyContact.relation})</strong>.</p>
                  <p>• Local highway clinic registers synchronized with itinerary dates.</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3.5 mt-2">
              <button
                onClick={handleShareLink}
                className="px-4 py-2 bg-brand-cream hover:bg-brand-soft-orange text-brand-forest rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Location Link
              </button>
              
              <button
                onClick={() => addToast("Call dispatcher simulation initiated!", "info")}
                className="px-4 py-2 bg-brand-orange hover:bg-brand-secondary text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call Police Helpline
              </button>
            </div>
          </div>

        </div>

        {/* Emergency Helpline list */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-lg text-brand-forest text-left">India Travel Security Directory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-left">
            {[
              { title: "National Tourism Helpline", number: "1363", desc: "24/7 Multi-lingual security support for tourists." },
              { title: "Railway Security Force (RPF)", number: "182 / 139", desc: "Direct coordinate dispatch during rail transit." },
              { title: "JanYatri Medical Assist Hotline", number: "1800-JAN-SAFE", desc: "Dedicated access/paramedic scheduling helpline." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-brand-teal/5 shadow-premium flex flex-col justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-brand-forest text-sm">{item.title}</h4>
                  <p className="text-[10px] text-brand-forest/65 mt-1 leading-snug">{item.desc}</p>
                </div>
                <a 
                  href={`tel:${item.number}`}
                  className="font-black text-brand-teal text-sm hover:text-brand-orange flex items-center gap-1 mt-1.5"
                >
                  📞 Call: {item.number}
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
