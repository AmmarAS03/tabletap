"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Tenant = {
  id: number;
  name: string;
  createdAt: string;
  isActive: boolean;
};

export default function AdminDashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const res = await fetch(
          `/api/admin/tenants?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        setTenants(data.tenants);
        setTotal(data.total);
      } catch (err) {
        console.error("Failed to load tenants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, [page]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="flex justify-end mb-6">
          <Link
            href="/admin/create"
            className="bg-[#3a855d] text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition hover:cursor-pointer shadow-md"
          >
            + Create New Tenant
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-left bg-[#3a855d] text-white text-sm uppercase tracking-wide">
                <th className="py-4 px-5">Tenant Name</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Created At</th>
                <th className="py-4 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : tenants.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    No tenants found.
                  </td>
                </tr>
              ) : (
                tenants.map((tenant) => (
                  <tr
                    key={tenant.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-5">{tenant.name}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          tenant.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {tenant.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-sm text-gray-700">
                      {new Date(tenant.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-5 space-x-3">
                      <button
                        className="text-blue-600 hover:underline hover:cursor-pointer"
                        onClick={() => router.push(`/admin/edit/${tenant.id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className={`hover:underline hover:cursor-pointer ${
                          tenant.isActive ? "text-red-600" : "text-green-600"
                        }`}
                        onClick={async () => {
                          const confirmMsg = tenant.isActive
                            ? `Are you sure you want to deactivate "${tenant.name}"?`
                            : `Activate "${tenant.name}"?`;

                          if (!window.confirm(confirmMsg)) return;

                          try {
                            const res = await fetch(
                              `/api/admin/tenants/${tenant.id}`,
                              {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  isActive: !tenant.isActive,
                                }),
                              }
                            );

                            if (!res.ok) throw new Error("Failed to update");

                            const data = await res.json();

                            setTenants((prev) =>
                              prev.map((t) =>
                                t.id === tenant.id
                                  ? { ...t, isActive: data.tenant.isActive }
                                  : t
                              )
                            );
                          } catch (err) {
                            alert("Something went wrong");
                            console.error(err);
                          }
                        }}
                      >
                        {tenant.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition hover:cursor-pointer shadow-sm ${
                  page === i + 1
                    ? "bg-[#3a855d] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
