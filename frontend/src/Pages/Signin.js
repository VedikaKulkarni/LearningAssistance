import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      alert('Login successful');
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 p-6 relative overflow-hidden">
      {/* Optional neon blob glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-green-700 opacity-20 rounded-full filter blur-3xl z-0 animate-pulse" />

      {/* Signin Card */}
      <div className="z-10 bg-zinc-900 border border-green-500 shadow-[0_0_20px_#00ff88] rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-lg text-center text-green-300 mb-2 tracking-wide drop-shadow-[0_0_5px_#00ff88]">
          "Log in to unlock the future"
        </h1>
        <h2 className="text-3xl font-extrabold text-green-400 text-center mb-6">
          🚀 Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-green-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 bg-black text-green-200 border border-green-600 rounded-lg placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 bg-black text-green-200 border border-green-600 rounded-lg placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-bold text-black bg-green-400 hover:bg-green-300 transition duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-green-300">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-green-400 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
