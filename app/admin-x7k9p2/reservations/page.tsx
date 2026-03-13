"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase, type Reservation } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function ReservationsAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "status">("date");
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchReservations();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/admin-x7k9p2/login");
    }
    setLoading(false);
  };

  const fetchReservations = async () => {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (data) setReservations(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin-x7k9p2/login");
  };

  const handleUpdateStatus = async (id: string, newStatus: Reservation["status"]) => {
    const { error } = await supabase
      .from("reservations")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      fetchReservations();
      setNotification(`✓ Reservation status updated to ${newStatus}!`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDeleteReservation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return;

    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (!error) {
      fetchReservations();
      setNotification("✓ Reservation deleted successfully!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Filter and sort reservations
  const filteredReservations = useMemo(() => {
    let filtered = reservations;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (res) =>
          res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.phone.includes(searchQuery)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((res) => res.status === statusFilter);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime();
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

    return filtered;
  }, [reservations, searchQuery, statusFilter, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const totalReservations = reservations.length;
    const pendingReservations = reservations.filter((res) => res.status === "pending").length;
    const confirmedReservations = reservations.filter((res) => res.status === "confirmed").length;
    const todayReservations = reservations.filter(
      (res) => res.date === new Date().toISOString().split("T")[0]
    ).length;

    return { totalReservations, pendingReservations, confirmedReservations, todayReservations };
  }, [reservations]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (loading) {
    return (
      <main className="bg-[#0a0b0a] min-h-screen flex items-center justify-center">
        <p className="text-[#efe7d2] font-[var(--font-forum)] text-[24px]">Loading...</p>
      </main>
    );
  }

  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[24px] overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              className="fixed top-[24px] right-[24px] bg-green-500/90 text-white px-[24px] py-[16px] rounded-[12px] shadow-lg z-50 max-w-[400px]"
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 20 }}
            >
              <p className="font-[var(--font-forum)] text-[14px]">{notification}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-[32px] gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h1 className="font-[var(--font-forum)] text-[42px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.2]">
              Reservations
            </h1>
            <p className="text-[rgba(245,242,234,0.7)] text-[14px]">
              Manage all customer reservations
            </p>
          </div>
          <div className="flex gap-[12px] items-center">
            <button
              onClick={() => router.push("/admin-x7k9p2/dashboard")}
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[20px] py-[10px] text-[#efe7d2] text-[12px] tracking-[1px] uppercase hover:bg-[rgba(24,24,24,0.7)] transition-colors"
            >
              Menu
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500/10 border border-red-500/30 rounded-[8px] px-[20px] py-[10px] text-red-400 text-[12px] tracking-[1px] uppercase hover:bg-red-500/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] mb-[32px]">
          <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[12px] p-[24px]">
            <p className="text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase mb-[8px]">
              Total Reservations
            </p>
            <p className="font-[var(--font-forum)] text-[32px] text-[#efe7d2]">
              {stats.totalReservations}
            </p>
          </div>
          <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[12px] p-[24px]">
            <p className="text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase mb-[8px]">
              Pending
            </p>
            <p className="font-[var(--font-forum)] text-[32px] text-yellow-400">
              {stats.pendingReservations}
            </p>
          </div>
          <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[12px] p-[24px]">
            <p className="text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase mb-[8px]">
              Confirmed
            </p>
            <p className="font-[var(--font-forum)] text-[32px] text-green-400">
              {stats.confirmedReservations}
            </p>
          </div>
          <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[12px] p-[24px]">
            <p className="text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase mb-[8px]">
              Today
            </p>
            <p className="font-[var(--font-forum)] text-[32px] text-blue-400">
              {stats.todayReservations}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-[12px] mb-[24px]">
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[10px] text-[#efe7d2] placeholder:text-[rgba(245,242,234,0.5)] focus:outline-none focus:border-[rgba(239,231,210,0.3)] w-full pr-[40px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-[12px] top-[50%] translate-y-[-50%] text-[rgba(245,242,234,0.5)] hover:text-[#efe7d2] transition-colors"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[10px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[10px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {/* Reservations Table */}
        <div className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[12px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[rgba(239,231,210,0.15)]">
                  <th className="text-left px-[24px] py-[16px] text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase font-[400]">
                    Guest Name
                  </th>
                  <th className="text-left px-[24px] py-[16px] text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase font-[400]">
                    Contact
                  </th>
                  <th className="text-left px-[24px] py-[16px] text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase font-[400]">
                    Date & Time
                  </th>
                  <th className="text-left px-[24px] py-[16px] text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase font-[400]">
                    Guests
                  </th>
                  <th className="text-left px-[24px] py-[16px] text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase font-[400]">
                    Status
                  </th>
                  <th className="text-left px-[24px] py-[16px] text-[rgba(245,242,234,0.7)] text-[12px] tracking-[1px] uppercase font-[400]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center px-[24px] py-[48px] text-[rgba(245,242,234,0.5)]">
                      No reservations found
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((reservation) => (
                    <motion.tr
                      key={reservation.id}
                      className="border-b border-[rgba(239,231,210,0.05)] hover:bg-[rgba(24,24,24,0.3)] transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="px-[24px] py-[16px]">
                        <p className="text-[#efe7d2] text-[14px] font-[var(--font-forum)]">
                          {reservation.name}
                        </p>
                      </td>
                      <td className="px-[24px] py-[16px]">
                        <p className="text-[rgba(245,242,234,0.7)] text-[12px]">{reservation.phone}</p>
                        <p className="text-[rgba(245,242,234,0.5)] text-[11px]">{reservation.email}</p>
                      </td>
                      <td className="px-[24px] py-[16px]">
                        <p className="text-[#efe7d2] text-[13px]">{formatDate(reservation.date)}</p>
                        <p className="text-[rgba(245,242,234,0.7)] text-[12px]">{formatTime(reservation.time)}</p>
                      </td>
                      <td className="px-[24px] py-[16px]">
                        <p className="text-[#efe7d2] text-[14px]">{reservation.guests}</p>
                      </td>
                      <td className="px-[24px] py-[16px]">
                        <span
                          className={`inline-block px-[12px] py-[4px] rounded-[6px] text-[11px] tracking-[0.5px] uppercase border ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-[24px] py-[16px]">
                        <div className="flex gap-[8px]">
                          <select
                            value={reservation.status}
                            onChange={(e) =>
                              handleUpdateStatus(reservation.id, e.target.value as Reservation["status"])
                            }
                            className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[6px] px-[8px] py-[4px] text-[#efe7d2] text-[11px] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                          <button
                            onClick={() => handleDeleteReservation(reservation.id)}
                            className="bg-red-500/10 border border-red-500/30 rounded-[6px] px-[8px] py-[4px] text-red-400 text-[11px] hover:bg-red-500/20 transition-colors"
                            title="Delete reservation"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-[24px] text-center text-[rgba(245,242,234,0.5)] text-[12px]">
          Showing {filteredReservations.length} of {reservations.length} reservations
        </div>
      </div>
    </main>
  );
}
