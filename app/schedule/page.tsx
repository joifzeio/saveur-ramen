"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

const heroImage = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"; // Sports game

// Sample game data
const todaysGames = [
  {
    id: 1,
    sport: "NFL",
    homeTeam: "Dallas Cowboys",
    awayTeam: "Philadelphia Eagles",
    time: "8:15 PM",
    channel: "ESPN",
    status: "live",
  },
  {
    id: 2,
    sport: "NBA",
    homeTeam: "Los Angeles Lakers",
    awayTeam: "Golden State Warriors",
    time: "10:00 PM",
    channel: "TNT",
    status: "upcoming",
  },
  {
    id: 3,
    sport: "NHL",
    homeTeam: "Boston Bruins",
    awayTeam: "Toronto Maple Leafs",
    time: "7:00 PM",
    channel: "ESPN+",
    status: "upcoming",
  },
];

const upcomingGames = [
  {
    id: 4,
    sport: "NFL",
    homeTeam: "Kansas City Chiefs",
    awayTeam: "Buffalo Bills",
    date: "Tomorrow",
    time: "1:00 PM",
    channel: "CBS",
  },
  {
    id: 5,
    sport: "NBA",
    homeTeam: "Miami Heat",
    awayTeam: "Brooklyn Nets",
    date: "Tomorrow",
    time: "7:30 PM",
    channel: "NBA TV",
  },
  {
    id: 6,
    sport: "Soccer",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    date: "Saturday",
    time: "12:30 PM",
    channel: "Peacock",
  },
];

function GameCard({ game, showDate = false }: { game: any; showDate?: boolean }) {
  return (
    <motion.div
      className="border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[16px] md:p-[20px] lg:p-[24px] bg-[rgba(24,24,24,0.3)] hover:bg-[rgba(24,24,24,0.5)] transition-colors"
      variants={staggerItemVariants}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-[12px] md:gap-[16px]">
        {/* Sport Badge */}
        <div className="flex items-center justify-between">
          <div className="bg-[rgba(239,231,210,0.1)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[12px] py-[6px]">
            <p className="font-[var(--font-forum)] text-[11px] md:text-[12px] tracking-[1px] uppercase text-[#efe7d2]">
              {game.sport}
            </p>
          </div>
        </div>

        {/* Teams */}
        <div className="flex flex-col gap-[8px]">
          <p className="font-[var(--font-forum)] text-[16px] md:text-[18px] lg:text-[20px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2]">
            {game.awayTeam}
          </p>
          <div className="flex items-center gap-[12px]">
            <div className="bg-[rgba(239,231,210,0.15)] h-px flex-1" />
            <p className="text-[11px] md:text-[12px] text-[rgba(245,242,234,0.7)] uppercase">vs</p>
            <div className="bg-[rgba(239,231,210,0.15)] h-px flex-1" />
          </div>
          <p className="font-[var(--font-forum)] text-[16px] md:text-[18px] lg:text-[20px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2]">
            {game.homeTeam}
          </p>
        </div>

        {/* Time & Channel */}
        <div className="flex items-center justify-between pt-[8px] border-t border-[rgba(239,231,210,0.15)]">
          <div className="flex flex-col gap-[4px]">
            {showDate && game.date && (
              <p className="text-[10px] md:text-[11px] tracking-[1px] uppercase text-[rgba(245,242,234,0.5)]">
                {game.date}
              </p>
            )}
            <p className="font-[var(--font-forum)] text-[14px] md:text-[16px] tracking-[1px] uppercase text-[#efe7d2]">
              {game.time}
            </p>
          </div>
          <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[10px] md:px-[12px] py-[6px]">
            <p className="text-[11px] md:text-[12px] text-[rgba(245,242,234,0.7)]">{game.channel}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Schedule() {
  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] h-auto lg:h-[calc(100vh-48px)]">
        {/* Left Hero Image */}
        <div className="flex-1 bg-black rounded-[16px] overflow-hidden relative min-h-[400px] lg:min-h-0">
          <img
            src={heroImage}
            alt="Games Schedule"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[381px] bg-gradient-to-b from-transparent to-black opacity-60" />
          <Navbar />
          <motion.h1
            className="absolute bottom-[80px] md:bottom-[120px] lg:bottom-[156px] left-[24px] md:left-[48px] lg:left-[67px] font-[var(--font-forum)] text-[56px] md:text-[88px] lg:text-[112px] leading-none tracking-[2px] uppercase text-[#efe7d2]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Game<br />Schedule
          </motion.h1>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px] self-stretch overflow-y-auto">
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col gap-[32px] md:gap-[48px] py-[32px] md:py-[48px] px-[24px] md:px-[48px] lg:px-[64px]">
            {/* Tonight's Games */}
            <div className="flex flex-col gap-[24px] md:gap-[32px] w-full">
              <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                <div className="hidden sm:flex items-center justify-center py-[7px]">
                  <div className="flex items-center justify-center rotate-45">
                    <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                  </div>
                  <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                </div>
                <p className="font-[var(--font-forum)] text-[24px] md:text-[28px] lg:text-[32px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                  Tonight's Games
                </p>
                <div className="hidden sm:flex items-center justify-center py-[7px]">
                  <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                  <div className="flex items-center justify-center rotate-45">
                    <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                  </div>
                </div>
              </div>

              <motion.div
                className="flex flex-col gap-[16px] w-full"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {todaysGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </motion.div>
            </div>

            {/* Upcoming Games */}
            <div className="flex flex-col gap-[24px] md:gap-[32px] w-full">
              <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                <div className="hidden sm:flex items-center justify-center py-[7px]">
                  <div className="flex items-center justify-center rotate-45">
                    <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                  </div>
                  <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                </div>
                <p className="font-[var(--font-forum)] text-[24px] md:text-[28px] lg:text-[32px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                  Coming Up
                </p>
                <div className="hidden sm:flex items-center justify-center py-[7px]">
                  <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                  <div className="flex items-center justify-center rotate-45">
                    <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                  </div>
                </div>
              </div>

              <motion.div
                className="flex flex-col gap-[16px] w-full"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {upcomingGames.map((game) => (
                  <GameCard key={game.id} game={game} showDate />
                ))}
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
                Schedule
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
