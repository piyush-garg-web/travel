import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import { mockUsersList } from '../data/users';
import varanasiGangesBg from '../assets/varanasi-ganges.png';
import { User, Mail, Lock, ArrowRight, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { authService } from '../services/authService';

export const LoginPage = () => {
  const { setUser, setAuthToken, addToast } = useTravel();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/explore';

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
      navigate(redirectPath);
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
          className="w-full h-full bg-cover bg-center bg-no-repeat brightness-[0.55] saturate-[0.85]"
          style={{ backgroundImage: `url(${varanasiGangesBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory via-brand-ivory/80 to-brand-ivory/40"></div>
      </div>

      {/* Background ambient light effects */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-brand-gold/10 blur-[120px] pointer-events-none"></div>

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
              <span className="font-extrabold text-2xl tracking-tight leading-none text-brand-forest">
                Jan<span className="text-brand-orange">Yatri</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-muted mt-0.5">
                Smart India
              </span>
            </div>
          </Link>
        </div>

        {/* Login Form Container */}
        <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-premium flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-brand-forest tracking-wide">
              {isRegister ? "Create Your Account" : "Sign In to Your Account"}
            </h2>
            <p className="text-xs text-brand-muted mt-1.5">
              {isRegister
                ? "Register to customize your Smart India travel itineraries."
                : "Select a mock user profile to explore personalized travel planners."}
            </p>
          </div>

          {/* Mode Selector Tab Toggle */}
          <div className="flex border-b border-brand-border pb-2">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setUsername(mockUsersList[selectedUserIndex].name);
              }}
              className={`flex-1 pb-2 text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${
                !isRegister
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-brand-muted hover:text-brand-forest'
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
                  ? 'text-brand-orange border-b-2 border-brand-orange'
                  : 'text-brand-muted hover:text-brand-forest'
              }`}
            >
              Register
            </button>
          </div>

          {!isRegister ? (
            <>
              {/* Mock User Selector Cards */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider text-left">Select Travel Profile</span>
                <div className="grid grid-cols-2 gap-3">
                  {mockUsersList.map((mockUser, index) => (
                    <button
                      key={mockUser.id}
                      type="button"
                      onClick={() => handleUserSelect(index)}
                      className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        selectedUserIndex === index
                          ? 'bg-brand-soft-orange border-brand-orange text-brand-forest shadow-sm'
                          : 'bg-brand-cream border-brand-border text-brand-muted hover:bg-brand-soft-orange'
                      }`}
                    >
                      <span className="text-xs font-bold">{mockUser.name}</span>
                      <span className="text-[10px] text-brand-muted">{mockUser.ageGroup}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                {/* Username Field */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Username</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-brand-border bg-brand-ivory text-brand-forest text-xs font-semibold focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-brand-border bg-brand-ivory text-brand-forest text-xs font-semibold focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                      required
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password (Mock) */}
                <div className="flex items-center justify-between text-[11px] text-brand-muted mt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-brand-border accent-brand-orange bg-transparent w-3.5 h-3.5" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); addToast("Password reset disabled in demo mode.", "info"); }} className="hover:text-brand-orange transition-colors font-medium">Forgot Password?</a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-2 w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-secondary text-white font-bold text-sm tracking-wide shadow-md shadow-brand-orange/15 flex items-center justify-center gap-2 group transition-all cursor-pointer"
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
                <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-brand-border bg-brand-ivory text-brand-forest text-xs font-semibold focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-brand-border bg-brand-ivory text-brand-forest text-xs font-semibold focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    value={password === '••••••••••••' ? '' : password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a password"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-brand-border bg-brand-ivory text-brand-forest text-xs font-semibold focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-brand-border bg-brand-ivory text-brand-forest text-xs font-semibold focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Location Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Location</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-muted">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location (e.g. Delhi)"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-brand-border bg-brand-ivory text-brand-forest text-xs font-semibold focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-secondary text-white font-bold text-sm tracking-wide shadow-md shadow-brand-orange/15 flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <span>Register</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {/* Secure Badge */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-muted border-t border-brand-border pt-4">
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            <span>Secure Passenger ID Auth Enabled</span>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-brand-muted hover:text-brand-orange transition-all font-medium">
            ← Back to Landing Page
          </Link>
        </div>

      </div>
    </div>
  );
};
