import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Users, 
  Compass, 
  ShieldAlert, 
  Award, 
  CheckCircle, 
  TrendingUp, 
  Cpu, 
  Leaf, 
  Heart, 
  Navigation, 
  ShieldCheck, 
  Lock, 
  Star,
  Activity,
  Layers,
  ChevronRight,
  Eye,
  Info,
  Share2,
  HelpCircle
} from 'lucide-react';

export const MarketingLandingPage = () => {
  const navigate = useNavigate();

  // Mock states for the search planner mockup
  const [fromLoc, setFromLoc] = useState('Delhi');
  const [toLoc, setToLoc] = useState('Varanasi');
  const [date, setDate] = useState('2026-09-22');
  const [guests, setGuests] = useState(2);
  const [budget, setBudget] = useState('Moderate');

  // Sidebar destinations mimicking the reference image
  const [activeDestIndex, setActiveDestIndex] = useState(2); // Varanasi is active
  const sideDests = [
    { name: "Manali", state: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=150&q=80" },
    { name: "Jaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1477584322902-471a53b9d13d?auto=format&fit=crop&w=150&q=80" },
    { name: "Varanasi", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=150&q=80" },
    { name: "Goa", state: "Goa Coast", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80" }
  ];

  // Features list (12 features)
  const features = [
    {
      icon: Cpu,
      title: "Smart Trip Planning",
      desc: "Compare travel options based on cost, time, and convenience."
    },
    {
      icon: ShieldCheck,
      title: "Passenger ID",
      desc: "Digital passenger identity for easier repeat bookings and secure travel."
    },
    {
      icon: Navigation,
      title: "Short Trips",
      desc: "2–4 hour local travel experiences within approximately 50 km."
    },
    {
      icon: Heart,
      title: "Tirth Yatra",
      desc: "Dedicated religious/pilgrimage travel planning with senior-friendly assistance."
    },
    {
      icon: Layers,
      title: "3 Travel Plans",
      desc: "Affordable, Moderate, and Premium plans suited for every travel style."
    },
    {
      icon: TrendingUp,
      title: "Smart Incentives",
      desc: "Subscriptions, cashback rewards, and special bank/UPI payment offers."
    },
    {
      icon: Star,
      title: "Cost Transparency",
      desc: "Clear itemized pricing with zero hidden charges or booking fees."
    },
    {
      icon: MapPin,
      title: "Stay Options",
      desc: "Accommodation choices integrated directly into your route planning."
    },
    {
      icon: Compass,
      title: "Customize Trip",
      desc: "Personalized journey planning matching your specific pace and interest."
    },
    {
      icon: ShieldAlert,
      title: "Safety First",
      desc: "Active SOS alerts, local agency notifications, and live family sharing."
    },
    {
      icon: Info,
      title: "Local Tourism",
      desc: "Discover local culture, heritage guides, and free/unpaid attractions."
    },
    {
      icon: Activity,
      title: "Smart Navigation",
      desc: "Intelligent routing, live transit connections, and delay alerts."
    }
  ];

  // How it works steps (5 steps)
  const steps = [
    {
      step: "01",
      title: "Enter Your Journey",
      desc: "Input your source and destination to generate optimized paths."
    },
    {
      step: "02",
      title: "Collect Options",
      desc: "We aggregate bus, train, cab, and other local transit modes."
    },
    {
      step: "03",
      title: "Compare Seamlessly",
      desc: "Weigh options based on time, comfort, cost, and safety."
    },
    {
      step: "04",
      title: "Get Recommendation",
      desc: "Our AI engine suggests the best travel option for your specific requirements."
    },
    {
      step: "05",
      title: "Complete Your Journey",
      desc: "Access unified boarding passes and booking details instantly."
    }
  ];

  // Pricing tiers (3 tiers)
  const plans = [
    {
      name: "AFFORDABLE",
      tag: "Budget Explorer",
      desc: "Smart travel for budget-conscious explorers.",
      price: "₹1,200/day per person",
      perks: [
        "AC Express Trains & Sleeper Buses",
        "Clean, highly-reviewed budget lodges",
        "Digital Passenger ID check-in",
        "Standard local transit recommendations"
      ]
    },
    {
      name: "MODERATE",
      tag: "Comfort Seeker",
      desc: "Balanced comfort, convenience and value.",
      price: "₹2,800/day per person",
      perks: [
        "AC Volvo / Express Train bookings",
        "3-Star boutique hotels & homestays",
        "Dedicated local cab/auto splits",
        "Emergency medical assistance support"
      ],
      highlighted: true
    },
    {
      name: "PREMIUM",
      tag: "Luxury Travel",
      desc: "Elevated travel with enhanced comfort and experiences.",
      price: "₹6,500/day per person",
      perks: [
        "Flight/SUV transit connections",
        "4-Star & 5-Star luxury heritage stays",
        "Private chauffeur-driven vehicles",
        "Priority VIP Darshan & guided cultural escorts"
      ]
    }
  ];

  // Navigation scroll helper
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070505] text-brand-forest antialiased overflow-x-hidden selection:bg-brand-orange selection:text-white font-sans">
      
      {/* 1. NAVBAR (Transparent glass container) */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          
          {/* Left: Brand Logo & Tagline */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg shadow-black/30 overflow-hidden transform group-hover:scale-105 transition-all bg-gradient-to-tr from-brand-orange to-brand-gold">
              <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-2xl tracking-tight leading-none text-white">
                Jan<span className="text-brand-gold">Yatri</span>
              </span>
              <span className="text-[8px] tracking-widest uppercase font-semibold text-brand-gold mt-0.5">
                Smart India
              </span>
            </div>
          </div>

          {/* Center: Glass Pill Navbar Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md shadow-lg shadow-black/10">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 hover:text-brand-gold transition-colors cursor-pointer">Explore</button>
            <button onClick={() => handleScroll('about')} className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 hover:text-brand-gold transition-colors cursor-pointer">Plan Your Journey</button>
            <button onClick={() => handleScroll('features')} className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 hover:text-brand-gold transition-colors cursor-pointer">Short Trips</button>
            <button onClick={() => handleScroll('features')} className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 hover:text-brand-gold transition-colors cursor-pointer">Tirth Yatra</button>
            <button onClick={() => handleScroll('plans')} className="px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 hover:text-brand-gold transition-colors cursor-pointer">My Trips</button>
          </nav>

          {/* Right: Register / Sign In Button */}
          <div>
            <Link 
              to="/login"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md"
            >
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span>Register / Sign In</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        
        {/* Full-screen atmospheric background Varanasi sunrise image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=1920&q=80" 
            alt="Cinematic Varanasi Ganges Heritage" 
            className="w-full h-full object-cover object-center scale-105 brightness-[0.4] saturate-[0.8] contrast-[1.05]"
          />
          {/* Rich saffron-gold glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070505] via-[#070505]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#070505]/70 via-transparent to-[#070505]"></div>
          {/* Warm ambient orange light */}
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-orange/5 blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-teal/5 blur-[150px] pointer-events-none"></div>
        </div>

        {/* Hero Content (Main Grid) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
          
          {/* Hero Left: Heading, Badge, Subtitle & Interactive Glass Planner Card */}
          <div className="lg:col-span-8 flex flex-col items-start text-left gap-6">
            
            {/* Glow Saffron Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-gold text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping"></span>
              <span>✨ AI-Powered Travel</span>
            </div>

            {/* Title */}
            <h1 className="font-sans text-5xl sm:text-6xl lg:text-[70px] font-black text-white tracking-tight leading-[1.05]">
              Your Journey,<br />
              <span className="text-white">Planned Smarter.</span>
            </h1>

            {/* Subtext */}
            <p className="text-white/70 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
              JanYatri uses AI to compare travel options, transparent costs, comfort levels, and custom itineraries for your perfect trip.
            </p>

            {/* Horizontal Glass Search Planner Card (matches reference image) */}
            <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-wrap lg:flex-nowrap items-end gap-3 shadow-2xl relative mt-4">
              
              {/* Field 1: From */}
              <div className="flex-1 min-w-[130px] flex flex-col gap-1.5 text-left">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-orange" /> Source
                </span>
                <select
                  value={fromLoc}
                  onChange={(e) => setFromLoc(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent text-sm text-white font-bold border-none focus:ring-0 focus:outline-none"
                >
                  <option className="bg-[#140E0C] text-white" value="Delhi">Delhi</option>
                  <option className="bg-[#140E0C] text-white" value="Jaipur">Jaipur</option>
                  <option className="bg-[#140E0C] text-white" value="Dehradun">Dehradun</option>
                </select>
              </div>

              {/* Line divider */}
              <div className="hidden lg:block w-px h-8 bg-white/10"></div>

              {/* Field 2: To */}
              <div className="flex-1 min-w-[130px] flex flex-col gap-1.5 text-left">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-gold" /> Destination
                </span>
                <select
                  value={toLoc}
                  onChange={(e) => setToLoc(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent text-sm text-white font-bold border-none focus:ring-0 focus:outline-none"
                >
                  <option className="bg-[#140E0C] text-white" value="Varanasi">Varanasi</option>
                  <option className="bg-[#140E0C] text-white" value="Jaipur">Jaipur</option>
                  <option className="bg-[#140E0C] text-white" value="Rishikesh">Rishikesh</option>
                </select>
              </div>

              {/* Line divider */}
              <div className="hidden lg:block w-px h-8 bg-white/10"></div>

              {/* Field 3: Date */}
              <div className="flex-1 min-w-[130px] flex flex-col gap-1.5 text-left">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-orange" /> Date
                </span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-xs text-white font-bold border-none focus:ring-0 focus:outline-none p-0 px-3 py-2 cursor-pointer"
                />
              </div>

              {/* Line divider */}
              <div className="hidden lg:block w-px h-8 bg-white/10"></div>

              {/* Field 4: Pax */}
              <div className="flex-1 min-w-[80px] flex flex-col gap-1.5 text-left">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-1">
                  <Users className="w-3 h-3 text-brand-gold" /> Pax
                </span>
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-sm text-white font-bold border-none focus:ring-0 focus:outline-none p-0 px-3 py-2"
                />
              </div>

              {/* Line divider */}
              <div className="hidden lg:block w-px h-8 bg-white/10"></div>

              {/* Field 5: Budget */}
              <div className="flex-1 min-w-[100px] flex flex-col gap-1.5 text-left">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Budget</span>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent text-sm text-white font-bold border-none focus:ring-0 focus:outline-none"
                >
                  <option className="bg-[#140E0C] text-white" value="Affordable">Affordable</option>
                  <option className="bg-[#140E0C] text-white" value="Moderate">Moderate</option>
                  <option className="bg-[#140E0C] text-white" value="Premium">Premium</option>
                </select>
              </div>

              {/* Button */}
              <div className="w-full lg:w-auto">
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-gold text-white font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all shadow-lg shrink-0"
                >
                  <span>Plan My Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>

          {/* Hero Right: Side-Panel Destination list matching reference image */}
          <div className="lg:col-span-4 w-full flex flex-col items-center lg:items-end justify-center gap-4">
            <div className="flex flex-col gap-4 max-w-[280px] w-full bg-black/10 backdrop-blur-sm p-4 rounded-3xl border border-white/5">
              {sideDests.map((dest, idx) => {
                const isActive = idx === activeDestIndex;
                return (
                  <div 
                    key={dest.name}
                    onClick={() => setActiveDestIndex(idx)}
                    className={`flex items-center gap-4 p-2 rounded-2xl cursor-pointer transition-all ${
                      isActive ? 'bg-white/10 border border-white/20 shadow-lg scale-105' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full overflow-hidden shrink-0 ${isActive ? 'ring-2 ring-brand-orange ring-offset-2 ring-offset-[#140E0C]' : ''}`}>
                      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{dest.name}</h4>
                      <p className="text-[10px] text-white/50">{dest.state}</p>
                    </div>

                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange ml-auto shrink-0 animate-pulse"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Hero Bottom Elements: Tabs and Action buttons */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 mt-12">
          
          {/* Bottom Left Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => handleScroll('about')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs cursor-pointer transition-all">
              <span>🕌 Tirth Yatra Pilgrimages</span>
            </button>
            <button onClick={() => handleScroll('features')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs cursor-pointer transition-all">
              <span>🚌 Short Trips</span>
            </button>
            <button onClick={() => handleScroll('features')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs cursor-pointer transition-all">
              <span>💳 Cost Transparency</span>
            </button>
          </div>

          {/* Bottom Right: Explore Destinations & Share */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll('about')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="p-3 rounded-full bg-brand-orange hover:bg-brand-orange/95 text-white transition-all shadow-md shadow-brand-orange/20 cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </section>

      {/* 3. QUICK VALUE STRIP */}
      <section className="relative z-20 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl">
          {[
            { icon: Compass, title: "One Stop Journey", desc: "Routes, stays & local guides" },
            { icon: Star, title: "Transparent Pricing", desc: "No hidden charges or surprise rates" },
            { icon: Users, title: "Personalized Trips", desc: "Customized for age & health needs" },
            { icon: ShieldCheck, title: "Safe & Smart Travel", desc: "Active SOS protection system" }
          ].map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-gold shrink-0">
                <item.icon className="w-5 h-5 text-brand-orange" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-extrabold text-white">{item.title}</span>
                <span className="text-[11px] text-white/50">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ABOUT JANYATRI */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Unified Travel Infrastructure</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">One platform for the complete journey.</h2>
            </div>
            
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              JanYatri addresses India's fragmented travel ecosystem by blending multiple modes of transport, hospitality, and local experiences into one seamless digital experience. Whether boarding a local express, booking a heritage stay near Varanasi ghats, or booking an electric taxi ride, JanYatri simplifies it.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {[
                { title: "Transport", desc: "Trains, Buses & local cab aggregators" },
                { title: "Stay", desc: "Access-friendly & trusted lodging" },
                { title: "Local Travel", desc: "Electric cabs & micro-transit routes" },
                { title: "Tourist Places", desc: "Unbiased local cultural landmarks" },
                { title: "Trip Planning", desc: "AI-optimized tailored itineraries" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</span>
                    <span className="text-[11px] text-white/40">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual card */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80 sm:h-96">
            <img 
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80" 
              alt="Rajasthan Palace Architecture" 
              className="w-full h-full object-cover object-center brightness-75 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory/95 via-transparent to-transparent flex items-end p-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏛️</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Promoting Cultural Heritage</h4>
                  <p className="text-[11px] text-white/60">Optimized routes connecting the heart of Indian tourism sustainably.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES SECTION */}
      <section id="features" className="bg-white/5 py-24 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-left">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-2">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Built-In Smart Engines</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Unified Concept Showcase</h2>
            <p className="text-white/50 text-sm sm:text-base">JanYatri packages advanced navigation, access aids, and local micro-tourism tools directly into a single, cohesive interface.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, index) => (
              <div key={index} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 p-6 rounded-2xl flex flex-col gap-3.5 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                  <feat.icon className="w-5 h-5 text-brand-orange" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-extrabold text-sm text-white tracking-wide uppercase">{feat.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THREE-TIER TRAVEL PLANS */}
      <section id="plans" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest font-semibold">Flexible Options</span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-1 mb-16">Three-Tier Travel Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((tier, index) => (
            <div 
              key={index}
              className={`rounded-3xl p-8 flex flex-col justify-between text-left gap-6 border transition-all duration-300 relative ${
                tier.highlighted 
                  ? 'bg-brand-mint/40 border-brand-orange/50 shadow-2xl scale-105' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-brand-orange text-white text-[9px] uppercase tracking-widest font-black px-3.5 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                  {tier.name}
                </span>
                <h3 className="text-2xl font-black text-white mt-2 leading-none">{tier.tag}</h3>
                <p className="text-xs text-white/50 mt-1">{tier.price}</p>
                <div className="h-px bg-white/10 my-4"></div>
                <p className="text-xs text-white/70 leading-relaxed font-semibold mb-6">{tier.desc}</p>
                
                <ul className="flex flex-col gap-3 text-xs text-white/80">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-orange text-base leading-none">✓</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/login"
                className={`w-full py-3 rounded-xl font-bold text-center text-xs shadow-sm transition-all cursor-pointer ${
                  tier.highlighted 
                    ? 'bg-brand-orange hover:bg-brand-orange/90 text-white' 
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/5'
                }`}
              >
                Plan {tier.name.charAt(0) + tier.name.slice(1).toLowerCase()} Trip
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HOW JANYATRI WORKS */}
      <section id="how-it-works" className="bg-white/5 py-24 px-4 sm:px-6 lg:px-8 border-y border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Seamless Routing Engine</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 mb-16">How JanYatri Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {steps.map((item, idx) => (
              <div key={idx} className="relative p-6 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl text-left flex flex-col gap-3.5 group transition-all">
                {/* Horizontal line connector for desktop */}
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 right-[-15px] transform -translate-y-1/2 w-[30px] h-[1px] bg-white/10 z-0"></div>
                )}
                
                <span className="text-4xl font-extrabold text-brand-orange/20 group-hover:text-brand-orange transition-colors">{item.step}</span>
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">{item.title}</h3>
                <p className="text-[11px] text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY JANYATRI */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual left column */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80 lg:h-[450px]">
            <img 
              src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80" 
              alt="Himalayan Scenic road" 
              className="w-full h-full object-cover object-center brightness-75 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory/95 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-xs font-bold flex items-center gap-2">
                <Leaf className="w-5 h-5 text-brand-gold animate-bounce shrink-0" />
                <span>Supporting sustainable local tourism cooperatives dynamically.</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest font-semibold">Our Mission Philosophy</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Travel should be simple, transparent and accessible.</h2>
            </div>
            
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              We believe digital transit tools should accommodate all sections of Indian society. From senior citizens seeking accessible temples to students searching for cost-efficient weekend commutes, our portal prioritizes local heritage, micro-operators, and user-centric security.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                { title: "Accessible for all ages", desc: "Designed with aids for students, families, and senior citizens." },
                { title: "Supports local tourism", desc: "Integrates local micro-operators, home-stays, and regional guides." },
                { title: "Promotes cultural heritage", desc: "Optimized route options for pilgrimage and historic destinations." },
                { title: "Fully transparent costs", desc: "Shows precise cost breakdowns across public and private modes." },
                { title: "Digital-first experiences", desc: "Paperless Passenger ID check-ins and live trip notifications." },
                { title: "Eco-friendly guidelines", desc: "Promotes carbon-offset comparisons and local electric transports." }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1">
                  <span className="text-xs font-bold text-brand-gold flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                    {item.title}
                  </span>
                  <p className="text-[11px] text-white/50 leading-relaxed pl-3">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. SAFETY + TRUST SECTION */}
      <section className="bg-white/5 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Guaranteed Safeguards</span>
              <h2 className="text-3xl font-extrabold text-white">Safety & Trust First</h2>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                Traveling shouldn't come with anxiety. JanYatri implements active safety features, trusted payment handshakes, and privacy-conscious passenger identity locks.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: "Secure Passenger ID", desc: "Fully encrypted digital travel profile." },
                { icon: Lock, title: "Privacy First", desc: "We restrict details to verify transit and stay logs only." },
                { icon: Star, title: "Trusted Gateways", desc: "Secure digital payments via official UPI & bank gateways." },
                { icon: ShieldAlert, title: "SOS Alerts", desc: "Instant geolocation alert dispatches with single-click buttons." },
                { icon: Navigation, title: "Live Tracking", desc: "Share live trip checkpoints automatically with pre-cleared contacts." },
                { icon: Star, title: "Data Protection", desc: "Complies with the highest standards of user information protection." }
              ].map((item, index) => (
                <div key={index} className="p-5 bg-black/20 border border-white/5 rounded-2xl flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-center text-brand-gold shrink-0">
                    <item.icon className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</span>
                    <span className="text-[11px] text-white/40 leading-relaxed">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Background cinematic overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1627664819818-e147d6221422?auto=format&fit=crop&w=1920&q=80" 
            alt="Scenic Indian Road" 
            className="w-full h-full object-cover object-center opacity-10 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[#0B0807]/90"></div>
        </div>

        {/* Top-bottom boundary styling */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-gold mb-2">
            <svg className="w-6 h-6 text-brand-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">Ready to plan your next journey?</h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl leading-relaxed">
            Discover a smarter, simpler and more transparent way to travel with JanYatri. Integrate trains, buses, local cabs, and boutique hotels in under two minutes.
          </p>

          <Link
            to="/login"
            className="px-8 py-4 rounded-xl bg-brand-orange hover:bg-brand-orange/95 text-white font-bold text-base tracking-wide shadow-lg shadow-brand-orange/20 flex items-center gap-2 group transition-all mt-4"
          >
            <span>Sign In Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-white/90" />
          </Link>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-white/5 text-white/40 text-xs py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Footer Logo/Brand */}
          <div className="flex items-center gap-2 text-left">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-orange to-brand-gold flex items-center justify-center text-white font-bold text-xs shrink-0">
              J
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-white tracking-tight leading-none">
                JanYatri
              </span>
              <span className="text-[8px] text-white/50 tracking-wider">
                Smart Travel. Simplified.
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 font-semibold text-white/60">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-brand-gold transition-colors cursor-pointer">Home</button>
            <button onClick={() => handleScroll('about')} className="hover:text-brand-gold transition-colors cursor-pointer">About</button>
            <button onClick={() => handleScroll('features')} className="hover:text-brand-gold transition-colors cursor-pointer">Features</button>
            <button onClick={() => handleScroll('how-it-works')} className="hover:text-brand-gold transition-colors cursor-pointer">How It Works</button>
          </div>

          {/* Copy info */}
          <div>
            <p>© {new Date().getFullYear()} JanYatri Tech Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};
