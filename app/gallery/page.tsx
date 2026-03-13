"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

// ─── Gallery photos ────────────────────────────────────────────────────────
// Replace these Unsplash URLs with actual restaurant photos before launch.
// Each entry: { src, alt, category, span } where span controls grid size.
const photos = [
  // Row 1 – wide hero
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=85",
    alt: "Ramen bowl Saveurs Ramen",
    category: "Plats",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=85",
    alt: "Ramen vapeur",
    category: "Plats",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=85",
    alt: "Détail ramen",
    category: "Plats",
    span: "col-span-1 row-span-1",
  },
  // Row 2
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=85",
    alt: "Gyoza maison",
    category: "Tapas",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85",
    alt: "Bowl végétarien",
    category: "Plats",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=85",
    alt: "Ambiance restaurant",
    category: "Ambiance",
    span: "col-span-2 row-span-1",
  },
  // Row 3
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=85",
    alt: "Ramen du chef",
    category: "Plats",
    span: "col-span-1 row-span-2",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=85",
    alt: "Cuisine ouverte",
    category: "Ambiance",
    span: "col-span-1 row-span-1",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=85",
    alt: "Préparation des ramens",
    category: "Ambiance",
    span: "col-span-2 row-span-1",
  },
  // Row 4
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85",
    alt: "Table dressée",
    category: "Ambiance",
    span: "col-span-1 row-span-1",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=85",
    alt: "Salle du restaurant",
    category: "Ambiance",
    span: "col-span-1 row-span-1",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=85",
    alt: "Soirée conviviale",
    category: "Clients",
    span: "col-span-2 row-span-1",
  },
];

const categories = ["Tous", "Plats", "Tapas", "Ambiance", "Clients"];

// ─── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({
  photo,
  onClose,
}: {
  photo: (typeof photos)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-[16px] md:p-[32px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-[90vw] max-h-[85vh] rounded-[16px] overflow-hidden"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-w-full max-h-[85vh] object-contain rounded-[16px]"
        />
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-[24px] py-[20px] rounded-b-[16px]">
          <p className="font-[var(--font-forum)] text-[18px] tracking-[1px] uppercase text-[#efe7d2]">
            {photo.alt}
          </p>
          <p className="text-[12px] tracking-[1px] uppercase text-[rgba(239,231,210,0.6)]">
            {photo.category}
          </p>
        </div>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-[16px] right-[16px] bg-[rgba(0,0,0,0.6)] border border-[rgba(239,231,210,0.2)] rounded-full w-[36px] h-[36px] flex items-center justify-center text-[#efe7d2] hover:bg-[rgba(0,0,0,0.9)] transition-colors text-[18px]"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [lightboxPhoto, setLightboxPhoto] = useState<(typeof photos)[0] | null>(null);

  const filtered =
    activeCategory === "Tous"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      {/* Hero */}
      <div className="relative rounded-[16px] overflow-hidden mb-[16px] min-h-[320px] md:min-h-[400px] bg-black">
        <img
          src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1920&q=80"
          alt="Galerie Saveurs Ramen"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b0a]" />
        <Navbar />
        <motion.div
          className="absolute bottom-[40px] left-[24px] md:left-[48px] lg:left-[77px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-[var(--font-forum)] text-[64px] md:text-[100px] lg:text-[130px] leading-none tracking-[2px] uppercase text-[#efe7d2]">
            Galerie
          </h1>
          <p className="text-[rgba(239,231,210,0.7)] text-[14px] md:text-[16px] font-light mt-[8px]">
            Nos moments, nos saveurs, notre ambiance
          </p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap gap-[8px] md:gap-[12px] justify-center mb-[24px] md:mb-[32px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-[20px] md:px-[28px] py-[10px] rounded-[8px] text-[11px] md:text-[12px] tracking-[1.5px] uppercase font-[400] transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[#efe7d2] text-[#0a0b0a]"
                : "border border-[rgba(239,231,210,0.2)] text-[rgba(239,231,210,0.7)] hover:border-[rgba(239,231,210,0.5)] hover:text-[#efe7d2]"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Masonry Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-2 md:grid-cols-4 gap-[8px] md:gap-[12px] auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              className={`relative rounded-[12px] overflow-hidden cursor-pointer group bg-[rgba(24,24,24,0.5)] ${
                activeCategory === "Tous" ? photo.span : "col-span-1 row-span-1"
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setLightboxPhoto(photo)}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent px-[16px] py-[16px]">
                <p className="font-[var(--font-forum)] text-[14px] md:text-[16px] tracking-[1px] uppercase text-[#efe7d2] leading-tight">
                  {photo.alt}
                </p>
                <p className="text-[10px] md:text-[11px] tracking-[1px] uppercase text-[rgba(239,231,210,0.6)] mt-[2px]">
                  {photo.category}
                </p>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-[12px] right-[12px] w-[32px] h-[32px] rounded-full bg-black/50 border border-[rgba(239,231,210,0.2)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#efe7d2] text-[14px]">
                ⤢
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex items-center justify-center py-[20px] px-[24px] mt-[16px]">
        <div className="flex gap-[16px] items-center">
          <p className="text-[#efe7d2] text-[14px] font-light leading-[1.5]">
            Saveurs Ramen
          </p>
          <div className="flex items-center justify-center rotate-45">
            <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
          </div>
          <p className="text-[#efe7d2] text-[14px] font-light leading-[1.5]">
            Galerie
          </p>
          <div className="flex items-center justify-center rotate-45">
            <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
          </div>
          <p className="text-[#efe7d2] text-[14px] font-light leading-[1.5]">
            2026
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
