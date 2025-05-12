export default function OrdersView() {
    return (
      <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-3xl font-bold mb-2">Order Management</h1>
            <p className="text-[#3a855d]/80">
              View active orders and mark them as completed once served.
            </p>
          </header>
  
          {/* Order Cards */}
          <section className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3].map((orderId) => (
              <div
                key={orderId}
                className="bg-white rounded-2xl border border-[#3a855d]/20 shadow p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Table {orderId}</h2>
                  <span className="text-sm text-[#3a855d]/60">#Order-{1000 + orderId}</span>
                </div>
  
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>2 × Cheeseburger</span>
                    <span>$18.00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>1 × Iced Tea</span>
                    <span>$3.00</span>
                  </li>
                  <li className="text-[#3a855d]/70 italic">Note: No onions, extra sauce</li>
                </ul>
  
                <button
                  type="button"
                  className="w-full bg-[#3a855d] text-white py-2 rounded-xl hover:bg-[#32724f] transition"
                >
                  Mark as Completed
                </button>
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  }
  