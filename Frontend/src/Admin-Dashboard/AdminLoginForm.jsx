import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Install via: npm install jwt-decode

export default function AdminLoginForm({ onLoginSuccess }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  // Helper function to handle global logout
  const performLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login'; // Force redirect to login page
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8090/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData)
      });

      const data = await response.json();

      // Fix: Check for 'authenticated' instead of 'valid'
      if (data.authenticated) {
        localStorage.setItem('adminToken', data.token);
        
        // --- AUTO LOGOUT LOGIC ---
        try {
          const decoded = jwtDecode(data.token);
          const currentTime = Date.now() / 1000;
          const timeLeftMs = (decoded.exp - currentTime) * 1000;

          if (timeLeftMs > 0) {
            setTimeout(() => {
              performLogout();
              alert("Admin session expired. Please login again.");
            }, timeLeftMs);
          }
        } catch (err) {
          console.error("Token decoding failed", err);
        }
        // -------------------------

        setMessage('Login successful!');
        onLoginSuccess?.();
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-w-2xl items-center justify-center border border-gray-800 h-screen bg-black text-white font-sans">
      <form onSubmit={handleLogin} className="bg-black p-8 rounded-xl border border-gray-800 shadow-2xl shadow-blue-900/10 w-80">
        <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">Admin Portal</h2>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={signInData.email}
            onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-900 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signInData.password}
            onChange={(e) => setSignInData({...signInData, password: e.target.value})}
            className="w-full bg-neutral-900 px-4 py-3 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
        </div>

        {message && (
          <p className={`text-sm mt-4 text-center font-medium ${message.includes('successful') ? 'text-emerald-400' : 'text-rose-400'}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg font-bold transition-all ${
            loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:scale-95'
          } text-white`}
        >
          {loading ? 'Verifying...' : 'Login to Dashboard'}
        </button>
      </form>
    </div>
  );
}