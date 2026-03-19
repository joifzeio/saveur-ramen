"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { LeafIcon } from "@/components/Icons";

const RAMEN_A = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80";
const RAMEN_B = "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&q=80";
const RAMEN_C = "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80";
const RAMEN_D = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80";
const RAMEN_E = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80";

const heroImage = "/images/menuholder.webp";

// ─── Real menu data ──────────────────────────────────────────────────────────
const menuData = {
  specialites: [
    {
      name: "Bo Bun Classic Au Poulet",
      description: "",
      price: "15.50 €",
      image: RAMEN_E,
      vegetarian: false,
    },
    {
      name: "Grosses Crevettes À L'Ail",
      description: "Accompagné de riz blanc — 9pcs.",
      price: "15.90 €",
      image: RAMEN_D,
      vegetarian: false,
    },
    {
      name: "Riz Sauté Du Chef",
      description: "Riz, jambon cru, crevettes, légumes.",
      price: "10.50 €",
      image: RAMEN_A,
      vegetarian: false,
    },
    {
      name: "Udon Au Poulet",
      description: "Nouilles udon au poulet et aux légumes sauce du chef.",
      price: "12.90 €",
      image: RAMEN_B,
      vegetarian: false,
    },
  ],
  ramen: [
    {
      name: "Miso",
      description: "Porc chashu, huile d'ail, oeuf, bambou mariné, épinards, maïs, germes de soja, oignon de printemps.",
      price: "15.90 €",
      image: RAMEN_A,
      vegetarian: false,
    },
    {
      name: "Crème Miso",
      description: "Poulet frit, légumes, oeuf mariné, bambou mariné, épinards, maïs, germes de soja, oignon de printemps.",
      price: "16.90 €",
      image: RAMEN_B,
      vegetarian: false,
    },
    {
      name: "Chaud",
      description: "Ragoût de boeuf, oeuf, bambou mariné, épinards, naruto, germes de soja, oignon de printemps, piment séchés, sésame.",
      price: "15.90 €",
      image: RAMEN_C,
      vegetarian: false,
    },
    {
      name: "Gyukotsu Rouge",
      description: "Boeuf à la tomate, oeuf mariné, bambou mariné, germes de soja, oignon de printemps.",
      price: "16.90 €",
      image: RAMEN_C,
      vegetarian: false,
    },
    {
      name: "Végétalien",
      description: "Tofu frit, pois-chiches, bambou mariné, épinards, germes de soja, oignons frits, oignon de printemps, maïs.",
      price: "13.90 €",
      image: RAMEN_E,
      vegetarian: true,
    },
    {
      name: "Kinoko Supu",
      description: "Tofu frit, épinards, champignons shiitake, germes de soja, oeuf mariné, mini maïs, huile de cèpes.",
      price: "13.90 €",
      image: RAMEN_B,
      vegetarian: true,
    },
    {
      name: "Ebi Supu",
      description: "Crevettes argentines, naruto, oignon de printemps, germes de soja, bambou mariné, épinards, oeuf mariné.",
      price: "18.90 €",
      image: RAMEN_A,
      vegetarian: false,
    },
    {
      name: "Gyukotsu Shio",
      description: "Boeuf chashu, oeuf mariné, oignon de printemps, bambou mariné, épinards.",
      price: "16.90 €",
      image: RAMEN_C,
      vegetarian: false,
    },
  ],
  tapas: [
    {
      name: "Nems Porc (4pcs)",
      description: "",
      price: "5.00 €",
      image: RAMEN_D,
      vegetarian: false,
    },
    {
      name: "Karaage (8pcs)",
      description: "",
      price: "6.00 €",
      image: RAMEN_C,
      vegetarian: false,
    },
    {
      name: "Gyoza Au Poulet (6pcs)",
      description: "",
      price: "5.00 €",
      image: RAMEN_A,
      vegetarian: false,
    },
    {
      name: "Tempura (5pcs)",
      description: "",
      price: "7.00 €",
      image: RAMEN_C,
      vegetarian: false,
    },
    {
      name: "Ebi Gyoza (5pcs)",
      description: "",
      price: "6.90 €",
      image: RAMEN_B,
      vegetarian: false,
    },
    {
      name: "Edamame",
      description: "",
      price: "5.00 €",
      image: RAMEN_E,
      vegetarian: true,
    },
    {
      name: "Wakame",
      description: "",
      price: "5.00 €",
      image: RAMEN_E,
      vegetarian: true,
    },
    {
      name: "Nems Poulet (4pcs)",
      description: "",
      price: "6.00 €",
      image: RAMEN_D,
      vegetarian: false,
    },
    {
      name: "Takoyaki (6pcs)",
      description: "",
      price: "6.50 €",
      image: RAMEN_D,
      vegetarian: false,
    },
  ],
  desserts: [
    {
      name: "Mochi (2pcs)",
      description: "Fraise, passion & mangue, noix de coco, chocolat, citron & yuzu, pistache, vanille.",
      price: "5.90 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "Mochi Mixte (4pcs)",
      description: "Fraise, passion & mangue, noix de coco, chocolat, citron & yuzu, pistache, vanille.",
      price: "8.00 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "Glace",
      description: "1, 2 ou 3 boules. Chocolat, fraise, vanille.",
      price: "3.00 €",
      image: RAMEN_E,
      vegetarian: true,
    },
  ],
  boissons: [
    {
      name: "Saké Japonais",
      description: "4cl.",
      price: "3.50 €",
      image: RAMEN_C,
      vegetarian: true,
    },
    {
      name: "Riz Au Saké",
      description: "4cl.",
      price: "5.00 €",
      image: RAMEN_C,
      vegetarian: true,
    },
    {
      name: "Get 27",
      description: "4cl.",
      price: "5.50 €",
      image: RAMEN_B,
      vegetarian: true,
    },
    {
      name: "Cognac Rémy Martin",
      description: "4cl.",
      price: "7.00 €",
      image: RAMEN_B,
      vegetarian: true,
    },
    {
      name: "Rhum Don Papa",
      description: "4cl.",
      price: "8.00 €",
      image: RAMEN_B,
      vegetarian: true,
    },
    {
      name: "Bourgogne Aligoté",
      description: "Vin blanc — 75cl.",
      price: "25.00 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "Bourgogne Chardonnay",
      description: "Vin blanc — 75cl.",
      price: "49.00 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "Rosé Anjou Rock N Roll",
      description: "Vin rosé — 75cl.",
      price: "22.00 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "IGP Med Rosé Route Des Plages",
      description: "Côtes de Provence — 75cl.",
      price: "22.00 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "Côtes Du Rhône",
      description: "Vin rouge — 75cl.",
      price: "16.00 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "Bourgogne Pinot Noir Origines",
      description: "Vin rouge — 75cl.",
      price: "55.00 €",
      image: RAMEN_D,
      vegetarian: true,
    },
    {
      name: "Saint-Émilion Grand Cru 2013",
      description: "Château La Croizille — 75cl.",
      price: "95.00 €",
      image: RAMEN_D,
      vegetarian: true,
    },
  ],
};

const categories = [
  { key: "specialites", label: "Spécialités" },
  { key: "ramen", label: "Nos Ramen" },
  { key: "tapas", label: "Tapas Japonaises" },
  { key: "desserts", label: "Desserts" },
  { key: "boissons", label: "Boissons" },
];

const categoryLabels: Record<string, string> = {
  specialites: "Spécialités",
  ramen: "Nos Ramen",
  tapas: "Tapas Japonaises",
  desserts: "Desserts",
  boissons: "Boissons",
};

function LeafBadge() {
  return <LeafIcon className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] shrink-0 text-[rgba(239,231,210,0.6)]" />;
}

function MenuItem({ item }: { item: any }) {
  return (
    <div className="flex gap-[16px] md:gap-[32px] items-center md:items-start group w-full">
      <div className="relative w-[100px] h-[65px] md:w-[160px] md:h-[100px] flex-shrink-0 overflow-hidden bg-[rgba(24,24,24,0.5)] rounded-[8px]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100px, 160px"
          className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center pt-1 md:pt-2">
        <div className="flex items-end w-full mb-[6px] md:mb-[8px]">
          <h3 className="font-[var(--font-forum)] text-[15px] md:text-[18px] tracking-[1px] uppercase text-[#efe7d2] whitespace-nowrap leading-none">
            {item.name}
          </h3>
          {item.vegetarian && <span className="ml-[6px] mb-[2px]"><LeafBadge /></span>}
          <div className="flex-1 mx-[12px] md:mx-[20px] border-b-[1.5px] border-dotted border-[rgba(239,231,210,0.3)] opacity-60 relative top-[-4px]"></div>
          <span className="font-light text-[14px] md:text-[16px] text-[#efe7d2] whitespace-nowrap leading-none tracking-wider">
            {item.price}
          </span>
        </div>
        {item.description && (
          <p className="text-[rgba(239,231,210,0.6)] text-[12px] md:text-[13px] font-light leading-[1.6] max-w-[90%] md:pr-4">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState("specialites");

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(c => document.getElementById(`section-${c.key}`));
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        if (!section) continue;
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveTab(section.id.replace('section-', ''));
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (key: string) => {
    setActiveTab(key);
    const el = document.getElementById(`section-${key}`);
    if (el) {
      const offset = 80; // Offset to clear sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="bg-[#0a0b0a] min-h-[100dvh] w-full flex flex-col lg:flex-row relative">
      <Navbar />
      {/* Left fixed hero area */}
      <div className="relative w-full h-[50dvh] lg:h-[100dvh] lg:w-[45%] xl:w-[40%] flex-shrink-0 lg:sticky lg:top-0">
        <div className="w-full h-full relative p-4 lg:p-6 lg:pb-6">
          <div className="w-full h-full relative rounded-2xl overflow-hidden border border-[rgba(239,231,210,0.1)]">
            <Image
              src={heroImage}
              alt="Menu Saveurs Ramen"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              priority
            />
            {/* Gradient matching the screenshot (darkened edges and bottom) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 z-20 font-[var(--font-forum)] text-[60px] md:text-[80px] lg:text-[100px] text-[#efe7d2] leading-none uppercase tracking-[4px]"
            >
              Menu
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Right scrollable menu area */}
      <div className="flex-1 w-full relative pb-20 px-6 lg:px-16 xl:px-24 flex flex-col">
        {/* Sticky category navigation */}
        <div className="sticky top-0 z-40 flex flex-wrap justify-center items-center gap-[12px] md:gap-[16px] pt-6 pb-6 lg:pt-8 lg:pb-8 mb-8 lg:mb-12 mx-auto w-full bg-gradient-to-b from-[#0a0b0a] via-[#0a0b0a]/95 to-transparent">
          <div className="flex flex-wrap justify-center items-center gap-[12px] md:gap-[16px]">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className={`text-[9px] md:text-[11px] tracking-[2px] uppercase font-[400] transition-colors duration-300 ${
                  activeTab === key
                    ? "text-[#efe7d2]"
                    : "text-[rgba(239,231,210,0.5)] hover:text-[#efe7d2]"
                }`}
              >
                <span className={`border ${activeTab === key ? "border-[rgba(239,231,210,0.4)]" : "border-[rgba(239,231,210,0.15)] hover:border-[rgba(239,231,210,0.3)]"} rounded-full px-5 py-[6px] transition-all`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories content */}
        <div className="space-y-24 lg:space-y-32 flex flex-col items-center w-full max-w-4xl mx-auto">
          {categories.map(({ key }) => {
            const items = menuData[key as keyof typeof menuData];
            const title = categoryLabels[key];

            return (
              <motion.section 
                key={key} 
                id={`section-${key}`}
                className="w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Section Header (Matches the reference screenshot precisely) */}
                <div className="flex flex-col items-center mb-10 lg:mb-14">
                  <div className="flex items-center gap-[16px] md:gap-[24px]">
                    <div className="w-[6px] h-[6px] rotate-45 border border-[rgba(239,231,210,0.3)] bg-transparent" />
                    <div className="w-12 md:w-24 h-px bg-[rgba(239,231,210,0.15)]" />
                    <h2 className="font-[var(--font-forum)] text-[22px] md:text-[28px] text-[#efe7d2] uppercase tracking-[0.2em] whitespace-nowrap px-2">
                      {title}
                    </h2>
                    <div className="w-12 md:w-24 h-px bg-[rgba(239,231,210,0.15)]" />
                    <div className="w-[6px] h-[6px] rotate-45 border border-[rgba(239,231,210,0.3)] bg-transparent" />
                  </div>
                </div>

                {/* Items List */}
                <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
                  {items.map((item: any, i: number) => (
                    <MenuItem key={i} item={item} />
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
