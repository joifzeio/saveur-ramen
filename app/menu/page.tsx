"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";
import { LeafIcon } from "@/components/Icons";

// Verified working Unsplash ramen/food images
const RAMEN_A = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80";
const RAMEN_B = "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&q=80";
const RAMEN_C = "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80";
const RAMEN_D = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80";
const RAMEN_E = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80";

const heroImage = "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=1920&q=80";

// ─── Real menu data from Google Maps (June 2025) ────────────────────────────
const menuData = {
  ramen: [
    {
      name: "Miso",
      description: "Bouillon de porc au miso fermenté. Chashu de porc, huile d'ail, œuf mariné, bambou mariné, épinards, maïs, germes de soja, oignon vert.",
      price: "15.90 €",
      image: RAMEN_A,
      vegetarian: false,
    },
    {
      name: "Crème Miso",
      description: "Bouillon de porc au miso et crème lactose-free. Poulet frit, légumes, œuf mariné, bambou mariné, épinards, maïs, germes de soja, oignon vert.",
      price: "16.90 €",
      image: RAMEN_B,
      vegetarian: false,
    },
    {
      name: "Chaud — Tan Tan Men",
      description: "Bouillon de poulet à la pâte de sésame traditionnelle et sauce piquante (niveau épice ajustable). Ragoût de bœuf, œuf, bambou, épinards, naruto, germes de soja, oignon vert, chili séché, sésame.",
      price: "15.90 €",
      image: RAMEN_C,
      vegetarian: false,
    },
    {
      name: "Shoyu",
      description: "Bouillon de porc à la sauce soja, saveur douce-salée. Chashu de porc, œuf mariné, bambou mariné, poireau, épinards, sésame, sésame noir, nori.",
      price: "15.90 €",
      image: RAMEN_A,
      vegetarian: false,
    },
    {
      name: "Shio",
      description: "Bouillon de poulet léger au sel japonais et algues marines. Poulet grillé, œuf mariné, bambou mariné, poireau, épinards, naruto, nori.",
      price: "15.90 €",
      image: RAMEN_B,
      vegetarian: false,
    },
    {
      name: "Végétarien Miso",
      description: "Bouillon de légumes et miso blanc. Tofu frit, légumes, œuf mariné (en option), bambou mariné, épinards, maïs, germes de soja, sésame.",
      price: "16.50 €",
      image: RAMEN_E,
      vegetarian: true,
    },
    {
      name: "Gyukotsu Rouge",
      description: "Bouillon traditionnel d'os de bœuf à la tomate. Bœuf à la tomate, œuf mariné, bambou mariné, germes de soja, oignon vert.",
      price: "16.90 €",
      image: RAMEN_C,
      vegetarian: false,
    },
    {
      name: "Végétalien",
      description: "Base lait de soja, crémeux et savoureux. Tofu frit, pois chiches, bambou mariné, épinards, germes de soja, oignons frits, oignon vert, maïs.",
      price: "13.90 €",
      image: RAMEN_E,
      vegetarian: true,
    },
    {
      name: "Kinoko Supu",
      description: "Bouillon délicat aux champignons et huile de cèpes. Tofu frit, épinards, champignons shiitake, germes de soja, mini maïs, huile de cèpes.",
      price: "13.90 €",
      image: RAMEN_B,
      vegetarian: true,
    },
    {
      name: "Ebi Supu",
      description: "Bouillon à base de poisson aromatisé aux crevettes et thon fumé. Crevettes argentines, naruto, oignon vert, germes de soja, bambou mariné, épinards, œuf mariné.",
      price: "18.90 €",
      image: RAMEN_A,
      vegetarian: false,
    },
    {
      name: "Gyukotsu Shio",
      description: "Bouillon d'os de bœuf mijoté pendant 10 heures. Chashu de bœuf, œuf mariné, oignon vert, bambou mariné, épinards.",
      price: "16.90 €",
      image: RAMEN_C,
      vegetarian: false,
    },
  ],
  plats: [
    {
      name: "Crevettes Croustillantes à l'Ail",
      description: "Crevettes dorées à l'ail, servies avec une sauce maison.",
      price: "13.90 €",
      image: RAMEN_D,
      vegetarian: false,
    },
    {
      name: "Bo Bun Classique au Poulet",
      description: "Vermicelles de riz, poulet grillé, légumes frais, cacahuètes, sauce nuoc-mâm.",
      price: "13.50 €",
      image: RAMEN_E,
      vegetarian: false,
    },
    {
      name: "Udon au Poulet",
      description: "Nouilles udon en bouillon de poulet, garnitures fraîches.",
      price: "12.90 €",
      image: RAMEN_A,
      vegetarian: false,
    },
    {
      name: "Riz au Curry Ebi",
      description: "Riz sauté au curry japonais avec crevettes.",
      price: "11.90 €",
      image: RAMEN_B,
      vegetarian: false,
    },
    {
      name: "Riz Sauté du Chef",
      description: "Riz sauté à la japonaise avec légumes et sauce du chef.",
      price: "10.50 €",
      image: RAMEN_D,
      vegetarian: false,
    },
    {
      name: "Riz au Curry Poulet",
      description: "Riz sauté au curry japonais avec poulet grillé.",
      price: "10.90 €",
      image: RAMEN_C,
      vegetarian: false,
    },
    {
      name: "Riz et Porc au Caramel",
      description: "Riz avec porc laqué au caramel à la japonaise.",
      price: "12.90 €",
      image: RAMEN_A,
      vegetarian: false,
    },
  ],
  tapas: [
    {
      name: "Nems Porc (4 pcs)",
      description: "Rouleaux croustillants au porc, sauce trempette.",
      price: "5.00 €",
      image: RAMEN_D,
      vegetarian: false,
    },
    {
      name: "Nems Poulet (4 pcs)",
      description: "Rouleaux croustillants au poulet, sauce trempette.",
      price: "4.50 €",
      image: RAMEN_D,
      vegetarian: false,
    },
    {
      name: "Karaage (8 pcs)",
      description: "Poulet mariné frit à la japonaise, croustillant et juteux.",
      price: "6.00 €",
      image: RAMEN_C,
      vegetarian: false,
    },
    {
      name: "Gyoza Poulet (5 pcs)",
      description: "Raviolis japonais au poulet, poêlés et dorés.",
      price: "6.00 €",
      image: RAMEN_A,
      vegetarian: false,
    },
    {
      name: "Ebi Gyoza (5 pcs)",
      description: "Raviolis japonais aux crevettes, poêlés et dorés.",
      price: "6.90 €",
      image: RAMEN_B,
      vegetarian: false,
    },
    {
      name: "Tempura (5 pcs)",
      description: "Beignets de crevettes en pâte légère japonaise.",
      price: "7.00 €",
      image: RAMEN_C,
      vegetarian: false,
    },
    {
      name: "Takoyaki (6 pcs)",
      description: "Boulettes de poulpe à l'osaka, sauce takoyaki, mayonnaise, bonite.",
      price: "6.50 €",
      image: RAMEN_D,
      vegetarian: false,
    },
    {
      name: "Edamame",
      description: "Fèves de soja au sel, servies dans leur cosse.",
      price: "5.00 €",
      image: RAMEN_E,
      vegetarian: true,
    },
    {
      name: "Wakame",
      description: "Salade d'algues wakame assaisonnée à la japonaise.",
      price: "5.00 €",
      image: RAMEN_E,
      vegetarian: true,
    },
  ],
  desserts: [
    {
      name: "Mochis Glacés",
      description: "Noix de coco · Pistache · Chocolat · Vanille · Passion & Mangue · Citron & Yuzu",
      price: "à partir de 3.50 €",
      image: RAMEN_D,
      vegetarian: true,
    },
  ],
  boissons: [
    {
      name: "Cocktails",
      description: "Coconut King · Caribbean Sun · Paradise Dream · Virgin Mojito · Piña Colada · Sex on the Beach · Mojito",
      price: "6.50 € – 7.50 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "Bières Japonaises",
      description: "Asahi · Kirin · Tsingtao — bières importées du Japon et d'Asie.",
      price: "4.50 €",
      image: RAMEN_B,
      vegetarian: true,
    },
    {
      name: "Vins",
      description: "Vins blancs, rosés et rouges sélectionnés. Bourgogne Chardonnay, Saint-Émilion Grand Cru, Côtes du Rhône, vins BIB au verre.",
      price: "4.00 € – 95.00 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "Digestifs & Saké",
      description: "Get 27 · Cognac Rémy Martin · Rhum Don Papa · Saké Japonais · Riz au Saké",
      price: "3.50 € – 8.00 €",
      image: RAMEN_C,
      vegetarian: true,
    },
  ],
};

const categories: { key: keyof typeof menuData; label: string }[] = [
  { key: "ramen", label: "Nos Ramen" },
  { key: "plats", label: "Plats" },
  { key: "tapas", label: "Tapas & Entrées" },
  { key: "desserts", label: "Desserts" },
  { key: "boissons", label: "Boissons" },
];

const categoryLabels: Record<string, string> = {
  ramen: "Nos Ramen",
  plats: "Plats",
  tapas: "Tapas & Entrées",
  desserts: "Desserts",
  boissons: "Boissons",
};

function LeafBadge() {
  return <LeafIcon className="w-[16px] h-[16px]" />;
}

function MenuItem({ item }: { item: any }) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className="flex gap-[16px] md:gap-[20px] items-start border-b border-[rgba(239,231,210,0.08)] pb-[20px] md:pb-[24px] last:border-b-0 last:pb-0"
    >
      <div className="relative w-[80px] h-[80px] md:w-[96px] md:h-[96px] flex-shrink-0 rounded-[8px] overflow-hidden bg-[rgba(24,24,24,0.5)]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-[12px] flex-wrap">
          <div className="flex items-center gap-[8px] flex-wrap">
            <h3 className="font-[var(--font-forum)] text-[16px] md:text-[18px] tracking-[0.5px] uppercase text-[#efe7d2] leading-tight">
              {item.name}
            </h3>
            {item.vegetarian && <LeafBadge />}
          </div>
          <span className="font-[var(--font-forum)] text-[15px] md:text-[16px] text-[#efe7d2] whitespace-nowrap flex-shrink-0">
            {item.price}
          </span>
        </div>
        <p className="text-[rgba(239,231,210,0.6)] text-[12px] md:text-[13px] font-light leading-[1.6] mt-[6px]">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof menuData>("ramen");
  const activeItems = menuData[activeCategory];

  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col gap-[12px] md:gap-[16px]">
        {/* Hero */}
        <div className="relative rounded-[16px] overflow-hidden bg-black min-h-[300px] md:min-h-[380px]">
          <img
            src={heroImage}
            alt="Menu Saveurs Ramen"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0b0a]" />
          <Navbar />
          <motion.div
            className="absolute bottom-[32px] left-[24px] md:left-[48px] lg:left-[77px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-[var(--font-forum)] text-[64px] md:text-[100px] lg:text-[130px] leading-none tracking-[2px] uppercase text-[#efe7d2]">
              Menu
            </h1>
            <p className="text-[rgba(239,231,210,0.7)] text-[13px] md:text-[15px] font-light mt-[6px] tracking-[1px]">
              🌿 Végétalien / végétarien
            </p>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-[8px] md:gap-[12px] justify-center py-[8px]">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              id={`menu-tab-${key}`}
              onClick={() => setActiveCategory(key)}
              className={`px-[20px] md:px-[28px] py-[10px] md:py-[12px] rounded-[8px] text-[11px] md:text-[12px] tracking-[1.5px] uppercase font-[400] transition-all duration-300 ${
                activeCategory === key
                  ? "bg-[#efe7d2] text-[#0a0b0a]"
                  : "border border-[rgba(239,231,210,0.2)] text-[rgba(239,231,210,0.7)] hover:border-[rgba(239,231,210,0.5)] hover:text-[#efe7d2]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="border border-[rgba(239,231,210,0.1)] rounded-[16px] p-[24px] md:p-[40px] lg:p-[48px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Section Header */}
            <div className="flex items-center gap-[16px] mb-[32px] md:mb-[40px]">
              <div className="bg-[rgba(239,231,210,0.15)] h-px flex-1" />
              <h2 className="font-[var(--font-forum)] text-[24px] md:text-[32px] tracking-[2px] uppercase text-[#efe7d2] whitespace-nowrap">
                {categoryLabels[activeCategory]}
              </h2>
              <div className="bg-[rgba(239,231,210,0.15)] h-px flex-1" />
            </div>

            {/* Items Grid */}
            <motion.div
              className={`grid gap-[24px] md:gap-[32px] ${
                activeCategory === "ramen"
                  ? "grid-cols-1 lg:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              }`}
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {activeItems.map((item: any, i: number) => (
                <MenuItem key={i} item={item} />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex items-center justify-center py-[20px] px-[24px]">
          <div className="flex flex-wrap gap-[12px] md:gap-[16px] items-center justify-center">
            <p className="text-[#efe7d2] text-[13px] md:text-[14px] font-light leading-[1.5] text-center">
              Saveurs Ramen
            </p>
            <div className="hidden sm:flex items-center justify-center rotate-45">
              <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
            </div>
            <p className="text-[#efe7d2] text-[13px] md:text-[14px] font-light leading-[1.5]">
              2026
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
