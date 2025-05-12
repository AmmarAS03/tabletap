export default function MenuEditor() {
    return (
      <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-3xl font-bold mb-2">Menu Editor</h1>
            <p className="text-[#3a855d]/80">
              Organize your restaurant’s offerings by category and item.
            </p>
          </header>
  
          {/* Add Category */}
          <section className="bg-white p-6 rounded-2xl shadow border border-[#3a855d]/20">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="e.g. Beverages"
                className="flex-1 px-4 py-2 rounded-xl border border-[#3a855d]/30 bg-[#f1f1f1] placeholder:text-[#3a855d]/50"
              />
              <button
                type="submit"
                className="bg-[#3a855d] text-white px-6 py-2 rounded-xl hover:bg-[#32724f] transition"
              >
                Add Category
              </button>
            </form>
          </section>
  
          {/* Category Block */}
          <section className="space-y-10">
            {/* Category Card */}
            <div className="bg-white p-6 rounded-2xl shadow border border-[#3a855d]/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Appetizers</h3>
                <button className="text-sm text-[#3a855d] hover:underline">
                  + Add Item
                </button>
              </div>
  
              <div className="space-y-4">
                {/* Menu Item */}
                <div className="flex justify-between items-center bg-[#f1f1f1] p-4 rounded-xl">
                  <div>
                    <p className="font-medium">Garlic Bread</p>
                    <p className="text-sm text-[#3a855d]/70">$4.00</p>
                  </div>
                  <button className="text-sm text-red-500 hover:underline">Remove</button>
                </div>
  
                <div className="flex justify-between items-center bg-[#f1f1f1] p-4 rounded-xl">
                  <div>
                    <p className="font-medium">Bruschetta</p>
                    <p className="text-sm text-[#3a855d]/70">$5.50</p>
                  </div>
                  <button className="text-sm text-red-500 hover:underline">Remove</button>
                </div>
              </div>
            </div>
  
            {/* Another Category Example */}
            <div className="bg-white p-6 rounded-2xl shadow border border-[#3a855d]/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Drinks</h3>
                <button className="text-sm text-[#3a855d] hover:underline">
                  + Add Item
                </button>
              </div>
  
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#f1f1f1] p-4 rounded-xl">
                  <div>
                    <p className="font-medium">Iced Tea</p>
                    <p className="text-sm text-[#3a855d]/70">$3.00</p>
                  </div>
                  <button className="text-sm text-red-500 hover:underline">Remove</button>
                </div>
  
                <div className="flex justify-between items-center bg-[#f1f1f1] p-4 rounded-xl">
                  <div>
                    <p className="font-medium">Lemonade</p>
                    <p className="text-sm text-[#3a855d]/70">$3.50</p>
                  </div>
                  <button className="text-sm text-red-500 hover:underline">Remove</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  