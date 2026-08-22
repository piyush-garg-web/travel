export const currentUser = {
  id: "user-01",
  name: "Rajesh Kumar",
  email: "rajesh.kumar@gmail.com",
  phone: "+91 98765 43210",
  age: 62,
  ageGroup: "Senior Citizen (60+)",
  passengerId: "EZY-24X9-82K1",
  emergencyContact: {
    name: "Amit Kumar (Son)",
    relation: "Son",
    phone: "+91 91234 56789"
  },
  accessibilityPreferences: {
    prefersSeniorFriendly: true,
    lessWalking: true,
    accessibleTransport: true,
    dietaryRestriction: "Satvik Vegetarian"
  },
  travelPreferences: {
    budget: "Moderate",
    interests: ["Spiritual", "Heritage", "Nature"],
    style: "Senior Friendly",
    defaultSource: "Delhi"
  },
  savedStays: ["hotel-ddn-01", "hotel-rsh-01"],
  savedExperiences: ["le-vns-aarti"]
};

export const mockUsersList = [
  currentUser,
  {
    id: "user-02",
    name: "Pooja Sharma",
    email: "pooja.sharma@yahoo.com",
    phone: "+91 98111 22233",
    age: 28,
    ageGroup: "Adult (18-59)",
    passengerId: "EZY-98Y1-03K9",
    emergencyContact: {
      name: "Suresh Sharma (Father)",
      relation: "Father",
      phone: "+91 99999 88888"
    },
    accessibilityPreferences: {
      prefersSeniorFriendly: false,
      lessWalking: false,
      accessibleTransport: false,
      dietaryRestriction: "None"
    },
    travelPreferences: {
      budget: "Premium",
      interests: ["Adventure", "Food", "Cafés"],
      style: "Friends",
      defaultSource: "Delhi"
    },
    savedStays: ["hotel-ddn-03"],
    savedExperiences: ["le-rsh-raft"]
  }
];
