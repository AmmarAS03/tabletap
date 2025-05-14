import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

export default async function CustomerMenu() {
  const user = (await cookies()).get("user");
  console.log("🧁 Auth Cookie:", user?.value);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f1f1f1] px-4 py-8 text-[#3a855d]">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome to TableTap</h1>
            <p className="text-[#3a855d]/80">
              Please browse the menu and place your order.
            </p>
          </header>

          {/* Categories and Items */}
          <section className="space-y-8">
            {/* Category */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Appetizers</h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#3a855d]/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Garlic Bread</p>
                      <p className="text-sm text-[#3a855d]/70">
                        Toasted with herbs and butter
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$4.00</p>
                      <button className="mt-1 text-sm text-[#3a855d] hover:underline">
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#3a855d]/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Spring Rolls</p>
                      <p className="text-sm text-[#3a855d]/70">
                        Crispy rolls with veggies
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$5.50</p>
                      <button className="mt-1 text-sm text-[#3a855d] hover:underline">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Another Category */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Drinks</h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#3a855d]/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Iced Tea</p>
                      <p className="text-sm text-[#3a855d]/70">
                        Refreshing and cool
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$3.00</p>
                      <button className="mt-1 text-sm text-[#3a855d] hover:underline">
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-[#3a855d]/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Lemonade</p>
                      <p className="text-sm text-[#3a855d]/70">
                        Freshly squeezed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$3.50</p>
                      <button className="mt-1 text-sm text-[#3a855d] hover:underline">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* View Cart */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
            <a
              href="/customer/cart"
              className="block text-center bg-[#3a855d] text-white py-3 rounded-xl shadow hover:bg-[#32724f] transition"
            >
              View Cart (2)
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
