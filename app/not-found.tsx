import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col gap-[12px] md:gap-[16px] h-[calc(100vh-48px)]">
        {/* Hero Section with Navigation */}
        <div className="flex-1 bg-gradient-to-br from-[#1a1b1a] to-[#0a0b0a] border border-[rgba(239,231,210,0.15)] rounded-[16px] overflow-hidden relative flex items-center justify-center">
          <Navbar />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-[24px] md:px-[48px] text-center">
            {/* 404 */}
            <div className="flex items-center gap-[16px] md:gap-[24px] mb-[32px] md:mb-[48px]">
              <div className="hidden sm:flex items-center justify-center py-[7px]">
                <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
                <div className="flex items-center justify-center rotate-45">
                  <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                </div>
              </div>

              <h1 className="font-[var(--font-forum)] text-[96px] md:text-[128px] lg:text-[160px] tracking-[2px] uppercase text-[#efe7d2] leading-none">
                404
              </h1>

              <div className="hidden sm:flex items-center justify-center py-[7px]">
                <div className="flex items-center justify-center rotate-45">
                  <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                </div>
                <div className="bg-[rgba(239,231,210,0.15)] h-px w-[30px] md:w-[50px]" />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-[16px] md:gap-[24px] items-center max-w-[600px] mb-[32px] md:mb-[48px]">
              <h2 className="font-[var(--font-forum)] text-[28px] md:text-[36px] lg:text-[40px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2]">
                Page Not Found
              </h2>
              <p className="text-[#efe7d2] text-[14px] md:text-[16px] lg:text-[18px] font-light leading-[1.6] opacity-70">
              La page que vous recherchez semble introuvable. Retournons à l’essentiel.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-[12px] md:gap-[16px] justify-center">
              <Link
                href="/"
                className="bg-[#efe7d2] rounded-[8px] px-[24px] md:px-[32px] py-[12px] md:py-[16px] text-[#0a0b0a] text-[12px] md:text-[13px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[#d4ccb8] transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/menu"
                className="border border-[rgba(239,231,210,0.3)] rounded-[8px] px-[24px] md:px-[32px] py-[12px] md:py-[16px] text-[#efe7d2] text-[12px] md:text-[13px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[rgba(239,231,210,0.05)] transition-colors"
              >
                View Menu
              </Link>
              <Link
                href="/reservation"
                className="border border-[rgba(239,231,210,0.3)] rounded-[8px] px-[24px] md:px-[32px] py-[12px] md:py-[16px] text-[#efe7d2] text-[12px] md:text-[13px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[rgba(239,231,210,0.05)] transition-colors"
              >
                Make a Reservation
              </Link>
            </div>

            {/* Decorative Diamond */}
            <div className="absolute top-[10%] right-[10%] flex items-center justify-center rotate-45 opacity-20">
              <div className="border border-[rgba(239,231,210,0.3)] w-[80px] md:w-[120px] h-[80px] md:h-[120px]" />
            </div>
            <div className="absolute bottom-[10%] left-[10%] flex items-center justify-center rotate-45 opacity-20">
              <div className="border border-[rgba(239,231,210,0.3)] w-[60px] md:w-[100px] h-[60px] md:h-[100px]" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex items-center justify-center py-[16px] md:py-[20px] px-[16px] md:px-[24px]">
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
