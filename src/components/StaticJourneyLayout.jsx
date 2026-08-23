import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const StaticJourneyLayout = ({ backgroundImage, eyebrow, title, intro, children }) => (
  <section className="relative isolate min-h-screen overflow-hidden bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
    {backgroundImage && (
      <div
        className="absolute inset-0 -z-20 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
    )}
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fffaf2]/45 via-white/48 to-[#fffdf8]/62" />
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-[#000666]/10 to-transparent" />
    <div className="mx-auto max-w-6xl">
      <Link
        to="/explore"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:text-[#fd9000]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      <header className="mx-auto max-w-3xl py-12 text-center sm:py-16">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#fd9000]">{eyebrow}</p>
        <h1 className="text-3xl font-black leading-tight text-[#000666] sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{intro}</p>
      </header>
      {children}
    </div>
  </section>
);

export const InfoCard = ({ icon: Icon, title, children, accent = false, className = '' }) => (
  <article className={`rounded-2xl border border-white/80 bg-white/84 p-6 shadow-xl shadow-[#000666]/10 backdrop-blur-md ${className}`}>
    {Icon && <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent ? 'bg-[#fd9000] text-white' : 'bg-orange-50 text-[#fd9000]'}`}><Icon className="h-5 w-5" /></div>}
    <h2 className="text-lg font-extrabold text-[#000666]">{title}</h2>
    <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div>
  </article>
);
