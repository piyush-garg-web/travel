import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white text-brand-forest/80 pt-16 pb-24 lg:pb-12 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link to="/explore" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-orange to-brand-gold flex items-center justify-center text-white font-bold">
                J
              </div>
              <span className="font-sans font-extrabold text-lg text-brand-forest">
                Jan<span className="text-brand-orange">Yatri</span>
              </span>
            </Link>
            <p className="text-sm text-brand-muted max-w-sm">
              Your Journey. Planned Smarter. Combine transport, stays, local experiences, and Tirth Yatra planning into a unified, stress-free travel solution.
            </p>
            <div className="flex items-center gap-3 mt-2 text-brand-muted">
              <a href="#" className="p-2 rounded-lg bg-brand-cream hover:bg-brand-orange hover:text-white transition-all" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-brand-cream hover:bg-brand-orange hover:text-white transition-all" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-brand-cream hover:bg-brand-orange hover:text-white transition-all" aria-label="Instagram">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Columns */}
          <div>
            <h4 className="font-semibold text-brand-forest text-sm mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link to="/local" className="text-brand-muted hover:text-brand-orange transition-colors">Local Discovery</Link></li>
              <li><Link to="/short-trips" className="text-brand-muted hover:text-brand-orange transition-colors">Short Trips</Link></li>
              <li><Link to="/tirth-yatra" className="text-brand-muted hover:text-brand-orange transition-colors">Tirth Yatra</Link></li>
              <li><Link to="/stays" className="text-brand-muted hover:text-brand-orange transition-colors">Premium Stays</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-forest text-sm mb-4 uppercase tracking-wider">Plan & Book</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link to="/plan-trip" className="text-brand-muted hover:text-brand-orange transition-colors">Trip Planner</Link></li>
              <li><Link to="/my-trips" className="text-brand-muted hover:text-brand-orange transition-colors">My Bookings</Link></li>
              <li><Link to="/offers" className="text-brand-muted hover:text-brand-orange transition-colors">Promos & Offers</Link></li>
              <li><Link to="/passenger-id" className="text-brand-muted hover:text-brand-orange transition-colors">Passenger ID</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-forest text-sm mb-4 uppercase tracking-wider">Support & Safety</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link to="/safety" className="text-brand-muted hover:text-brand-orange transition-colors">Safety (SOS)</Link></li>
              <li><a href="#" className="text-brand-muted hover:text-brand-orange transition-colors">Help Center</a></li>
              <li><a href="#" className="text-brand-muted hover:text-brand-orange transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-brand-muted hover:text-brand-orange transition-colors">Terms of Use</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-brand-border my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© {new Date().getFullYear()} JanYatri Tech Pvt Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for smarter journeys across India with <Heart className="w-3.5 h-3.5 text-brand-orange fill-brand-orange" />
          </p>
        </div>

      </div>
    </footer>
  );
};
