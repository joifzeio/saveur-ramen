"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { InstagramIcon, ArrowIcon, RoundedCorner } from "@/components/Icons";

// Ramen & Japanese food images from Unsplash
const heroImage = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1920&q=80";
const menuImage = "/images/1773751229599.jpeg";
const reservationImage = "/images/1773751447746.jpeg";
const aboutImage = "/images/1773752216793.jpeg";

export default function Home() {
  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px] relative">
      <Navbar />
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

          {/* Hero Text */}
          <motion.div
            className="absolute inset-x-0 bottom-[120px] lg:inset-auto lg:left-[77px] lg:bottom-[48px] z-10 flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-[var(--font-forum)] text-[64px] md:text-[100px] lg:text-[140px] leading-[1.1] tracking-[2px] md:tracking-[3px] uppercase text-[#efe7d2]">
              Ramen<br />Artisanaux
            </h1>
          </motion.div>

          {/* Social Media Card - Hidden on Mobile to let text breathe, shown on desktop */}
          <motion.div
            className="absolute bottom-0 right-0 bg-[#0a0b0a] rounded-tl-[24px] p-[24px] pb-[16px] hidden lg:block z-20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Rounded Corners */}
            <div className="absolute bottom-0 left-[-24px] w-[24px] h-[24px] overflow-hidden">
              <RoundedCorner className="w-[24px] h-[24px] rotate-90" />
            </div>
            <div className="absolute right-0 top-[-24px] w-[24px] h-[24px] overflow-hidden">
              <RoundedCorner className="w-[24px] h-[24px]" />
            </div>

            <div className="flex gap-[8px] items-center">
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
          className="w-full lg:w-[420px] flex flex-col gap-[12px] md:gap-[16px] h-auto lg:h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Menu Card */}
          <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }} className="flex-1 aspect-square sm:aspect-[4/3] lg:aspect-auto lg:min-h-0">
            <Link href="/menu" className="block rounded-[16px] overflow-hidden relative group cursor-pointer h-full w-full">
              <Image src={menuImage} alt="Menu" fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
              <div className="absolute bottom-0 right-0 bg-[#0a0b0a] rounded-tl-[24px] pt-[12px] pl-[24px] z-10 transition-transform duration-300">
                <div className="absolute bottom-0 left-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px] rotate-90" />
                </div>
                <div className="absolute right-0 top-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px]" />
                </div>
                <div className="flex gap-[12px] items-center justify-end pb-0">
                  <p className="font-[var(--font-forum)] text-[14px] md:text-[16px] tracking-[1.5px] uppercase text-[#efe7d2]">Menu</p>
                  <div className="border border-[rgba(239,231,210,0.15)] rounded-full w-[32px] h-[32px] flex items-center justify-center group-hover:bg-[#efe7d2] group-hover:text-[#0a0b0a] transition-all duration-300">
                    <ArrowIcon className="w-[14px] h-[14px]" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Reservation Card */}
          <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }} className="flex-1 aspect-square sm:aspect-[4/3] lg:aspect-auto lg:min-h-0">
            <Link href="/reservation" className="block rounded-[16px] overflow-hidden relative group cursor-pointer h-full w-full">
              <Image src={reservationImage} alt="Réservation" fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
              <div className="absolute bottom-0 right-0 bg-[#0a0b0a] rounded-tl-[24px] pt-[12px] pl-[24px] z-10 transition-transform duration-300">
                <div className="absolute bottom-0 left-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px] rotate-90" />
                </div>
                <div className="absolute right-0 top-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px]" />
                </div>
                <div className="flex gap-[12px] items-center justify-end pb-0">
                  <p className="font-[var(--font-forum)] text-[14px] md:text-[16px] tracking-[1.5px] uppercase text-[#efe7d2]">Réservation</p>
                  <div className="border border-[rgba(239,231,210,0.15)] rounded-full w-[32px] h-[32px] flex items-center justify-center group-hover:bg-[#efe7d2] group-hover:text-[#0a0b0a] transition-all duration-300">
                    <ArrowIcon className="w-[14px] h-[14px]" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* About Card */}
          <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }} className="flex-1 aspect-square sm:aspect-[4/3] lg:aspect-auto lg:min-h-0">
            <Link href="/about" className="block rounded-[16px] overflow-hidden relative group cursor-pointer h-full w-full">
              <Image src={aboutImage} alt="Notre Histoire" fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
              <div className="absolute bottom-0 right-0 bg-[#0a0b0a] rounded-tl-[24px] pt-[12px] pl-[24px] z-10 transition-transform duration-300">
                <div className="absolute bottom-0 left-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px] rotate-90" />
                </div>
                <div className="absolute right-0 top-[-24px] w-[24px] h-[24px] overflow-hidden">
                  <RoundedCorner className="w-[24px] h-[24px]" />
                </div>
                <div className="flex gap-[12px] items-center justify-end pb-0">
                  <p className="font-[var(--font-forum)] text-[14px] md:text-[16px] tracking-[1.5px] uppercase text-[#efe7d2]">Le Restaurant</p>
                  <div className="border border-[rgba(239,231,210,0.15)] rounded-full w-[32px] h-[32px] flex items-center justify-center group-hover:bg-[#efe7d2] group-hover:text-[#0a0b0a] transition-all duration-300">
                    <ArrowIcon className="w-[14px] h-[14px]" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Mobile-only Footer */}
          <motion.div 
            className="lg:hidden flex flex-col items-center justify-center py-[40px] gap-[16px] border border-[rgba(239,231,210,0.1)] rounded-[16px] mt-[12px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center justify-center rotate-45 mb-[8px]">
              <div className="border border-[rgba(239,231,210,0.3)] w-[6px] h-[6px]" />
            </div>
            <p className="font-[var(--font-forum)] text-[12px] tracking-[2px] text-[#efe7d2] uppercase">
              © Saveurs Ramen
            </p>
            <p className="font-[var(--font-forum)] text-[10px] tracking-[1px] text-[#efe7d2] uppercase opacity-60">
              Mentions Légales
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
