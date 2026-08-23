import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { 
  CheckCircle, 
  Download, 
  Share2, 
  MapPin, 
  Calendar, 
  Users, 
  UserCheck, 
  CreditCard,
  QrCode,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const BookingSuccessPage = () => {
  const { trips, addToast } = useTravel();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const navigate = useNavigate();

  const [activeTrip, setActiveTrip] = useState(null);

  useEffect(() => {
    if (bookingId && trips.length > 0) {
      const match = trips.find(t => t.id === bookingId);
      if (match) {
        setActiveTrip(match);
      }
    } else if (trips.length > 0) {
      // Fallback to most recent trip
      setActiveTrip(trips[0]);
    }
  }, [bookingId, trips]);

  const handleDownload = () => {
    addToast("💾 PDF Boarding Pass & Smart Itinerary downloaded successfully!", "success");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/trip/${activeTrip?.id}`);
    addToast("🔗 Trip sharing link copied to clipboard!", "success");
  };

  if (!activeTrip) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-brand-ivory">
        <span className="text-4xl animate-bounce">🎟️</span>
        <h2 className="text-xl font-bold mt-4 text-brand-forest">Locating your transaction...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal mb-2">
            <CheckCircle className="w-10 h-10" />
          </div>
          <span className="text-brand-teal font-extrabold text-xs uppercase tracking-widest block">Transaction Secure</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest">Booking Confirmed!</h1>
          <p className="text-brand-forest/65 text-sm sm:text-base max-w-md mx-auto">
            Your travel tickets and accommodations are locked in. A copy of this pass has been sent to your email.
          </p>
        </div>

        {/* Digital Boarding Pass Ticket Container */}
        <div className="bg-white rounded-3xl border border-brand-teal/5 shadow-premium overflow-hidden flex flex-col">
          
          {/* Ticket Top: Pass Header */}
          <div className="bg-brand-cream text-brand-forest p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-border">
            <div>
              <span className="text-[10px] text-brand-secondary font-extrabold uppercase tracking-widest">Digital Boarding Pass</span>
              <h2 className="text-xl font-bold text-brand-forest mt-0.5">{activeTrip.title}</h2>
              <p className="text-[10px] text-brand-muted mt-0.5">Trip ID: {activeTrip.id}</p>
            </div>
            <div className="bg-brand-orange text-white text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-xl border border-brand-orange/20">
              ✓ Paid & Verified
            </div>
          </div>

          {/* Ticket Mid: Details Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            
            {/* Left side details */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Route checkpoints */}
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-[10px] uppercase text-brand-forest/40 font-bold tracking-wide">Origin</span>
                  <p className="font-extrabold text-base text-brand-forest leading-none mt-1">{activeTrip.source}</p>
                </div>
                <div className="flex-1 border-t-2 border-dashed border-brand-teal/20 relative">
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-brand-teal">
                    ✈️
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-brand-forest/40 font-bold tracking-wide">Destination</span>
                  <p className="font-extrabold text-base text-brand-forest leading-none mt-1">{activeTrip.destination}</p>
                </div>
              </div>

              {/* Transit & Hotel brief */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-brand-forest/45 uppercase font-bold">Departure Transit</span>
                  <p className="font-bold text-brand-forest mt-1 truncate">{activeTrip.transport?.name || "Premium Transit"}</p>
                  <span className="text-[10px] text-brand-teal font-semibold">Departs: {activeTrip.transport?.departure || "06:45 AM"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-forest/45 uppercase font-bold">Lodging Stay</span>
                  <p className="font-bold text-brand-forest mt-1 truncate">{activeTrip.hotel?.name || "Boutique Resort"}</p>
                  <span className="text-[10px] text-brand-teal font-semibold">{activeTrip.hotel?.location || "Dehradun"}</span>
                </div>
              </div>

              {/* Passenger profiles */}
              <div className="grid grid-cols-2 gap-4 text-xs border-t border-brand-teal/10 pt-4">
                <div>
                  <span className="text-[10px] text-brand-forest/45 uppercase font-bold">Passenger Details</span>
                  <p className="font-bold text-brand-forest mt-0.5">Rajesh Kumar +{activeTrip.travelersCount - 1} Traveller</p>
                  <span className="text-[10px] text-brand-teal font-bold flex items-center gap-1 mt-0.5">
                    <UserCheck className="w-3.5 h-3.5 text-brand-green" /> EZY-24X9-82K1
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-brand-forest/45 uppercase font-bold">Billing Total</span>
                  <p className="font-bold text-brand-forest mt-0.5">₹{activeTrip.totalCost}</p>
                  <span className="text-[10px] text-brand-teal font-semibold">Includes 5% Service Tax</span>
                </div>
              </div>

            </div>

            {/* Right side: QR code validator */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 border border-brand-teal/10 rounded-2xl bg-brand-mint text-center gap-2.5">
              <div className="relative p-2.5 bg-white rounded-xl shadow-inner border border-brand-teal/5 flex items-center justify-center">
                <QrCode className="w-24 h-24 text-brand-forest" />
                <div className="absolute inset-0 bg-brand-teal/5 mix-blend-overlay"></div>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-brand-teal block">Boarding Pass QR</span>
                <span className="text-[8px] text-brand-forest/50 font-semibold block mt-0.5">Scan at bus / stay entry</span>
              </div>
            </div>

          </div>

          {/* Special Safety / Assistance indicator */}
          {activeTrip.travelStyle === 'Senior Friendly' && (
            <div className="bg-red-50 border-t border-red-100 p-4 flex gap-3 text-xs text-left">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-red-800">Senior Care System Activated</h4>
                <p className="text-red-700/80 mt-0.5">
                  Transportation carriers have been notified to facilitate boarding assistance. Hotel room is pre-mapped on the ground floor with ramp corridors. Emergency medical aid kits have been pre-arranged.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-xl border border-brand-teal/20 hover:bg-brand-mint bg-[#FFFDF8] text-brand-forest font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Pass</span>
          </button>
          
          <button
            onClick={handleShare}
            className="px-6 py-3 rounded-xl border border-brand-teal/20 hover:bg-brand-mint bg-[#FFFDF8] text-brand-forest font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Trip</span>
          </button>

          <Link
            to={`/trip/${activeTrip.id}`}
            className="px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-brand-orange/15 animate-pulse"
          >
            <span>View Interactive Itinerary</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </Link>
        </div>

        {/* Go back helper links */}
        <div className="flex justify-center gap-4 text-xs font-semibold">
          <Link to="/my-trips" className="text-brand-teal hover:underline">Go to My Bookings</Link>
          <span className="text-brand-forest/30">|</span>
          <Link to="/" className="text-brand-teal hover:underline">Return to Home</Link>
        </div>

      </div>
    </div>
  );
};
