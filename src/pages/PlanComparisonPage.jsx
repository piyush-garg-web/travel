import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTravel } from '../context/TravelContext';
import { planTiers, featureLabels, transportCategories } from '../data/planTiers';
import { Check, X, ArrowRight, AlertCircle, MapPin, Calendar, Users, Compass } from 'lucide-react';

export const PlanComparisonPage = () => {
  const { planner, selectedPlan, selectPlan, initializeBookingDefaults } = useTravel();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const start = new Date(planner.startDate);
  const end = new Date(planner.endDate);
  const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const days = nights + 1;

  const baseEstimatePerDayPerPerson = 2200;
  const getEstimatedTotal = (tier) => {
    return Math.round(baseEstimatePerDayPerPerson * days * planner.travellers * tier.multiplier);
  };

  const handleContinue = () => {
    if (!selectedPlan) {
      setError('Please select a travel plan to continue.');
      return;
    }
    setError('');
    initializeBookingDefaults(planner.source, planner.destination);
    navigate('/results');
  };

  const selectedTier = planTiers.find((t) => t.id === selectedPlan);

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Step 2 of 3</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-2">Travel Plan Comparison</h1>
          <p className="text-brand-muted text-sm mt-2 max-w-xl mx-auto">
            Choose the plan that fits your travel style. You can change this later from the results page.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-brand-muted bg-white border border-brand-border rounded-2xl px-5 py-3 shadow-sm w-fit mx-auto">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-orange" /> {planner.source} → {planner.destination}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand-orange" /> {planner.startDate} to {planner.endDate}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-brand-orange" /> {planner.travellers} Travellers</span>
            <span className="flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-brand-orange" /> {planner.tripType}</span>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {planTiers.map((tier) => {
            const isSelected = selectedPlan === tier.id;
            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -4 }}
                onClick={() => { selectPlan(tier.id); setError(''); }}
                className={`relative rounded-3xl border-2 p-6 cursor-pointer transition-all bg-white ${
                  isSelected
                    ? `border-brand-orange ${tier.bg} shadow-premium`
                    : 'border-brand-border hover:border-brand-orange/40 hover:shadow-premium'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                <div className="text-3xl mb-3">{tier.icon}</div>
                <h3 className="text-xl font-extrabold text-brand-forest">{tier.title}</h3>
                <p className="text-sm text-brand-muted mt-1">{tier.description}</p>

                <div className="mt-5">
                  <p className="text-xs text-brand-muted uppercase tracking-wider font-bold">Estimated Total</p>
                  <p className="text-2xl font-black text-brand-orange mt-0.5">₹{getEstimatedTotal(tier).toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-brand-muted mt-1">For {planner.travellers} traveller{planner.travellers > 1 ? 's' : ''} · {days} day{days > 1 ? 's' : ''}</p>
                </div>

                <ul className="mt-5 space-y-2">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-brand-forest">
                      <Check className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); selectPlan(tier.id); setError(''); }}
                  className={`mt-6 w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    isSelected
                      ? 'bg-brand-orange text-white shadow-md'
                      : 'bg-brand-cream text-brand-forest border border-brand-border hover:bg-brand-soft-orange'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Transportation & Accommodation Comparison */}
        <div className="bg-white rounded-3xl border border-brand-border shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-brand-border">
            <h2 className="text-lg font-extrabold text-brand-forest">Transportation & Accommodation Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-brand-cream">
                  <th className="text-left px-6 py-3 text-xs font-bold text-brand-muted uppercase tracking-wider">Category</th>
                  {planTiers.map((tier) => (
                    <th key={tier.id} className={`text-left px-6 py-3 text-sm font-extrabold ${tier.accent}`}>{tier.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {transportCategories.map((cat) => (
                  <tr key={cat.key}>
                    <td className="px-6 py-4 text-sm font-bold text-brand-forest">{cat.label}</td>
                    {planTiers.map((tier) => (
                      <td key={tier.id} className="px-6 py-4 text-sm text-brand-muted">{tier.transport[cat.key]}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-6 py-4 text-sm font-bold text-brand-forest">Accommodation</td>
                  {planTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-sm text-brand-muted">{tier.accommodation}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-bold text-brand-forest">Tourist Attractions</td>
                  {planTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-sm text-brand-muted">{tier.attractions}</td>
                  ))}
                </tr>
                <tr className="bg-brand-cream/50">
                  <td className="px-6 py-4 text-sm font-bold text-brand-forest">Estimated Budget</td>
                  {planTiers.map((tier) => (
                    <td key={tier.id} className="px-6 py-4 text-sm font-extrabold text-brand-orange">₹{getEstimatedTotal(tier).toLocaleString('en-IN')}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-3xl border border-brand-border shadow-sm overflow-hidden mb-10">
          <div className="p-6 border-b border-brand-border">
            <h2 className="text-lg font-extrabold text-brand-forest">Features Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-brand-cream">
                  <th className="text-left px-6 py-3 text-xs font-bold text-brand-muted uppercase tracking-wider">Feature</th>
                  {planTiers.map((tier) => (
                    <th key={tier.id} className={`text-left px-6 py-3 text-sm font-extrabold ${tier.accent}`}>{tier.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {featureLabels.map((feature) => (
                  <tr key={feature.key}>
                    <td className="px-6 py-4 text-sm font-bold text-brand-forest">{feature.label}</td>
                    {planTiers.map((tier) => (
                      <td key={tier.id} className="px-6 py-4">
                        {tier.features[feature.key] ? (
                          <Check className="w-5 h-5 text-brand-green" />
                        ) : (
                          <X className="w-5 h-5 text-brand-border" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Plan Summary + Continue */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-3xl border border-brand-border p-6 shadow-sm">
          <div>
            <p className="text-xs text-brand-muted uppercase tracking-wider font-bold">Selected Plan</p>
            <p className="text-xl font-extrabold text-brand-forest">
              {selectedTier ? (
                <span className="flex items-center gap-2">
                  {selectedTier.icon} {selectedTier.title}
                  <span className="text-brand-orange">· ₹{getEstimatedTotal(selectedTier).toLocaleString('en-IN')}</span>
                </span>
              ) : (
                <span className="text-brand-muted font-medium">No plan selected</span>
              )}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}
            <button
              type="button"
              onClick={handleContinue}
              className="px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-secondary text-white font-extrabold text-sm tracking-wide flex items-center gap-2 transition-all shadow-md shadow-brand-orange/15"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
