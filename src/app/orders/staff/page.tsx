'use client';

import { useEffect, useState } from 'react';

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
};

type Order = {
  id: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  tableNumber: number;
};

export default function StaffOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/staff/orders');
      const data = await res.json();
      console.log(data)
      setOrders(data.orders);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/staff/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      await fetchOrders();
    } catch (err) {
      alert('Update failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Customer Orders</h1>

        {loading ? (
          <p className="text-center text-[#3a855d]/70">Loading orders...</p>
        ) : orders === undefined ? (
          <p className="text-center text-[#3a855d]/60">No orders placed yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-xl border border-[#3a855d]/20 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">
                    Table {order.tableNumber} • Order #{order.id}
                  </h2>
                  <span className="text-sm px-3 py-1 rounded-full bg-[#3a855d]/10 text-[#3a855d] capitalize">
                    {order.status.toLowerCase()}
                  </span>
                </div>

                <ul className="mb-4 text-sm text-[#3a855d]/80 space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.quantity}× {item.name}
                    </li>
                  ))}
                </ul>

                {order.status !== 'COMPLETED' && (
                  <div className="flex gap-2">
                    {order.status === 'PENDING' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'IN_PROGRESS')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded transition"
                      >
                        Mark In Progress
                      </button>
                    )}
                    <button
                      onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition"
                    >
                      Mark Completed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
