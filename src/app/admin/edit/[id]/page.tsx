'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function EditTenantPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const res = await fetch(`/api/admin/tenants/${id}`);
        const data = await res.json();
        setForm({ name: data.tenant.name, email: data.tenant.email, address: data.tenant.address || '' });
      } catch (err) {
        console.error('Failed to load tenant:', err);
        setError('Failed to load tenant');
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/tenants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update tenant');
      router.push('/admin');
    } catch (err) {
      console.error(err);
      setError('Update failed');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow text-[#3a855d]">
        <h1 className="text-2xl font-bold mb-4">Edit Tenant</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full border rounded px-4 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={() => router.push('/admin')} className="underline text-sm hover:cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="bg-[#3a855d] text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
