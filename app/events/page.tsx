"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";
import { InstagramIcon } from "@/components/Icons";

const heroImage = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"; // Party/event


export default function Events() {
  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] h-auto lg:h-[calc(100vh-48px)]">
        {/* Left Hero Image */}
        <div className="flex-1 bg-black rounded-[16px] overflow-hidden relative min-h-[400px] lg:min-h-0">
          <img
            src={heroImage}
            alt="Events"
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
            Events
          </motion.h1>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px] self-stretch overflow-y-auto">
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col items-center justify-center gap-[48px] md:gap-[56px] lg:gap-[64px] py-[32px] md:py-[60px] lg:py-[80px] px-[24px] md:px-[60px] lg:px-[96px]">
            <motion.div
              className="flex flex-col gap-[32px] md:gap-[40px] lg:gap-[48px] items-center w-full max-w-[600px]"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Header */}
              <motion.div
                className="flex flex-col gap-[16px] md:gap-[20px] lg:gap-[24px] items-center w-full"
                variants={staggerItemVariants}
              >
                <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                  </div>
                  <p className="font-[var(--font-forum)] text-[28px] md:text-[34px] lg:text-[40px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                    Join Us
                  </p>
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                  </div>
                </div>
                <p className="text-[#efe7d2] text-[14px] md:text-[16px] lg:text-[18px] font-light leading-[1.8] text-center px-[16px]">
                  Restez informés de nos événements, dégustations spéciales, nouveautés saisonnières et actualités chez Saveurs Ramen.
                </p>
              </motion.div>

              {/* Instagram Card */}
              <motion.div
                className="flex flex-col gap-[24px] md:gap-[32px] items-center w-full"
                variants={staggerItemVariants}
              >
                <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[32px] md:p-[40px] lg:p-[48px] flex flex-col gap-[24px] md:gap-[28px] lg:gap-[32px] items-center w-full">
                  {/* Instagram Icon */}
                  <motion.div
                    className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] rounded-full bg-[rgba(239,231,210,0.1)] border border-[rgba(239,231,210,0.15)] flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <InstagramIcon className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] lg:w-[40px] lg:h-[40px]" />
                  </motion.div>

                  <div className="flex flex-col gap-[12px] md:gap-[16px] items-center">
                    <p className="font-[var(--font-forum)] text-[22px] md:text-[25px] lg:text-[28px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                      Follow Us on Instagram
                    </p>
                    <p className="text-[14px] md:text-[15px] lg:text-[16px] font-light leading-[1.8] text-[rgba(245,242,234,0.7)] text-center px-[8px]">
                      Get the latest updates on upcoming events, live entertainment, special menu items, and exclusive promotions.
                    </p>
                  </div>

                  {/* Instagram Button */}
                  <motion.a
                    href="https://www.instagram.com/saveurs_ramen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#efe7d2] rounded-[8px] px-[32px] md:px-[40px] lg:px-[48px] py-[14px] md:py-[15px] lg:py-[16px] text-[#0a0b0a] text-[12px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[#d4ccb8] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-[var(--font-forum)]">View Events on Instagram</span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                className="flex flex-col gap-[12px] md:gap-[16px] items-center w-full"
                variants={staggerItemVariants}
              >
                <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                  <div className="bg-[rgba(239,231,210,0.15)] h-px flex-1" />
                  <p className="font-[var(--font-forum)] text-[14px] md:text-[15px] lg:text-[16px] tracking-[1px] uppercase text-[#efe7d2] text-center">
                    Stay Connected
                  </p>
                  <div className="bg-[rgba(239,231,210,0.15)] h-px flex-1" />
                </div>
                <p className="text-[12px] md:text-[13px] lg:text-[14px] font-light leading-[1.8] text-[rgba(245,242,234,0.7)] text-center px-[16px]">
                  Live Music • Trivia Nights • Game Day Specials • Happy Hour • Private Events
                </p>
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
                Events
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
