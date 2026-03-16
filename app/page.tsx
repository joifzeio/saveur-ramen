"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { InstagramIcon, ArrowIcon, RoundedCorner } from "@/components/Icons";

// Ramen & Japanese food images from Unsplash
const heroImage = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1920&q=80";
const menuImage = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80";
const reservationImage = "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80";
const aboutImage = "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80";

export default function Home() {
  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] h-auto lg:h-[calc(100vh-48px)] rounded-br-[48px] rounded-tr-[48px]">
        {/* Main Hero Section */}
        <div className="flex-1 bg-black rounded-[16px] overflow-hidden relative min-h-[500px] lg:min-h-0">
          {/* Background Video */}
          <div className="absolute inset-0">
            <video
              src="/hero.mp4"
              className="w-full h-full object-cover opacity-90"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Navbar */}
          <Navbar />

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[534px] bg-gradient-to-b from-transparent to-black opacity-60" />

          {/* Hero Text */}
          <motion.div
            className="absolute left-[24px] md:left-[48px] lg:left-[77px] bottom-[24px] md:bottom-[36px] lg:bottom-[48px] z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-[var(--font-forum)] text-[64px] md:text-[100px] lg:text-[140px] leading-[1.1] tracking-[2px] md:tracking-[3px] uppercase text-[#efe7d2]">
              Ramen<br />Artisanaux
            </h1>
          </motion.div>

          {/* Social Media Card */}
          <motion.div
            className="absolute bottom-0 right-0 bg-[#0a0b0a] rounded-tl-[16px] md:rounded-tl-[24px] p-[16px] md:p-[24px] pb-[12px] md:pb-[16px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Rounded Corners */}
            <div className="absolute bottom-0 left-[-24px] w-[24px] h-[24px] overflow-hidden hidden md:block">
              <RoundedCorner className="w-[24px] h-[24px] rotate-90" />
            </div>
            <div className="absolute right-0 top-[-24px] w-[24px] h-[24px] overflow-hidden hidden md:block">
              <RoundedCorner className="w-[24px] h-[24px]" />
            </div>

            <div className="flex gap-[6px] md:gap-[8px] items-center">
              <motion.a
                href="https://www.instagram.com/saveurs_ramen/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-full w-[36px] h-[36px] flex items-center justify-center"
                whileHover={{ scale: 1.15, backgroundColor: "rgba(24,24,24,0.7)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </motion.a>
              <motion.a
                href="https://maps.google.com/?q=9+Rue+de+Châtillon,+35000+Rennes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-full px-[12px] h-[36px] flex items-center justify-center"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(24,24,24,0.7)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-[var(--font-forum)] text-[11px] tracking-[1px] uppercase text-[#efe7d2] whitespace-nowrap">📍 Gare Sud, Rennes</p>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Right Side Grid */}
        <motion.div
          className="w-full lg:w-[420px] flex flex-col gap-[12px] md:gap-[15px] h-auto lg:h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Menu Card */}
          <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }} className="flex-1 min-h-[180px] lg:min-h-0">
            <Link href="/menu" className="flex-1 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] overflow-hidden relative group cursor-pointer block h-full min-h-[180px] lg:min-h-0">
              <img src={menuImage} alt="Notre Menu" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-400" />
              <div className="absolute bottom-0 right-0 bg-[#0a0b0a] rounded-tl-[24px] pt-[12px] pl-[24px]">
                <div className="absolute bottom-0 left-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px] rotate-90" />
                </div>
                <div className="absolute right-0 top-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px]" />
                </div>
                <div className="flex gap-[12px] items-center justify-end pb-0">
                  <p className="font-[var(--font-forum)] text-[16px] tracking-[1px] uppercase text-[#efe7d2]">Notre Menu</p>
                  <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-full w-[32px] h-[32px] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowIcon className="w-[14px] h-[14px]" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Reservation Card */}
          <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }} className="flex-1 min-h-[180px] lg:min-h-0">
            <Link href="/reservation" className="flex-1 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] overflow-hidden relative group cursor-pointer block h-full min-h-[180px] lg:min-h-0">
              <img src={reservationImage} alt="Réservation" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-400" />
              <div className="absolute bottom-0 right-0 bg-[#0a0b0a] rounded-tl-[24px] pt-[12px] pl-[24px]">
                <div className="absolute bottom-0 left-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px] rotate-90" />
                </div>
                <div className="absolute right-0 top-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px]" />
                </div>
                <div className="flex gap-[12px] items-center justify-end pb-0">
                  <p className="font-[var(--font-forum)] text-[16px] tracking-[1px] uppercase text-[#efe7d2]">Réservation</p>
                  <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-full w-[32px] h-[32px] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowIcon className="w-[14px] h-[14px]" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* About Card */}
          <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }} className="flex-1 min-h-[180px] lg:min-h-0">
            <Link href="/about" className="flex-1 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] overflow-hidden relative group cursor-pointer block h-full min-h-[180px] lg:min-h-0">
              <img src={aboutImage} alt="Notre Histoire" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-400" />
              <div className="absolute bottom-0 right-0 bg-[#0a0b0a] rounded-tl-[24px] pt-[12px] pl-[24px]">
                <div className="absolute bottom-0 left-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px] rotate-90" />
                </div>
                <div className="absolute right-0 top-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px]" />
                </div>
                <div className="flex gap-[12px] items-center justify-end pb-0">
                  <p className="font-[var(--font-forum)] text-[16px] tracking-[1px] uppercase text-[#efe7d2]">Notre Histoire</p>
                  <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-full w-[32px] h-[32px] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowIcon className="w-[14px] h-[14px]" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
