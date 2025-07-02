import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      alert('Signup successful');
      localStorage.setItem('token', data.token);
      navigate("/signin");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 p-6">
      <div className="bg-zinc-900 border border-green-500 shadow-[0_0_20px_#00ff88] rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-green-400 mb-6 text-center tracking-wide drop-shadow-[0_0_5px_#00ff88]">
          ⚡ Join LearnSphere
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-green-300">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 bg-black text-green-200 border border-green-600 rounded-lg placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-green-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 bg-black text-green-200 border border-green-600 rounded-lg placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-green-300">Password</label>
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
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-green-300">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/signin')}
            className="text-green-400 font-semibold cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
