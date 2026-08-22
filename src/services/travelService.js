import { destinations } from '../data/destinations';
import { hotels } from '../data/hotels';
import { transportOptions } from '../data/transport';
import { shortTrips } from '../data/shortTrips';
import { tirthYatraPackages } from '../data/tirthYatra';
import { localExperiences } from '../data/localExperiences';
import { offers } from '../data/offers';
import { mockTrips } from '../data/trips';

// Simulating network delay for backend readiness
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const travelService = {
  // Destinations
  async getDestinations() {
    await delay(300);
    return [...destinations];
  },

  async getDestinationById(id) {
    await delay(200);
    return destinations.find(d => d.id.toLowerCase() === id.toLowerCase()) || null;
  },

  // Stays / Hotels
  async getHotels(filters = {}) {
    await delay(400);
    let results = [...hotels];
    
    if (filters.destinationId) {
      results = results.filter(h => h.destinationId.toLowerCase() === filters.destinationId.toLowerCase());
    }
    if (filters.isSeniorFriendly) {
      results = results.filter(h => h.isSeniorFriendly);
    }
    if (filters.isFamilyFriendly) {
      results = results.filter(h => h.isFamilyFriendly);
    }
    if (filters.maxPrice) {
      results = results.filter(h => h.pricePerNight <= filters.maxPrice);
    }
    return results;
  },

  // Transport
  async getTransportOptions(from, to) {
    await delay(400);
    if (!from || !to) return [...transportOptions];
    return transportOptions.filter(
      t => t.from.toLowerCase() === from.toLowerCase() && 
           t.to.toLowerCase() === to.toLowerCase()
    );
  },

  // Short Trips
  async getShortTrips(filters = {}) {
    await delay(300);
    let results = [...shortTrips];
    if (filters.category) {
      results = results.filter(t => t.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.maxPrice) {
      results = results.filter(t => t.price <= filters.maxPrice);
    }
    if (filters.isSeniorFriendly) {
      results = results.filter(t => t.isSeniorFriendly);
    }
    return results;
  },

  // Tirth Yatra
  async getTirthYatraPackages(filters = {}) {
    await delay(350);
    let results = [...tirthYatraPackages];
    if (filters.category) {
      results = results.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.isSeniorFriendly) {
      results = results.filter(p => p.isSeniorFriendly);
    }
    return results;
  },

  // Local Experiences
  async getLocalExperiences(destinationId = null) {
    await delay(300);
    if (!destinationId) return [...localExperiences];
    return localExperiences.filter(le => le.destinationId.toLowerCase() === destinationId.toLowerCase());
  },

  // Offers
  async getOffers() {
    await delay(200);
    return [...offers];
  },

  // User Trips
  async getTrips() {
    await delay(400);
    return [...mockTrips];
  }
};
