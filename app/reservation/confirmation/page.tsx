"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { fadeInVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

const heroImage = "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=1920&q=80"; // Japanese restaurant

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Guest";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const guests = searchParams.get("guests") || "";

  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] h-auto lg:h-[calc(100vh-48px)]">
        {/* Left Hero Image */}
        <div className="flex-1 bg-black rounded-[16px] overflow-hidden relative min-h-[400px] lg:min-h-0">
          <img
            src={heroImage}
            alt="Reservation Confirmed"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[381px] bg-gradient-to-b from-transparent to-black opacity-60" />
          <Navbar />
          <motion.h1
            className="absolute bottom-[80px] md:bottom-[120px] lg:bottom-[280px] left-[24px] md:left-[48px] lg:left-[66px] font-[var(--font-forum)] text-[56px] md:text-[88px] lg:text-[112px] leading-none tracking-[2px] uppercase text-[#efe7d2]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            You're<br />All Set
          </motion.h1>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px] self-stretch overflow-y-auto">
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col py-[32px] md:py-[40px] lg:py-[48px] px-[24px] md:px-[48px] lg:px-[64px] justify-center">
            <motion.div
              className="flex flex-col gap-[32px] md:gap-[40px] items-center w-full"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Success Icon */}
              <motion.div
                className="flex items-center justify-center"
                variants={staggerItemVariants}
              >
                <motion.div
                  className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] rounded-full border-3 md:border-4 border-[#efe7d2] flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                >
                  <svg
                    className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#efe7d2"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>
              </motion.div>

              {/* Header */}
              <motion.div
                className="flex flex-col gap-[12px] md:gap-[16px] items-center w-full"
                variants={staggerItemVariants}
              >
                <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                  </div>
                  <p className="font-[var(--font-forum)] text-[24px] md:text-[28px] lg:text-[32px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                    Confirmed
                  </p>
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                  </div>
                </div>
                <p className="text-[#efe7d2] text-[14px] md:text-[15px] lg:text-[16px] font-light leading-[1.5] text-center w-full max-w-[450px] px-[16px]">
                  Thank you, {name}! Your reservation has been confirmed. We'll send you a confirmation email shortly.
                </p>
              </motion.div>

              {/* Reservation Details */}
              <motion.div
                className="flex flex-col gap-[12px] md:gap-[16px] w-full max-w-[500px] bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[20px] md:p-[24px]"
                variants={staggerItemVariants}
              >
                <h2 className="font-[var(--font-forum)] text-[20px] md:text-[22px] lg:text-[24px] tracking-[1px] uppercase text-[#efe7d2] leading-none text-center">
                  Reservation Details
                </h2>
                <div className="flex flex-col gap-[8px]">
                  <div className="flex justify-between items-center border-b border-[rgba(239,231,210,0.15)] pb-[8px]">
                    <span className="text-[rgba(245,242,234,0.7)] text-[13px] md:text-[14px] font-light">Date</span>
                    <span className="text-[#efe7d2] text-[13px] md:text-[14px]">{date}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[rgba(239,231,210,0.15)] pb-[8px]">
                    <span className="text-[rgba(245,242,234,0.7)] text-[13px] md:text-[14px] font-light">Time</span>
                    <span className="text-[#efe7d2] text-[13px] md:text-[14px]">{time}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[rgba(239,231,210,0.15)] pb-[8px]">
                    <span className="text-[rgba(245,242,234,0.7)] text-[13px] md:text-[14px] font-light">Guests</span>
                    <span className="text-[#efe7d2] text-[13px] md:text-[14px]">{guests} {parseInt(guests) === 1 ? 'Person' : 'People'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[rgba(245,242,234,0.7)] text-[13px] md:text-[14px] font-light">Location</span>
                    <span className="text-[#efe7d2] text-[13px] md:text-[14px] text-right">Saveurs Ramen — 9 Rue de Châtillon, Rennes</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-[12px] md:gap-[16px] items-center justify-center w-full"
                variants={staggerItemVariants}
              >
                <Link href="/" className="w-full sm:w-auto">
                  <motion.button
                    className="w-full bg-[#efe7d2] rounded-[8px] px-[24px] py-[12px] text-[#0a0b0a] text-[12px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[#d4ccb8] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Back to Home
                  </motion.button>
                </Link>
                <Link href="/menu" className="w-full sm:w-auto">
                  <motion.button
                    className="w-full border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[24px] py-[12px] text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[rgba(24,24,24,0.5)] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Menu
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
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
                Confirmation
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

export default function ReservationConfirmation() {
  return (
    <Suspense fallback={
      <div className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px] flex items-center justify-center">
        <div className="text-[#efe7d2] text-[16px] md:text-[18px] font-light">Loading...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
