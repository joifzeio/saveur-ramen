"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";
import { InstagramIcon, ArrowIcon } from "@/components/Icons";

const heroImage = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1920&q=80"; // Ramen bowl
const foodImage1 = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80"; // Ramen bowl ✓
const foodImage2 = "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80"; // Ramen close-up ✓
const foodImage3 = "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&q=80"; // Ramen steam ✓


const openingHours = [
  { day: "Lundi", hours: "11h30 – 14h30 & 18h30 – 22h30" },
  { day: "Mardi", hours: "11h30 – 14h30 & 18h30 – 22h30" },
  { day: "Mercredi", hours: "11h30 – 14h30 & 18h30 – 22h30" },
  { day: "Jeudi", hours: "11h30 – 14h30 & 18h30 – 22h30" },
  { day: "Vendredi", hours: "11h30 – 22h30" },
  { day: "Samedi", hours: "11h30 – 14h30 & 18h30 – 22h30" },
  { day: "Dimanche", hours: "11h30 – 14h30 & 18h30 – 22h30" },
];

export default function Contact() {
  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] h-auto lg:h-[calc(100vh-48px)]">
        {/* Left Hero Image */}
        <div className="flex-1 bg-black rounded-[16px] overflow-hidden relative min-h-[400px] lg:min-h-0">
          <img
            src={heroImage}
            alt="Contact Saveurs Ramen"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[381px] bg-gradient-to-b from-transparent to-black opacity-60" />
          <Navbar />
          <motion.h1
            className="absolute bottom-[80px] md:bottom-[120px] lg:bottom-[156px] left-[24px] md:left-[48px] lg:left-[67px] font-[var(--font-forum)] text-[64px] md:text-[88px] lg:text-[112px] leading-none tracking-[2px] uppercase text-[#efe7d2]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Contact
          </motion.h1>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px] self-stretch overflow-y-auto">
          <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px]">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px]">
              {/* Opening Hours Card */}
              <motion.div
                className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col items-start justify-between py-[24px] md:py-[32px] px-[24px] md:px-[32px] gap-[16px] min-h-[300px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
                  </div>
                  <p className="font-[var(--font-forum)] text-[18px] md:text-[20px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                    Horaires d&apos;Ouverture
                  </p>
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                  </div>
                </div>
                <motion.div
                  className="flex flex-col gap-[12px] w-full"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {openingHours.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-[16px] items-end w-full"
                      variants={staggerItemVariants}
                    >
                      <p className="font-light text-[13px] md:text-[14px] leading-[1.6] text-[#efe7d2] whitespace-nowrap">
                        {item.day}
                      </p>
                      <div className="flex-1 flex flex-col gap-[10px] items-end py-[4px]">
                        <div className="border-b border-dashed border-[rgba(239,231,210,0.15)] h-px w-full" />
                      </div>
                      <p className="font-light text-[11px] md:text-[12px] leading-[1.6] text-[#efe7d2] text-right whitespace-nowrap">
                        {item.hours}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Image Grid */}
              <div className="w-full lg:w-[360px] flex flex-col gap-[12px] md:gap-[16px] shrink-0 min-h-[300px] lg:min-h-0">
                <div className="flex-1 flex gap-[12px] md:gap-[16px]">
                  {/* Instagram Overlay Image */}
                  <motion.a
                    href="https://www.instagram.com/saveurs_ramen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black flex-1 rounded-[16px] overflow-hidden relative block cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={foodImage1}
                      alt="Ramen"
                      className="w-full h-full object-cover opacity-30"
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <InstagramIcon className="w-[30px] h-[30px] md:w-[36px] md:h-[36px]" />
                    </motion.div>
                  </motion.a>
                  {/* Food Image 1 */}
                  <motion.div
                    className="bg-black flex-1 rounded-[16px] overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={foodImage2}
                      alt="Gyoza"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                </div>
                <div className="flex-1 flex gap-[12px] md:gap-[16px]">
                  {/* Food Image 2 */}
                  <motion.div
                    className="bg-black flex-1 rounded-[16px] overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={foodImage3}
                      alt="Plats japonais"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                  {/* Food Image 3 */}
                  <motion.div
                    className="bg-black flex-1 rounded-[16px] overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={foodImage1}
                      alt="Ramen bowl"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] min-h-[400px]">
              {/* Map — Rennes 9 Rue de Châtillon */}
              <motion.div
                className="bg-black flex-1 rounded-[16px] overflow-hidden relative h-[400px] lg:h-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2667.776!2d-1.6742873!3d48.1022349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ede2b8a4b3d7d%3A0xabcdef123456!2s9%20Rue%20de%20Ch%C3%A2tillon%2C%2035000%20Rennes%2C%20France!5e0!3m2!1sfr!2sfr!4v1710286000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <div className="absolute bottom-[-0.5px] right-0 bg-[#0a0b0a] rounded-tl-[16px] md:rounded-tl-[24px] pt-[10px] md:pt-[12px] pl-[20px] md:pl-[24px]">
                  <motion.a
                    href="https://maps.google.com/?q=9+Rue+de+Châtillon,+35000+Rennes,+France"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-[10px] md:gap-[12px] items-center justify-end pb-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-[var(--font-forum)] text-[14px] md:text-[16px] tracking-[1px] uppercase text-[#efe7d2] leading-none">
                      Itinéraire
                    </p>
                    <motion.div
                      className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-full w-[28px] md:w-[32px] h-[28px] md:h-[32px] flex items-center justify-center"
                      whileHover={{ rotate: 45 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowIcon className="w-[14px] md:w-[16px] h-[14px] md:h-[16px]" />
                    </motion.div>
                  </motion.a>
                </div>
              </motion.div>

              {/* Get in Touch Card */}
              <motion.div
                className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col items-start justify-between py-[24px] md:py-[28px] lg:py-[32px] px-[24px] md:px-[28px] lg:px-[32px] min-h-[280px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
                  </div>
                  <p className="font-[var(--font-forum)] text-[18px] md:text-[20px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                    Nous Contacter
                  </p>
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                  </div>
                </div>
                <motion.div
                  className="flex flex-col gap-[14px] md:gap-[16px] w-full"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="flex gap-[12px] md:gap-[16px] items-start w-full" variants={staggerItemVariants}>
                    <p className="text-[10px] md:text-[11px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.3] w-[70px] md:w-[80px]">
                      Adresse
                    </p>
                    <div className="flex-1 font-light text-[13px] md:text-[14px] leading-[1.6] text-[#efe7d2] text-right">
                      <p className="mb-0">9 Rue de Châtillon,</p>
                      <p>35000 Rennes, France</p>
                      <p className="text-[11px] text-[rgba(239,231,210,0.6)]">Gare Sud — proche de la gare</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex gap-[12px] md:gap-[16px] items-start w-full" variants={staggerItemVariants}>
                    <p className="text-[10px] md:text-[11px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.3] w-[70px] md:w-[80px]">
                      Téléphone
                    </p>
                    <a
                      href="tel:+33299774348"
                      className="flex-1 font-light text-[13px] md:text-[14px] leading-[1.6] text-[#efe7d2] text-right hover:text-[rgba(239,231,210,0.7)] transition-colors"
                    >
                      +33 2 99 77 43 48
                    </a>
                  </motion.div>
                  <motion.div className="flex gap-[12px] md:gap-[16px] items-start w-full" variants={staggerItemVariants}>
                    <p className="text-[10px] md:text-[11px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.3] w-[70px] md:w-[80px]">
                      Note
                    </p>
                    <div className="flex-1 font-light text-[13px] md:text-[14px] leading-[1.6] text-[#efe7d2] text-right">
                      ⭐ 4,7 / 5 · 1 471 avis Google
                    </div>
                  </motion.div>
                  <motion.div className="flex gap-[12px] md:gap-[16px] items-start w-full" variants={staggerItemVariants}>
                    <p className="text-[10px] md:text-[11px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.3] w-[70px] md:w-[80px]">
                      Suivre
                    </p>
                    <div className="flex-1 flex gap-[10px] md:gap-[12px] items-center justify-end">
                      <motion.a
                        href="https://www.instagram.com/saveurs_ramen/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[16px] md:w-[18px] h-[16px] md:h-[18px]"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <InstagramIcon className="w-[16px] md:w-[18px] h-[16px] md:h-[18px]" />
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
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
                Contact
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
