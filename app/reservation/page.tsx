"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { fadeInVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

const heroImage = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1920&q=80"; // Ramen bowl (verified working)

export default function Reservation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call API endpoint instead of direct Supabase call
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          guests: parseInt(formData.guests),
          date: formData.date,
          time: formData.time,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create reservation');
      }

      // Redirect to confirmation page with form data
      const params = new URLSearchParams({
        name: formData.name,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
      });

      router.push(`/reservation/confirmation?${params.toString()}`);
    } catch (err: any) {
      console.error("Error creating reservation:", err);
      setError(err.message || "Failed to create reservation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] h-auto lg:h-[calc(100vh-48px)]">
        {/* Left Hero Image */}
        <div className="flex-1 bg-black rounded-[16px] overflow-hidden relative min-h-[400px] lg:min-h-0">
          <img
            src={heroImage}
            alt="Book a Table"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[381px] bg-gradient-to-b from-transparent to-black opacity-60" />
          <Navbar />
          <h1 className="absolute bottom-[80px] md:bottom-[120px] lg:bottom-[280px] left-[24px] md:left-[48px] lg:left-[66px] font-[var(--font-forum)] text-[48px] md:text-[88px] lg:text-[112px] leading-none tracking-[2px] uppercase text-[#efe7d2]">
            Book<br />a Table
          </h1>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px] self-stretch overflow-y-auto">
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col gap-[32px] md:gap-[48px] lg:gap-[64px] py-[32px] md:py-[60px] lg:py-[80px] px-[24px] md:px-[48px] lg:px-[96px]">
            <div className="flex flex-col gap-[40px] md:gap-[60px] lg:gap-[80px] items-center w-full">
              {/* Header */}
              <motion.div
                className="flex flex-col gap-[12px] md:gap-[16px] items-center w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                  </div>
                  <p className="font-[var(--font-forum)] text-[28px] md:text-[36px] lg:text-[40px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                    Reservation
                  </p>
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                  </div>
                </div>
                <p className="text-[#efe7d2] text-[14px] md:text-[16px] lg:text-[18px] font-light leading-[1.5] text-center w-full max-w-[500px] px-[16px]">
                  Réservez votre table chez Saveurs Ramen — bouillons artisanaux, ramen uniques et ambiance chaleureuse vous y attendent.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[16px] w-full max-w-[600px]"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[10px] px-[24px] py-[16px] text-[#efe7d2] text-[16px] font-light leading-[1.8] placeholder:text-[#efe7d2] focus:outline-none focus:border-[#efe7d2] transition-colors"
                  variants={staggerItemVariants}
                />
                <motion.input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[10px] px-[24px] py-[16px] text-[#efe7d2] text-[16px] font-light leading-[1.8] placeholder:text-[#efe7d2] focus:outline-none focus:border-[#efe7d2] transition-colors"
                  variants={staggerItemVariants}
                />
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[10px] px-[24px] py-[16px] text-[#efe7d2] text-[16px] font-light leading-[1.8] placeholder:text-[#efe7d2] focus:outline-none focus:border-[#efe7d2] transition-colors"
                  variants={staggerItemVariants}
                />
                <motion.div className="flex flex-col sm:flex-row gap-[16px] w-full" variants={staggerItemVariants}>
                  <input
                    type="number"
                    name="guests"
                    placeholder="Guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    min="1"
                    max="20"
                    className="flex-1 bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[10px] px-[24px] py-[16px] text-[#efe7d2] text-[16px] font-light leading-[1.8] placeholder:text-[#efe7d2] focus:outline-none focus:border-[#efe7d2] transition-colors"
                  />
                  <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="flex-1 bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[10px] px-[24px] py-[16px] text-[#efe7d2] text-[16px] font-light leading-[1.8] placeholder:text-[#efe7d2] focus:outline-none focus:border-[#efe7d2] transition-colors"
                  />
                  <input
                    type="time"
                    name="time"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="flex-1 bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[10px] px-[24px] py-[16px] text-[#efe7d2] text-[16px] font-light leading-[1.8] placeholder:text-[#efe7d2] focus:outline-none focus:border-[#efe7d2] transition-colors"
                  />
                </motion.div>
                {error && (
                  <motion.div
                    className="bg-red-500/10 border border-red-500/30 rounded-[8px] px-[24px] py-[12px] text-red-400 text-[14px]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#efe7d2] rounded-[8px] px-[24px] py-[16px] text-[#0a0b0a] text-[12px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[#d4ccb8] transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  variants={staggerItemVariants}
                  whileHover={loading ? {} : { scale: 1.02 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {loading ? "Réservation en cours..." : "Réserver"}
                </motion.button>
              </motion.form>
            </div>
          </div>

          {/* Footer */}
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex items-center justify-center py-[20px] px-[24px]">
            <div className="flex gap-[16px] items-center">
              <p className="text-[#efe7d2] text-[14px] font-light leading-[1.5]">
                Saveurs Ramen
              </p>
              <div className="flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
              <p className="text-[#efe7d2] text-[14px] font-light leading-[1.5]">
                Reservations
              </p>
              <div className="flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
              <p className="text-[#efe7d2] text-[14px] font-light leading-[1.5]">
                2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
