import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { travelService } from '../services/travelService';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { SafeImage } from '../components/SafeImage';
import { Milestone, ArrowRight } from 'lucide-react';

export const ShortTripsPage = () => {
  const { planner, updatePlanner, initializeBookingDefaults } = useTravel();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [tripsData, setTripsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxDistance, setMaxDistance] = useState(300); // Slider up to 300km

  const categories = ['All', 'Nature', 'Heritage', 'Spiritual', 'Culture'];

  useEffect(() => {
    const fetchShortTrips = async () => {
      setLoading(true);
      try {
        const data = await travelService.getShortTrips();
        setTripsData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShortTrips();
  }, []);

  const handlePlanShortTrip = (st) => {
    updatePlanner({
      destination: st.to,
      tripType: 'Short Trip'
    });
    initializeBookingDefaults(planner?.source || 'Delhi', st.to);
    navigate('/results');
  };

  const filteredTrips = tripsData.filter(st => {
    const categoryMatch = selectedCategory === 'All' || st.category.toLowerCase() === selectedCategory.toLowerCase();
    const distanceMatch = st.distance <= maxDistance;
    return categoryMatch && distanceMatch;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left relative overflow-hidden">
      
      {/* Kerala Backwaters / Nature Backdrop */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <SafeImage
          src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80"
          alt="Kerala Backwaters Backdrop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ivory via-transparent to-brand-ivory"></div>
      </div>

      <div className="relative z-10">
        
        {/* Page Header */}
        <div className="mb-10">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Escape. Explore. Return.</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Short Weekend Getaways</h1>
          <p className="text-brand-forest/65 mt-2 max-w-2xl leading-relaxed text-sm">
            Quick local tourism experiences designed around micro-travels. Unplug on Friday, discover a new trail, and return refreshed by Monday.
          </p>
        </div>

        {/* Filter Options Panel */}
        <div className="bg-white backdrop-blur-md rounded-3xl p-6 border border-brand-border shadow-premium mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Categories Selector */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-brand-muted uppercase tracking-wider block">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all border ${
                    selectedCategory === cat 
                      ? 'bg-brand-orange text-white border-brand-orange' 
                      : 'bg-brand-cream text-brand-forest border-brand-border hover:bg-brand-orange hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Slider (Radius around user) */}
          <div className="w-full md:w-72 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-brand-muted uppercase tracking-wider">
              <label>Travel Radius (from Delhi)</label>
              <span className="text-brand-orange font-extrabold">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-brand-border accent-brand-orange"
            />
            <div className="flex justify-between text-[10px] text-brand-muted">
              <span>50 km</span>
              <span>300 km</span>
            </div>
          </div>

        </div>

        {/* Grid List */}
        {loading ? (
          <SkeletonLoader type="card" count={3} />
        ) : filteredTrips.length === 0 ? (
          <div className="min-h-[30vh] bg-white rounded-3xl border border-brand-border flex flex-col items-center justify-center p-8 text-center shadow-premium">
            <span className="text-4xl">🏜️</span>
            <h3 className="font-bold mt-4 text-brand-forest">No short trips found</h3>
            <p className="text-xs text-brand-muted mt-1">Try expanding your travel radius slider.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredTrips.map((st) => (
              <div key={st.id} className="bg-white rounded-3xl overflow-hidden border border-brand-teal/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between">
                
                <div className="relative h-48">
                  <SafeImage src={st.image} alt={st.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-brand-forest/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                    <Milestone className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{st.distance} km away</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-brand-orange text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    {st.duration}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-brand-gold font-extrabold uppercase bg-brand-orange/10 px-2.5 py-0.5 rounded border border-brand-orange/15">
                        {st.category}
                      </span>
                      <span className="text-xs font-bold text-brand-gold">★ {st.ratings}</span>
                    </div>
                    <h3 className="font-black text-lg text-brand-forest mt-2 leading-snug">{st.title}</h3>
                    <p className="text-brand-forest/65 text-xs leading-relaxed">{st.bestFor}</p>

                    <div className="space-y-1.5 pt-2 text-xs text-brand-forest/75">
                      <p className="font-bold text-brand-gold">Highlights Included:</p>
                      {st.highlights.slice(0, 3).map((hl, index) => (
                        <p key={index} className="flex items-center gap-1.5">
                          <span className="text-brand-orange">✓</span> {hl}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-teal/10 pt-4 mt-2">
                    <div>
                      <span className="text-[10px] text-brand-forest/40 block">Estimated Cost</span>
                      <span className="text-lg font-black text-brand-gold">₹{st.price}</span>
                      <span className="text-[9px] text-brand-forest/50"> /person</span>
                    </div>

                    <button
                      onClick={() => handlePlanShortTrip(st)}
                      className="px-5 py-2.5 bg-brand-orange hover:bg-brand-secondary text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                    >
                      <span>Plan This Trip</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Sustainable Short Trip Callout */}
        <div className="mt-12 bg-brand-mint/40 rounded-3xl p-6 border border-brand-teal/10 flex flex-col md:flex-row items-center gap-4 text-xs md:text-sm">
          <span className="text-3xl">🌱</span>
          <div>
            <h4 className="font-bold text-brand-orange text-base">Eco-Friendly Local Escapes</h4>
            <p className="text-brand-forest/70 mt-0.5 leading-relaxed text-xs">
              All short-trip recommendations incorporate unified Volvo bus routing and encourage stays supporting family-owned homestays in regional micro-pockets. Zero printing needed.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
