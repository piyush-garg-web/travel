# EzYatra - Your Journey. One Smart Plan.

EzYatra is an intelligent Indian travel and tourism platform prototype that aggregates transport, accommodations, local travel, tourist attractions, short weekend escapes, and spiritual Yatra planning into a single, unified travel-planning experience.

Developed around the primary concept **"Your Journey. One Smart Plan."**, it enables users to coordinate their entire trip in one interface instead of bouncing between dozens of separate hotel, bus, and activity tabs.

---

## 🚀 Tech Stack

- **Frontend Core**: React.js (Vite, Javascript, SPA Routing)
- **Styling & Theme**: Tailwind CSS v4 (configured with CSS variables and PostCSS integration)
- **Routing**: React Router (DOM version 6)
- **Animations**: Framer Motion (slide transitions, modal overlays, progress states)
- **Data Visualization**: Recharts (Revenue metrics and category shares for admin analytics)
- **Icons**: Lucide React
- **Mock Services Layer**: Asynchronous promise-wrapped endpoints matching REST signatures

---

## 📂 Folder Structure

```
p:/travel/
├── dist/                     # Optimized production bundle outputs
├── public/                   # Static assets (Favicons, public manifest)
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx        # Sticky glassmorphism header & Mobile bottom bar
│   │   ├── Footer.jsx        # Rich footer with inline social SVGs
│   │   ├── MapExperience.jsx # Interactive animated vector map route drawer
│   │   └── SkeletonLoader.jsx# Shimmering loader card placeholders
│   ├── context/              # Central State Management
│   │   └── TravelContext.jsx # Global states (planner, checkout cart, SOS alert, wishlists)
│   ├── data/                 # Realistic Mock Indian Datasets
│   │   ├── destinations.js   # Regional attraction lists & tags
│   │   ├── transport.js      # Bus, Train, and Cab timings, fares, and emissions
│   │   ├── hotels.js         # Accommodations suitability & pricing
│   │   ├── shortTrips.js     # Weekend escapes within regional radii
│   │   ├── tirthYatra.js     # Pilgrimage itineraries & elderly safety aids
│   │   ├── offers.js         # Promo coupons, bank discounts, and cashbacks
│   │   ├── localExperiences.js# Traditional food hubs and artisan shops
│   │   ├── users.js          # Profiles, default sources, and passenger IDs
│   │   └── trips.js          # Booking records & day-by-day itineraries
│   ├── pages/                # Page Controllers (15 complete routes)
│   │   ├── LandingPage.jsx   # Hero section & planner entry card
│   │   ├── PlanTripPage.jsx  # Animated multi-step planner wizard
│   │   ├── SearchResultsPage.jsx# Interactive transport comparison & stay grids
│   │   ├── SmartTripPage.jsx # Day-by-day timeline itineraries & activity editor
│   │   ├── ShortTripsPage.jsx# Weekend packages filterable by radius/category
│   │   ├── TirthYatraPage.jsx# Pilgrimage pathways with senior safety toggles
│   │   ├── StaysPage.jsx     # Accommodations catalog with wishlist triggers
│   │   ├── LocalDiscoveryPage.jsx# Community food & craft highlights
│   │   ├── PassengerIdPage.jsx# Mock digital passport card & details
│   │   ├── OffersPage.jsx    # Promo discounts & copy coupons
│   │   ├── SafetyPage.jsx    # SOS simulator dispatcher & tracker panel
│   │   ├── MyTripsPage.jsx   # Tabs for upcoming, completed, & saved trips
│   │   ├── ProfilePage.jsx   # Account options, payment cards, & security locks
│   │   ├── AdminDashboardPage.jsx# Statistics charts & inventory catalog lists
│   │   └── BookingSuccessPage.jsx# Boarding pass receipt & validation QR pass
│   ├── services/             # Simulated API Layer
│   │   └── travelService.js  # Async request methods imitating backend latency
│   ├── App.css               # Empty cleanup styles
│   ├── index.css             # Tailwind v4 directives & global layer custom fonts
│   ├── main.jsx              # Application mount point
│   └── App.jsx               # React Router mapping
├── postcss.config.js         # PostCSS plugins (Tailwind CSS v4 & Autoprefixer)
├── tailwind.config.js        # Content matching config
├── vite.config.js            # Vite build parameters
└── package.json              # Runtime dependencies manifest
```

---

## 🛠️ Local Setup Instructions

1. **Install Node.js**: Ensure Node.js (v18 or higher) is installed on your system.
2. **Clone/Navigate to Project**: Open your command line in the project folder.
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Launch Local Development Server**:
   ```bash
   npm run dev
   ```
5. **Open Browser**: Navigate to `http://localhost:5173` (or the port specified in console logs).

---

## ⚡ Environment Variables

When transitioning this frontend prototype to connect with real server nodes, establish a `.env` file in the root folder with:

```env
# Backend REST Endpoint URL
VITE_API_BASE_URL=http://localhost:5000/api

# Google Maps API Key for MapExperience maps replacement
VITE_GOOGLE_MAPS_API_KEY=AIzaSyYourRealKeyHere

# Payment Sandbox Keys
VITE_RAZORPAY_KEY_ID=rzp_test_YourKeyId
```

---

## 🔮 Future Express/MongoDB API Integration Plan

The service layers under `src/services/travelService.js` are fully prepared to transition from mock variables to live HTTP `fetch`/`axios` calls. Here is the recommended transition mapping:

### 1. User Authentications (`/api/users`)
- Replace mock users list database with **Express sessions / JWT** authentications.
- Store passenger ID hashes using **bcrypt** in MongoDB.

### 2. Search Engine Aggregator (`/api/search`)
- Query MongoDB collections for matching transport documents:
  ```javascript
  // Express Route suggestion
  app.get('/api/transport', async (req, res) => {
    const { from, to } = req.query;
    const routes = await Transport.find({ from, to });
    res.json(routes);
  });
  ```
- Fetch hotel coordinates and parse coordinates into real Google Map pointers.

### 3. Order Operations & Ledger Checkout (`/api/bookings`)
- Bind checkout routes with booking collections.
- Incorporate secure **Razorpay / UPI Payment Gateway** APIs on the backend before returning booking receipts.

### 4. Safety SOS Broadcasting (`/api/emergency`)
- Hook the frontend SOS trigger to a **Twilio API SMS dispatcher** or native email server on Node.js.
- Instantly send live geolocation coordinate text alerts to the user's registered emergency contact.

---

## 🚀 How to Run the Project Locally

Run the following command in the project directory to launch the Vite developer portal:

```bash
npm run dev
```
