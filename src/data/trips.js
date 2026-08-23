export const mockTrips = [
  {
    id: "trip-del-ddn-2026",
    title: "Scenic Doon Getaway",
    source: "Delhi",
    destination: "Dehradun",
    startDate: "2026-09-22",
    endDate: "2026-09-25",
    status: "Upcoming",
    travelersCount: 2,
    travelStyle: "Senior Friendly",
    budgetLevel: "Moderate",
    interests: ["Heritage", "Spiritual", "Nature"],
    totalCost: 3200,
    transport: {
      id: "train-del-ddn-01",
      type: "Train",
      name: "Dehradun Superfast Express (12017)",
      carrier: "Indian Railways",
      departure: "06:45 AM",
      arrival: "12:50 PM",
      price: 600,
      passengerCount: 2
    },
    hotel: {
      id: "hotel-ddn-01",
      name: "Doon Yatri Niwas",
      location: "Rajpur Road, Dehradun",
      pricePerNight: 500,
      nights: 3
    },
    localTravel: {
      type: "Shared Local Transport",
      name: "Shared cab and local bus pass",
      pricePerDay: 250,
      days: 3
    },
    itinerary: [
      {
        day: 1,
        date: "22 Sep 2026",
        activities: [
          {
            time: "06:45 AM",
            location: "New Delhi Railway Station",
            activity: "Board Dehradun Superfast Express",
            cost: 1200, // for 2 passengers
            travelTime: "6h 05m",
            notes: "Comfortable AC Chair Car. Complimentary breakfast and tea served on board."
          },
          {
            time: "01:30 PM",
            location: "Doon Yatri Niwas",
            activity: "Check-in & Lunch",
            cost: 500, // hotel night 1
            travelTime: "25m transit from station",
            notes: "Pre-assigned ground floor room with wheelchair access and support handles in bathroom."
          },
          {
            time: "04:30 PM",
            location: "Forest Research Institute",
            activity: "Colonial Heritage Walk",
            cost: 100, // 2 tickets
            travelTime: "20m in local cab",
            notes: "Explore the massive grand corridors and botanical museum. Golf carts available for seniors."
          },
          {
            time: "07:30 PM",
            location: "Rajpur Road",
            activity: "Traditional Dinner at Ellora's",
            cost: 250,
            travelTime: "10m",
            notes: "Taste local bakery and authentic North Indian delicacies."
          }
        ]
      },
      {
        day: 2,
        date: "23 Sep 2026",
        activities: [
          {
            time: "09:30 AM",
            location: "Robber's Cave (Guchhupani)",
            activity: "Nature Canyon Walk",
            cost: 70,
            travelTime: "30m",
            notes: "Gently walking path. For senior citizens, resting benches are available near the entrance."
          },
          {
            time: "01:00 PM",
            location: "Paltan Bazaar",
            activity: "Artisan Shopping & Lunch",
            cost: 200,
            travelTime: "15m",
            notes: "Support local women cooperatives selling hand-woven woolens and brass artifacts."
          },
          {
            time: "04:30 PM",
            location: "Mindrolling Monastery",
            activity: "Stupa & Meditation Gardens",
            cost: 0,
            travelTime: "35m",
            notes: "Highly peaceful gardens. Ramp access available throughout the monastery corridors."
          }
        ]
      },
      {
        day: 3,
        date: "24 Sep 2026",
        activities: [
          {
            time: "09:00 AM",
            location: "Mussoorie Hills Excursion",
            activity: "Mall Road & Lal Tibba Vista",
            cost: 300, // Shared local transport and entry
            travelTime: "1h 20m drive up",
            notes: "Scenic uphill drive. Safe, experienced mountain cab driver. Stops at scenic viewpoints."
          },
          {
            time: "05:00 PM",
            location: "Sahastradhara Springs",
            activity: "Sulphur Water Healing Springs",
            cost: 100,
            travelTime: "1h drive down",
            notes: "Naturally warm sulphur water pools. Rest spots available nearby."
          }
        ]
      },
      {
        day: 4,
        date: "25 Sep 2026",
        activities: [
          {
            time: "09:30 AM",
            location: "Tapkeshwar Temple",
            activity: "Cave Temple Blessing",
            cost: 50,
            travelTime: "20m",
            notes: "A popular Lord Shiva shrine inside a natural cave where water drops naturally on the Shiva Linga."
          },
          {
            time: "02:30 PM",
            location: "Dehradun ISBT",
            activity: "Return State Express Bus to Delhi",
            cost: 600,
            travelTime: "5h 15m",
            notes: "Air-conditioned Volvo bus with reclining seats and water bottles provided."
          }
        ]
      }
    ]
  },
  {
    id: "trip-del-jpr-2025",
    title: "Royal Jaipur Getaway",
    source: "Delhi",
    destination: "Jaipur",
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    status: "Completed",
    travelersCount: 4,
    travelStyle: "Family",
    budgetLevel: "Moderate",
    interests: ["Heritage", "Culture", "Shopping"],
    totalCost: 7800,
    transport: {
      type: "Bus",
      name: "State AC Sleeper Coach",
      carrier: "UTC",
      price: 650
    },
    hotel: {
      name: "Umaid Bhawan Heritage Hotel",
      pricePerNight: 1000
    },
    itinerary: []
  }
];
