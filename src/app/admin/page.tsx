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
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* New Tenant Button */}
        <div className="flex justify-end mb-4">
          <Link
            href="/admin/create"
            className="bg-[#3a855d] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Create New Tenant
          </Link>
        </div>

        {/* Tenants Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="text-left bg-[#3a855d] text-white">
                <th className="py-3 px-4">Tenant Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : tenants.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No tenants found.
                  </td>
                </tr>
              ) : (
                tenants.map((tenant) => (
                  <tr key={tenant.id} className="border-t">
                    <td className="py-3 px-4">{tenant.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          tenant.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {tenant.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      {new Date(tenant.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 space-x-2">
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={() => router.push(`/admin/edit/${tenant.id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className={`hover:underline ${
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

                            // update local state
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
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? "bg-[#3a855d] text-white"
                    : "bg-gray-200 text-gray-800"
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
