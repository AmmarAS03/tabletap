export default function CustomerItem() {
    return (
      <div className="min-h-screen bg-[#f1f1f1] px-4 py-10 text-[#3a855d]">
        <div className="max-w-md mx-auto space-y-8">
          {/* Back link */}
          <a href="/customer/menu" className="text-sm hover:underline block">
            ← Back to menu
          </a>
  
          {/* Item Details */}
          <div className="bg-white p-6 rounded-2xl shadow border border-[#3a855d]/20 space-y-4">
            <h1 className="text-2xl font-bold">Garlic Bread</h1>
            <p className="text-[#3a855d]/70">
              Toasted baguette with garlic butter and herbs.
            </p>
            <p className="text-lg font-medium">$4.00</p>
  
            {/* Quantity + Notes */}
            <form className="space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  defaultValue="1"
                  className="w-full px-4 py-2 rounded-lg border border-[#3a855d]/30 bg-[#f1f1f1] text-[#3a855d]"
                />
              </div>
  
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Notes (optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="e.g. No onions"
                  className="w-full px-4 py-2 rounded-lg border border-[#3a855d]/30 bg-[#f1f1f1] text-[#3a855d]"
                />
              </div>
  
              <button
                type="submit"
                className="w-full bg-[#3a855d] text-white py-3 rounded-xl hover:bg-[#32724f] transition"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  