import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { MapExperience } from '../components/MapExperience';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  PlusCircle, 
  MapPin, 
  Bus, 
  Trash2,
  X,
  Layers
} from 'lucide-react';

export const SmartTripPage = () => {
  const { id } = useParams();
  const { trips, setTrips, addToast } = useTravel();

  const [activeTrip, setActiveTrip] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  // New activity form inputs
  const [newActivity, setNewActivity] = useState({
    time: '10:00 AM',
    location: '',
    activity: '',
    cost: 0,
    travelTime: '20 mins',
    notes: ''
  });

  useEffect(() => {
    if (trips.length > 0) {
      const match = trips.find(t => t.id === id);
      if (match) {
        setActiveTrip(match);
      } else {
        // Fallback to first trip if ID is invalid
        setActiveTrip(trips[0]);
      }
    }
  }, [id, trips]);

  const handleAddActivitySubmit = (e) => {
    e.preventDefault();
    if (!newActivity.location || !newActivity.activity) {
      addToast("Please fill in location and activity fields", "error");
      return;
    }

    // Append to current active trip's day itinerary
    setTrips((prevTrips) => {
      return prevTrips.map((trip) => {
        if (trip.id === activeTrip.id) {
          const updatedItinerary = trip.itinerary.map((dayPlan) => {
            if (dayPlan.day === activeDay) {
              return {
                ...dayPlan,
                activities: [...dayPlan.activities, { ...newActivity, cost: Number(newActivity.cost) }]
              };
            }
            return dayPlan;
          });
          
          // Recompute total cost
          const addedCost = Number(newActivity.cost);
          return {
            ...trip,
            totalCost: trip.totalCost + addedCost,
            itinerary: updatedItinerary
          };
        }
        return trip;
      });
    });

    setShowAddModal(false);
    setNewActivity({
      time: '10:00 AM',
      location: '',
      activity: '',
      cost: 0,
      travelTime: '20 mins',
      notes: ''
    });
    addToast("✨ New activity added to your smart plan!", "success");
  };

  const handleDeleteActivity = (dayIndex, actIndex, activityCost) => {
    setTrips((prevTrips) => {
      return prevTrips.map((trip) => {
        if (trip.id === activeTrip.id) {
          const updatedItinerary = trip.itinerary.map((dayPlan, dIdx) => {
            if (dIdx === dayIndex) {
              return {
                ...dayPlan,
                activities: dayPlan.activities.filter((_, aIdx) => aIdx !== actIndex)
              };
            }
            return dayPlan;
          });

          return {
            ...trip,
            totalCost: Math.max(0, trip.totalCost - activityCost),
            itinerary: updatedItinerary
          };
        }
        return trip;
      });
    });
    addToast("Activity removed from plan", "info");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("🔗 Shared link copied to clipboard!", "success");
  };

  if (!activeTrip) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-brand-ivory text-center">
        <span className="text-4xl animate-pulse">🧭</span>
        <h2 className="text-xl font-bold mt-4 text-brand-forest">Loading itinerary dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* 1. Dashboard Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link 
            to="/my-trips" 
            className="flex items-center gap-1 text-xs font-bold text-brand-teal hover:text-brand-orange uppercase tracking-wider mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to My Trips
          </Link>
          <h1 className="text-3xl font-extrabold text-brand-forest">{activeTrip.title}</h1>
          <p className="text-sm text-brand-forest/60 mt-1 font-semibold flex items-center gap-1.5 flex-wrap">
            <span>📅 {activeTrip.startDate} to {activeTrip.endDate}</span>
            <span>&bull;</span>
            <span>👥 {activeTrip.travelersCount} Travelers</span>
            <span>&bull;</span>
            <span className="bg-brand-mint text-brand-teal px-2 py-0.5 rounded text-xs border border-brand-teal/5 uppercase font-bold">
              {activeTrip.travelStyle}
            </span>
            {activeTrip.budgetLevel && (
              <span className="inline-flex items-center gap-1 bg-brand-soft-orange text-brand-orange px-2 py-0.5 rounded text-xs border border-brand-orange/20 uppercase font-bold">
                <Layers className="w-3 h-3" /> {activeTrip.budgetLevel} Plan
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={handleShare}
            className="px-4 py-2 border border-brand-teal/20 hover:bg-brand-mint bg-white text-xs font-bold rounded-lg text-brand-forest flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          
          <button 
            onClick={() => addToast("💾 Offline PDF itinerary downloaded!", "success")}
            className="px-4 py-2 border border-brand-teal/20 hover:bg-brand-mint bg-white text-xs font-bold rounded-lg text-brand-forest flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> PDF
          </button>

          <button 
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-brand-orange/95 transition-colors cursor-pointer shadow-md shadow-brand-orange/10"
          >
            <PlusCircle className="w-4 h-4" /> Add Activity
          </button>
        </div>
      </div>

      {/* 2. Visual Journey Path Progression */}
      <div className="bg-white rounded-3xl p-6 border border-brand-teal/5 shadow-premium mb-8 text-center overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[700px] px-8 text-xs font-bold text-brand-forest/70">
          
          <div className="flex flex-col items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-brand-teal text-white flex items-center justify-center text-[10px]">1</span>
            <span>{activeTrip.source}</span>
          </div>
          
          <div className="flex-1 border-t-2 border-dashed border-brand-teal/20 mx-3 flex flex-col items-center">
            <Bus className="w-4 h-4 text-brand-orange -mt-2" />
            <span className="text-[9px] text-brand-teal/70 mt-1">{activeTrip.transport?.type || "Bus"}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center text-[10px]">2</span>
            <span>Transit Stop</span>
          </div>

          <div className="flex-1 border-t-2 border-dashed border-brand-teal/20 mx-3 flex flex-col items-center">
            <span className="text-[10px] text-brand-teal -mt-2.5">↓</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-brand-teal/15 text-brand-teal flex items-center justify-center text-[10px]">3</span>
            <span>{activeTrip.hotel?.name || "Stay Lodge"}</span>
          </div>

          <div className="flex-1 border-t-2 border-dashed border-brand-teal/20 mx-3 flex flex-col items-center">
            <span className="text-[10px] text-brand-teal/70 -mt-2.5">🚖</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center text-[10px]">4</span>
            <span>Local Attractions</span>
          </div>

          <div className="flex-1 border-t-2 border-dashed border-brand-teal/20 mx-3 flex flex-col items-center">
            <span className="text-[10px] text-brand-teal -mt-2.5">↓</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-brand-teal/25 text-brand-teal flex items-center justify-center text-[10px]">5</span>
            <span>Return Transit</span>
          </div>

        </div>
      </div>

      {/* 3. Main Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Itinerary Details & Days */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Day selection tabs */}
          <div className="flex bg-white rounded-2xl p-1.5 border border-brand-teal/5 shadow-sm">
            {activeTrip.itinerary?.map((dayPlan) => (
              <button
                key={dayPlan.day}
                onClick={() => setActiveDay(dayPlan.day)}
                className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                  activeDay === dayPlan.day 
                    ? 'bg-brand-teal text-white shadow-sm' 
                    : 'text-brand-forest/75 hover:bg-brand-mint'
                }`}
              >
                Day {dayPlan.day}
                <span className="block text-[9px] font-normal opacity-70">
                  {dayPlan.date}
                </span>
              </button>
            ))}
          </div>

          {/* Current Day timeline list */}
          <div className="relative border-l-2 border-brand-teal/15 pl-6 ml-4 space-y-8 py-2 text-sm">
            
            {activeTrip.itinerary?.find(d => d.day === activeDay)?.activities.length === 0 ? (
              <div className="p-8 text-center text-brand-forest/40 bg-white rounded-2xl border border-brand-teal/5">
                <span className="text-3xl block mb-2">🏖️</span>
                <p className="font-bold">No activities scheduled for this day</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-3 text-xs font-bold text-brand-orange hover:underline"
                >
                  + Add Custom Activity
                </button>
              </div>
            ) : (
              activeTrip.itinerary?.find(d => d.day === activeDay)?.activities.map((activity, actIdx) => (
                <div key={actIdx} className="relative group">
                  
                  {/* Timeline bullet dot */}
                  <span className="absolute -left-9.5 top-1.5 w-6 h-6 rounded-full bg-brand-forest border-4 border-brand-ivory text-white flex items-center justify-center text-[8px] font-black shadow-sm group-hover:bg-brand-orange transition-colors">
                    {actIdx + 1}
                  </span>

                  {/* Activity Detail Card */}
                  <div className="bg-white rounded-2xl p-5 border border-brand-teal/5 shadow-sm hover:border-brand-teal/15 transition-all flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
                          ⏰ {activity.time}
                        </span>
                        <span className="text-[10px] text-brand-forest/40 font-bold uppercase tracking-wide flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-brand-teal" /> {activity.location}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-brand-forest text-base leading-snug">{activity.activity}</h3>
                      <p className="text-xs text-brand-forest/65 leading-relaxed">{activity.notes}</p>
                      
                      <div className="flex gap-4 pt-1 text-[10px] text-brand-forest/50 font-semibold">
                        <span>⏱️ Duration: {activity.travelTime}</span>
                        {activity.cost > 0 && (
                          <span className="text-brand-teal font-extrabold">Est. Cost: ₹{activity.cost}</span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteActivity(activeDay - 1, actIdx, activity.cost)}
                      className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Remove activity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))
            )}

          </div>

        </div>

        {/* Right Column: Map Experience & Side Statistics */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Map Preview card */}
          <div>
            <MapExperience 
              from={activeTrip.source} 
              to={activeTrip.destination} 
              activeDay={activeDay}
            />
          </div>

          {/* Core bookings checklist summary */}
          <div className="bg-white rounded-3xl p-6 border border-brand-teal/5 shadow-premium text-xs text-brand-forest">
            <h3 className="font-extrabold text-sm mb-4 text-brand-forest uppercase tracking-wider">Plan Booking Ledger</h3>
            
            <div className="space-y-4">
              {/* Transport checklist */}
              <div className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="font-extrabold text-brand-forest text-sm">Transport Booked</h4>
                  <p className="text-[10px] text-brand-forest/55 mt-0.5 leading-tight">{activeTrip.transport?.name || "UTC Volvo Seat (2+2)"}</p>
                </div>
              </div>

              {/* Hotel checklist */}
              <div className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <h4 className="font-extrabold text-brand-forest text-sm">Hotel Room Confirmed</h4>
                  <p className="text-[10px] text-brand-forest/55 mt-0.5 leading-tight">{activeTrip.hotel?.name || "The Doon Valley Resort"}</p>
                </div>
              </div>

              {/* Emergency checklist */}
              <div className="flex items-start gap-3 border-t border-brand-teal/10 pt-4">
                <span className="h-5 w-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                  🚨
                </span>
                <div>
                  <h4 className="font-extrabold text-brand-forest text-sm">24/7 SOS Network Guarding</h4>
                  <p className="text-[10px] text-brand-forest/55 mt-0.5 leading-tight">Geofenced safety dispatch maps locked onto coordinates.</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-brand-teal/10 my-4"></div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-brand-forest/50 font-bold">Total Logged Cost</span>
              <span className="text-base font-black text-brand-teal">₹{activeTrip.totalCost}</span>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Add Custom Activity Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-forest/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border border-brand-teal/10 p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-left">
            
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-gray-400 hover:text-brand-forest hover:bg-gray-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-xl text-brand-forest">Add Custom Activity</h3>
            <p className="text-xs text-brand-forest/55 mt-0.5">Insert custom locations, meals, or sights for Day {activeDay}.</p>

            <form onSubmit={handleAddActivitySubmit} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-brand-forest/75 uppercase tracking-wider text-[10px]">Activity Time</label>
                  <input
                    type="text"
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                    className="p-3 border border-brand-teal/15 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal"
                    placeholder="e.g. 05:00 PM"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-brand-forest/75 uppercase tracking-wider text-[10px]">Estimated Price (₹)</label>
                  <input
                    type="number"
                    value={newActivity.cost}
                    onChange={(e) => setNewActivity({ ...newActivity, cost: e.target.value })}
                    className="p-3 border border-brand-teal/15 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal"
                    placeholder="e.g. 150"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-brand-forest/75 uppercase tracking-wider text-[10px]">Activity Location</label>
                <input
                  type="text"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                  className="p-3 border border-brand-teal/15 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal"
                  placeholder="e.g. Paltan Bazaar Crafts"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-brand-forest/75 uppercase tracking-wider text-[10px]">What will you do?</label>
                <input
                  type="text"
                  value={newActivity.activity}
                  onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
                  className="p-3 border border-brand-teal/15 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal"
                  placeholder="e.g. Buy authentic block fabrics and brass artifacts"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-brand-forest/75 uppercase tracking-wider text-[10px]">Transit Duration</label>
                  <input
                    type="text"
                    value={newActivity.travelTime}
                    onChange={(e) => setNewActivity({ ...newActivity, travelTime: e.target.value })}
                    className="p-3 border border-brand-teal/15 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal"
                    placeholder="e.g. 15m taxi"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-brand-forest/75 uppercase tracking-wider text-[10px]">Itinerary notes</label>
                <textarea
                  value={newActivity.notes}
                  onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                  className="p-3 border border-brand-teal/15 rounded-xl text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-brand-teal h-20 resize-none"
                  placeholder="e.g. Best to go after lunch. Support local women cooperatives."
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold text-sm tracking-wide shadow-md shadow-brand-orange/10 cursor-pointer"
              >
                Add Activity to Day {activeDay}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
