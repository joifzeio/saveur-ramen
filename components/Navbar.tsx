"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Menu", href: "/menu" },
    { label: "Réservation", href: "/reservation" },
    { label: "Galerie", href: "/gallery" },
    { label: "À Propos", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <div className="absolute left-[12px] md:left-[32px] lg:left-[48px] top-[12px] md:top-[32px] lg:top-[48px] z-50 bg-[#0a0b0a] rounded-[12px] p-[8px] flex gap-[8px] md:gap-[12px] items-center">
        <button
          className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] w-[41px] h-[41px] flex flex-col gap-[5px] items-center justify-center hover:bg-[rgba(24,24,24,0.7)] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="bg-[#efe7d2] h-[1px] w-[20px]" />
          <div className="bg-[#efe7d2] h-[1px] w-[20px]" />
          <div className="bg-[#efe7d2] h-[1px] w-[20px]" />
        </button>

        <div className="py-[4px]">
          <Link href="/">
            <h2 className="font-[var(--font-forum)] text-[16px] md:text-[20px] text-[#efe7d2] tracking-[1px] uppercase whitespace-nowrap">
              Saveurs Ramen
            </h2>
          </Link>
        </div>

        <div className="hidden md:flex gap-[4px] items-center">
          <Link href="/menu" className="px-[12px] py-[12px] rounded-[8px] hover:bg-[rgba(24,24,24,0.5)] transition-colors">
            <p className="font-[var(--font-forum)] text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-[400]">Menu</p>
          </Link>
          <Link href="/about" className="px-[12px] py-[12px] rounded-[8px] hover:bg-[rgba(24,24,24,0.5)] transition-colors">
            <p className="font-[var(--font-forum)] text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-[400]">À Propos</p>
          </Link>
          <Link href="/reservation" className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] px-[12px] py-[12px] rounded-[8px] hover:bg-[rgba(24,24,24,0.7)] transition-colors">
            <p className="font-[var(--font-forum)] text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-[400]">Réserver</p>
          </Link>
        </div>
      </div>

      {/* Full-Screen Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-[#0a0b0a] z-[100] flex items-center justify-center"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute right-[12px] md:right-[32px] lg:right-[48px] top-[12px] md:top-[32px] lg:top-[48px] bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] w-[41px] h-[41px] flex items-center justify-center hover:bg-[rgba(24,24,24,0.7)] transition-colors"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <div className="relative w-[20px] h-[20px]">
              <div className="absolute top-1/2 left-0 bg-[#efe7d2] h-[1px] w-[20px] rotate-45 transform -translate-y-1/2" />
              <div className="absolute top-1/2 left-0 bg-[#efe7d2] h-[1px] w-[20px] -rotate-45 transform -translate-y-1/2" />
            </div>
          </button>

          {/* Menu Content */}
          <div
            className="flex flex-col gap-[16px] items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Divider */}
            <div className="flex items-center justify-center py-[7px]">
              <div className="flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
              <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
              <div className="flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
            </div>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="group px-[20px]"
              >
                <p className="font-[var(--font-forum)] text-[36px] md:text-[48px] lg:text-[64px] leading-none text-[#efe7d2] text-center uppercase hover:text-[rgba(239,231,210,0.7)] transition-colors">
                  {item.label}
                </p>
              </Link>
            ))}

            {/* Bottom Divider */}
            <div className="flex items-center justify-center py-[7px]">
              <div className="flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
              <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
              <div className="flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
