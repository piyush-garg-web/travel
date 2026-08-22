import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Calendar as CalIcon, 
  Users, 
  Compass, 
  Heart, 
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Briefcase,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { destinations } from '../data/destinations';

export const PlanTripPage = () => {
  const { planner, updatePlanner, initializeBookingDefaults } = useTravel();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedDest = searchParams.get('dest');

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Local state initialized from global context
  const [formData, setFormData] = useState({
    source: planner.source,
    destination: preSelectedDest ? (destinations.find(d => d.id === preSelectedDest)?.name || planner.destination) : planner.destination,
    startDate: planner.startDate,
    endDate: planner.endDate,
    travellers: planner.travellers,
    style: planner.style,
    budget: planner.budget,
    interests: planner.interests,
    tripType: planner.tripType
  });

  useEffect(() => {
    if (preSelectedDest) {
      const match = destinations.find(d => d.id === preSelectedDest);
      if (match) {
        setFormData(prev => ({ ...prev, destination: match.name }));
      }
    }
  }, [preSelectedDest]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const isSelected = prev.interests.includes(interest);
      const updated = isSelected 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update global context
    updatePlanner(formData);
    // Initialize recommended transportation, hotel, and default local options
    initializeBookingDefaults(formData.source, formData.destination);
    // Proceed to results comparisons
    navigate('/results');
  };

  // Render Step Content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Step 1 of 6</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-forest mt-1">Where are you traveling?</h2>
              <p className="text-brand-forest/60 text-sm mt-1">Specify your departure city and final travel stop.</p>
            </div>

            <div className="flex flex-col gap-5 max-w-md mx-auto">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-brand-forest/75 uppercase tracking-wide flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" /> Leaving From
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="p-3.5 rounded-xl border border-brand-teal/20 focus:outline-none focus:ring-2 focus:ring-brand-teal bg-[#FFFDF8] text-sm text-brand-forest font-semibold"
                >
                  <option value="Delhi">Delhi</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Dehradun">Dehradun</option>
                  <option value="Rishikesh">Rishikesh</option>
                  <option value="Varanasi">Varanasi</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-brand-forest/75 uppercase tracking-wide flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" /> Going To Destination
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="p-3.5 rounded-xl border border-brand-teal/20 focus:outline-none focus:ring-2 focus:ring-brand-teal bg-[#FFFDF8] text-sm text-brand-forest font-semibold"
                >
                  <option value="Dehradun">Dehradun</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Rishikesh">Rishikesh</option>
                  <option value="Agra">Agra</option>
                  <option value="Amritsar">Amritsar</option>
                  <option value="Varanasi">Varanasi</option>
                  <option value="Udaipur">Udaipur</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Step 2 of 6</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-forest mt-1">Select Travel Dates</h2>
              <p className="text-brand-forest/60 text-sm mt-1">Choose when you plan to depart and return.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-brand-forest/75 uppercase tracking-wide flex items-center gap-1">
                  <CalIcon className="w-3.5 h-3.5 text-brand-orange" /> Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="p-3.5 rounded-xl border border-brand-teal/20 focus:outline-none focus:ring-2 focus:ring-brand-teal bg-[#FFFDF8] text-sm text-brand-forest font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-brand-forest/75 uppercase tracking-wide flex items-center gap-1">
                  <CalIcon className="w-3.5 h-3.5 text-brand-orange" /> End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="p-3.5 rounded-xl border border-brand-teal/20 focus:outline-none focus:ring-2 focus:ring-brand-teal bg-[#FFFDF8] text-sm text-brand-forest font-semibold"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Step 3 of 6</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-forest mt-1">Number of Travellers</h2>
              <p className="text-brand-forest/60 text-sm mt-1">How many people are going on this trip?</p>
            </div>

            <div className="flex flex-col items-center gap-5 max-w-sm mx-auto">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, travellers: Math.max(1, prev.travellers - 1) }))}
                  className="w-12 h-12 rounded-full border border-brand-teal/30 hover:bg-brand-mint text-xl font-bold text-brand-teal transition-all flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="text-4xl font-extrabold text-brand-forest w-16 text-center">
                  {formData.travellers}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, travellers: Math.min(10, prev.travellers + 1) }))}
                  className="w-12 h-12 rounded-full border border-brand-teal/30 hover:bg-brand-mint text-xl font-bold text-brand-teal transition-all flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-brand-forest/50 font-bold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-brand-orange" /> {formData.travellers > 1 ? "Travellers" : "Solo Explorer"}
              </span>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Step 4 of 6</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-forest mt-1">What is your Travel Style?</h2>
              <p className="text-brand-forest/60 text-sm mt-1">We adjust transit speeds and activity loads based on style.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto">
              {[
                { id: "Solo", label: "Solo Voyager", icon: "🧭", desc: "Fast pacing, high local spots" },
                { id: "Couple", label: "Couple Romantic", icon: "❤️", desc: "Relaxed scenic stops, premium stays" },
                { id: "Family", label: "Family Holiday", icon: "👨‍👩‍👧‍👦", desc: "Safe, child-engaging events, comfort rides" },
                { id: "Friends", label: "Friends Group", icon: "🎒", desc: "Adventure activities, late food haunts" },
                { id: "Senior Friendly", label: "Senior Friendly", icon: "🛡️", desc: "Low walking, accessible stays, paramedics", highlighted: true }
              ].map((styleOption) => (
                <button
                  key={styleOption.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, style: styleOption.id })}
                  className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer hover:shadow-sm ${
                    formData.style === styleOption.id 
                      ? 'bg-brand-teal text-white border-brand-teal shadow-md' 
                      : 'bg-white text-brand-forest border-brand-teal/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{styleOption.icon}</span>
                    {styleOption.highlighted && (
                      <span className="text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-brand-orange text-white">
                        Access Aid
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm leading-tight">{styleOption.label}</h4>
                    <p className={`text-[10px] mt-0.5 leading-snug ${formData.style === styleOption.id ? 'text-white/70' : 'text-brand-forest/50'}`}>
                      {styleOption.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Step 5 of 6</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-forest mt-1">What is your Budget?</h2>
              <p className="text-brand-forest/60 text-sm mt-1">Configure your stay lodging and ride classes.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
              {[
                { id: "Affordable", title: "Affordable Tier", icon: "💰", price: "Bus/Train CC + Lodges", desc: "Maximize savings while keeping travel clean." },
                { id: "Moderate", title: "Moderate Tier", icon: "⚖️", price: "AC Shatabdi/Volvo + 3★ Stays", desc: "Best value balance of quality amenities." },
                { id: "Premium", title: "Premium Tier", icon: "💎", price: "SUV Cabs + 4/5★ Boutique Stays", desc: "Luxury vehicles, private support, luxury views." }
              ].map((bTier) => (
                <button
                  key={bTier.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, budget: bTier.id })}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between gap-4 transition-all cursor-pointer hover:shadow-sm ${
                    formData.budget === bTier.id 
                      ? 'bg-brand-teal text-white border-brand-teal shadow-md' 
                      : 'bg-white text-brand-forest border-brand-teal/10'
                  }`}
                >
                  <div>
                    <span className="text-2xl">{bTier.icon}</span>
                    <h4 className="font-extrabold text-base mt-2">{bTier.title}</h4>
                    <p className={`text-[10px] uppercase font-bold tracking-wide mt-0.5 ${formData.budget === bTier.id ? 'text-brand-gold' : 'text-brand-orange'}`}>
                      {bTier.price}
                    </p>
                  </div>
                  <p className={`text-xs ${formData.budget === bTier.id ? 'text-white/70' : 'text-brand-forest/60'}`}>
                    {bTier.desc}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Step 6 of 6</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-forest mt-1">Select your travel interests</h2>
              <p className="text-brand-forest/60 text-sm mt-1">Select all categories you'd like to feature in the daily planner.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3.5 max-w-xl mx-auto">
              {[
                { id: "Nature", name: "🌲 Nature & Landscapes" },
                { id: "Heritage", name: "🏰 Heritage & History" },
                { id: "Food", name: "🍛 Regional Food Walks" },
                { id: "Adventure", name: "🧗 River Rafting & Adventure" },
                { id: "Spiritual", name: "🕉️ Temples & Spiritual" },
                { id: "Shopping", name: "🛍️ Local Art Bazaars" },
                { id: "Culture", name: "🎭 Dance & Cultural Shows" }
              ].map((interest) => {
                const isSelected = formData.interests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    className={`px-4.5 py-3 rounded-full text-sm font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-brand-teal border-brand-teal text-white shadow-sm'
                        : 'bg-white border-brand-teal/15 text-brand-forest hover:bg-brand-mint'
                    }`}
                  >
                    {interest.name}
                    {isSelected && " ✓"}
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[80vh] bg-brand-ivory py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-brand-teal/5 shadow-premium overflow-hidden p-6 sm:p-10 flex flex-col justify-between min-h-[500px]">
        
        {/* Progress Bar Header */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-brand-forest/50 uppercase tracking-widest">
            <span>Planner Setup</span>
            <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="h-1.5 bg-brand-teal/10 rounded-full w-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-orange to-brand-gold transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Body */}
        <div className="my-8 flex-grow flex items-center justify-center">
          <div className="w-full">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Controls Footer */}
        <div className="flex items-center justify-between border-t border-brand-teal/10 pt-6">
          <button
            type="button"
            onClick={handleBack}
            className={`px-5 py-3 rounded-xl border font-bold text-sm tracking-wide flex items-center gap-1.5 transition-all cursor-pointer
              ${step === 1 
                ? 'opacity-0 pointer-events-none' 
                : 'bg-white hover:bg-brand-mint border-brand-teal/15 text-brand-forest'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-brand-teal hover:bg-brand-forest text-white font-bold text-sm tracking-wide flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold text-sm tracking-wide flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-brand-orange/15 animate-bounce"
            >
              <span>Build My Smart Trip</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {/* Safe Travel Assistant Notice Footer */}
        {formData.style === 'Senior Friendly' && (
          <div className="mt-6 p-3 rounded-xl bg-brand-mint/60 border border-brand-teal/10 text-[11px] text-brand-teal flex items-start gap-2 text-left">
            <ShieldCheck className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-brand-forest">Senior Citizen Assist Enabled:</span>
              <p className="mt-0.5 text-brand-forest/70">
                Itineraries generated will automatically emphasize direct routes, wheelchair paths at temples, nearby clinic lists, and pure veg dining options.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
