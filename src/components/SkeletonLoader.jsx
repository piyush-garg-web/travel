import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'itinerary') {
    return (
      <div className="space-y-4">
        {items.map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-brand-teal/5 shadow-sm animate-pulse space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-6 w-16 bg-gray-200 rounded-md"></div>
              <div className="h-6 w-1/3 bg-gray-200 rounded-md"></div>
            </div>
            <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
            <div className="flex gap-4 pt-2">
              <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'results') {
    return (
      <div className="space-y-4">
        {items.map((i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-brand-teal/5 shadow-sm flex flex-col md:flex-row justify-between gap-4 animate-pulse">
            <div className="flex-1 space-y-3">
              <div className="h-5 w-1/4 bg-gray-200 rounded-md"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded-md"></div>
              <div className="flex gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
              </div>
            </div>
            <div className="w-full md:w-32 flex flex-col justify-between items-end gap-2">
              <div className="h-7 w-20 bg-gray-200 rounded-md"></div>
              <div className="h-9 w-full bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: Grid Card
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-brand-teal/5 shadow-sm animate-pulse flex flex-col h-80">
          <div className="h-48 bg-gray-200 w-full"></div>
          <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div className="h-5 w-1/3 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded-md"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
              <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
