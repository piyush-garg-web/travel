import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Users as UsersIcon, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Settings, 
  Trash2, 
  PlusCircle, 
  Edit3,
  TrendingUp
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { hotels } from '../data/hotels';
import { transportOptions } from '../data/transport';
import { offers } from '../data/offers';
import { mockUsersList } from '../data/users';

export const AdminDashboardPage = () => {
  const { trips, addToast } = useTravel();

  const [activeSec, setActiveSec] = useState('Overview'); // Overview, Destinations, Hotels, Transport, Offers

  // Analytics mock data
  const revenueData = [
    { month: 'Jan', revenue: 42000, bookings: 120 },
    { month: 'Feb', revenue: 58000, bookings: 160 },
    { month: 'Mar', revenue: 72000, bookings: 210 },
    { month: 'Apr', revenue: 95000, bookings: 280 },
    { month: 'May', revenue: 120000, bookings: 350 },
    { month: 'Jun', revenue: 145000, bookings: 430 },
  ];

  const categoryBreakdown = [
    { name: 'Spiritual', bookings: 240, fill: '#0F766E' },
    { name: 'Family', bookings: 190, fill: '#FF6B35' },
    { name: 'Short Trips', bookings: 150, fill: '#F4B942' },
    { name: 'Adventure', bookings: 80, fill: '#102A2A' },
  ];

  const handleDeleteItem = (type, name) => {
    addToast(`[Admin Mode] Deleted ${type} entry: "${name}"`, "info");
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest flex items-center gap-1">
          <Settings className="w-4.5 h-4.5 text-brand-teal" /> JanYatri Administrator
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Admin Dashboard</h1>
        <p className="text-brand-forest/65 mt-2 max-w-xl leading-relaxed">
          Monitor transactional metrics, manage travel inventory schemas, and configure promotion coupon codes.
        </p>
      </div>

      {/* Grid counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-xs text-brand-forest">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-5 border border-brand-teal/5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-mint flex items-center justify-center text-brand-teal shrink-0">
            <UsersIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-brand-forest/40 uppercase font-bold block">Total Users</span>
            <p className="text-lg font-black text-brand-forest mt-0.5">{mockUsersList.length + 140}</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-5 border border-brand-teal/5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-mint flex items-center justify-center text-brand-teal shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-brand-forest/40 uppercase font-bold block">Smart Trips</span>
            <p className="text-lg font-black text-brand-forest mt-0.5">{trips.length + 86}</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-5 border border-brand-teal/5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-mint flex items-center justify-center text-brand-teal shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-brand-forest/40 uppercase font-bold block">Revenue</span>
            <p className="text-lg font-black text-brand-forest mt-0.5">₹5.30 L</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-5 border border-brand-teal/5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-mint flex items-center justify-center text-brand-teal shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-brand-forest/40 uppercase font-bold block">Destinations</span>
            <p className="text-lg font-black text-brand-forest mt-0.5">{destinations.length}</p>
          </div>
        </div>

      </div>

      {/* Main Admin Section tab bar */}
      <div className="bg-white rounded-3xl p-5 border border-brand-teal/5 shadow-premium mb-8 flex flex-wrap gap-2">
        {['Overview', 'Destinations', 'Hotels', 'Transport', 'Offers'].map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveSec(sec)}
            className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeSec === sec
                ? 'bg-brand-teal text-white border-brand-teal'
                : 'bg-brand-mint text-brand-forest border-brand-teal/5 hover:bg-brand-teal hover:text-white'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-3xl border border-brand-teal/5 p-6 sm:p-8 shadow-premium text-xs text-brand-forest">
        
        {/* 1. Overview Analytics */}
        {activeSec === 'Overview' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Line chart revenue */}
              <div className="space-y-4 text-left">
                <h3 className="font-extrabold text-sm text-brand-forest uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-brand-orange" /> Revenue Growth Index (INR)
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" stroke="#102A2A" fontSize={10} tickLine={false} />
                      <YAxis stroke="#102A2A" fontSize={10} tickLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#FF6B35" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar chart bookings */}
              <div className="space-y-4 text-left">
                <h3 className="font-extrabold text-sm text-brand-forest uppercase tracking-wider">Bookings by Category</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryBreakdown} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" stroke="#102A2A" fontSize={10} tickLine={false} />
                      <YAxis stroke="#102A2A" fontSize={10} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="bookings" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. Manage Destinations */}
        {activeSec === 'Destinations' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-forest">Destination Catalog</h3>
              <button 
                onClick={() => addToast("Adding destination schema not implemented in prototype", "info")}
                className="px-3.5 py-2 bg-brand-orange text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add Destination
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-brand-teal/10 text-brand-forest/50 uppercase font-bold text-[10px]">
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-teal/5 font-semibold text-xs">
                  {destinations.map(d => (
                    <tr key={d.id} className="hover:bg-brand-mint/30 transition-colors">
                      <td className="py-3 px-4 font-extrabold text-brand-forest">{d.name}</td>
                      <td className="py-3 px-4 text-brand-forest/65">{d.state}</td>
                      <td className="py-3 px-4 text-brand-gold">★ {d.rating}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleDeleteItem('destination', d.name)}
                          className="p-1 text-gray-300 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Manage Hotels */}
        {activeSec === 'Hotels' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-forest">Accommodation Registry</h3>
              <button 
                onClick={() => addToast("Adding hotel entry not implemented in prototype", "info")}
                className="px-3.5 py-2 bg-brand-orange text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add Hotel stay
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-brand-teal/10 text-brand-forest/50 uppercase font-bold text-[10px]">
                    <th className="py-3 px-4">Stay Hotel</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Price/Night</th>
                    <th className="py-3 px-4">Aids</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-teal/5 font-semibold text-xs">
                  {hotels.map(h => (
                    <tr key={h.id} className="hover:bg-brand-mint/30 transition-colors">
                      <td className="py-3 px-4 font-extrabold text-brand-forest">{h.name}</td>
                      <td className="py-3 px-4 text-brand-forest/65">{h.location}</td>
                      <td className="py-3 px-4 text-brand-teal font-bold">₹{h.pricePerNight}</td>
                      <td className="py-3 px-4">
                        {h.isSeniorFriendly ? "👵🏽 Senior ✓" : "Standard"}
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleDeleteItem('hotel stay', h.name)}
                          className="p-1 text-gray-300 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. Manage Transport */}
        {activeSec === 'Transport' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-forest">Carrier & Fleet Options</h3>
              <button 
                onClick={() => addToast("Adding carrier logs not implemented in prototype", "info")}
                className="px-3.5 py-2 bg-brand-orange text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add Carrier Route
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-brand-teal/10 text-brand-forest/50 uppercase font-bold text-[10px]">
                    <th className="py-3 px-4">Carrier Name</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Route</th>
                    <th className="py-3 px-4">Fare</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-teal/5 font-semibold text-xs">
                  {transportOptions.map(t => (
                    <tr key={t.id} className="hover:bg-brand-mint/30 transition-colors">
                      <td className="py-3 px-4 font-extrabold text-brand-forest">{t.name}</td>
                      <td className="py-3 px-4 text-brand-forest/65">{t.type}</td>
                      <td className="py-3 px-4 text-brand-forest/65">{t.from} → {t.to}</td>
                      <td className="py-3 px-4 text-brand-teal font-bold">₹{t.price}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleDeleteItem('transport path', t.name)}
                          className="p-1 text-gray-300 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. Manage Offers */}
        {activeSec === 'Offers' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-forest">Coupon campaigns</h3>
              <button 
                onClick={() => addToast("Adding coupon codes not implemented in prototype", "info")}
                className="px-3.5 py-2 bg-brand-orange text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Create Coupon code
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-brand-teal/10 text-brand-forest/50 uppercase font-bold text-[10px]">
                    <th className="py-3 px-4">Promo Campaign</th>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Discount</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-teal/5 font-semibold text-xs">
                  {offers.map(o => (
                    <tr key={o.id} className="hover:bg-brand-mint/30 transition-colors">
                      <td className="py-3 px-4 font-extrabold text-brand-forest">{o.title}</td>
                      <td className="py-3 px-4 font-mono text-brand-orange font-bold">{o.code}</td>
                      <td className="py-3 px-4 text-brand-teal font-extrabold">{o.discountType === 'Percentage' ? `${o.value}%` : `₹${o.value}`}</td>
                      <td className="py-3 px-4 text-brand-forest/65">{o.category}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleDeleteItem('promo code', o.code)}
                          className="p-1 text-gray-300 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
