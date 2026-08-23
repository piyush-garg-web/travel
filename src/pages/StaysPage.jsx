import React, { useState, useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import { travelService } from '../services/travelService';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { SafeImage } from '../components/SafeImage';
import { Heart, Star, MapPin, SlidersHorizontal, ShieldCheck, HeartHandshake } from 'lucide-react';

export const StaysPage = () => {
  const { savedStays, toggleSaveStay, addToast } = useTravel();

  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [seniorFriendly, setSeniorFriendly] = useState(false);
  const [familyFriendly, setFamilyFriendly] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('All');

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const data = await travelService.getHotels();
        setHotels(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const seniorMatch = !seniorFriendly || hotel.isSeniorFriendly;
    const familyMatch = !familyFriendly || hotel.isFamilyFriendly;
    const destMatch = selectedDestination === 'All' || hotel.destinationId.toLowerCase() === selectedDestination.toLowerCase();
    return seniorMatch && familyMatch && destMatch;
  });

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Premium Accommodations</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Smart Verified Stays</h1>
        <p className="text-brand-forest/65 mt-2 max-w-xl leading-relaxed">
          Discover properties vetted for safety, cleanliness, and ease-of-access. Pre-linked to accommodate senior accessibility and family comforts.
        </p>
      </div>

      {/* Filter panel */}
      <div className="bg-white rounded-3xl p-6 border border-brand-teal/5 shadow-premium mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Destination Filter */}
        <div className="space-y-2 text-xs">
          <label className="font-bold text-brand-forest/70 uppercase tracking-wider block">Filter by Destination</label>
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="p-3 rounded-xl border border-brand-teal/15 focus:outline-none focus:ring-2 focus:ring-brand-teal bg-[#FFFDF8] text-sm font-semibold text-brand-forest"
          >
            <option value="All">All Cities</option>
            <option value="dehradun">Dehradun</option>
            <option value="rishikesh">Rishikesh</option>
            <option value="jaipur">Jaipur</option>
          </select>
        </div>

        {/* Feature Checkboxes */}
        <div className="flex gap-6 text-xs font-bold text-brand-forest/75 flex-wrap">
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={seniorFriendly}
              onChange={() => setSeniorFriendly(!seniorFriendly)}
              className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal accent-brand-teal cursor-pointer"
            />
            <span className="flex items-center gap-1">👵🏽 Senior-Friendly (Elevators/Ramps)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={familyFriendly}
              onChange={() => setFamilyFriendly(!familyFriendly)}
              className="w-4 h-4 rounded text-brand-teal focus:ring-brand-teal accent-brand-teal cursor-pointer"
            />
            <span className="flex items-center gap-1">👨‍👩‍👧‍👦 Family-Friendly</span>
          </label>

        </div>

      </div>

      {/* Hotel Cards Grid */}
      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : filteredHotels.length === 0 ? (
        <div className="min-h-[30vh] bg-white rounded-3xl border border-brand-teal/5 flex flex-col items-center justify-center p-8 text-center">
          <span className="text-4xl">🏢</span>
          <h3 className="font-bold mt-4 text-brand-forest">No hotels match your filters</h3>
          <p className="text-xs text-brand-forest/50 mt-1">Try resetting checkboxes or searching another city.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => {
            const isSaved = savedStays.includes(hotel.id);
            return (
              <div key={hotel.id} className="bg-white rounded-3xl overflow-hidden border border-brand-teal/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group">
                
                {/* Image & Badge overlay */}
                <div className="relative h-48">
                  <SafeImage src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  
                  {hotel.badge && (
                    <span className="absolute top-4 left-4 bg-brand-forest text-brand-gold text-[9px] uppercase font-extrabold px-2.5 py-1 rounded-lg">
                      {hotel.badge}
                    </span>
                  )}

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleSaveStay(hotel.id)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 hover:bg-white text-gray-400 hover:text-brand-orange shadow-md transition-all cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'text-brand-orange fill-brand-orange' : ''}`} />
                  </button>

                  {hotel.isSeniorFriendly && (
                    <span className="absolute bottom-4 left-4 bg-brand-teal text-white text-[9px] uppercase font-extrabold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Vetted Senior Friendly</span>
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-brand-forest/40 uppercase font-bold tracking-wide flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-brand-teal" /> {hotel.location}
                      </span>
                      <span className="text-xs text-brand-gold font-extrabold">★ {hotel.rating}</span>
                    </div>

                    <h3 className="font-black text-lg text-brand-forest leading-snug">{hotel.name}</h3>
                    <p className="text-brand-forest/65 text-xs leading-relaxed">{hotel.whyRecommended}</p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {hotel.amenities.map((am) => (
                        <span key={am} className="text-[9px] bg-brand-mint text-brand-teal px-2 py-0.5 rounded font-semibold">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-teal/10 pt-4 mt-2">
                    <div>
                      <span className="text-[10px] text-brand-forest/40 block">Price Per Night</span>
                      <span className="text-lg font-black text-brand-teal">₹{hotel.pricePerNight}</span>
                    </div>

                    <button
                      onClick={() => addToast(`Stay details page under design. Ready to book via Planner!`, "info")}
                      className="px-4.5 py-2.5 bg-brand-mint hover:bg-brand-teal text-brand-teal hover:text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                    >
                      View Stay Details
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
