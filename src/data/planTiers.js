export const planTiers = [
  {
    id: 'Affordable',
    title: 'Affordable',
    description: 'Budget-friendly community travel',
    icon: '💰',
    color: 'green',
    accent: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    transport: {
      toStation: 'State Bus, Shared Auto',
      intercity: 'Sleeper Train, State Express Bus',
      local: 'Local Bus, Walking'
    },
    accommodation: 'Clean Dharamshala, Yatri Niwas, Homestay',
    attractions: 'Self-guided free & low-cost visits',
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
      'State bus or sleeper train',
      'Dharamshala and homestay stays',
      'Community meals and self-guided visits'
    ],
    referenceTotal: 4500
  },
  {
    id: 'Moderate',
    title: 'Moderate',
    description: 'Balanced comfort and value',
    icon: '⚖️',
    color: 'orange',
    accent: 'text-brand-orange',
    bg: 'bg-brand-soft-orange',
    border: 'border-brand-orange/30',
    transport: {
      toStation: 'Shared Auto, AC Bus',
      intercity: 'Superfast Train, AC Sleeper Coach',
      local: 'Shared Cab, Auto-rickshaw'
    },
    accommodation: 'Standard Guest House, Budget Hotel',
    attractions: 'Heritage Walks, Local Shared Experiences',
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
      'Superfast or AC sleeper travel',
      'Standard guest houses and hotels',
      'Guided heritage walk and shared cabs'
    ],
    referenceTotal: 7800
  },
  {
    id: 'Premium',
    title: 'Premium',
    description: 'Upgraded comfort travel',
    icon: '💎',
    color: 'purple',
    accent: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    transport: {
      toStation: 'Private Cab Transfer',
      intercity: 'AC 2-Tier Train, Private Taxi',
      local: 'Dedicated Local Cab'
    },
    accommodation: 'Verified 3-Star, Comfort Heritage Stay',
    attractions: 'Priority Darshan, Personal Guide',
    features: {
      support: true,
      insurance: true,
      cancellation: true,
      assistant: true,
      priority: true,
      meals: true
    },
    benefits: [
      'Dedicated local cab',
      'Verified comfortable 3-star stay',
      'Priority darshan and personal guide'
    ],
    referenceTotal: 14200
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
