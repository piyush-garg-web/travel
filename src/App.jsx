import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TravelProvider } from './context/TravelContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { MarketingLandingPage } from './pages/MarketingLandingPage';
import { LoginPage } from './pages/LoginPage';
import { ExplorePage } from './pages/ExplorePage';
import { PlanTripPage } from './pages/PlanTripPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { SmartTripPage } from './pages/SmartTripPage';
import { ShortTripsPage } from './pages/ShortTripsPage';
import { TirthYatraPage } from './pages/TirthYatraPage';
import { StaysPage } from './pages/StaysPage';
import { LocalDiscoveryPage } from './pages/LocalDiscoveryPage';
import { PassengerIdPage } from './pages/PassengerIdPage';
import { OffersPage } from './pages/OffersPage';
import { SafetyPage } from './pages/SafetyPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';

// Scroll to top on route change for seamless navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const location = useLocation();
  const isPublicPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navigation */}
      {!isPublicPage && <Navbar />}
      
      {/* Page Routing */}
      <main className={`flex-grow ${!isPublicPage ? 'pb-16 lg:pb-0' : ''}`}>
        <Routes>
          <Route path="/" element={<MarketingLandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/plan-trip" element={<PlanTripPage />} />
          <Route path="/results" element={<SearchResultsPage />} />
          <Route path="/trip/:id" element={<SmartTripPage />} />
          <Route path="/short-trips" element={<ShortTripsPage />} />
          <Route path="/tirth-yatra" element={<TirthYatraPage />} />
          <Route path="/stays" element={<StaysPage />} />
          <Route path="/local" element={<LocalDiscoveryPage />} />
          <Route path="/passenger-id" element={<PassengerIdPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/booking/success" element={<BookingSuccessPage />} />
          
          {/* Fallback 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <span className="text-6xl mb-4">🧭</span>
                <h1 className="text-3xl font-extrabold text-brand-forest mb-2">Page Not Found</h1>
                <p className="text-brand-forest/65 max-w-md mb-6">
                  We couldn't find the destination page you were looking for. Let's get you back on course.
                </p>
                <a 
                  href="/" 
                  className="px-6 py-3 rounded-xl bg-brand-teal text-white font-bold hover:bg-brand-forest transition-all"
                >
                  Return to Home
                </a>
              </div>
            } 
          />
        </Routes>
      </main>
      
      {/* Main Footer */}
      {!isPublicPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <TravelProvider>
        <ScrollToTop />
        <AppContent />
      </TravelProvider>
    </Router>
  );
}

export default App;
