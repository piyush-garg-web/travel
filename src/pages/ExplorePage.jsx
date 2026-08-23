import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import varanasiGangesBg from '../assets/varanasi-ganges.png';
import { SafeImage } from '../components/SafeImage';
import { 
  ArrowRight, 
  MapPin, 
  Calendar as CalIcon, 
  Users, 
  Compass, 
  ShieldAlert, 
  Leaf, 
  Cpu, 
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { shortTrips } from '../data/shortTrips';
import { tirthYatraPackages } from '../data/tirthYatra';

export const ExplorePage = () => {
  const { planner, updatePlanner, isLoggedIn } = useTravel();
  const navigate = useNavigate();

  // Local state for hero planner form
  const [fromLoc, setFromLoc] = useState(planner.source);
  const [toLoc, setToLoc] = useState(planner.destination);
  const [date, setDate] = useState(planner.startDate);
  const [guests, setGuests] = useState(planner.travellers);
  const [type, setType] = useState(planner.tripType);

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    updatePlanner({
      source: fromLoc,
      destination: toLoc,
      startDate: date,
      travellers: Number(guests),
      tripType: type
    });
    if (!isLoggedIn) {
      navigate('/login?redirect=/plan-trip');
      return;
    }
    // Go directly to plan-trip with these values preset
    navigate('/plan-trip');
  };

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-forest">
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-ivory">
        {/* Subtle warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-brand-ivory to-brand-soft-orange"></div>

        {/* Absolute Background Image representing Indian Landscapes */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: `url(${varanasiGangesBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory/75 via-brand-ivory/15 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cream/30 via-transparent to-brand-soft-orange/15"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Smart Travel Aggregator</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-forest tracking-tight leading-tight"
            >
              Your Journey.<br />
              <span className="text-brand-orange">One Smart Plan.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-muted text-base sm:text-lg max-w-xl font-medium"
            >
              From transport and stays to local experiences and sacred journeys — plan, compare, and book your complete trip in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 text-brand-muted text-xs sm:text-sm font-semibold"
            >
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-orange" /> Plan Less. Travel More.</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-orange" /> Unified Bookings</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-brand-orange" /> Senior Citizen Aids</span>
            </motion.div>
          </div>

          {/* Hero Right: Interactive Planner Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 bg-white border border-brand-border p-6 sm:p-8 rounded-3xl shadow-premium flex flex-col gap-6 text-left"
          >
            <div>
              <h3 className="font-extrabold text-xl sm:text-2xl text-brand-forest">Start Your Smart Plan</h3>
              <p className="text-sm text-brand-muted mt-1">Select your preferences to generate a custom itinerary.</p>
            </div>

            <form onSubmit={handleHeroSubmit} className="flex flex-col gap-4">
              
              {/* Trip Type Selector */}
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-brand-cream border border-brand-border">
                {['Regular Trip', 'Short Trip', 'Tirth Yatra'].map((tType) => (
                  <button
                    key={tType}
                    type="button"
                    onClick={() => setType(tType)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      type === tType
                        ? 'bg-brand-orange text-white shadow-sm'
                        : 'text-brand-forest/70 hover:text-brand-orange hover:bg-white'
                    }`}
                  >
                    {tType}
                  </button>
                ))}
              </div>

              {/* Source & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-brand-muted uppercase tracking-wide flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" /> From
                  </label>
                  <select
                    value={fromLoc}
                    onChange={(e) => setFromLoc(e.target.value)}
                    className="p-3 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-ivory text-sm text-brand-forest font-semibold"
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Dehradun">Dehradun</option>
                    <option value="Rishikesh">Rishikesh</option>
                    <option value="Varanasi">Varanasi</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-brand-muted uppercase tracking-wide flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" /> To Destination
                  </label>
                  <select
                    value={toLoc}
                    onChange={(e) => setToLoc(e.target.value)}
                    className="p-3 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-ivory text-sm text-brand-forest font-semibold"
                  >
                    <option value="Dehradun">Dehradun (Doon)</option>
                    <option value="Jaipur">Jaipur (Pink City)</option>
                    <option value="Rishikesh">Rishikesh (Ganges)</option>
                    <option value="Agra">Agra (Taj)</option>
                    <option value="Amritsar">Amritsar (Golden Temple)</option>
                    <option value="Varanasi">Varanasi (Eternal Kashi)</option>
                    <option value="Udaipur">Udaipur (Lakes)</option>
                  </select>
                </div>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-brand-muted uppercase tracking-wide flex items-center gap-1">
                    <CalIcon className="w-3.5 h-3.5 text-brand-orange" /> Departure Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="p-3 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-ivory text-sm text-brand-forest font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-brand-muted uppercase tracking-wide flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-orange" /> Travellers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="p-3 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-orange bg-brand-ivory text-sm text-brand-forest font-semibold"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="mt-2 w-full p-4 rounded-xl bg-brand-orange hover:bg-brand-secondary text-white font-bold text-base tracking-wide shadow-md shadow-brand-orange/15 flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <span>Plan My Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          </motion.div>

        </div>
      </section>

      {/* Popular Destinations Slider */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest">Popular Indian Destinations</h2>
            <p className="text-brand-forest/65 mt-2">Explore top hubs with custom smart routing guides built for comfort.</p>
          </div>
          <Link 
            to="/local" 
            className="flex items-center gap-1.5 text-brand-teal hover:text-brand-orange font-bold text-sm transition-colors cursor-pointer"
          >
            <span>Explore All Places</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal scroll cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.slice(0, 8).map((dest) => (
            <Link 
              to={`/plan-trip?dest=${dest.id}`} 
              key={dest.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-brand-teal/5 shadow-premium hover:shadow-premium-hover transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <SafeImage
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">{dest.state}</span>
                  <h3 className="text-lg font-bold text-white leading-tight">{dest.name}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-brand-forest/80 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-brand-gold">
                  ★ {dest.rating}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between gap-3 text-sm">
                <p className="text-brand-forest/70 line-clamp-2">{dest.description}</p>
                <div className="flex flex-wrap gap-1">
                  {dest.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] bg-brand-mint text-brand-teal px-2 py-0.5 rounded font-semibold uppercase">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Short Trips Section */}
      <section className="bg-brand-cream text-brand-forest py-20 px-4 sm:px-6 lg:px-8 border-y border-brand-border">
        <div className="max-w-7xl mx-auto text-left">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Escape. Explore. Return.</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Short Weekend Trips</h2>
              <p className="text-brand-muted mt-2">Perfect local quick tourism packages mapped out dynamically.</p>
            </div>
            <Link 
              to="/short-trips" 
              className="flex items-center gap-1.5 text-brand-secondary hover:text-brand-orange font-bold text-sm transition-colors cursor-pointer"
            >
              <span>View Short Trips</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shortTrips.slice(0, 3).map((st) => (
              <div key={st.id} className="rounded-2xl overflow-hidden bg-white border border-brand-border flex flex-col shadow-premium hover:shadow-premium-hover transition-all duration-300">
                <div className="h-44 relative">
                  <SafeImage src={st.image} alt={st.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    {st.duration}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4 text-sm">
                  <div>
                    <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-wider">{st.category}</span>
                    <h3 className="text-lg font-bold text-brand-forest mt-1">{st.title}</h3>
                    <p className="text-brand-muted mt-2 text-xs line-clamp-2">{st.bestFor}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-brand-border pt-4">
                    <div>
                      <span className="text-xs text-brand-muted">Est. Cost</span>
                      <p className="text-base font-bold text-brand-forest">₹{st.price}/person</p>
                    </div>
                    <Link 
                      to={`/plan-trip?dest=${st.to}`} 
                      className="px-4 py-2 bg-brand-orange text-white rounded-lg font-bold text-xs hover:bg-brand-secondary transition-colors cursor-pointer"
                    >
                      Plan This Trip
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Tirth Yatra Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Travel with Faith. Plan with Ease.</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Tirth Yatra Pathways</h2>
            <p className="text-brand-forest/65 mt-2">Structured spiritual travel packages optimized with premium accessibility, medical aid, and wheelchair care.</p>
          </div>
          <Link 
            to="/tirth-yatra" 
            className="flex items-center gap-1.5 text-brand-teal hover:text-brand-orange font-bold text-sm transition-colors cursor-pointer"
          >
            <span>Explore Pilgrimages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tirthYatraPackages.slice(0, 2).map((pkg) => (
            <div key={pkg.id} className="rounded-3xl p-6 sm:p-8 bg-white border border-brand-teal/5 shadow-premium flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-44 h-48 md:h-full rounded-2xl overflow-hidden flex-shrink-0">
                <SafeImage src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between gap-4 text-sm">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-brand-teal font-extrabold uppercase bg-brand-mint px-2 py-0.5 rounded border border-brand-teal/5">
                      {pkg.category}
                    </span>
                    <span className="text-xs text-brand-green font-bold flex items-center gap-1">
                      🛡️ Senior-Friendly
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-forest mt-2">{pkg.title}</h3>
                  <p className="text-brand-forest/65 mt-1 text-xs">{pkg.description}</p>
                  
                  {/* Highlights list */}
                  <div className="mt-3 space-y-1 text-xs">
                    <p className="font-bold text-brand-forest/80">Elder Safety Perks:</p>
                    {pkg.seniorFriendlyFeatures.slice(0, 2).map((f, index) => (
                      <p key={index} className="text-brand-teal/90 flex items-start gap-1">
                        ✓ {f}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-brand-teal/10 pt-4 mt-2">
                  <div>
                    <span className="text-xs text-brand-forest/50">Yatra Cost</span>
                    <p className="text-lg font-extrabold text-brand-teal">₹{pkg.price}/person</p>
                  </div>
                  <Link 
                    to="/tirth-yatra" 
                    className="px-5 py-2.5 bg-brand-orange text-white rounded-xl font-bold text-xs hover:bg-brand-teal transition-all cursor-pointer shadow-sm shadow-brand-orange/10"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How JanYatri Works */}
      <section className="bg-brand-mint/50 py-20 px-4 sm:px-6 lg:px-8 border-y border-brand-teal/5">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Simplifying Logistics</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1 mb-12">How JanYatri Works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Tell us your journey", desc: "Share your origin, final destination, budget scope, dates, and health/access preferences." },
              { step: "02", title: "We compare travel options", desc: "Our engine scans and ranks trains, buses, and cobs by comfort, price, punctuality, and carbon footprint." },
              { step: "03", title: "We build your smart itinerary", desc: "Receive a day-by-day customized schedule incorporating meals, stays, rides, and landmarks." },
              { step: "04", title: "Book and travel", desc: "Checkout cleanly in one billing with digital passes, Passenger ID access, and SOS security active." }
            ].map((item, idx) => (
              <div key={idx} className="relative p-6 bg-white rounded-2xl border border-brand-teal/5 shadow-sm text-left flex flex-col gap-3 group hover:border-brand-teal/20 transition-all">
                <span className="text-4xl font-extrabold text-brand-orange/20 group-hover:text-brand-orange transition-colors">{item.step}</span>
                <h3 className="font-extrabold text-lg text-brand-forest">{item.title}</h3>
                <p className="text-sm text-brand-forest/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Designed for Everyone</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1 mb-12">Choose Your Trip Tier</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Affordable",
              priceDesc: "From ₹375/day per person",
              desc: "For practical, budget-conscious journeys.",
              perks: [
                "State buses / sleeper trains",
                "Clean dharamshalas and homestays",
                "Digital Passenger ID check-in",
                "Basic local transit recommendations"
              ],
              cta: "Plan Affordable Trip"
            },
            {
              name: "Moderate",
              priceDesc: "From ₹650/day per person",
              desc: "A balanced choice for comfort and value.",
              perks: [
                "Superfast trains / AC sleeper coaches",
                "Standard guest houses and budget hotels",
                "Shared local cabs and autos",
                "Guided heritage walk",
                "Emergency medical helpline access"
              ],
              cta: "Plan Moderate Trip",
              highlighted: true
            },
            {
              name: "Premium",
              priceDesc: "From ₹1,180/day per person",
              desc: "Extra comfort with a dedicated local cab and guide.",
              perks: [
                "AC 2-tier train / private taxi",
                "Verified comfortable 3-star stays",
                "Dedicated local cab service",
                "Priority darshan and personal guide"
              ],
              cta: "Plan Premium Trip"
            }
          ].map((tier, index) => (
            <div 
              key={index}
              className={`rounded-3xl p-8 flex flex-col justify-between text-left gap-6 border transition-all duration-300 ${
                tier.highlighted 
                  ? 'bg-brand-forest text-brand-ivory border-brand-orange shadow-xl scale-105' 
                  : 'bg-white text-brand-forest border-brand-border shadow-premium'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${tier.highlighted ? 'bg-brand-orange text-white' : 'bg-brand-soft-orange text-brand-secondary'}`}>
                  {tier.name === 'Moderate' ? 'Most Popular' : tier.name}
                </span>
                <h3 className="text-2xl font-black mt-3">{tier.name}</h3>
                <p className={`text-xs mt-1 ${tier.highlighted ? 'text-brand-ivory/60' : 'text-brand-forest/60'}`}>{tier.priceDesc}</p>
                <div className={`h-px my-4 ${tier.highlighted ? 'bg-white/10' : 'bg-brand-border'}`}></div>
                <p className={`text-sm leading-relaxed ${tier.highlighted ? 'text-brand-ivory/80' : 'text-brand-forest/75'}`}>{tier.desc}</p>
                
                <ul className="mt-6 flex flex-col gap-3 text-sm">
                  {tier.perks.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-orange text-base">✓</span>
                      <span className={tier.highlighted ? 'text-brand-ivory/90' : 'text-brand-forest/90'}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/plan-trip"
                className={`mt-4 w-full py-3 rounded-xl font-bold text-center text-sm shadow-sm transition-all ${
                  tier.highlighted 
                    ? 'bg-brand-orange hover:bg-brand-secondary text-white' 
                    : 'bg-brand-secondary hover:bg-brand-forest text-white'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Features Grid */}
      <section className="bg-brand-soft-orange/40 text-brand-forest py-20 px-4 sm:px-6 lg:px-8 border-t border-brand-border">
        <div className="max-w-7xl mx-auto text-left">
          <div className="mb-12">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Built-in Intelligence</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Smart Aggregator Features</h2>
            <p className="text-brand-muted mt-2">Custom tools designed to guarantee safety, convenience, and value.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Cpu, title: "Passenger ID pass", desc: "Digital transit passport linking booking records, accessibility preferences, and health profiles for fast validation." },
              { icon: Compass, title: "Smart Multi-routing", desc: "Algorithms checking train connections, buses, and local cabs for cost-optimized and emissions-low travel." },
              { icon: TrendingUp, title: "Cashback & Offers", desc: "Dynamic coupons, UPI payouts, and special bank rates integrated directly into your checkout ledger." },
              { icon: ShieldAlert, title: "Active SOS Network", desc: "One-click emergency warning system dispatching geolocation alerts to pre-configured contacts and regional support." },
              { icon: MapPin, title: "Live Ride Tracking", desc: "Real-time updates of bus arrival times, train delays, and driver geolocations shared directly with family members." },
              { icon: Leaf, title: "Sustainable Tourism", desc: "Promotes eco-friendly trains and offsets carbon metrics by promoting local craft cooperatives and zero-emission transit." }
            ].map((f, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-brand-border hover:border-brand-orange/30 transition-all flex flex-col gap-3 shadow-premium hover:shadow-premium-hover">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 flex items-center justify-center text-brand-orange">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg text-brand-forest">{f.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="bg-brand-mint/30 py-20 px-4 sm:px-6 lg:px-8 border-y border-brand-teal/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div>
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Travel Responsibly</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Eco-Conscious Tourism</h2>
            <p className="text-brand-forest/75 mt-4 leading-relaxed">
              JanYatri is dedicated to protecting India's cultural heritage and natural landscapes. Our platform integrates smart choices to let you travel cleanly and support native economies:
            </p>
            
            <div className="mt-8 space-y-4">
              {[
                { title: "Digital Documentation First", desc: "Zero paperwork. Passenger IDs and tickets render cleanly as shareable QR codes." },
                { title: "Carbon Offset Metrics", desc: "Compare CO₂ emissions for trains vs private cabs to choose the greenest transport option." },
                { title: "Empowering Local Communities", desc: "Local Experiences showcase native food stalls and artisan bazaars, sending income straight to local creators." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-brand-teal text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-brand-forest text-sm">{item.title}</h4>
                    <p className="text-xs text-brand-forest/65 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-brand-teal/10 shadow-premium h-80 lg:h-96">
            <SafeImage
              src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
              alt="Nature Sustainability Bridge"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/80 via-brand-forest/20 to-transparent flex items-end p-6">
              <p className="text-white text-sm font-semibold flex items-center gap-2">
                <Leaf className="w-5 h-5 text-brand-gold animate-bounce" />
                Plan sustainable journeys that keep India pristine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-brand-orange to-brand-gold text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Your Next Journey Starts Here</h2>
          <p className="text-white/80 text-base max-w-lg">
            Say goodbye to coordinating 10 different tabs. Generate your unified, smart itinerary with JanYatri in under 2 minutes.
          </p>
          <Link
            to="/plan-trip"
            className="px-8 py-4 rounded-2xl bg-brand-forest text-white font-extrabold text-base tracking-wide hover:bg-brand-forest/90 transition-all flex items-center gap-2 shadow-lg shadow-black/10 cursor-pointer"
          >
            <span>Plan My Smart Journey →</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
