import React, { useState, useEffect } from 'react';
import { useTravel } from '../context/TravelContext';
import { travelService } from '../services/travelService';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { Gift, CreditCard, Smartphone, Heart, Users, Copy, Check } from 'lucide-react';

export const OffersPage = () => {
  const { addToast } = useTravel();

  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [copiedCode, setCopiedCode] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const data = await travelService.getOffers();
        setDeals(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast(`Coupon "${code}" copied to clipboard!`, "success");
    setTimeout(() => {
      setCopiedCode('');
    }, 3000);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Gift': return <Gift className="w-5 h-5 text-brand-orange" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-emerald-600" />;
      case 'Heart': return <Heart className="w-5 h-5 text-red-500 fill-red-100" />;
      case 'Users': return <Users className="w-5 h-5 text-indigo-600" />;
      default: return <Gift className="w-5 h-5 text-brand-orange" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="mb-10">
        <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Offers & Discounts</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">Travel More. Save More.</h1>
        <p className="text-brand-forest/65 mt-2 max-w-xl leading-relaxed">
          Unlock cashbacks, bank multipliers, and specialized travel subsidies for senior group tours. Paste codes directly during your next smart plan.
        </p>
      </div>

      {/* Offers Grid */}
      {loading ? (
        <SkeletonLoader type="card" count={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((offer) => {
            const isCopied = copiedCode === offer.code;
            return (
              <div 
                key={offer.id}
                className="bg-white rounded-3xl border border-brand-teal/5 shadow-premium hover:shadow-premium-hover transition-all duration-300 p-6 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  
                  {/* Category icon and tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-brand-mint flex items-center justify-center">
                      {getIcon(offer.iconName)}
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-brand-forest/50 bg-brand-mint/50 px-2 py-0.5 rounded border border-brand-teal/5">
                      {offer.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-extrabold text-base text-brand-forest leading-snug">{offer.title}</h3>
                    <p className="text-xs text-brand-forest/65 mt-1.5 leading-relaxed">{offer.description}</p>
                  </div>

                </div>

                {/* Coupon Code section */}
                <div className="border-t border-brand-teal/10 pt-4 flex items-center justify-between gap-4 mt-2">
                  <div className="space-y-1">
                    <span className="text-[9px] text-brand-forest/40 uppercase font-bold tracking-wider block">Promo Code</span>
                    <span className="px-3.5 py-1.5 font-mono text-sm font-bold text-brand-teal bg-brand-mint rounded-lg border border-brand-teal/10 select-all">
                      {offer.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className={`p-2.5 rounded-xl border flex items-center gap-1.5 transition-all text-xs font-bold cursor-pointer
                      ${isCopied 
                        ? 'bg-brand-green/10 border-brand-green/20 text-brand-green' 
                        : 'bg-white border-brand-teal/20 text-brand-forest hover:bg-brand-mint'}`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
