"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin-x7k9p2/reset-password`,
      });

      if (resetError) {
        throw resetError;
      }

      setSuccess(true);
    } catch (err: any) {
      console.error("Error sending reset email:", err);
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#0a0b0a] min-h-screen flex items-center justify-center p-[24px]">
      <div className="w-full max-w-[400px]">
        <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[32px] md:p-[48px]">
          {/* Header */}
          <div className="flex flex-col gap-[24px] mb-[32px]">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
              <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px]" />
              <div className="flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
            </div>

            <h1 className="font-[var(--font-forum)] text-[32px] md:text-[40px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
              Reset Password
            </h1>

            <p className="text-[#efe7d2] text-[14px] font-light leading-[1.6] text-center opacity-70">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {success ? (
            <div className="flex flex-col gap-[24px]">
              <div className="bg-green-500/10 border border-green-500/30 rounded-[8px] px-[24px] py-[16px] text-green-400 text-[14px] text-center">
                Password reset email sent! Check your inbox.
              </div>
              <Link
                href="/admin-x7k9p2/login"
                className="text-[#efe7d2] text-[14px] font-light leading-[1.5] hover:underline text-center"
              >
                ← Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
              {/* Email Input */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-light">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] text-[14px] font-light placeholder:text-[rgba(239,231,210,0.3)] focus:outline-none focus:border-[#efe7d2] transition-colors"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-[8px] px-[24px] py-[12px] text-red-400 text-[14px]">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#efe7d2] rounded-[8px] px-[24px] py-[14px] text-[#0a0b0a] text-[12px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[#d4ccb8] transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              {/* Back to Login */}
              <Link
                href="/admin-x7k9p2/login"
                className="text-[#efe7d2] text-[14px] font-light leading-[1.5] hover:underline text-center"
              >
                ← Back to Login
              </Link>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-[24px] text-center">
          <p className="text-[#efe7d2] text-[12px] font-light opacity-50">
            Saveurs Ramen
          </p>
        </div>
      </div>
    </main>
  );
}
