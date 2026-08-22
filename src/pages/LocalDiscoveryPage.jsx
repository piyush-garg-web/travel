import React, { useState, useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import { travelService } from '../services/travelService';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { Heart, Star, MapPin, Compass, Store, HeartHandshake, CheckCircle } from 'lucide-react';

export const LocalDiscoveryPage = () => {
  const { savedExperiences, toggleSaveExperience, addToast } = useTravel();

  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Food', 'Culture', 'Shopping', 'Cafés', 'Local Experiences'];

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const data = await travelService.getLocalExperiences();
        setExperiences(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const filteredExp = experiences.filter((exp) => {
    return selectedCat === 'All' || exp.category.toLowerCase() === selectedCat.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Support Local Creators</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Local Discovery Portal</h1>
        <p className="text-brand-forest/65 mt-2 max-w-xl leading-relaxed">
          Unearth traditional culinary gems, artisan bazaars, and classical music ceremonies that support native micro-business communities.
        </p>
      </div>

      {/* Category Filter bar */}
      <div className="bg-white rounded-3xl p-5 border border-brand-teal/5 shadow-premium mb-8 flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              selectedCat === cat 
                ? 'bg-brand-teal text-white border-brand-teal' 
                : 'bg-brand-mint text-brand-forest border-brand-teal/5 hover:bg-brand-teal hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Experience Cards Grid */}
      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : filteredExp.length === 0 ? (
        <div className="min-h-[30vh] bg-white rounded-3xl border border-brand-teal/5 flex flex-col items-center justify-center p-8 text-center">
          <span className="text-4xl">🍛</span>
          <h3 className="font-bold mt-4 text-brand-forest">No local spots found</h3>
          <p className="text-xs text-brand-forest/50 mt-1">Try switching to a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredExp.map((exp) => {
            const isSaved = savedExperiences.includes(exp.id);
            return (
              <div key={exp.id} className="bg-white rounded-3xl overflow-hidden border border-brand-teal/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group">
                
                {/* Image & Badges */}
                <div className="relative h-48">
                  <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                  
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 bg-brand-forest text-brand-gold text-[9px] uppercase font-extrabold px-2.5 py-1 rounded-lg">
                    {exp.category}
                  </span>

                  {/* Heart wishlist */}
                  <button
                    onClick={() => toggleSaveExperience(exp.id)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 hover:bg-white text-gray-400 hover:text-brand-orange shadow-md transition-all cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'text-brand-orange fill-brand-orange' : ''}`} />
                  </button>

                  {/* Open Status */}
                  <span className="absolute bottom-4 left-4 bg-brand-green/90 text-white text-[8px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    🟢 Open Now
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-brand-forest/40 uppercase font-bold tracking-wide flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-brand-teal" /> {exp.location}
                      </span>
                      <span className="text-xs text-brand-gold font-extrabold">★ {exp.rating}</span>
                    </div>

                    <h3 className="font-black text-lg text-[#102A2A] leading-snug">{exp.name}</h3>
                    <p className="text-[#102A2A]/70 text-xs leading-relaxed">{exp.description}</p>
                    
                    {/* Bullet Highlights */}
                    <div className="pt-2.5 space-y-1.5">
                      {exp.highlights.map((hl, index) => (
                        <p key={index} className="text-xs text-brand-forest/80 flex items-center gap-1.5 font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-green shrink-0" />
                          <span>{hl}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-teal/10 pt-4 mt-2">
                    <div>
                      <span className="text-[10px] text-brand-forest/40 block">Est. Cost Range</span>
                      <span className="text-base font-extrabold text-brand-teal">{exp.priceRange}</span>
                    </div>

                    <button
                      onClick={() => addToast(`Simulated booking details. Add to your next Planner draft!`, "info")}
                      className="px-4.5 py-2.5 bg-brand-mint text-brand-teal rounded-xl font-bold text-xs hover:bg-brand-teal hover:text-white transition-colors cursor-pointer"
                    >
                      Explore Spot
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Local Artisan Promotion Card */}
      <div className="mt-12 bg-gradient-to-r from-brand-teal to-brand-forest rounded-3xl p-6 md:p-8 text-brand-ivory border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h4 className="font-extrabold text-lg text-white">Own a Local Travel Business?</h4>
          <p className="text-xs text-brand-ivory/60 leading-relaxed">
            Register your cottage industry, thali hotel, or tour guide group for free. EzYatra pre-screens local providers to list them directly into passenger routing paths.
          </p>
        </div>
        <button
          onClick={() => addToast("Form mapping for local partners coming soon!", "info")}
          className="px-5 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Register Business</span>
          <Compass className="w-4 h-4 shrink-0" />
        </button>
      </div>

    </div>
  );
};
