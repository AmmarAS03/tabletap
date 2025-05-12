export default function CustomerCart() {
    return (
      <div className="min-h-screen bg-[#f1f1f1] px-4 py-10 text-[#3a855d]">
        <div className="max-w-2xl mx-auto space-y-10">
          {/* Back to menu */}
          <a href="/customer/menu" className="text-sm hover:underline block">
            ← Back to menu
          </a>
  
          {/* Header */}
          <header>
            <h1 className="text-3xl font-bold mb-2">Your Order</h1>
            <p className="text-[#3a855d]/80">Review your items before placing your order.</p>
          </header>
  
          {/* Cart Items */}
          <section className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow border border-[#3a855d]/20 flex justify-between items-center">
              <div>
                <p className="font-medium">2 × Garlic Bread</p>
                <p className="text-sm text-[#3a855d]/70">No onions</p>
              </div>
              <div className="text-right">
                <p>$8.00</p>
                <button className="text-sm text-red-500 hover:underline">Remove</button>
              </div>
            </div>
  
            <div className="bg-white p-4 rounded-xl shadow border border-[#3a855d]/20 flex justify-between items-center">
              <div>
                <p className="font-medium">1 × Iced Tea</p>
              </div>
              <div className="text-right">
                <p>$3.00</p>
                <button className="text-sm text-red-500 hover:underline">Remove</button>
              </div>
            </div>
          </section>
  
          {/* Order Notes */}
          <div className="bg-white p-4 rounded-xl shadow border border-[#3a855d]/20">
            <label htmlFor="order-notes" className="block text-sm font-medium mb-1">
              Order Notes (optional)
            </label>
            <textarea
              id="order-notes"
              rows={3}
              placeholder="e.g. Please bring extra napkins"
              className="w-full px-4 py-2 rounded-lg border border-[#3a855d]/30 bg-[#f1f1f1] text-[#3a855d]"
            />
          </div>
  
          {/* Total + Place Order */}
          <div className="bg-white p-6 rounded-xl shadow border border-[#3a855d]/20 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>$11.00</span>
            </div>
            <a
              href="/customer/confirmation"
              className="block w-full text-center bg-[#3a855d] text-white py-3 rounded-xl hover:bg-[#32724f] transition"
            >
              Place Order
            </a>
          </div>
        </div>
      </div>
    );
  }
  