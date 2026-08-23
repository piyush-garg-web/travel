import React, { createContext, useContext, useState, useEffect } from 'react';
import { currentUser as defaultUser, mockUsersList } from '../data/users';
import { mockTrips as initialTrips } from '../data/trips';
import { destinations } from '../data/destinations';
import { transportOptions } from '../data/transport';
import { hotels } from '../data/hotels';

const TravelContext = createContext(null);

const getSelectedTransportTotal = (transport, travellers) => {
  if (!transport) return 0;
  return transport.type === 'Cab'
    ? transport.price
    : transport.price * (travellers || 1);
};

export const TravelProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (!token || !savedUser) {
      return null;
    }
    try {
      return JSON.parse(savedUser);
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  });

  const [trips, setTrips] = useState(initialTrips);
  const [savedStays, setSavedStays] = useState(user?.savedStays || []);
  const [savedExperiences, setSavedExperiences] = useState(user?.savedExperiences || []);

  // Sync token and user logic
  useEffect(() => {
    if (!authToken || !user) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (authToken) setAuthToken(null);
      if (user) setUser(null);
    }
  }, [authToken, user]);

  useEffect(() => {
    if (user) {
      setSavedStays(user.savedStays || []);
      setSavedExperiences(user.savedExperiences || []);
    } else {
      setSavedStays([]);
      setSavedExperiences([]);
    }
  }, [user]);
  
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

  // Selected comparison plan tier (Affordable / Moderate / Premium)
  const [selectedPlan, setSelectedPlan] = useState(planner.budget);

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

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    setPlanner((prev) => ({ ...prev, budget: plan }));
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

  const packageBreakdowns = {
    Affordable: { localTravel: 300, activities: 200 },
    Moderate: { localTravel: 600, activities: 800 },
    Premium: { localTravel: 1200, activities: 3500 }
  };

  // Set selected transport or hotel in booking cart
  const setBookingItem = (type, item) => {
    setBookingCart((prev) => {
      const updated = { ...prev, [type]: item };

      // Calculate costs
      const transCost = type === 'transport'
        ? getSelectedTransportTotal(item, planner.travellers)
        : prev.costBreakdown.transport;
      const stayCost = type === 'hotel'
        ? item.pricePerNight * 3
        : prev.costBreakdown.hotel;
      const localCost = type === 'localTravel'
        ? item.price
        : prev.costBreakdown.localTravel;
      const actCost = prev.costBreakdown.activities;

      const subTotal = transCost + stayCost + localCost + actCost;

      updated.costBreakdown = {
        transport: transCost,
        hotel: stayCost,
        localTravel: localCost,
        activities: actCost,
        tax: Math.round(subTotal * 0.18), // Standard 18% GST
        total: subTotal + Math.round(subTotal * 0.18)
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

    const destHotels = hotels.filter(
      (h) => h.destinationId.toLowerCase() === toLoc.toLowerCase()
    );
    const planLabel = selectedPlan || planner.budget;
    const recommendedHotel = planLabel === 'Affordable'
      ? destHotels.reduce((cheapest, h) => (!cheapest || h.pricePerNight < cheapest.pricePerNight) ? h : cheapest, null) || hotels[0]
      : planLabel === 'Premium'
        ? destHotels.reduce((priciest, h) => (!priciest || h.pricePerNight > priciest.pricePerNight) ? h : priciest, null) || hotels[0]
        : destHotels.find((h) => h.isSeniorFriendly === (planner.style === 'Senior Friendly')) || destHotels[0] || hotels[0];

    const packageBreakdown = packageBreakdowns[selectedPlan] || packageBreakdowns.Moderate;
    const transportCost = getSelectedTransportTotal(recommendedTrans, planner.travellers);
    const hotelCost = (recommendedHotel?.pricePerNight || 500) * 3;
    const defaultLocal = { name: "JanYatri Shared Local Travel Pass", price: packageBreakdown.localTravel };
    const includedExperiences = [
      { name: "Community Visits & Guided Trails", cost: packageBreakdown.activities }
    ];
    const baseSubtotal = transportCost + hotelCost + packageBreakdown.localTravel + packageBreakdown.activities;
    const gstAmount = Math.round(baseSubtotal * 0.18);

    setBookingCart({
      transport: recommendedTrans,
      hotel: recommendedHotel,
      activities: includedExperiences,
      localTravel: defaultLocal,
      costBreakdown: {
        transport: transportCost,
        hotel: hotelCost,
        localTravel: packageBreakdown.localTravel,
        activities: packageBreakdown.activities,
        tax: gstAmount,
        total: baseSubtotal + gstAmount
      }
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

  const isLoggedIn = user !== null && authToken !== null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAuthToken(null);
    addToast("Logged out successfully.", "info");
  };

  return (
    <TravelContext.Provider
      value={{
        user,
        setUser,
        authToken,
        setAuthToken,
        isLoggedIn,
        logout,
        trips,
        setTrips,
        savedStays,
        savedExperiences,
        toggleSaveStay,
        toggleSaveExperience,
        planner,
        updatePlanner,
        selectedPlan,
        setSelectedPlan,
        selectPlan,
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
