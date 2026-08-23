import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, Users, X } from 'lucide-react';
import digilockerLogo from '../assets/digilocker-logo.png';
import { useTravel } from '../context/TravelContext';

const createTravellers = (count) => Array.from({ length: count || 1 }, (_, index) => ({
  id: index + 1,
  name: '',
  age: '',
  gender: 'Male',
  email: '',
  phone: '',
  aadhaar: '',
  isVerified: false
}));

const getFieldError = (traveller, field) => {
  if (field === 'name') return traveller.name.trim() ? '' : 'Full name is required.';
  if (field === 'age') return Number(traveller.age) > 0 ? '' : 'Enter a valid age.';
  if (field === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(traveller.email) ? '' : 'Enter a valid email address.';
  if (field === 'phone') return /^\d{10}$/.test(traveller.phone) ? '' : 'Phone number must contain exactly 10 digits.';
  if (field === 'aadhaar') return /^\d{12}$/.test(traveller.aadhaar) ? '' : 'Aadhaar number must contain exactly 12 digits.';
  return '';
};

export const TravellerDetailsPage = () => {
  const { planner, executeBooking, addToast } = useTravel();
  const navigate = useNavigate();
  const [travellers, setTravellers] = useState(() => createTravellers(planner.travellers));
  const [activeModalTraveller, setActiveModalTraveller] = useState(null);
  const [showDigiLockerModal, setShowDigiLockerModal] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  const allTravellersReady = useMemo(() => travellers.every((traveller) => (
    !getFieldError(traveller, 'name') &&
    !getFieldError(traveller, 'age') &&
    !getFieldError(traveller, 'email') &&
    !getFieldError(traveller, 'phone') &&
    !getFieldError(traveller, 'aadhaar') &&
    traveller.isVerified
  )), [travellers]);

  const updateTraveller = (id, field, value) => {
    setTravellers((current) => current.map((traveller) => (
      traveller.id === id
        ? { ...traveller, [field]: value, ...(field === 'aadhaar' ? { isVerified: false } : {}) }
        : traveller
    )));
  };

  const markTouched = (id, field) => {
    setTouchedFields((current) => ({ ...current, [`${id}-${field}`]: true }));
  };

  const verifyAadhaar = (traveller) => {
    const aadhaarError = getFieldError(traveller, 'aadhaar');
    if (aadhaarError) {
      markTouched(traveller.id, 'aadhaar');
      addToast(aadhaarError, 'error');
      return;
    }

    setTravellers((current) => current.map((item) => (
      item.id === traveller.id ? { ...item, isVerified: true } : item
    )));
    setActiveModalTraveller(traveller.id);
    setShowDigiLockerModal(true);
  };

  const handleProceed = (event) => {
    event.preventDefault();
    if (!allTravellersReady) return;
    const bookingId = executeBooking(`pass-ezy-${Math.floor(1000 + Math.random() * 9000)}`);
    navigate(`/booking/success?bookingId=${bookingId}`);
  };

  const modalTraveller = travellers.find((traveller) => traveller.id === activeModalTraveller);

  return (
    <div className="min-h-screen bg-brand-ivory py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button type="button" onClick={() => navigate('/results')} className="text-xs font-bold text-brand-muted hover:text-brand-orange flex items-center gap-1.5 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to results
        </button>

        <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-premium">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-brand-border pb-6">
            <div>
              <span className="text-brand-orange font-bold text-xs uppercase tracking-widest">Step 3 of 3</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-forest mt-1">Traveller Details</h1>
              <p className="text-sm text-brand-muted mt-2">Enter details for every traveller before confirming your booking.</p>
            </div>
            <div className="shrink-0 rounded-2xl bg-brand-soft-orange px-4 py-3 flex items-center gap-2 text-brand-forest">
              <Users className="w-5 h-5 text-brand-orange" />
              <span className="text-sm font-extrabold">{travellers.length} Traveller{travellers.length > 1 ? 's' : ''}</span>
            </div>
          </div>

          <form onSubmit={handleProceed} className="mt-6 space-y-5">
            {travellers.map((traveller) => (
              <section key={traveller.id} className="rounded-2xl border border-brand-border bg-brand-cream/40 p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-extrabold text-brand-forest">Traveller {traveller.id}</h2>
                  {traveller.isVerified && <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1"><BadgeCheck className="w-3.5 h-3.5" /> Verified by DigiLocker</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" error={touchedFields[`${traveller.id}-name`] && getFieldError(traveller, 'name')}>
                    <input value={traveller.name} onBlur={() => markTouched(traveller.id, 'name')} onChange={(event) => updateTraveller(traveller.id, 'name', event.target.value)} className="input" placeholder="Enter full name" />
                  </Field>
                  <Field label="Age" error={touchedFields[`${traveller.id}-age`] && getFieldError(traveller, 'age')}>
                    <input type="number" min="1" value={traveller.age} onBlur={() => markTouched(traveller.id, 'age')} onChange={(event) => updateTraveller(traveller.id, 'age', event.target.value)} className="input" placeholder="Enter age" />
                  </Field>
                  <Field label="Gender">
                    <select value={traveller.gender} onChange={(event) => updateTraveller(traveller.id, 'gender', event.target.value)} className="input">
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </Field>
                  <Field label="Email Address" error={touchedFields[`${traveller.id}-email`] && getFieldError(traveller, 'email')}>
                    <input type="email" value={traveller.email} onBlur={() => markTouched(traveller.id, 'email')} onChange={(event) => updateTraveller(traveller.id, 'email', event.target.value)} className="input" placeholder="name@example.com" />
                  </Field>
                  <Field label="Phone Number" error={touchedFields[`${traveller.id}-phone`] && getFieldError(traveller, 'phone')}>
                    <input inputMode="numeric" maxLength="10" value={traveller.phone} onBlur={() => markTouched(traveller.id, 'phone')} onChange={(event) => updateTraveller(traveller.id, 'phone', event.target.value.replace(/\D/g, ''))} className="input" placeholder="10-digit mobile number" />
                  </Field>
                  <Field label="Aadhaar Number" error={touchedFields[`${traveller.id}-aadhaar`] && getFieldError(traveller, 'aadhaar')}>
                    <div className="flex gap-2">
                      <input inputMode="numeric" maxLength="12" value={traveller.aadhaar} onBlur={() => markTouched(traveller.id, 'aadhaar')} onChange={(event) => updateTraveller(traveller.id, 'aadhaar', event.target.value.replace(/\D/g, ''))} className={`input flex-1 ${touchedFields[`${traveller.id}-aadhaar`] && getFieldError(traveller, 'aadhaar') ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`} placeholder="12-digit Aadhaar number" />
                      <button type="button" onClick={() => verifyAadhaar(traveller)} className="shrink-0 rounded-xl px-4 bg-brand-forest hover:bg-brand-secondary text-white text-xs font-bold transition-colors">Verify</button>
                    </div>
                  </Field>
                </div>
              </section>
            ))}

            <button type="submit" disabled={!allTravellersReady} className="w-full py-4 rounded-xl bg-brand-orange hover:bg-brand-secondary disabled:bg-brand-border disabled:text-brand-muted disabled:cursor-not-allowed text-white font-extrabold text-base flex items-center justify-center gap-2 transition-colors">
              Proceed to Final Booking / Payment <ArrowRight className="w-5 h-5" />
            </button>
            {!allTravellersReady && <p className="text-center text-xs text-brand-muted">Complete every field and verify each Aadhaar number through DigiLocker to continue.</p>}
          </form>
        </div>
      </div>

      {showDigiLockerModal && modalTraveller && (
        <div className="fixed inset-0 z-50 bg-brand-forest/45 p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="digilocker-title">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl">
            <button type="button" onClick={() => setShowDigiLockerModal(false)} className="absolute top-4 right-4 text-brand-muted hover:text-brand-forest" aria-label="Close DigiLocker verification"><X className="w-5 h-5" /></button>
            <div className="w-28 h-28 mx-auto rounded-3xl bg-white shadow-lg flex items-center justify-center p-3">
              <img src={digilockerLogo} alt="DigiLocker logo" className="w-full h-full object-contain" />
            </div>
            <div className="mt-5">
              <p className="text-2xl font-black tracking-tight text-[#4338CA]">DigiLocker</p>
              <p className="text-[11px] text-brand-muted/70 mt-0.5 italic">Your documents anytime, anywhere</p>
            </div>
            <p id="digilocker-title" className="mt-5 font-extrabold text-brand-forest">Aadhaar verification complete</p>
            <p className="text-sm text-brand-muted mt-1.5">Traveller {modalTraveller.id}'s Aadhaar has been securely verified.</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-2 text-emerald-700 text-sm font-bold"><CheckCircle2 className="w-5 h-5" /> Verified by DigiLocker</div>
            <button type="button" onClick={() => setShowDigiLockerModal(false)} className="mt-6 w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-secondary text-white font-bold text-sm">Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, error, children }) => (
  <label className="block text-left">
    <span className="block text-[10px] uppercase tracking-wider font-bold text-brand-muted mb-1.5">{label}</span>
    {children}
    {error && <span className="block text-[10px] text-red-600 mt-1">{error}</span>}
  </label>
);
