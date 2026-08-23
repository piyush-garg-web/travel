const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  try {
    const { username, email, password, phone, location } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    user = new User({
      name: username,
      email,
      password: hashedPassword,
      phone,
      travelPreferences: {
        budget: "Moderate",
        interests: ["Spiritual", "Heritage"],
        style: "Standard",
        defaultSource: location || "Delhi"
      }
    });

    await user.save();

    // Create Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    // Don't return password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      token,
      user: userResponse
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Sign In User
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check for user
    let user = await User.findOne({
      $or: [
        { email: username.toLowerCase() },
        { name: username }
      ]
    });

    // If user is one of the original mock profiles and not in DB, register them on the fly
    if (!user) {
      const mockUsers = [
        {
          name: "Rajesh Kumar",
          email: "rajesh.kumar@gmail.com",
          phone: "+91 98765 43210",
          passengerId: "EZY-24X9-82K1",
          emergencyContact: { name: "Amit Kumar (Son)", relation: "Son", phone: "+91 91234 56789" },
          accessibilityPreferences: { prefersSeniorFriendly: true, lessWalking: true, accessibleTransport: true, dietaryRestriction: "Satvik Vegetarian" },
          travelPreferences: { budget: "Moderate", interests: ["Spiritual", "Heritage", "Nature"], style: "Senior Friendly", defaultSource: "Delhi" },
          savedStays: ["hotel-ddn-01", "hotel-rsh-01"],
          savedExperiences: ["le-vns-aarti"]
        },
        {
          name: "Pooja Sharma",
          email: "pooja.sharma@yahoo.com",
          phone: "+91 98111 22233",
          passengerId: "EZY-98Y1-03K9",
          emergencyContact: { name: "Suresh Sharma (Father)", relation: "Father", phone: "+91 99999 88888" },
          accessibilityPreferences: { prefersSeniorFriendly: false, lessWalking: false, accessibleTransport: false, dietaryRestriction: "None" },
          travelPreferences: { budget: "Premium", interests: ["Adventure", "Food", "Cafés"], style: "Friends", defaultSource: "Delhi" },
          savedStays: ["hotel-ddn-03"],
          savedExperiences: ["le-rsh-raft"]
        }
      ];

      const matchedMock = mockUsers.find(
        m => m.name.toLowerCase() === username.trim().toLowerCase() ||
             m.email.toLowerCase() === username.trim().toLowerCase()
      );

      if (matchedMock) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('••••••••••••', salt); // Default mock password
        user = new User({
          ...matchedMock,
          password: hashedPassword
        });
        await user.save();
      }
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Create Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    // Don't return password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      token,
      user: userResponse
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
