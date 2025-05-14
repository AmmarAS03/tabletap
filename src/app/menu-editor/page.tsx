"use client";

import { useEffect, useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
};

type Menu = {
  id: number;
  title: string;
  items: MenuItem[];
};

export default function MenuEditor() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [newItems, setNewItems] = useState<{ [key: number]: { name: string; price: string } }>({});
  const [addingItemTo, setAddingItemTo] = useState<number | null>(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch("/api/restaurant/menus");
      const data = await res.json();
      setMenus(data.menus);
    } catch (err) {
      console.error("Failed to load menus:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/restaurant/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newCategory }),
      });
      if (!res.ok) throw new Error("Failed to create category");
      const data = await res.json();
      setMenus((prev) => [...prev, { ...data.menu, items: [] }]);
      setNewCategory("");
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddItem = async (menuId: number) => {
    const item = newItems[menuId];
    if (!item?.name || !item?.price) return;

    try {
      const res = await fetch("/api/restaurant/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item.name, price: item.price, menuId }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      const data = await res.json();

      setMenus((prev) =>
        prev.map((menu) =>
          menu.id === menuId
            ? { ...menu, items: [...menu.items, data.item] }
            : menu
        )
      );

      setNewItems((prev) => ({ ...prev, [menuId]: { name: "", price: "" } }));
      setAddingItemTo(null);
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">Menu Editor</h1>
          <p className="text-[#3a855d]/80">
            Organize your restaurant’s offerings by category and item.
          </p>
        </header>

        {/* Add Category */}
        <section className="bg-white p-6 rounded-2xl shadow border border-[#3a855d]/20">
          <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleAddCategory}>
            <input
              type="text"
              placeholder="e.g. Beverages"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-[#3a855d]/30 bg-[#f1f1f1] placeholder:text-[#3a855d]/50"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#3a855d] text-white px-6 py-2 rounded-xl hover:bg-[#32724f] transition"
            >
              {submitting ? "Adding..." : "Add Category"}
            </button>
          </form>
        </section>

        {/* Menu List */}
        <section className="space-y-10">
          {loading ? (
            <p>Loading menus...</p>
          ) : menus.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            menus.map((menu) => (
              <div
                key={menu.id}
                className="bg-white p-6 rounded-2xl shadow border border-[#3a855d]/20"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">{menu.title}</h3>
                  <button
                    className="text-sm text-[#3a855d] hover:underline"
                    onClick={() => setAddingItemTo(menu.id)}
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-4">
                  {menu.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-[#f1f1f1] p-4 rounded-xl"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-[#3a855d]/70">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button className="text-sm text-red-500 hover:underline">
                        Remove
                      </button>
                    </div>
                  ))}

                  {addingItemTo === menu.id && (
                    <div className="flex gap-4 items-end bg-[#f9f9f9] p-4 rounded-xl mt-2">
                      <div className="flex-1">
                        <label className="block text-sm mb-1">Item Name</label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          value={newItems[menu.id]?.name || ""}
                          onChange={(e) =>
                            setNewItems((prev) => ({
                              ...prev,
                              [menu.id]: {
                                ...prev[menu.id],
                                name: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="w-32">
                        <label className="block text-sm mb-1">Price</label>
                        <input
                          type="number"
                          className="w-full border rounded px-3 py-2"
                          value={newItems[menu.id]?.price || ""}
                          onChange={(e) =>
                            setNewItems((prev) => ({
                              ...prev,
                              [menu.id]: {
                                ...prev[menu.id],
                                price: e.target.value,
                              },
                            }))
                          }
                        />
                      </div>
                      <button
                        className="bg-[#3a855d] text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => handleAddItem(menu.id)}
                      >
                        Add
                      </button>
                      <button
                        className="text-sm underline text-gray-500"
                        onClick={() => setAddingItemTo(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
