"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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

type SelectedItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function CustomerMenu() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get("table");
  const router = useRouter();

  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<SelectedItem[]>([]);

  const handlePlaceOrder = async () => {
    console.log("THIS IS CART",cart)
    const res = await fetch(`/api/customer/orders?table=${tableId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.map(i => ({ menuItemId: i.id, quantity: i.quantity })) }),
    });
  
    const data = await res.json();
    if (res.ok) {
      router.push(`/customer/confirmation?order=${data.orderId}&table=${tableId}`);
    } else {
      alert(data.error || 'Failed to place order');
    }
  };
  

  useEffect(() => {
    if (!tableId) {
      setError("No table specified");
      setLoading(false);
      return;
    }

    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/menu?table=${tableId}`);
        const data = await res.json();
        console.log(res);
        if (!res.ok) throw new Error(data.error || "Failed to fetch menu");
        setMenus(data.menus);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [tableId]);

  return (
    <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Menu</h1>

        {loading ? (
          <p className="text-center text-[#3a855d]">Loading menu...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : menus.length === 0 ? (
          <p className="text-center text-gray-500">
            No menu found for this table.
          </p>
        ) : (
          menus.map((menu) => (
            <div key={menu.id} className="mb-8">
              <h2 className="text-xl font-semibold border-b border-[#3a855d]/20 pb-2 mb-4">
                {menu.title}
              </h2>
              <ul className="space-y-4">
                {menu.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-white p-4 rounded-xl shadow border border-[#3a855d]/10"
                  >
                    <span className="font-medium">{item.name}</span>
                    <div>
                      <span className="text-[#3a855d]/80 mr-5">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => {
                          setCart((prev) => {
                            const exists = prev.find((i) => i.id === item.id);
                            if (exists) {
                              return prev.map((i) =>
                                i.id === item.id
                                  ? { ...i, quantity: i.quantity + 1 }
                                  : i
                              );
                            } else {
                              return [
                                ...prev,
                                {
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  quantity: 1,
                                },
                              ];
                            }
                          });
                        }}
                        className="bg-[#3a855d] text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}

        <h3 className="text-lg font-semibold mb-2">Your Order</h3>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">No items added yet.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 font-bold">
          Total: $
          {cart
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>

        <button
          disabled={cart.length === 0}
          className="mt-4 bg-[#3a855d] text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
