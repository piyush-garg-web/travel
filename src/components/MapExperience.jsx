import React from 'react';
import { MapPin, Bus, Train, Navigation, Info } from 'lucide-react';

export const MapExperience = ({ from = "Delhi", to = "Dehradun", points = [], activeDay = 1 }) => {
  // Let's draw a beautiful visual canvas that imitates a high-end mapping dashboard
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-brand-teal/15 bg-brand-forest shadow-premium group">
      
      {/* Abstract Grid Map Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0F766E_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Decorative Mountains / Map contour lines representation */}
      <svg className="absolute inset-0 w-full h-full text-brand-teal/5 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M-10,90 Q15,40 40,70 T90,30 T110,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M-10,75 Q20,30 50,65 T100,20 T110,40" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </svg>

      {/* Map Heading Layer */}
      <div className="absolute top-4 left-4 z-10 bg-brand-forest/90 backdrop-blur-md px-3 py-2 rounded-xl border border-brand-teal/20 text-xs flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 font-bold text-brand-gold">
          <Navigation className="w-3.5 h-3.5 animate-pulse" />
          <span>Interactive Route Preview</span>
        </div>
        <span className="text-[10px] text-brand-ivory/60">
          {from} → {to} (via Haridwar Highway)
        </span>
      </div>

      {/* Senior Safety/Service Banner */}
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#FFFDF8]/95 backdrop-blur-md p-2.5 rounded-xl border border-brand-orange/20 text-[10px] sm:text-xs text-brand-forest flex items-center justify-between shadow-md">
        <div className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
          </span>
          <span className="font-semibold">Smart Tracking Active:</span>
          <span className="text-brand-forest/70">Safe-transit zones, rest stops, & emergency clinics mapped.</span>
        </div>
        <div className="flex gap-1.5">
          <span className="bg-brand-mint text-brand-teal px-1.5 py-0.5 rounded font-bold text-[9px] uppercase border border-brand-teal/10">SOS Ready</span>
        </div>
      </div>

      {/* SVG Canvas drawing routes */}
      <svg className="w-full h-full px-12 py-16" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
        {/* Animated route path line (Sunset Orange gradient) */}
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#F4B942" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>
        </defs>

        {/* Route Line */}
        <path
          d="M 80,210 Q 250,70 320,130 T 520,70"
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-route-solid"
        />

        {/* Dash overlay to show motion */}
        <path
          d="M 80,210 Q 250,70 320,130 T 520,70"
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-route opacity-85"
        />

        {/* Waypoints / Stops */}
        
        {/* Point 1: Source Delhi */}
        <g transform="translate(80, 210)" className="cursor-pointer">
          <circle r="14" fill="#102A2A" stroke="#0F766E" strokeWidth="2" />
          <circle r="5" fill="#FF6B35" />
          <text y="30" textAnchor="middle" fill="#FFFDF8" className="text-[11px] font-bold font-sans">
            {from} (Origin)
          </text>
        </g>

        {/* Point 2: Transit Rest Stop (Meerut/Haridwar Bypass) */}
        <g transform="translate(265, 105)" className="cursor-pointer">
          <circle r="10" fill="#102A2A" stroke="#F4B942" strokeWidth="2" />
          <circle r="4" fill="#F4B942" />
          <text y="-18" textAnchor="middle" fill="#F4B942" className="text-[9px] font-bold">
            Rest Stop: Pure Veg Food court
          </text>
        </g>

        {/* Point 3: Hotel location */}
        <g transform="translate(370, 120)" className="cursor-pointer">
          <circle r="11" fill="#102A2A" stroke="#0F766E" strokeWidth="2" />
          <path d="M-5,-5 L5,-5 L5,5 L-5,5 Z" fill="#0F766E" />
          <text y="24" textAnchor="middle" fill="#FFFDF8" className="text-[9px] font-semibold">
            Stay: Valley Resort
          </text>
        </g>

        {/* Point 4: Destination Dehradun */}
        <g transform="translate(520, 70)" className="cursor-pointer">
          <circle r="14" fill="#102A2A" stroke="#FF6B35" strokeWidth="2" className="animate-pulse" />
          <circle r="5" fill="#0F766E" />
          <text y="-20" textAnchor="middle" fill="#FFFDF8" className="text-[11px] font-bold font-sans">
            {to} (Destination)
          </text>
        </g>

        {/* Connecting dotted lines for side-trips/attractions */}
        <line x1="520" y1="70" x2="480" y2="40" stroke="#F4B942" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1="520" y1="70" x2="560" y2="120" stroke="#F4B942" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Attraction 1 */}
        <g transform="translate(480, 40)">
          <circle r="5" fill="#F4B942" />
          <text x="8" y="3" fill="#F4B942" className="text-[8px] font-bold">
            Robber's Cave
          </text>
        </g>

        {/* Attraction 2 */}
        <g transform="translate(560, 120)">
          <circle r="5" fill="#F4B942" />
          <text x="-48" y="14" fill="#F4B942" className="text-[8px] font-bold">
            Tapkeshwar
          </text>
        </g>
      </svg>
      
      {/* Future API Hook Badge */}
      <div className="absolute top-4 right-4 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
        <span className="flex items-center gap-1 bg-[#FFFDF8]/20 backdrop-blur-md text-[#FFFDF8] text-[9px] font-bold px-2 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          Google Maps Ready
        </span>
      </div>

    </div>
  );
};
