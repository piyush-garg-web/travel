import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { travelService } from '../services/travelService';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export const TirthYatraPage = () => {
  const { updatePlanner, initializeBookingDefaults } = useTravel();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [seniorOnly, setSeniorOnly] = useState(true); // Default active for yatra target elders

  const categories = ['All', 'Char Dham', 'Jyotirlinga', 'Temples', 'Pilgrimage Circuits'];

  useEffect(() => {
    const fetchYatras = async () => {
      setLoading(true);
      try {
        const data = await travelService.getTirthYatraPackages();
        setPackages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchYatras();
  }, []);

  const handlePlanYatra = (pkg) => {
    updatePlanner({
      destination: pkg.destinations[0],
      tripType: 'Tirth Yatra',
      style: 'Senior Friendly'
    });
    initializeBookingDefaults(planner?.source || 'Delhi', pkg.destinations[0]);
    navigate('/results');
  };

  const filteredPackages = packages.filter((pkg) => {
    const catMatch = selectedCat === 'All' || pkg.category.toLowerCase() === selectedCat.toLowerCase();
    const seniorMatch = !seniorOnly || pkg.isSeniorFriendly;
    return catMatch && seniorMatch;
  });

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" /> Sacred Trails Simplified
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Tirth Yatra Pilgrimage Plans</h1>
          <p className="text-brand-forest/65 mt-2 max-w-2xl leading-relaxed">
            Perform sacred pilgrimages with complete comfort and trust. Every package incorporates wheelchair-accessible pathways, dietary options, rest structures, and paramedic coordination.
          </p>
        </div>

        {/* Senior Friendly Mode Switcher */}
        <div className="bg-[#FFFDF8] rounded-2xl border border-brand-orange/20 p-4 shadow-sm flex items-center justify-between gap-6 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👵🏽</span>
            <div>
              <h4 className="font-extrabold text-xs text-brand-forest">Senior Citizen Assist</h4>
              <p className="text-[10px] text-brand-forest/50">Highlighting packages with physical aid support</p>
            </div>
          </div>
          <button
            onClick={() => setSeniorOnly(!seniorOnly)}
            className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
              seniorOnly ? 'bg-brand-teal' : 'bg-gray-300'
            }`}
          >
            <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform duration-300 ${
              seniorOnly ? 'translate-x-5.5' : 'translate-x-0'
            }`}></div>
          </button>
        </div>
      </div>

      {/* Category selector panel */}
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

      {/* Grid listing packages */}
      {loading ? (
        <SkeletonLoader type="card" count={2} />
      ) : filteredPackages.length === 0 ? (
        <div className="min-h-[30vh] bg-white rounded-3xl border border-brand-teal/5 flex flex-col items-center justify-center p-8 text-center">
          <span className="text-4xl">🕉️</span>
          <h3 className="font-bold mt-4 text-brand-forest">No pilgrimages found</h3>
          <p className="text-xs text-brand-forest/50 mt-1">Try switching off the Senior Citizen filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden border border-brand-teal/5 shadow-premium flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
              
              {/* Package Image placeholder */}
              <div className="w-full sm:w-48 h-48 sm:h-auto rounded-2xl overflow-hidden flex-shrink-0 relative">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-brand-forest/90 backdrop-blur-md px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-extrabold text-brand-gold">
                  {pkg.difficulty}
                </div>
              </div>

              {/* Package Details */}
              <div className="flex-1 flex flex-col justify-between gap-4 text-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-brand-teal font-extrabold uppercase bg-brand-mint px-2 py-0.5 rounded border border-brand-teal/5">
                      {pkg.category}
                    </span>
                    <span className="text-xs text-brand-gold font-bold">★ {pkg.ratings}</span>
                  </div>

                  <h3 className="font-black text-xl text-brand-forest mt-2 leading-snug">{pkg.title}</h3>
                  <p className="text-[10px] text-brand-forest/40 uppercase font-extrabold tracking-wide mt-1">
                    Route Stops: {pkg.destinations.join(" → ")}
                  </p>
                  
                  <p className="text-brand-forest/65 mt-2 text-xs leading-relaxed">{pkg.description}</p>
                  
                  {/* Senior features highlight */}
                  <div className="mt-4 p-3 rounded-xl bg-brand-mint/55 border border-brand-teal/10 space-y-1.5 text-xs text-left">
                    <p className="font-bold text-brand-teal flex items-center gap-1">
                      <HeartHandshake className="w-4 h-4 text-brand-green" /> Elderly Care Shield Perks:
                    </p>
                    {pkg.seniorFriendlyFeatures.slice(0, 3).map((feat, index) => (
                      <p key={index} className="text-brand-forest/85 leading-snug flex items-start gap-1">
                        <span className="text-brand-orange text-xs">✓</span>
                        <span>{feat}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-brand-teal/10 pt-4 mt-2">
                  <div>
                    <span className="text-[10px] text-brand-forest/40 block">Yatra Base Fare</span>
                    <span className="text-lg font-black text-brand-teal">₹{pkg.price}</span>
                    <span className="text-[9px] text-brand-forest/50"> /person</span>
                  </div>

                  <button
                    onClick={() => handlePlanYatra(pkg)}
                    className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange/95 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Select Yatra Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
