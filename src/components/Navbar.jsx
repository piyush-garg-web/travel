import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { 
  Compass, 
  MapPin, 
  Milestone, 
  Heart, 
  Compass as StayIcon, 
  Search, 
  Bookmark, 
  Briefcase, 
  User, 
  Menu, 
  X,
  AlertTriangle,
  Home,
  Map,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const Navbar = () => {
  const { savedStays, savedExperiences, triggerSOS, sosActive, cancelSOS } = useTravel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const savedCount = savedStays.length + savedExperiences.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?q=${encodeURIComponent(searchQuery)}`);
      setGlobalSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navItems = [
    { name: 'Explore', path: '/', icon: Compass },
    { name: 'Plan Trip', path: '/plan-trip', icon: Calendar },
    { name: 'Short Trips', path: '/short-trips', icon: Milestone },
    { name: 'Tirth Yatra', path: '/tirth-yatra', icon: MapPin },
    { name: 'Stays', path: '/stays', icon: StayIcon },
    { name: 'Local Discovery', path: '/local', icon: Map },
  ];

  return (
    <>
      {/* Top Navbar for Desktop */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300 glass-effect border-b border-brand-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-orange to-brand-gold flex items-center justify-center shadow-md shadow-brand-orange/20 overflow-hidden transform group-hover:scale-105 transition-all">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-xl tracking-tight leading-none flex items-center">
                <span className="text-brand-orange">Ez</span>
                <span className="text-brand-teal">Yatra</span>
              </span>
              <span className="text-[9px] font-sans tracking-widest uppercase font-semibold text-brand-forest/65">
                Smart India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all flex items-center gap-1.5
                  ${isActive 
                    ? 'bg-brand-teal/8 text-brand-teal' 
                    : 'text-brand-forest/75 hover:bg-brand-mint hover:text-brand-teal'}
                `}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* SOS Emergency button */}
            <button
              onClick={sosActive ? cancelSOS : triggerSOS}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border transition-all duration-300 cursor-pointer shadow-sm
                ${sosActive 
                  ? 'bg-red-600 text-white border-red-600 animate-pulse hover:bg-red-700' 
                  : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'}`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{sosActive ? "SOS ACTIVE" : "SOS"}</span>
            </button>

            {/* Search Toggle */}
            <button 
              onClick={() => setGlobalSearchOpen(!globalSearchOpen)}
              className="p-2.5 rounded-xl hover:bg-brand-mint text-brand-forest/80 hover:text-brand-teal transition-all cursor-pointer"
              title="Search travel"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved Wishlist Icon */}
            <Link 
              to="/profile" 
              className="p-2.5 rounded-xl hover:bg-brand-mint text-brand-forest/80 hover:text-brand-teal relative transition-all hidden sm:block"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* My Trips */}
            <Link 
              to="/my-trips" 
              className="p-2.5 rounded-xl hover:bg-brand-mint text-brand-forest/80 hover:text-brand-teal transition-all hidden md:flex items-center gap-1.5 font-semibold text-sm"
            >
              <Briefcase className="w-5 h-5" />
              <span className="hidden lg:inline">My Trips</span>
            </Link>

            {/* Profile */}
            <Link 
              to="/profile" 
              className="p-2.5 rounded-xl hover:bg-brand-mint text-brand-forest/80 hover:text-brand-teal transition-all flex items-center gap-1.5 border border-brand-teal/10 bg-brand-teal/5"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold text-sm">Profile</span>
            </Link>

            {/* Desktop / Tablet Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl hover:bg-brand-mint text-brand-forest/85 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Global Search Bar Dropdown */}
        {globalSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-[#FFFDF8] border-b border-brand-teal/15 p-4 shadow-xl z-50">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex gap-2">
              <input
                type="text"
                placeholder="Search destinations (e.g. Dehradun, Rishikesh), hotels, short trips, Yatras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-brand-teal/20 focus:outline-none focus:ring-2 focus:ring-brand-teal bg-[#FFFDF8] text-brand-forest"
                autoFocus
              />
              <button 
                type="submit" 
                className="px-5 py-2.5 rounded-xl bg-brand-teal text-white hover:bg-brand-forest transition-all font-semibold"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Dropdown Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#FFFDF8] border-b border-brand-teal/10 px-4 py-4 flex flex-col gap-1.5 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl hover:bg-brand-mint font-semibold text-brand-forest hover:text-brand-teal flex items-center gap-3"
              >
                <item.icon className="w-5 h-5 text-brand-teal" />
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-brand-teal/10 my-2"></div>
            <Link
              to="/my-trips"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-brand-mint font-semibold text-brand-forest hover:text-brand-teal flex items-center gap-3"
            >
              <Briefcase className="w-5 h-5 text-brand-teal" />
              My Trips
            </Link>
            <Link
              to="/passenger-id"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl hover:bg-brand-mint font-semibold text-brand-forest hover:text-brand-teal flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-brand-teal" />
              Digital Passenger ID
            </Link>
          </div>
        )}
      </header>

      {/* Floating Bottom Nav Bar for Mobile Screens */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-brand-teal/10 py-2.5 px-6 flex items-center justify-between lg:hidden shadow-[0_-5px_15px_-5px_rgba(16,42,42,0.05)]">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-bold ${isActive ? 'text-brand-orange' : 'text-brand-forest/60 hover:text-brand-teal'}`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>
        <NavLink 
          to="/local" 
          className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-bold ${isActive ? 'text-brand-orange' : 'text-brand-forest/60 hover:text-brand-teal'}`}
        >
          <Compass className="w-5 h-5" />
          <span>Explore</span>
        </NavLink>
        <NavLink 
          to="/plan-trip" 
          className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-bold ${isActive ? 'text-brand-orange' : 'text-brand-forest/60 hover:text-brand-teal'}`}
        >
          <div className="w-10 h-10 -mt-5 rounded-full bg-gradient-to-tr from-brand-orange to-brand-gold flex items-center justify-center text-white shadow-md shadow-brand-orange/30">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="mt-0.5">Plan</span>
        </NavLink>
        <NavLink 
          to="/my-trips" 
          className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-bold ${isActive ? 'text-brand-orange' : 'text-brand-forest/60 hover:text-brand-teal'}`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Trips</span>
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-bold ${isActive ? 'text-brand-orange' : 'text-brand-forest/60 hover:text-brand-teal'}`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
};
