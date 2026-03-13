"use client";

import Link from "next/link";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col gap-[12px] md:gap-[16px] h-[calc(100vh-48px)]">
        {/* Hero Section with Navigation */}
        <div className="flex-1 bg-gradient-to-br from-[#1a1b1a] to-[#0a0b0a] border border-[rgba(239,231,210,0.15)] rounded-[16px] overflow-hidden relative flex items-center justify-center">
          <Navbar />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-[24px] md:px-[48px] text-center">
            {/* Error Icon */}
            <div className="mb-[32px] md:mb-[48px]">
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Outer diamond */}
                  <div className="flex items-center justify-center rotate-45">
                    <div className="border-2 border-[#ff6b6b] w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                      {/* Inner exclamation mark */}
                      <div className="rotate-[-45deg] text-[#ff6b6b] text-[48px] md:text-[64px] font-bold">
                        !
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-[16px] md:gap-[24px] items-center max-w-[600px] mb-[32px] md:mb-[48px]">
              <h1 className="font-[var(--font-forum)] text-[32px] md:text-[48px] lg:text-[56px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2]">
                Something Went Wrong
              </h1>
              <p className="text-[#efe7d2] text-[14px] md:text-[16px] lg:text-[18px] font-light leading-[1.6] opacity-70">
                We encountered an unexpected error. Don't worry, our team has been notified and we're working to fix it.
              </p>
              {process.env.NODE_ENV === "development" && (
                <div className="mt-[16px] p-[16px] bg-[rgba(255,107,107,0.1)] border border-[rgba(255,107,107,0.3)] rounded-[8px] text-left w-full max-w-[500px]">
                  <p className="text-[#ff6b6b] text-[12px] md:text-[14px] font-mono break-all">
                    {error.message}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-[12px] md:gap-[16px] justify-center">
              <button
                onClick={() => reset()}
                className="bg-[#efe7d2] rounded-[8px] px-[24px] md:px-[32px] py-[12px] md:py-[16px] text-[#0a0b0a] text-[12px] md:text-[13px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[#d4ccb8] transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="border border-[rgba(239,231,210,0.3)] rounded-[8px] px-[24px] md:px-[32px] py-[12px] md:py-[16px] text-[#efe7d2] text-[12px] md:text-[13px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[rgba(239,231,210,0.05)] transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/contact"
                className="border border-[rgba(239,231,210,0.3)] rounded-[8px] px-[24px] md:px-[32px] py-[12px] md:py-[16px] text-[#efe7d2] text-[12px] md:text-[13px] tracking-[1px] uppercase font-[400] leading-[1.3] hover:bg-[rgba(239,231,210,0.05)] transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-[10%] right-[10%] flex items-center justify-center rotate-45 opacity-10">
              <div className="border border-[#ff6b6b] w-[80px] md:w-[120px] h-[80px] md:h-[120px]" />
            </div>
            <div className="absolute bottom-[10%] left-[10%] flex items-center justify-center rotate-45 opacity-10">
              <div className="border border-[#ff6b6b] w-[60px] md:w-[100px] h-[60px] md:h-[100px]" />
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
