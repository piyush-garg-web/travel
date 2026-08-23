export const planTiers = [
  {
    id: 'Affordable',
    title: 'Affordable',
    description: 'Budget-friendly travel',
    icon: '💰',
    color: 'green',
    accent: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    transport: {
      toStation: 'City Bus, Metro',
      intercity: 'Regular Train, Non-AC Bus',
      local: 'Local Bus, Walking'
    },
    accommodation: 'Dharamshala, Youth Hostels',
    attractions: 'Free Museums, Public Parks',
    features: {
      support: true,
      insurance: false,
      cancellation: false,
      assistant: false,
      priority: false,
      meals: false
    },
    benefits: [
      'Lowest cost option',
      'Public transport focus',
      'Budget-friendly stays',
      'Free & low-cost attractions'
    ],
    multiplier: 0.75
  },
  {
    id: 'Moderate',
    title: 'Moderate',
    description: 'Balanced travel',
    icon: '⚖️',
    color: 'orange',
    accent: 'text-brand-orange',
    bg: 'bg-brand-soft-orange',
    border: 'border-brand-orange/30',
    transport: {
      toStation: 'Metro, AC Bus',
      intercity: 'AC 3-tier Train, AC Bus',
      local: 'Auto-rickshaw, Local Bus'
    },
    accommodation: 'Budget Hotels, Lodges',
    attractions: 'Paid Museums, Guided Tours',
    features: {
      support: true,
      insurance: true,
      cancellation: false,
      assistant: false,
      priority: true,
      meals: true
    },
    benefits: [
      'Best value balance',
      'AC travel options',
      'Comfortable hotels',
      'Guided experiences'
    ],
    multiplier: 1.0
  },
  {
    id: 'Premium',
    title: 'Premium',
    description: 'Luxury travel',
    icon: '💎',
    color: 'purple',
    accent: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    transport: {
      toStation: 'Private Cab, Airport Transfer',
      intercity: '1st/2nd AC Train, Flight',
      local: 'Rental Car, Private Cab'
    },
    accommodation: '4-5 Star Hotels, Luxury Resorts',
    attractions: 'VIP Tours, Exclusive Experiences',
    features: {
      support: true,
      insurance: true,
      cancellation: true,
      assistant: true,
      priority: true,
      meals: true
    },
    benefits: [
      'Luxury accommodations',
      'Private transport',
      'VIP & exclusive tours',
      'Personal travel assistant'
    ],
    multiplier: 1.65
  }
];

export const featureLabels = [
  { key: 'support', label: '24/7 Customer Support' },
  { key: 'insurance', label: 'Travel Insurance' },
  { key: 'cancellation', label: 'Flexible Cancellation' },
  { key: 'assistant', label: 'Personal Travel Assistant' },
  { key: 'priority', label: 'Priority Booking' },
  { key: 'meals', label: 'Meal Inclusions' }
];

export const transportCategories = [
  { key: 'toStation', label: 'To Station/Terminal' },
  { key: 'intercity', label: 'Intercity Travel' },
  { key: 'local', label: 'Local Transport' }
];
