export const destinations = [
  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi NCR",
    tagline: "India's Historic Heart",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    description: "A bustling metropolis where ancient monuments co-exist with modern corporate towers and premium lifestyle destinations.",
    rating: 4.6,
    reviews: 1420,
    tags: ["Heritage", "Food", "Shopping", "Metropolitan"],
    attractions: [
      { name: "Red Fort", type: "Heritage", rating: 4.7, cost: 80 },
      { name: "Qutub Minar", type: "Heritage", rating: 4.8, cost: 50 },
      { name: "Chandni Chowk", type: "Food & Shopping", rating: 4.5, cost: 0 },
      { name: "Humayun's Tomb", type: "Heritage", rating: 4.6, cost: 40 }
    ],
    foods: ["Butter Chicken", "Chole Bhature", "Paranthas", "Golgappas"],
    activities: ["Old Delhi Rickshaw Tour", "Heritage Walk", "Street Food Crawl", "Shopping at Dilli Haat"]
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    tagline: "The Pink City",
    image: "https://images.unsplash.com/photo-1477584322902-471a53b9d13d?auto=format&fit=crop&w=800&q=80",
    description: "The gateway to India's most flamboyant state, famous for its grand palaces, rugged forts, and colorful traditional crafts.",
    rating: 4.8,
    reviews: 1850,
    tags: ["Heritage", "Culture", "Shopping", "Royal"],
    attractions: [
      { name: "Amer Fort", type: "Heritage", rating: 4.9, cost: 200 },
      { name: "Hawa Mahal", type: "Heritage", rating: 4.7, cost: 50 },
      { name: "City Palace", type: "Heritage & Royal", rating: 4.8, cost: 300 },
      { name: "Jantar Mantar", type: "Science & History", rating: 4.6, cost: 50 }
    ],
    foods: ["Dal Baati Churma", "Laal Maas", "Pyaaz Kachori", "Ghewar"],
    activities: ["Hot Air Balloon Ride", "Bazaar Shopping", "Amber Fort Light & Sound Show", "Traditional Block Printing Workshop"]
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    tagline: "The Yoga Capital of the World",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    description: "Located on the banks of the sacred Ganges, Rishikesh is a sanctuary for spiritual seekers and adrenaline junkies alike.",
    rating: 4.9,
    reviews: 2100,
    tags: ["Spiritual", "Adventure", "Nature", "Wellness"],
    attractions: [
      { name: "Laxman Jhula", type: "Spiritual Landmark", rating: 4.6, cost: 0 },
      { name: "Triveni Ghat Aarti", type: "Spiritual", rating: 4.9, cost: 0 },
      { name: "Beatles Ashram", type: "Heritage", rating: 4.5, cost: 150 },
      { name: "Neer Garh Waterfall", type: "Nature", rating: 4.4, cost: 30 }
    ],
    foods: ["Aloo Puri", "Ayurvedic Khichdi", "Lassi", "Organic Salads"],
    activities: ["White Water Rafting", "Ganga Aarti Ceremony", "Yoga & Meditation Retreat", "Bungee Jumping"]
  },
  {
    id: "dehradun",
    name: "Dehradun",
    state: "Uttarakhand",
    tagline: "The Doon Valley Gateway",
    image: "https://images.unsplash.com/photo-1589136777351-fdc9c9c85365?auto=format&fit=crop&w=800&q=80",
    description: "A tranquil valley city in the foothills of the Himalayas, known for its pleasant weather and scenic educational campuses.",
    rating: 4.4,
    reviews: 950,
    tags: ["Nature", "Hills", "Family", "Relaxing"],
    attractions: [
      { name: "Robber's Cave (Guchhupani)", type: "Nature", rating: 4.5, cost: 35 },
      { name: "Sahastradhara", type: "Nature & Hot Springs", rating: 4.2, cost: 0 },
      { name: "Forest Research Institute", type: "Heritage & Science", rating: 4.6, cost: 50 },
      { name: "Mindrolling Monastery", type: "Spiritual & Cultural", rating: 4.7, cost: 0 }
    ],
    foods: ["Katlambe", "Bun Tikki", "Momos", "Kandalee Ka Saag"],
    activities: ["Exploring Cave Formations", "Trekking to Mussoorie foothills", "Bakery Hopping", "Forest Walks"]
  },
  {
    id: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    tagline: "City of the Taj Mahal",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    description: "Home to the world's most famous monument of love, Agra boasts rich Mughal architecture, heritage crafts, and famous sweets.",
    rating: 4.7,
    reviews: 3200,
    tags: ["Heritage", "Mughal", "Shopping"],
    attractions: [
      { name: "Taj Mahal", type: "Heritage", rating: 5.0, cost: 50 },
      { name: "Agra Fort", type: "Heritage", rating: 4.8, cost: 50 },
      { name: "Fatehpur Sikri", type: "Heritage", rating: 4.7, cost: 50 },
      { name: "Mehtab Bagh", type: "Nature & Landmark", rating: 4.5, cost: 25 }
    ],
    foods: ["Petha", "Bedai Sabzi", "Mughlai Biryani", "Seekh Kebab"],
    activities: ["Taj Mahal Sunrise Tour", "Marble Inlay Workshop Visit", "Heritage Walk in Taj Ganj", "Shopping for Leather Goods"]
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    tagline: "The Sacred Golden City",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80",
    description: "The spiritual and cultural center of the Sikh religion, famous for its warm hospitality, intense history, and robust food culture.",
    rating: 4.9,
    reviews: 2400,
    tags: ["Spiritual", "Food", "Heritage", "Patriotic"],
    attractions: [
      { name: "Harmandir Sahib (Golden Temple)", type: "Spiritual", rating: 5.0, cost: 0 },
      { name: "Jallianwala Bagh", type: "Historical Landmark", rating: 4.7, cost: 0 },
      { name: "Wagah Border", type: "Patriotic", rating: 4.8, cost: 0 },
      { name: "Gobindgarh Fort", type: "Heritage", rating: 4.5, cost: 150 }
    ],
    foods: ["Amritsari Kulcha", "Maa Ki Dal", "Lassi", "Tandoori Chicken"],
    activities: ["Golden Temple Holy Kitchen Volunteer", "Wagah Border Retreat Ceremony", "Amritsari Food Tour", "Traditional Phulkari Shopping"]
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    tagline: "The Eternal City",
    image: "https://images.unsplash.com/photo-1561361062-6522c0e9e455?auto=format&fit=crop&w=800&q=80",
    description: "One of the oldest continuously inhabited cities in the world. Varanasi is the spiritual core of India, resting on the sacred Ganges.",
    rating: 4.8,
    reviews: 1980,
    tags: ["Spiritual", "Culture", "Heritage", "Mystical"],
    attractions: [
      { name: "Kashi Vishwanath Temple", type: "Spiritual", rating: 4.9, cost: 0 },
      { name: "Dashashwamedh Ghat", type: "Spiritual & Culture", rating: 4.9, cost: 0 },
      { name: "Sarnath", type: "Spiritual & Heritage", rating: 4.7, cost: 20 },
      { name: "Assi Ghat", type: "Spiritual & Wellness", rating: 4.6, cost: 0 }
    ],
    foods: ["Kachori Sabzi", "Tamatar Chaat", "Banarasi Paan", "Rabri & Lassi"],
    activities: ["Ganga Sunrise Boat Ride", "Evening Ganga Aarti", "Weaving Village Tour (Banarasi Silk)", "Exploring Narrow Alleyways"]
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    tagline: "The City of Lakes",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    description: "Often called the Venice of the East, Udaipur is surrounded by the blue waters of Lake Pichola and the green hills of Aravallis.",
    rating: 4.7,
    reviews: 1650,
    tags: ["Royal", "Romance", "Heritage", "Lakes"],
    attractions: [
      { name: "City Palace", type: "Heritage", rating: 4.8, cost: 250 },
      { name: "Lake Pichola", type: "Lakes & Nature", rating: 4.7, cost: 0 },
      { name: "Jag Mandir", type: "Royal Heritage", rating: 4.6, cost: 400 },
      { name: "Sajjangarh Monsoon Palace", type: "Nature & Views", rating: 4.4, cost: 150 }
    ],
    foods: ["Mirchi Bada", "Safed Maas", "Kachori", "Mawa Kachori"],
    activities: ["Lake Pichola Boat Cruise", "Dharohar Folk Dance Show", "Cable Car to Karni Mata", "Heritage Walking Tour"]
  }
];
