"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user && data.session) {
        // Wait a moment for the session to be fully set in cookies
        await new Promise(resolve => setTimeout(resolve, 500));
        // Use window.location for full page reload to ensure middleware picks up session
        window.location.href = "/admin-x7k9p2/dashboard";
      }
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#0a0b0a] min-h-screen flex items-center justify-center p-[24px]">
      <motion.div
        className="w-full max-w-[480px] border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[48px] bg-[rgba(24,24,24,0.3)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[24px] mb-[48px]">
          <h1 className="font-[var(--font-forum)] text-[48px] tracking-[1px] uppercase text-[#efe7d2] text-center">
            Admin Login
          </h1>
          <p className="text-[14px] font-light text-center text-[rgba(245,242,234,0.7)]">
            Saveurs Ramen
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-[24px]">
          {/* Email Input */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="email"
              className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)] transition-colors"
              placeholder="admin@saveurs-ramen.fr"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="password"
              className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/admin-x7k9p2/forgot-password"
              className="text-[13px] text-[rgba(245,242,234,0.7)] hover:text-[#efe7d2] transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="bg-red-500/10 border border-red-500/30 rounded-[8px] px-[16px] py-[12px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-[14px] text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="bg-[#efe7d2] text-[#0a0b0a] rounded-[8px] px-[32px] py-[16px] font-[var(--font-forum)] text-[16px] tracking-[1px] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
