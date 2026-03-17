"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { StarIcon } from "@/components/Icons";

const heroImage = "/images/1773751200471.jpeg"; // Ramen bowl ✓
const interiorImage1 = "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80"; // Ramen steam ✓
const chefsImage = "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80"; // Ramen close-up ✓


function StarRating() {
  return (
    <div className="flex gap-[4px] items-center justify-center py-[7px]">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className="w-[16px] h-[16px]" />
      ))}
    </div>
  );
}

function ReviewCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col gap-[9px] items-center justify-center p-[20px] md:p-[24px] self-stretch min-h-[140px]">
      <StarRating />
      <div className="flex flex-col gap-[4px] items-center tracking-[1px] uppercase">
        <p className="font-[var(--font-forum)] text-[16px] md:text-[20px] leading-[1.2] text-[#efe7d2] text-center">
          {title}
        </p>
        <div className="text-[10px] md:text-[11px] leading-[1.3] text-[rgba(245,242,234,0.7)] text-center">
          <p className="mb-0">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] h-auto lg:h-[calc(100vh-48px)]">
        {/* Left Hero Image */}
        <div className="flex-1 bg-black rounded-[16px] overflow-hidden relative min-h-[400px] lg:min-h-0">
          <img
            src={heroImage}
            alt="À Propos de Saveurs Ramen"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[381px] bg-gradient-to-b from-transparent to-black opacity-60" />
          <Navbar />
          <h1 className="absolute bottom-[80px] md:bottom-[120px] lg:bottom-[156px] left-[24px] md:left-[48px] lg:left-[67px] font-[var(--font-forum)] text-[64px] md:text-[88px] lg:text-[112px] leading-none tracking-[2px] uppercase text-[#efe7d2]">
            À Propos
          </h1>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px] self-stretch">
          <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px]">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] flex-1">
              {/* Text Card */}
              <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col items-start justify-between p-[24px] md:p-[32px] gap-[16px] min-h-[200px]">
                <p className="font-[var(--font-forum)] text-[22px] md:text-[28px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] w-full">
                  Bienvenue chez Saveurs Ramen
                </p>
                <p className="font-light text-[13px] md:text-[14px] leading-[1.6] text-[#efe7d2] w-full">
                  Ramen artisanaux, bouillons mijotés avec amour pendant des heures, saveurs uniques et ambiance familiale. Situés en plein cœur de Rennes, juste derrière la gare — venez vous laisser transporter au Japon le temps d'un repas.
                </p>
              </div>

              {/* Interior Image */}
              <div className="bg-black w-full lg:w-[330px] h-[250px] md:h-[280px] lg:h-[330px] rounded-[16px] overflow-hidden shrink-0">
                <img
                  src={interiorImage1}
                  alt="Intérieur Saveurs Ramen"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Review Cards */}
            <div className="flex flex-col sm:flex-row gap-[12px] md:gap-[16px]">
              <ReviewCard title="Bouillons Artisanaux" subtitle="Mijotés pendant des heures" />
              <ReviewCard title="Saveurs Uniques" subtitle="Ramen, Gyoza & Tapas" />
              <ReviewCard title="Ambiance Familiale" subtitle="Proche de la Gare de Rennes" />
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] flex-1">
              {/* Kitchen Image */}
              <div className="bg-black w-full lg:w-[330px] h-[250px] md:h-[280px] lg:h-[330px] rounded-[16px] overflow-hidden shrink-0">
                <img
                  src={chefsImage}
                  alt="Notre Cuisine"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Our Mission Card */}
              <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col items-start justify-between p-[24px] md:p-[32px] gap-[16px] min-h-[200px]">
                <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
                  </div>
                  <p className="font-[var(--font-forum)] text-[18px] md:text-[20px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                    Notre Philosophie
                  </p>
                  <div className="hidden sm:flex items-center justify-center py-[7px]">
                    <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
                    <div className="flex items-center justify-center rotate-45">
                      <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                    </div>
                  </div>
                </div>
                <p className="font-light text-[13px] md:text-[14px] leading-[1.6] text-[#efe7d2] w-full">
                  Chez Saveurs Ramen, notre mission est de vous offrir une expérience authentique du Japon à Rennes. Chaque bol est préparé avec soin : bouillons mijotés des heures, ingrédients frais sélectionnés chaque jour, et une attention particulière portée à chaque détail. Notés 4,7/5 par plus de 1 400 clients, nous sommes fiers de faire partie du quotidien des Rennais.
                </p>
              </div>
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
                À Propos
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
