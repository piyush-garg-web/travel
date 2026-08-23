import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { travelService } from '../services/travelService';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { SafeImage } from '../components/SafeImage';
import { 
  Bus, 
  Hotel, 
  ArrowRight,
  Layers
} from 'lucide-react';

export const MyTripsPage = () => {
  const { trips, savedStays, savedExperiences } = useTravel();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Upcoming'); // Upcoming, Completed, Wishlist

  // Stays & experiences detailed records for wishlisting
  const [stDetail, setStDetail] = useState([]);
  const [expDetail, setExpDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const hotels = await travelService.getHotels();
        const exps = await travelService.getLocalExperiences();
        
        // Match with wishlisted IDs
        setStDetail(hotels.filter(h => savedStays.includes(h.id)));
        setExpDetail(exps.filter(e => savedExperiences.includes(e.id)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [savedStays, savedExperiences]);

  const upcomingTrips = trips.filter(t => t.status === 'Upcoming');
  const completedTrips = trips.filter(t => t.status === 'Completed');

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Your Account Dashboard</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">My Journeys</h1>
        <p className="text-brand-forest/65 mt-2 max-w-xl leading-relaxed">
          Manage upcoming reservations, download past receipt boarding passes, and review saved wishlist destinations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-teal/15 mb-8">
        {[
          { id: 'Upcoming', label: `Upcoming (${upcomingTrips.length})` },
          { id: 'Completed', label: `Completed (${completedTrips.length})` },
          { id: 'Wishlist', label: `Saved Wishlist (${savedStays.length + savedExperiences.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-6 text-sm font-bold cursor-pointer transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-brand-forest/60 hover:text-brand-teal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid listing */}
      {loading ? (
        <SkeletonLoader type="results" count={2} />
      ) : (
        <div className="space-y-6">
          
          {/* A. Upcoming Tab */}
          {activeTab === 'Upcoming' && (
            upcomingTrips.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-brand-teal/5 text-center max-w-md mx-auto space-y-4">
                <span className="text-4xl block">🎫</span>
                <h3 className="font-extrabold text-lg text-brand-forest">No upcoming trips booked</h3>
                <p className="text-xs text-brand-forest/65 max-w-xs mx-auto">
                  Let's configure your departure city and budget bounds to design a personalized itinerary.
                </p>
                <Link
                  to="/plan-trip"
                  className="inline-block px-5 py-2.5 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-xl font-bold text-xs shadow-sm shadow-brand-orange/10 transition-colors"
                >
                  Start Smart Planner
                </Link>
              </div>
            ) : (
              upcomingTrips.map((trip) => (
                <div key={trip.id} className="bg-white rounded-3xl p-6 border border-brand-teal/5 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-brand-teal/15 transition-all">
                  <div className="space-y-3.5 text-xs text-brand-forest/70">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-brand-teal/10 text-brand-teal text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border border-brand-teal/5">
                        {trip.travelStyle}
                      </span>
                      {trip.budgetLevel && (
                        <span className="inline-flex items-center gap-1 bg-brand-soft-orange text-brand-orange text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border border-brand-orange/20">
                          <Layers className="w-3 h-3" /> {trip.budgetLevel}
                        </span>
                      )}
                      <span className="bg-brand-green/10 text-brand-green text-[9px] uppercase font-bold px-2 py-0.5 rounded">
                        🟢 Upcoming Booked
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-brand-forest mt-1.5 flex items-center gap-2">
                      <span>{trip.source}</span>
                      <ArrowRight className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>{trip.destination}</span>
                    </h3>

                    <p className="font-semibold text-brand-forest/55">
                      📅 Dates: {trip.startDate} to {trip.endDate} &nbsp;|&nbsp; 👥 {trip.travelersCount} Travellers
                    </p>

                    <div className="flex gap-4 pt-1 font-semibold text-brand-forest/65">
                      <span className="flex items-center gap-1"><Bus className="w-4 h-4 text-brand-teal" /> {trip.transport?.name || "Premium Volvo"}</span>
                      <span className="flex items-center gap-1"><Hotel className="w-4 h-4 text-brand-teal" /> {trip.hotel?.name || "Valley Resort"}</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-between items-center sm:items-end w-full md:w-auto border-t md:border-t-0 border-brand-teal/10 pt-4 md:pt-0 gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-brand-forest/40">Invoice Total</span>
                      <p className="text-lg font-black text-brand-teal leading-none mt-0.5">₹{trip.totalCost}</p>
                    </div>
                    <Link
                      to={`/trip/${trip.id}`}
                      className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold text-xs rounded-xl shadow-sm shadow-brand-orange/15 transition-all flex items-center gap-1"
                    >
                      <span>Open Itinerary</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )
          )}

          {/* B. Completed Tab */}
          {activeTab === 'Completed' && (
            completedTrips.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-brand-teal/5 text-center max-w-md mx-auto space-y-4">
                <span className="text-4xl block">🎒</span>
                <h3 className="font-bold text-lg text-brand-forest">No completed trips found</h3>
                <p className="text-xs text-brand-forest/65">Complete a journey to archive receipts here.</p>
              </div>
            ) : (
              completedTrips.map((trip) => (
                <div key={trip.id} className="bg-white rounded-3xl p-6 border border-brand-teal/5 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-6 opacity-75 hover:opacity-100 transition-opacity">
                  <div className="space-y-3 text-xs text-brand-forest/70 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-brand-teal/10 text-brand-teal text-[9px] uppercase font-extrabold px-2 py-0.5 rounded">
                        {trip.travelStyle}
                      </span>
                      {trip.budgetLevel && (
                        <span className="inline-flex items-center gap-1 bg-brand-soft-orange text-brand-orange text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border border-brand-orange/20">
                          <Layers className="w-3 h-3" /> {trip.budgetLevel}
                        </span>
                      )}
                      <span className="bg-gray-100 text-gray-600 text-[9px] uppercase font-bold px-2 py-0.5 rounded">
                        ✓ Archival Completed
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-forest flex items-center gap-2">
                      <span>{trip.source}</span>
                      <ArrowRight className="w-4 h-4 text-brand-forest/30 shrink-0" />
                      <span>{trip.destination}</span>
                    </h3>

                    <p className="font-semibold text-brand-forest/50">
                      📅 Dates: {trip.startDate} to {trip.endDate} &nbsp;|&nbsp; 👥 {trip.travelersCount} Travellers
                    </p>
                  </div>

                  <div className="flex sm:flex-col justify-between items-center sm:items-end w-full md:w-auto border-t md:border-t-0 border-brand-teal/10 pt-4 md:pt-0 gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-brand-forest/40">Invoice Total</span>
                      <p className="text-lg font-bold text-brand-forest">₹{trip.totalCost}</p>
                    </div>
                    <button
                      onClick={() => alert(`Review archived receipt for trip ${trip.id}`)}
                      className="px-4 py-2 border border-brand-teal/20 text-brand-teal hover:bg-brand-teal hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Receipt Details
                    </button>
                  </div>
                </div>
              ))
            )
          )}

          {/* C. Wishlist Tab */}
          {activeTab === 'Wishlist' && (
            savedStays.length === 0 && savedExperiences.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-brand-teal/5 text-center max-w-md mx-auto space-y-4">
                <span className="text-4xl block">❤️</span>
                <h3 className="font-bold text-lg text-brand-forest">Your wishlist is empty</h3>
                <p className="text-xs text-brand-forest/65">Heart hotel and local spot cards to see them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-left">
                
                {/* Wishlist Stays */}
                {stDetail.map((hotel) => (
                  <div key={hotel.id} className="bg-white p-5 rounded-2xl border border-brand-teal/5 shadow-sm flex gap-4">
                    <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0">
                      <SafeImage src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-brand-orange uppercase font-extrabold tracking-wider">{hotel.badge}</span>
                      <h4 className="font-extrabold text-sm text-brand-forest leading-snug">{hotel.name}</h4>
                      <p className="text-[10px] text-brand-forest/50">{hotel.location}</p>
                      <Link to="/stays" className="text-brand-teal font-bold hover:underline block pt-1">Book stay →</Link>
                    </div>
                  </div>
                ))}

                {/* Wishlist Experiences */}
                {expDetail.map((exp) => (
                  <div key={exp.id} className="bg-white p-5 rounded-2xl border border-brand-teal/5 shadow-sm flex gap-4">
                    <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0">
                      <SafeImage src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-brand-teal uppercase font-extrabold tracking-wider">{exp.category}</span>
                      <h4 className="font-extrabold text-sm text-brand-forest leading-snug">{exp.name}</h4>
                      <p className="text-[10px] text-brand-forest/50">{exp.location}</p>
                      <Link to="/local" className="text-brand-teal font-bold hover:underline block pt-1">Explore spot →</Link>
                    </div>
                  </div>
                ))}

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};
