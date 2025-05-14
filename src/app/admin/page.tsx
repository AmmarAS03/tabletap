import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
        <h1 className="text-3xl font-bold mb-6">Superadmin Dashboard</h1>

        {/* New Tenant Button */}
        <div className="flex justify-end mb-4">
          <button className="bg-[#3a855d] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            + Create New Tenant
          </button>
        </div>

        {/* Tenants Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="text-left bg-[#3a855d] text-white">
                <th className="py-3 px-4">Tenant Name</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: "GreenBites Cafe", createdAt: "2025-03-10" },
                { id: 2, name: "Sunset Diner", createdAt: "2025-04-01" },
              ].map((tenant) => (
                <tr key={tenant.id} className="border-t">
                  <td className="py-3 px-4">{tenant.name}</td>
                  <td className="py-3 px-4">{tenant.createdAt}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
