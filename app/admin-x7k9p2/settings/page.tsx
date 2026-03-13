"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { checkAuth, signOut } from "@/lib/auth";

interface Settings {
  restaurant_name: string;
  address: string;
  phone: string;
  email: string;
  hours_monday: string;
  hours_tuesday: string;
  hours_wednesday: string;
  hours_thursday: string;
  hours_friday: string;
  hours_saturday: string;
  hours_sunday: string;
  instagram: string;
  facebook: string;
  twitter: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>({
    restaurant_name: "",
    address: "",
    phone: "",
    email: "",
    hours_monday: "",
    hours_tuesday: "",
    hours_wednesday: "",
    hours_thursday: "",
    hours_friday: "",
    hours_saturday: "",
    hours_sunday: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { session } = await checkAuth();
    if (!session) {
      router.push("/admin-x7k9p2/login");
      return;
    }
    fetchSettings();
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();

      if (response.ok) {
        setSettings(data.settings);
      } else {
        setError("Failed to load settings");
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof Settings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ settings }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError(data.error || "Failed to save settings");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin-x7k9p2/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0b0a] flex items-center justify-center">
        <p className="text-[#efe7d2] text-[16px]">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b0a] p-[24px]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[16px] mb-[32px]">
          <div>
            <h1 className="font-[var(--font-forum)] text-[40px] md:text-[48px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2]">
              Settings
            </h1>
            <p className="text-[#efe7d2] text-[14px] font-light opacity-70 mt-[8px]">
              Manage restaurant information and configuration
            </p>
          </div>

          <div className="flex gap-[12px]">
            <Link
              href="/admin-x7k9p2/dashboard"
              className="border border-[rgba(239,231,210,0.3)] rounded-[8px] px-[20px] py-[10px] text-[#efe7d2] text-[13px] tracking-[1px] uppercase hover:bg-[rgba(239,231,210,0.05)] transition-colors"
            >
              ← Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="border border-[rgba(239,231,210,0.3)] rounded-[8px] px-[20px] py-[10px] text-[#efe7d2] text-[13px] tracking-[1px] uppercase hover:bg-[rgba(239,231,210,0.05)] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-[8px] px-[24px] py-[12px] text-green-400 text-[14px] mb-[24px]">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-[8px] px-[24px] py-[12px] text-red-400 text-[14px] mb-[24px]">
            {error}
          </div>
        )}

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-[32px]">
          {/* General Information */}
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[24px] md:p-[32px]">
            <h2 className="font-[var(--font-forum)] text-[24px] md:text-[28px] tracking-[1px] uppercase text-[#efe7d2] mb-[24px]">
              General Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              <div>
                <label className="text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-light mb-[8px] block">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  value={settings.restaurant_name}
                  onChange={(e) => handleChange("restaurant_name", e.target.value)}
                  className="w-full bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] text-[14px] focus:outline-none focus:border-[#efe7d2] transition-colors"
                />
              </div>

              <div>
                <label className="text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-light mb-[8px] block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] text-[14px] focus:outline-none focus:border-[#efe7d2] transition-colors"
                />
              </div>

              <div>
                <label className="text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-light mb-[8px] block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] text-[14px] focus:outline-none focus:border-[#efe7d2] transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-light mb-[8px] block">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] text-[14px] focus:outline-none focus:border-[#efe7d2] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[24px] md:p-[32px]">
            <h2 className="font-[var(--font-forum)] text-[24px] md:text-[28px] tracking-[1px] uppercase text-[#efe7d2] mb-[24px]">
              Opening Hours
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                <div key={day}>
                  <label className="text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-light mb-[8px] block">
                    {day}
                  </label>
                  <input
                    type="text"
                    value={settings[`hours_${day}` as keyof Settings]}
                    onChange={(e) => handleChange(`hours_${day}` as keyof Settings, e.target.value)}
                    placeholder="e.g., 11:00 AM - 2:30 AM"
                    className="w-full bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] text-[14px] focus:outline-none focus:border-[#efe7d2] transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[24px] md:p-[32px]">
            <h2 className="font-[var(--font-forum)] text-[24px] md:text-[28px] tracking-[1px] uppercase text-[#efe7d2] mb-[24px]">
              Social Media
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
              <div>
                <label className="text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-light mb-[8px] block">
                  Instagram
                </label>
                <input
                  type="text"
                  value={settings.instagram}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  placeholder="@username"
                  className="w-full bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] text-[14px] focus:outline-none focus:border-[#efe7d2] transition-colors"
                />
              </div>

              <div>
                <label className="text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-light mb-[8px] block">
                  Facebook
                </label>
                <input
                  type="text"
                  value={settings.facebook}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                  placeholder="@username"
                  className="w-full bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] text-[14px] focus:outline-none focus:border-[#efe7d2] transition-colors"
                />
              </div>

              <div>
                <label className="text-[#efe7d2] text-[12px] tracking-[1px] uppercase font-light mb-[8px] block">
                  Twitter
                </label>
                <input
                  type="text"
                  value={settings.twitter}
                  onChange={(e) => handleChange("twitter", e.target.value)}
                  placeholder="@username"
                  className="w-full bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] text-[14px] focus:outline-none focus:border-[#efe7d2] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`bg-[#efe7d2] rounded-[8px] px-[32px] py-[14px] text-[#0a0b0a] text-[13px] tracking-[1px] uppercase font-[400] hover:bg-[#d4ccb8] transition-colors ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
