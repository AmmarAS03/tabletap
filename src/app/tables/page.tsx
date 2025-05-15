"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Navbar from "@/components/Navbar";

type Table = {
  id: number;
  number: number;
};

export default function TableManagement() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showQR, setShowQR] = useState<Record<number, boolean>>({});

  const baseURL = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await fetch("/api/restaurant/tables");
      const data = await res.json();
      setTables(data.tables);
    } catch (err) {
      console.error("Failed to load tables:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (count < 1) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/restaurant/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count }),
      });
      if (!res.ok) throw new Error("Failed to generate tables");
      await fetchTables();
      setCount(1);
      setSuccessMessage(`✅ Successfully added ${count} table(s).`);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this table?")) return;
    try {
      const res = await fetch(`/api/restaurant/tables/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchTables();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Table Manager</h1>
          <p className="text-[#3a855d]/70 mb-6">
            You currently have <strong>{tables.length}</strong> table(s). The
            next will start from <strong>{tables.length + 1}</strong>.
          </p>

          {successMessage && (
            <div className="text-green-700 bg-green-100 px-4 py-2 rounded mb-4">
              {successMessage}
            </div>
          )}

          {/* Generate Form */}
          <form
            onSubmit={handleGenerate}
            className="flex items-end gap-4 mb-8 bg-white p-6 rounded-xl border border-[#3a855d]/20 shadow"
          >
            <div className="flex-1">
              <label className="block text-sm mb-1">
                How many tables to add?
              </label>
              <input
                type="number"
                min={1}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-[#3a855d]/30 bg-[#f1f1f1]"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#3a855d] text-white px-6 py-2 rounded-xl hover:bg-green-700 transition cursor-pointer"
            >
              {submitting ? "Adding..." : "Generate"}
            </button>
          </form>

          {/* Table List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <p>Loading tables...</p>
            ) : tables.length === 0 ? (
              <p>No tables created yet.</p>
            ) : (
              tables.map((table) => (
                <div
                  key={table.id}
                  className="bg-white p-6 rounded-xl border border-[#3a855d]/20 shadow text-center flex flex-col items-center space-y-3"
                >
                  <h3 className="font-semibold text-lg">
                    Table {table.number}
                  </h3>

                  <button
                    onClick={() =>
                      setShowQR((prev) => ({
                        ...prev,
                        [table.id]: !prev[table.id],
                      }))
                    }
                    className="text-sm text-[#3a855d] hover:underline cursor-pointer"
                  >
                    {showQR[table.id] ? "Hide QR" : "Show QR"}
                  </button>

                  {showQR[table.id] && (
                    <div className="flex flex-col items-center space-y-2">
                      <QRCode
                        value={`${baseURL}/customer/menu?table=${table.id}`}
                        size={128}
                      />
                      <p className="text-xs text-[#3a855d]/70 break-all text-center">
                        {`${baseURL}/customer/menu?table=${table.id}`}
                      </p>
                      <button
                        onClick={() => window.print()}
                        className="text-xs text-[#3a855d] underline cursor-pointer"
                      >
                        Print QR
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => handleDelete(table.id)}
                    className="text-xs text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
