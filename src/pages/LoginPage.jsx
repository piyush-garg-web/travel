import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { mockUsersList } from '../data/users';
import varanasiGangesBg from '../assets/varanasi-ganges.png';
import { User, Mail, Lock, ArrowRight, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { authService } from '../services/authService';

export const LoginPage = () => {
  const { setUser, setAuthToken, addToast } = useTravel();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [username, setUsername] = useState(mockUsersList[0].name);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleUserSelect = (index) => {
    setSelectedUserIndex(index);
    setUsername(mockUsersList[index].name);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      addToast("Please enter a username.", "error");
      return;
    }

    try {
      const data = await authService.signin(username.trim(), password);
      
      // Save credentials to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Set user and token in context
      setUser(data.user);
      setAuthToken(data.token);
      
      addToast(`Welcome back, ${data.user.name}! Accessing your travel dashboard...`, 'success');
      navigate('/explore');
    } catch (err) {
      addToast(err.message || "Invalid credentials.", "error");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password.trim() || !phone.trim() || !location.trim()) {
      addToast("Please fill in all registration fields.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast("Please enter a valid email address.", "error");
      return;
    }

    try {
      const data = await authService.register({
        username: username.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        location: location.trim()
      });

      // Save credentials to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Set user and token in context
      setUser(data.user);
      setAuthToken(data.token);

      addToast(`Registration successful! Welcome, ${data.user.name}!`, "success");
      navigate('/explore');
    } catch (err) {
      addToast(err.message || "Registration failed.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Cinematic Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat brightness-[0.25] saturate-[0.8]"
          style={{ backgroundImage: `url(${varanasiGangesBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A09] via-[#0F0A09]/75 to-[#0F0A09]/90"></div>
      </div>

      {/* Background ambient light effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo and Brand Title */}
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-orange to-brand-gold flex items-center justify-center shadow-lg shadow-brand-orange/20 overflow-hidden transform group-hover:scale-105 transition-all">
              <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-2xl tracking-tight leading-none text-white">
                Jan<span className="text-brand-gold">Yatri</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-gold mt-0.5">
                Smart India
              </span>
            </div>
          </Link>
        </div>

        {/* Login Form Container (Glass card) */}
        <div className="bg-[#1D1614]/65 border border-brand-gold/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {isRegister ? "Create Your Account" : "Sign In to Your Account"}
            </h2>
            <p className="text-xs text-white/50 mt-1.5">
              {isRegister 
                ? "Register to customize your Smart India travel itineraries." 
                : "Select a mock user profile to explore personalized travel planners."}
            </p>
          </div>

          {/* Mode Selector Tab Toggle */}
          <div className="flex border-b border-white/10 pb-2">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setUsername(mockUsersList[selectedUserIndex].name);
              }}
              className={`flex-1 pb-2 text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${
                !isRegister 
                  ? 'text-brand-gold border-b-2 border-brand-orange' 
                  : 'text-white/45 hover:text-white/70'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setUsername('');
              }}
              className={`flex-1 pb-2 text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${
                isRegister 
                  ? 'text-brand-gold border-b-2 border-brand-orange' 
                  : 'text-white/45 hover:text-white/70'
              }`}
            >
              Register
            </button>
          </div>

          {!isRegister ? (
            <>
              {/* Mock User Selector Cards */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider text-left">Select Travel Profile</span>
                <div className="grid grid-cols-2 gap-3">
                  {mockUsersList.map((mockUser, index) => (
                    <button
                      key={mockUser.id}
                      type="button"
                      onClick={() => handleUserSelect(index)}
                      className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        selectedUserIndex === index
                          ? 'bg-brand-orange/15 border-brand-orange text-white shadow-lg'
                          : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xs font-bold">{mockUser.name}</span>
                      <span className="text-[10px] text-white/40">{mockUser.ageGroup}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                {/* Username Field */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Username</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-semibold focus:outline-none focus:border-brand-orange"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-semibold focus:outline-none focus:border-brand-orange"
                      required
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password (Mock) */}
                <div className="flex items-center justify-between text-[11px] text-white/50 mt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-white/10 accent-brand-orange bg-transparent w-3.5 h-3.5" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); addToast("Password reset disabled in demo mode.", "info"); }} className="hover:text-brand-gold transition-colors font-medium">Forgot Password?</a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-gold hover:brightness-110 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 group transition-all cursor-pointer"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
              {/* Username Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-semibold focus:outline-none focus:border-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-semibold focus:outline-none focus:border-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    value={password === '••••••••••••' ? '' : password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a password"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-semibold focus:outline-none focus:border-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-semibold focus:outline-none focus:border-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Location Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Location</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location (e.g. Delhi)"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-semibold focus:outline-none focus:border-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-gold hover:brightness-110 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <span>Register</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {/* Secure Badge */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/40 border-t border-white/5 pt-4">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Secure Passenger ID Auth Enabled</span>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-white/50 hover:text-white transition-all font-medium">
            ← Back to Landing Page
          </Link>
        </div>

      </div>
    </div>
  );
};
