"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase, type Category, type MenuItem } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "category">("name");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [notification, setNotification] = useState<string | null>(null);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchCategories();
    fetchMenuItems();
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

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (data) setCategories(data);
  };

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (data) setMenuItems(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin-x7k9p2/login");
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (!error) {
      fetchMenuItems();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? All items in this category will be deleted.")) return;

    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (!error) {
      fetchCategories();
      fetchMenuItems();
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    const { error } = await supabase
      .from("menu_items")
      .update({ is_available: !item.is_available })
      .eq("id", item.id);

    if (!error) {
      fetchMenuItems();
    }
  };

  const handleDuplicateItem = async (item: MenuItem) => {
    const newItemName = `${item.name} (Copy)`;
    const { data, error } = await supabase.from("menu_items").insert([
      {
        name: newItemName,
        description: item.description,
        price: item.price,
        category_id: item.category_id,
        display_order: item.display_order + 1,
        image_url: item.image_url,
      },
    ]).select();

    if (!error && data && data[0]) {
      await fetchMenuItems();

      // Show notification
      setNotification(`✓ "${newItemName}" created successfully!`);
      setTimeout(() => setNotification(null), 3000);

      // Highlight the new item
      setHighlightedItemId(data[0].id);
      setTimeout(() => setHighlightedItemId(null), 3000);

      // Auto-search for the new item to make it visible
      setSearchQuery("(Copy)");

      // Scroll to top to see the notification
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filtered and sorted items
  const filteredAndSortedItems = useMemo(() => {
    let items = selectedCategory
      ? menuItems.filter((item) => item.category_id === selectedCategory)
      : menuItems;

    // Search filter
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    items.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "category") {
        return a.category_id.localeCompare(b.category_id);
      }
      return 0;
    });

    return items;
  }, [menuItems, selectedCategory, searchQuery, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const totalItems = menuItems.length;
    const availableItems = menuItems.filter((item) => item.is_available).length;
    const totalCategories = categories.length;
    const avgPrice =
      menuItems.length > 0
        ? (menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toFixed(2)
        : "0.00";

    return { totalItems, availableItems, totalCategories, avgPrice };
  }, [menuItems, categories]);

  if (loading) {
    return (
      <div className="bg-[#0a0b0a] min-h-screen flex items-center justify-center">
        <p className="text-[#efe7d2] font-[var(--font-forum)] text-[24px]">Loading...</p>
      </div>
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
          <div>
            <h1 className="font-[var(--font-forum)] text-[36px] md:text-[48px] tracking-[1px] uppercase text-[#efe7d2]">
              Admin Dashboard
            </h1>
            <p className="text-[14px] text-[rgba(245,242,234,0.7)] mt-[8px]">
              Manage your menu items and categories
            </p>
          </div>
          <div className="flex gap-[12px] items-center">
            <motion.button
              onClick={() => router.push("/admin-x7k9p2/reservations")}
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[20px] py-[12px] text-[#efe7d2] hover:bg-[rgba(24,24,24,0.7)] transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reservations
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="bg-red-500/10 border border-red-500/30 rounded-[8px] px-[20px] py-[12px] text-red-400 hover:bg-red-500/20 transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] mb-[32px]">
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[24px] bg-[rgba(24,24,24,0.3)]">
            <p className="text-[rgba(245,242,234,0.7)] text-[12px] uppercase tracking-[1px] mb-[8px]">
              Total Items
            </p>
            <p className="font-[var(--font-forum)] text-[32px] text-[#efe7d2]">{stats.totalItems}</p>
          </div>
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[24px] bg-[rgba(24,24,24,0.3)]">
            <p className="text-[rgba(245,242,234,0.7)] text-[12px] uppercase tracking-[1px] mb-[8px]">
              Available
            </p>
            <p className="font-[var(--font-forum)] text-[32px] text-[#efe7d2]">{stats.availableItems}</p>
          </div>
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[24px] bg-[rgba(24,24,24,0.3)]">
            <p className="text-[rgba(245,242,234,0.7)] text-[12px] uppercase tracking-[1px] mb-[8px]">
              Categories
            </p>
            <p className="font-[var(--font-forum)] text-[32px] text-[#efe7d2]">{stats.totalCategories}</p>
          </div>
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[24px] bg-[rgba(24,24,24,0.3)]">
            <p className="text-[rgba(245,242,234,0.7)] text-[12px] uppercase tracking-[1px] mb-[8px]">
              Avg Price
            </p>
            <p className="font-[var(--font-forum)] text-[32px] text-[#efe7d2]">${stats.avgPrice}</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-[16px] mb-[32px]">
          <div className="flex flex-wrap gap-[12px]">
            <motion.button
              onClick={() => setShowAddCategoryModal(true)}
              className="bg-[#efe7d2] text-[#0a0b0a] rounded-[8px] px-[20px] py-[12px] font-[var(--font-forum)] text-[12px] md:text-[14px] tracking-[1px] uppercase whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Category
            </motion.button>
            <motion.button
              onClick={() => setShowAddItemModal(true)}
              className="bg-[#efe7d2] text-[#0a0b0a] rounded-[8px] px-[20px] py-[12px] font-[var(--font-forum)] text-[12px] md:text-[14px] tracking-[1px] uppercase whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Menu Item
            </motion.button>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-[12px] w-full">
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="Search items..."
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[10px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="category">Sort by Category</option>
            </select>
            <div className="flex gap-[8px]">
              <button
                onClick={() => setViewMode("table")}
                className={`px-[12px] py-[10px] rounded-[8px] border transition-colors flex-1 sm:flex-none ${
                  viewMode === "table"
                    ? "bg-[#efe7d2] text-[#0a0b0a] border-[#efe7d2]"
                    : "bg-[rgba(24,24,24,0.3)] text-[#efe7d2] border-[rgba(239,231,210,0.15)]"
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-[12px] py-[10px] rounded-[8px] border transition-colors flex-1 sm:flex-none ${
                  viewMode === "grid"
                    ? "bg-[#efe7d2] text-[#0a0b0a] border-[#efe7d2]"
                    : "bg-[rgba(24,24,24,0.3)] text-[#efe7d2] border-[rgba(239,231,210,0.15)]"
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-[12px] mb-[32px] overflow-x-auto pb-[8px]">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-[16px] py-[8px] rounded-[8px] border transition-colors whitespace-nowrap ${
              selectedCategory === null
                ? "bg-[#efe7d2] text-[#0a0b0a] border-[#efe7d2]"
                : "bg-[rgba(24,24,24,0.3)] text-[#efe7d2] border-[rgba(239,231,210,0.15)]"
            }`}
          >
            All Items ({menuItems.length})
          </button>
          {categories.map((category) => {
            const count = menuItems.filter((item) => item.category_id === category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-[16px] py-[8px] rounded-[8px] border transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-[#efe7d2] text-[#0a0b0a] border-[#efe7d2]"
                    : "bg-[rgba(24,24,24,0.3)] text-[#efe7d2] border-[rgba(239,231,210,0.15)]"
                }`}
              >
                {category.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Menu Items - Table View */}
        {viewMode === "table" && (
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] overflow-hidden bg-[rgba(24,24,24,0.3)] w-full">
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-[rgba(239,231,210,0.15)]">
                    <th className="text-left p-[16px] text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)] font-normal">
                      Name
                    </th>
                    <th className="text-left p-[16px] text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)] font-normal">
                      Category
                    </th>
                    <th className="text-left p-[16px] text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)] font-normal">
                      Price
                    </th>
                    <th className="text-left p-[16px] text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)] font-normal">
                      Status
                    </th>
                    <th className="text-right p-[16px] text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)] font-normal">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedItems.map((item) => {
                    const category = categories.find((c) => c.id === item.category_id);
                    const isHighlighted = highlightedItemId === item.id;
                    return (
                      <motion.tr
                        key={item.id}
                        className={`border-b border-[rgba(239,231,210,0.08)] last:border-0 hover:bg-[rgba(239,231,210,0.05)] transition-colors ${
                          isHighlighted ? "bg-green-500/20" : ""
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          backgroundColor: isHighlighted ? "rgba(34, 197, 94, 0.2)" : "transparent"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="p-[16px]">
                          <p className="font-[var(--font-forum)] text-[16px] text-[#efe7d2]">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-[12px] text-[rgba(245,242,234,0.6)] mt-[4px] line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </td>
                        <td className="p-[16px]">
                          <span className="text-[14px] text-[rgba(245,242,234,0.7)]">
                            {category?.name}
                          </span>
                        </td>
                        <td className="p-[16px]">
                          <span className="font-[var(--font-forum)] text-[16px] text-[#efe7d2]">
                            ${item.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-[16px]">
                          <button
                            onClick={() => handleToggleAvailability(item)}
                            className={`px-[12px] py-[4px] rounded-[6px] text-[12px] ${
                              item.is_available
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {item.is_available ? "Available" : "Unavailable"}
                          </button>
                        </td>
                        <td className="p-[16px]">
                          <div className="flex gap-[8px] justify-end">
                            <button
                              onClick={() => handleDuplicateItem(item)}
                              className="text-[12px] text-[rgba(245,242,234,0.7)] hover:text-[#efe7d2] transition-colors"
                              title="Duplicate"
                            >
                              Copy
                            </button>
                            <button
                              onClick={() => setEditingItem(item)}
                              className="text-[12px] text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-[12px] text-red-400 hover:text-red-300 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredAndSortedItems.length === 0 && (
              <div className="p-[48px] text-center">
                <p className="text-[rgba(245,242,234,0.5)]">No items found</p>
              </div>
            )}
          </div>
        )}

        {/* Menu Items - Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            {filteredAndSortedItems.map((item) => {
              const category = categories.find((c) => c.id === item.category_id);
              const isHighlighted = highlightedItemId === item.id;
              return (
                <motion.div
                  key={item.id}
                  className={`border rounded-[16px] p-[24px] ${
                    isHighlighted
                      ? "border-green-500 bg-green-500/10"
                      : "border-[rgba(239,231,210,0.15)] bg-[rgba(24,24,24,0.3)]"
                  }`}
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, scale: isHighlighted ? 1.05 : 1 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    borderColor: isHighlighted ? "rgb(34, 197, 94)" : "rgba(239,231,210,0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-[var(--font-forum)] text-[20px] tracking-[1px] uppercase text-[#efe7d2]">
                          {item.name}
                        </p>
                        <p className="text-[12px] text-[rgba(245,242,234,0.7)] mt-[4px]">
                          {category?.name}
                        </p>
                      </div>
                      <p className="font-[var(--font-forum)] text-[18px] text-[#efe7d2]">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    {item.description && (
                      <p className="text-[14px] text-[rgba(245,242,234,0.7)] line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-[8px] mt-[8px]">
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className={`flex-1 px-[12px] py-[6px] rounded-[6px] text-[12px] ${
                          item.is_available
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {item.is_available ? "Available" : "Unavailable"}
                      </button>
                    </div>
                    <div className="flex gap-[8px] pt-[12px] border-t border-[rgba(239,231,210,0.15)]">
                      <button
                        onClick={() => handleDuplicateItem(item)}
                        className="flex-1 bg-[rgba(239,231,210,0.1)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[8px] text-[12px] text-[#efe7d2] hover:bg-[rgba(239,231,210,0.15)] transition-colors"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => setEditingItem(item)}
                        className="flex-1 bg-[rgba(239,231,210,0.1)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[8px] text-[12px] text-[#efe7d2] hover:bg-[rgba(239,231,210,0.15)] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="flex-1 bg-red-500/10 border border-red-500/30 rounded-[8px] px-[16px] py-[8px] text-[12px] text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onSuccess={() => {
          fetchCategories();
          setShowAddCategoryModal(false);
        }}
      />
      <AddItemModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        categories={categories}
        onSuccess={() => {
          fetchMenuItems();
          setShowAddItemModal(false);
        }}
      />
      <EditItemModal
        isOpen={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        categories={categories}
        onSuccess={() => {
          fetchMenuItems();
          setEditingItem(null);
        }}
      />
    </main>
  );
}

// Modal Components remain the same...
// (Add Category Modal, Add Item Modal, Edit Item Modal)

function AddCategoryModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("categories")
      .insert([{ name, display_order: displayOrder }]);

    setLoading(false);

    if (!error) {
      setName("");
      setDisplayOrder(0);
      onSuccess();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <motion.div
        className="bg-[#0a0b0a] border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[48px] w-full max-w-[500px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="font-[var(--font-forum)] text-[32px] tracking-[1px] uppercase text-[#efe7d2] mb-[24px]">
          Add Category
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            />
          </div>
          <div className="flex gap-[12px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[rgba(239,231,210,0.1)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[24px] py-[12px] text-[#efe7d2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#efe7d2] text-[#0a0b0a] rounded-[8px] px-[24px] py-[12px] font-[var(--font-forum)] disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function AddItemModal({
  isOpen,
  onClose,
  categories,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("menu_items").insert([
      {
        name,
        description: description || null,
        price: parseFloat(price),
        category_id: categoryId,
        display_order: displayOrder,
      },
    ]);

    setLoading(false);

    if (!error) {
      setName("");
      setDescription("");
      setPrice("");
      setCategoryId("");
      setDisplayOrder(0);
      onSuccess();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <motion.div
        className="bg-[#0a0b0a] border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[48px] w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="font-[var(--font-forum)] text-[32px] tracking-[1px] uppercase text-[#efe7d2] mb-[24px]">
          Add Menu Item
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)] resize-none"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            />
          </div>
          <div className="flex gap-[12px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[rgba(239,231,210,0.1)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[24px] py-[12px] text-[#efe7d2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#efe7d2] text-[#0a0b0a] rounded-[8px] px-[24px] py-[12px] font-[var(--font-forum)] disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function EditItemModal({
  isOpen,
  item,
  onClose,
  categories,
  onSuccess,
}: {
  isOpen: boolean;
  item: MenuItem | null;
  onClose: () => void;
  categories: Category[];
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description || "");
      setPrice(item.price.toString());
      setCategoryId(item.category_id);
      setDisplayOrder(item.display_order);
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    setLoading(true);

    const { error } = await supabase
      .from("menu_items")
      .update({
        name,
        description: description || null,
        price: parseFloat(price),
        category_id: categoryId,
        display_order: displayOrder,
      })
      .eq("id", item.id);

    setLoading(false);

    if (!error) {
      onSuccess();
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[24px]">
      <motion.div
        className="bg-[#0a0b0a] border border-[rgba(239,231,210,0.15)] rounded-[16px] p-[48px] w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="font-[var(--font-forum)] text-[32px] tracking-[1px] uppercase text-[#efe7d2] mb-[24px]">
          Edit Menu Item
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)] resize-none"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="text-[12px] uppercase tracking-[1px] text-[rgba(245,242,234,0.7)]">
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
              required
              className="bg-[rgba(24,24,24,0.5)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[16px] py-[12px] text-[#efe7d2] focus:outline-none focus:border-[rgba(239,231,210,0.3)]"
            />
          </div>
          <div className="flex gap-[12px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[rgba(239,231,210,0.1)] border border-[rgba(239,231,210,0.15)] rounded-[8px] px-[24px] py-[12px] text-[#efe7d2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#efe7d2] text-[#0a0b0a] rounded-[8px] px-[24px] py-[12px] font-[var(--font-forum)] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
