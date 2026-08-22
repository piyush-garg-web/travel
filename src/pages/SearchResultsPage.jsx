import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { travelService } from '../services/travelService';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { 
  Bus, 
  Train, 
  Car, 
  ArrowRight, 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  ShieldCheck, 
  Star,
  Info,
  BadgeAlert,
  Leaf
} from 'lucide-react';

export const SearchResultsPage = () => {
  const { planner, bookingCart, setBookingItem, executeBooking, addToast } = useTravel();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [transports, setTransports] = useState([]);
  const [availableHotels, setAvailableHotels] = useState([]);
  const [filterType, setFilterType] = useState('All'); // All, Bus, Train, Cab
  const [sortBy, setSortBy] = useState('Recommended'); // Recommended, Cheapest, Fastest
  const [selectedTransportId, setSelectedTransportId] = useState('');
  const [selectedHotelId, setSelectedHotelId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const transData = await travelService.getTransportOptions(planner.source, planner.destination);
        const hotelData = await travelService.getHotels({ destinationId: planner.destination });
        
        setTransports(transData);
        setAvailableHotels(hotelData);

        // Pre-fill selection IDs from booking cart defaults
        if (bookingCart.transport) setSelectedTransportId(bookingCart.transport.id);
        if (bookingCart.hotel) setSelectedHotelId(bookingCart.hotel.id);
      } catch (err) {
        console.error("Error retrieving travel inventory", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [planner.source, planner.destination]);

  const handleSelectTransport = (option) => {
    setSelectedTransportId(option.id);
    setBookingItem('transport', option);
    addToast(`Selected ${option.name} transport`, "info");
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotelId(hotel.id);
    setBookingItem('hotel', hotel);
    addToast(`Selected ${hotel.name} hotel stay`, "info");
  };

  const handleCheckout = () => {
    // Proceed to confirm booking
    const simulatedId = `pass-ezy-${Math.floor(1000 + Math.random() * 9000)}`;
    const bookedId = executeBooking(simulatedId);
    navigate(`/booking/success?bookingId=${bookedId}`);
  };

  // Filtering & Sorting Logic
  const filteredTransports = transports
    .filter(t => filterType === 'All' ? true : t.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'Cheapest') return a.price - b.price;
      if (sortBy === 'Fastest') {
        const durationA = parseFloat(a.duration.replace('h', '.').replace('m', ''));
        const durationB = parseFloat(b.duration.replace('h', '.').replace('m', ''));
        return durationA - durationB;
      }
      // Recommended Default: Recommended goes first
      return (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0);
    });

  // Recommended transport highlight
  const topRecommended = transports.find(t => t.isRecommended) || transports[0];

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Route Header Banner */}
      <div className="bg-brand-forest text-brand-ivory rounded-3xl p-6 md:p-8 mb-8 border border-brand-teal/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Compared Routing Results</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 flex items-center gap-2">
            <span>{planner.source}</span>
            <ArrowRight className="w-5 h-5 text-brand-gold shrink-0" />
            <span>{planner.destination}</span>
          </h1>
          <p className="text-brand-ivory/60 text-xs sm:text-sm mt-1 font-semibold">
            📅 {planner.startDate} to {planner.endDate} &nbsp;|&nbsp; 👥 {planner.travellers} Travellers &nbsp;|&nbsp; 🛡️ {planner.style} Preference
          </p>
        </div>
        <button 
          onClick={() => navigate('/plan-trip')}
          className="px-4 py-2 border border-white/20 hover:border-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          Modify Plan Config
        </button>
      </div>

      {loading ? (
        <div className="space-y-12">
          <SkeletonLoader type="results" count={2} />
          <SkeletonLoader type="card" count={3} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main List Section */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Recommended Highlight Box */}
            {topRecommended && (
              <div className="bg-gradient-to-br from-brand-teal/5 to-[#FFFDF8] border-2 border-brand-teal rounded-3xl p-6 shadow-sm relative overflow-hidden">
                <span className="absolute top-0 right-0 bg-brand-teal text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-2xl">
                  Best Recommendation
                </span>
                
                <h3 className="text-xs uppercase tracking-widest text-brand-orange font-bold">Why recommended for you?</h3>
                
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="bg-brand-mint text-brand-teal text-[10px] px-2 py-0.5 rounded font-extrabold">Best Value</span>
                  {planner.style === 'Senior Friendly' && (
                    <span className="bg-brand-green/10 text-brand-green text-[10px] px-2 py-0.5 rounded font-extrabold">Elder comfort compliant</span>
                  )}
                  {topRecommended.co2Saved > 0 && (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded font-extrabold flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> Saved {topRecommended.co2Saved} kg CO₂
                    </span>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-8 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal shrink-0">
                      {topRecommended.type === 'Bus' ? <Bus className="w-6 h-6" /> : <Train className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-brand-forest text-base leading-tight">{topRecommended.name}</h4>
                      <p className="text-xs text-brand-forest/60 mt-0.5">{topRecommended.carrier} &bull; Departure {topRecommended.departure}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-4 text-left sm:text-right">
                    <span className="text-xs text-brand-forest/40">Price</span>
                    <p className="text-xl font-black text-brand-teal">₹{topRecommended.price}/person</p>
                  </div>
                </div>

                <p className="text-xs text-brand-forest/65 mt-4 leading-relaxed italic bg-brand-teal/5 p-3 rounded-xl border border-brand-teal/10">
                  ⚠️ "Recommended because you prefer moderate-budget, accessibility-first trips. The Volvo AC Seater provides reclining orthopedic seats with direct rest stop intervals."
                </p>
              </div>
            )}

            {/* 2. Transit Mode Comparisons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-teal/10 pb-4">
                <h3 className="font-extrabold text-lg text-brand-forest flex items-center gap-1.5">
                  Compare Transit Modes
                </h3>
                
                {/* Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex bg-brand-mint rounded-xl p-1 border border-brand-teal/5">
                    {['All', 'Bus', 'Train', 'Cab'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setFilterType(mode)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${filterType === mode ? 'bg-brand-teal text-white shadow-sm' : 'text-brand-forest/70'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-brand-teal/20 bg-white text-xs font-bold text-brand-forest focus:outline-none"
                  >
                    <option value="Recommended">Recommended</option>
                    <option value="Cheapest">Cheapest</option>
                    <option value="Fastest">Fastest</option>
                  </select>
                </div>
              </div>

              {/* Transit Cards Grid */}
              <div className="space-y-4">
                {filteredTransports.map((option) => {
                  const isSelected = selectedTransportId === option.id;
                  return (
                    <div 
                      key={option.id}
                      onClick={() => handleSelectTransport(option)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-sm ${
                        isSelected 
                          ? 'border-brand-teal bg-brand-teal/5 shadow-sm' 
                          : 'border-brand-teal/10 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                          option.type === 'Train' ? 'bg-indigo-50 text-indigo-700' : option.type === 'Bus' ? 'bg-brand-orange/10 text-brand-orange' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {option.type === 'Train' ? <Train className="w-5.5 h-5.5" /> : option.type === 'Bus' ? <Bus className="w-5.5 h-5.5" /> : <Car className="w-5.5 h-5.5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-brand-forest text-sm sm:text-base leading-tight">{option.name}</h4>
                            {option.isRecommended && (
                              <span className="bg-brand-teal/10 text-brand-teal text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded">
                                Best Value
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-brand-forest/65 mt-1">
                            {option.carrier} &bull; ⏱️ {option.duration} &bull; Departs {option.departure}
                          </p>
                          <div className="flex gap-2.5 mt-2">
                            {option.co2Saved > 0 && (
                              <span className="text-[9px] font-semibold text-emerald-700 flex items-center gap-0.5">
                                🌱 {option.co2Saved}kg CO₂ saved
                              </span>
                            )}
                            <span className="text-[9px] text-brand-forest/50 font-semibold uppercase">
                              💺 {option.seatsAvailable} seats left
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto border-t sm:border-t-0 border-brand-teal/10 pt-3 sm:pt-0 gap-2">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-brand-forest/40">Total Price</span>
                          <p className="text-lg font-black text-brand-teal">
                            ₹{option.type === 'Cab' ? option.price : (option.price * planner.travellers)}
                          </p>
                          {option.type !== 'Cab' && (
                            <span className="text-[9px] text-brand-forest/55">₹{option.price}/person</span>
                          )}
                        </div>
                        <button
                          type="button"
                          className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            isSelected 
                              ? 'bg-brand-teal text-white' 
                              : 'bg-brand-mint text-brand-teal border border-brand-teal/10 hover:bg-brand-teal hover:text-white'
                          }`}
                        >
                          {isSelected ? "Selected ✓" : "Select Option"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Stays Accommodation Grid */}
            <div className="space-y-4">
              <div className="border-b border-brand-teal/10 pb-4">
                <h3 className="font-extrabold text-lg text-brand-forest">
                  Stays in {planner.destination}
                </h3>
                <p className="text-xs text-brand-forest/50 mt-1">Recommended lodges matching your selected comfort parameters.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {availableHotels.map((hotel) => {
                  const isSelected = selectedHotelId === hotel.id;
                  return (
                    <div 
                      key={hotel.id}
                      onClick={() => handleSelectHotel(hotel)}
                      className={`rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'border-brand-teal bg-brand-teal/5 shadow-sm' 
                          : 'border-brand-teal/10 bg-white'
                      }`}
                    >
                      <div className="relative h-40">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                        {hotel.badge && (
                          <span className="absolute top-3 left-3 bg-brand-forest text-brand-gold text-[9px] uppercase font-extrabold px-2.5 py-1 rounded-lg">
                            {hotel.badge}
                          </span>
                        )}
                        {hotel.isSeniorFriendly && (
                          <span className="absolute top-3 right-3 bg-brand-teal text-white text-[9px] uppercase font-extrabold px-2 py-0.5 rounded flex items-center gap-1 border border-white/10">
                            🛡️ Senior-Friendly
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between gap-4 text-sm">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-brand-forest/50 font-bold">{hotel.location}</span>
                            <span className="text-xs text-brand-gold font-extrabold">★ {hotel.rating}</span>
                          </div>
                          <h4 className="font-extrabold text-base text-brand-forest mt-1.5 leading-snug">{hotel.name}</h4>
                          <p className="text-brand-forest/65 mt-1 text-xs line-clamp-2 leading-relaxed">{hotel.whyRecommended}</p>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {hotel.amenities.slice(0, 3).map((am) => (
                              <span key={am} className="text-[9px] bg-brand-mint text-brand-teal px-2 py-0.5 rounded font-semibold">
                                {am}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-brand-teal/10 pt-3 mt-2">
                          <div>
                            <span className="text-[10px] text-brand-forest/40">Nightly Price</span>
                            <p className="text-base font-extrabold text-brand-teal">₹{hotel.pricePerNight}</p>
                          </div>
                          <button
                            type="button"
                            className={`px-4.5 py-2 rounded-lg text-xs font-bold transition-all ${
                              isSelected 
                                ? 'bg-brand-teal text-white' 
                                : 'bg-brand-mint text-brand-teal hover:bg-brand-teal hover:text-white'
                            }`}
                          >
                            {isSelected ? "Selected ✓" : "Select Stay"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Checkout Summary Sidebar Right */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-brand-forest text-white rounded-3xl p-6 border border-brand-teal/20 shadow-premium">
              <h3 className="font-extrabold text-lg text-white">Your Smart Bill</h3>
              <p className="text-brand-ivory/60 text-xs mt-0.5">Transparent cost breakdown. Zero hidden charges.</p>
              
              <div className="h-px bg-white/10 my-4"></div>

              <div className="space-y-3.5 text-xs text-brand-ivory/80">
                {/* Transport Selected */}
                {bookingCart.transport ? (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-white leading-none">Transport ({bookingCart.transport.type})</p>
                      <span className="text-[10px] text-brand-ivory/50 mt-0.5 block">{bookingCart.transport.name}</span>
                    </div>
                    <span className="font-bold">₹{bookingCart.costBreakdown.transport}</span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-brand-ivory/40">
                    <span>No transport selected</span>
                    <span>₹0</span>
                  </div>
                )}

                {/* Hotel Selected */}
                {bookingCart.hotel ? (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-white leading-none">Hotel Accommodation</p>
                      <span className="text-[10px] text-brand-ivory/50 mt-0.5 block">{bookingCart.hotel.name} (3 Nights)</span>
                    </div>
                    <span className="font-bold">₹{bookingCart.costBreakdown.hotel}</span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-brand-ivory/40">
                    <span>No stay selected</span>
                    <span>₹0</span>
                  </div>
                )}

                {/* Local cab / transit pass */}
                {bookingCart.localTravel ? (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-white leading-none">Local Transit Pass</p>
                      <span className="text-[10px] text-brand-ivory/50 mt-0.5 block">{bookingCart.localTravel.name}</span>
                    </div>
                    <span className="font-bold">₹{bookingCart.costBreakdown.localTravel}</span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-brand-ivory/40">
                    <span>No local transit</span>
                    <span>₹0</span>
                  </div>
                )}

                {/* Activities default */}
                <div className="flex justify-between items-center">
                  <span>Included Local Experiences</span>
                  <span className="font-bold">₹{bookingCart.costBreakdown.activities}</span>
                </div>

                <div className="flex justify-between items-center text-brand-ivory/50">
                  <span>GST & Service Charge (5%)</span>
                  <span>₹{bookingCart.costBreakdown.tax}</span>
                </div>
              </div>

              <div className="h-px bg-white/10 my-4"></div>

              {/* Total Cost Display */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-xs text-brand-ivory/55">Total Cost</span>
                  <p className="text-[10px] text-brand-gold font-bold">Pure Veg & Access support included</p>
                </div>
                <p className="text-2xl font-black text-brand-gold">₹{bookingCart.costBreakdown.total}</p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleCheckout}
                disabled={!bookingCart.transport || !bookingCart.hotel}
                className="w-full py-4 rounded-xl bg-brand-orange hover:bg-brand-orange/95 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Continue to Booking</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {!bookingCart.transport || !bookingCart.hotel ? (
                <p className="text-[10px] text-red-400 text-center mt-2.5">
                  * Please select a transport option and a stay option to continue.
                </p>
              ) : (
                <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-brand-green font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Secure Checkout & Premium Travel Shield Active</span>
                </div>
              )}

            </div>

            {/* Senior Safety Support Card */}
            {planner.style === 'Senior Friendly' && (
              <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-brand-orange/20 text-xs flex gap-2.5 text-brand-forest shadow-sm text-left">
                <span className="text-xl">👵🏽</span>
                <div>
                  <h4 className="font-extrabold text-brand-forest">Elderly Care Benefits Pre-linked</h4>
                  <ul className="mt-1 space-y-1 text-brand-forest/70 list-disc list-inside">
                    <li>VIP fast-track entries pre-cleared.</li>
                    <li>Paramedics accessible on bus/train routes.</li>
                    <li>Elevator room placement locked.</li>
                  </ul>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
