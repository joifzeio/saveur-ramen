"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { fadeInVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

const heroImage = "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=1920&q=80"; // Ramen close-up

// Blog post images from Unsplash
const blogImages = {
  post1: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80", // Ramen bowl ✓
  post2: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80", // Ramen close-up ✓
  post3: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80",   // Ramen steam ✓
  post4: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", // Food dish ✓
  post5: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80", // Healthy bowl ✓
};

const blogPosts = [
  {
    id: 1,
    slug: "flavor-harmony",
    title: "L’Art du Bouillon : Pourquoi Nos Ramens Sont Uniques",
    date: "10 Mars 2026",
    description: "Découvrez comment notre bouillon, mijôté pendant des heures chaque jour, est la clé de ce qui rend chaque bol de ramen si savoureux.",
    image: blogImages.post1,
  },
  {
    id: 2,
    slug: "culinary-craftsmanship",
    title: "Gyoza, Karaage, Takoyaki : Nos Tapas Japonais à L’Honneur",
    date: "25 Fév 2026",
    description: "Plongez dans notre sélection de tapas japonais artisanaux — idéaux pour partager un moment en bonne compagnie.",
    image: blogImages.post2,
  },
  {
    id: 3,
    slug: "game-day-experience",
    title: "L’Ambiance Saveurs Ramen : Un Bout du Japon à Rennes",
    date: "11 Fév 2026",
    description: "Découvrez l’atmosphère unique de notre restaurant, situé juste derrière la gare de Rennes — moderne, chaleureux et familialement japonais.",
    image: blogImages.post3,
  },
  {
    id: 4,
    slug: "signature-dishes",
    title: "Notre Sélection de Ramens : Quel Bol Est Fait Pour Vous ?",
    date: "31 Jan 2026",
    description: "Du Miso classique à l’Ebiage aux crevettes, guidez-vous à travers notre carte et trouvez votre ramen idéal.",
    image: blogImages.post4,
  },
  {
    id: 5,
    slug: "beyond-food",
    title: "Saveurs Ramen : Bien Plus Qu’Un Restaurant",
    date: "28 Jan 2026",
    description: "Un lieu de vie, une ambiance familiale, des saveurs authentiques — voici ce qui fait de Saveurs Ramen une adresse inévitable à Rennes.",
    image: blogImages.post5,
  },
];

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col md:flex-row gap-[16px] md:gap-[20px] lg:gap-[24px] items-start w-full group">
        <motion.div
          className="bg-black w-full md:w-[220px] lg:w-[280px] h-[200px] md:h-[180px] lg:h-[210px] rounded-[16px] overflow-hidden shrink-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
        <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px] py-[0px] md:py-[12px]">
          <div className="flex flex-col gap-[8px] md:gap-[12px]">
            <p className="text-[11px] md:text-[12px] tracking-[1px] uppercase text-[rgba(245,242,234,0.7)] leading-[1.3]">
              {post.date}
            </p>
            <h3 className="font-[var(--font-forum)] text-[22px] md:text-[25px] lg:text-[28px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] group-hover:text-[rgba(239,231,210,0.8)] transition-colors">
              {post.title}
            </h3>
          </div>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-[1.8] text-[rgba(245,242,234,0.7)] font-light">
            {post.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Blog() {
  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] h-auto lg:h-[calc(100vh-48px)]">
        {/* Left Hero Image */}
        <div className="flex-1 bg-black rounded-[16px] overflow-hidden relative min-h-[400px] lg:min-h-0">
          <img
            src={heroImage}
            alt="Blog"
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
            Blog
          </motion.h1>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px] self-stretch overflow-y-auto">
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col gap-[48px] md:gap-[56px] lg:gap-[64px] py-[32px] md:py-[60px] lg:py-[80px] px-[24px] md:px-[48px] lg:px-[80px]">
            {/* Header */}
            <motion.div
              className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="hidden sm:flex items-center justify-center py-[7px]">
                <div className="flex items-center justify-center rotate-45">
                  <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                </div>
                <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
              </div>
              <p className="font-[var(--font-forum)] text-[24px] md:text-[28px] lg:text-[32px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2] text-center">
                Behind the Scenes<br className="hidden sm:block" /><span className="sm:hidden"> </span>& Latest News
              </p>
              <div className="hidden sm:flex items-center justify-center py-[7px]">
                <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                <div className="flex items-center justify-center rotate-45">
                  <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                </div>
              </div>
            </motion.div>

            {/* Blog Posts */}
            <motion.div
              className="flex flex-col gap-[32px] md:gap-[40px] lg:gap-[48px] w-full"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {blogPosts.map((post) => (
                <motion.div key={post.id} variants={staggerItemVariants}>
                  <BlogCard post={post} />
                </motion.div>
              ))}
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
                Blog
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
