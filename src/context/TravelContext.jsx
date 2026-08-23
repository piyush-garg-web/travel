import React, { createContext, useContext, useState, useEffect } from 'react';
import { currentUser as defaultUser, mockUsersList } from '../data/users';
import { mockTrips as initialTrips } from '../data/trips';
import { destinations } from '../data/destinations';
import { transportOptions } from '../data/transport';
import { hotels } from '../data/hotels';

const TravelContext = createContext(null);

export const TravelProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [trips, setTrips] = useState(initialTrips);
  const [savedStays, setSavedStays] = useState(defaultUser.savedStays || []);
  const [savedExperiences, setSavedExperiences] = useState(defaultUser.savedExperiences || []);
  
  // Planner State
  const [planner, setPlanner] = useState({
    source: 'Delhi',
    destination: 'Dehradun',
    startDate: '2026-09-22',
    endDate: '2026-09-25',
    travellers: 2,
    style: 'Senior Friendly', // Solo, Couple, Family, Friends, Senior Friendly
    budget: 'Moderate', // Affordable, Moderate, Premium
    interests: ['Heritage', 'Spiritual', 'Nature'], // Nature, Heritage, Food, Adventure, Spiritual, Shopping, Culture
    tripType: 'Regular Trip' // Regular Trip, Short Trip, Tirth Yatra
  });

  // Active booking flow state
  const [bookingCart, setBookingCart] = useState({
    transport: null,
    hotel: null,
    activities: [],
    localTravel: null,
    costBreakdown: {
      transport: 0,
      hotel: 0,
      activities: 0,
      localTravel: 0,
      tax: 0,
      total: 0
    }
  });

  const [toasts, setToasts] = useState([]);

  // Trigger safety SOS simulation
  const [sosActive, setSosActive] = useState(false);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper to trigger SOS
  const triggerSOS = () => {
    setSosActive(true);
    addToast("🚨 EMERGENCY SOS ALERTS INITIATED! Emergency contacts and local security services notified.", "error");
  };

  const cancelSOS = () => {
    setSosActive(false);
    addToast("SOS Alert canceled. Contacts have been updated that you are safe.", "success");
  };

  const updatePlanner = (updates) => {
    setPlanner((prev) => ({ ...prev, ...updates }));
  };

  // Handle stay saves
  const toggleSaveStay = (hotelId) => {
    if (savedStays.includes(hotelId)) {
      setSavedStays((prev) => prev.filter((id) => id !== hotelId));
      addToast("Stay removed from saved list", "info");
    } else {
      setSavedStays((prev) => [...prev, hotelId]);
      addToast("Stay saved to your wishlist", "success");
    }
  };

  // Handle local experiences saves
  const toggleSaveExperience = (expId) => {
    if (savedExperiences.includes(expId)) {
      setSavedExperiences((prev) => prev.filter((id) => id !== expId));
      addToast("Experience removed from saved list", "info");
    } else {
      setSavedExperiences((prev) => [...prev, expId]);
      addToast("Experience saved to your wishlist", "success");
    }
  };

  // Set selected transport or hotel in booking cart
  const setBookingItem = (type, item) => {
    setBookingCart((prev) => {
      const updated = { ...prev, [type]: item };
      
      // Calculate costs
      const transCost = updated.transport ? (updated.transport.price * (planner.travellers || 1)) : 0;
      const stayCost = updated.hotel ? (updated.hotel.pricePerNight * 3) : 0; // Assume 3 nights
      const localCost = type === 'localTravel' ? item.price : (updated.localTravel ? updated.localTravel.price : 500); // Mock flat local transport
      const actCost = updated.activities.reduce((sum, a) => sum + (a.cost || 0), 0);
      
      const subTotal = transCost + stayCost + localCost + actCost;
      
      updated.costBreakdown = {
        transport: transCost,
        hotel: stayCost,
        localTravel: localCost,
        activities: actCost,
        tax: Math.round(subTotal * 0.05), // 5% GST
        total: subTotal + Math.round(subTotal * 0.05)
      };
      
      return updated;
    });
  };

  // Initialize booking cart with recommendations based on current destination
  const initializeBookingDefaults = (fromLoc, toLoc) => {
    const recommendedTrans = transportOptions.find(
      (t) => t.from.toLowerCase() === fromLoc.toLowerCase() && 
             t.to.toLowerCase() === toLoc.toLowerCase() && 
             t.isRecommended
    ) || transportOptions[0];

    const recommendedHotel = hotels.find(
      (h) => h.destinationId.toLowerCase() === toLoc.toLowerCase() && 
             h.isSeniorFriendly === (planner.style === 'Senior Friendly')
    ) || hotels[0];

    const defaultLocal = { name: "JanYatri Eco-Electric Cab Pass", price: 600 };

    setBookingCart({
      transport: recommendedTrans,
      hotel: recommendedHotel,
      activities: [
        { name: "Guided Heritage Site Walk", cost: 150 },
        { name: "Local Traditional Dining Experience", cost: 400 }
      ],
      localTravel: defaultLocal,
      costBreakdown: {
        transport: recommendedTrans ? (recommendedTrans.price * planner.travellers) : 1300,
        hotel: recommendedHotel ? (recommendedHotel.pricePerNight * 3) : 8400,
        localTravel: 600,
        activities: 550,
        tax: 500,
        total: 0 // Will compute dynamically
      }
    });

    // Compute initial total
    setBookingCart((prev) => {
      const transCost = prev.transport ? (prev.transport.price * planner.travellers) : 1300;
      const stayCost = prev.hotel ? (prev.hotel.pricePerNight * 3) : 8400;
      const sub = transCost + stayCost + 600 + 550;
      return {
        ...prev,
        costBreakdown: {
          transport: transCost,
          hotel: stayCost,
          localTravel: 600,
          activities: 550,
          tax: Math.round(sub * 0.05),
          total: sub + Math.round(sub * 0.05)
        }
      };
    });
  };

  // Finalize booking to myTrips
  const executeBooking = (bookingId) => {
    const newTrip = {
      id: bookingId || `trip-${Date.now()}`,
      title: `${planner.source} to ${planner.destination} Journey`,
      source: planner.source,
      destination: planner.destination,
      startDate: planner.startDate,
      endDate: planner.endDate,
      status: "Upcoming",
      travelersCount: planner.travellers,
      travelStyle: planner.style,
      budgetLevel: planner.budget,
      interests: planner.interests,
      totalCost: bookingCart.costBreakdown.total,
      transport: bookingCart.transport,
      hotel: bookingCart.hotel,
      localTravel: bookingCart.localTravel,
      itinerary: [
        // Populate custom day-by-day dynamic plan matching the structure
        {
          day: 1,
          date: planner.startDate,
          activities: [
            {
              time: bookingCart.transport?.departure || "07:00 AM",
              location: `${planner.source} Station/Terminal`,
              activity: `Board transit via ${bookingCart.transport?.name || "Premium Bus"}`,
              cost: bookingCart.costBreakdown.transport,
              travelTime: bookingCart.transport?.duration || "5 hours",
              notes: `Journey via ${bookingCart.transport?.carrier || "Carrier"}. Safe & clean travel.`
            },
            {
              time: "02:00 PM",
              location: bookingCart.hotel?.name || "Local Hotel Stay",
              activity: "Hotel Check-in & Refreshment",
              cost: bookingCart.hotel?.pricePerNight || 2500,
              travelTime: "20m transit",
              notes: `Welcome to ${bookingCart.hotel?.location || "Accommodation"}. Pre-cleared digital entry.`
            }
          ]
        },
        {
          day: 2,
          date: "Next Day",
          activities: [
            {
              time: "09:30 AM",
              location: "Local Highlights",
              activity: "Exploring Popular Sites & Culture walks",
              cost: 200,
              travelTime: "3 hours",
              notes: "Familiarise yourself with the regional architecture and support local craft stalls."
            }
          ]
        }
      ]
    };

    setTrips((prev) => [newTrip, ...prev]);
    addToast("🎉 Smart trip booked successfully! Check your itinerary in 'My Trips'.", "success");
    return newTrip.id;
  };

  return (
    <TravelContext.Provider
      value={{
        user,
        setUser,
        trips,
        setTrips,
        savedStays,
        savedExperiences,
        toggleSaveStay,
        toggleSaveExperience,
        planner,
        updatePlanner,
        bookingCart,
        setBookingItem,
        initializeBookingDefaults,
        executeBooking,
        toasts,
        addToast,
        removeToast,
        sosActive,
        triggerSOS,
        cancelSOS
      }}
    >
      {children}
      
      {/* Toast Alert System overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-lg border flex items-center justify-between gap-4 transition-all duration-300 transform translate-y-0 ${
              toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : toast.type === 'info'
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-teal-50 border-teal-200 text-teal-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {toast.type === 'error' ? '⚠️' : toast.type === 'info' ? 'ℹ️' : '✨'}
              </span>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 font-bold text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
