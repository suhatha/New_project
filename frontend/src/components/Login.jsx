import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import bgImg from '../assets/bg.jpg';
import sideImg from '../assets/side.jpg';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      // Sanctum CSRF cookie (only needed if using Sanctum)
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      // Login API request
      const response = await axios.post(
        'http://localhost:8000/api/login',
        {
          email: email.trim(),
          password: password.trim(),
        },
        {
          withCredentials: true,
        }
      );

      const { token, user } = response.data;

      if (!user?.role) {
        setApiError('User role missing');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      const roleRoutes = ['admin', 'super_admin', 'manager', 'branch_manager', 'cashier'];
      if (roleRoutes.includes(user.role)) {
        navigate(`/${user.role}`);
      } else {
        console.warn('Unknown user role:', user.role);
        navigate('/unauthorized');
      }

    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError('Login failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Bubble animation */}
      <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 100 + 40;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = 12 + Math.random() * 10;
          const colors = ['#F472B6', '#60A5FA', '#34D399', '#FBBF24', '#A78BFA', '#06B6D4'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          return (
            <span
              key={i}
              className="absolute rounded-full bubble"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: '-120px',
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`,
              }}
            />
          );
        })}
      </div>

      {/* Login Card */}
      <div className="relative z-50 bg-white/95 shadow-2xl rounded-3xl flex w-full max-w-5xl overflow-hidden border border-white/30">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col w-1/2 justify-center items-center p-10">
          <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-transparent bg-clip-text animate-bounce mb-8 drop-shadow-md">
            Car Service
          </h1>
          <img src={sideImg} alt="Visual" className="h-64 w-auto object-contain opacity-90" />
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full p-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              {errors.email && <p className="text-red-500 mt-2 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full p-4 pr-12 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 mt-2 text-sm">{errors.password}</p>}
            </div>

            {/* API error */}
            {apiError && <p className="text-red-600 text-center">{apiError}</p>}

            {/* Extras */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm cursor-pointer">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link to="#" className="text-sm text-purple-600 hover:underline cursor-not-allowed" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-purple-400' : 'bg-purple-700 hover:bg-purple-800'} text-white py-3 rounded-xl font-semibold text-lg transition`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don’t have an account?{' '}
            <Link to="#" className="text-purple-700 underline cursor-not-allowed" onClick={(e) => e.preventDefault()}>
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Bubble Animation */}
      <style>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          animation-name: floatUp;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          opacity: 0.8;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-50vh) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) scale(1);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .bubble {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
