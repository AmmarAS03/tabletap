export default function TableManager() {
    return (
      <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Page Header */}
          <header className="text-center">
            <h1 className="text-3xl font-bold mb-2">Table Manager</h1>
            <p className="text-[#3a855d]/80">
              Add tables and generate QR codes for guests to scan.
            </p>
          </header>
  
          {/* Add Table Form */}
          <section className="bg-white p-6 rounded-2xl shadow border border-[#3a855d]/20">
            <h2 className="text-xl font-semibold mb-4">Add Tables</h2>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="number"
                min="1"
                placeholder="Number of tables"
                className="flex-1 px-4 py-2 rounded-xl border border-[#3a855d]/30 bg-[#f1f1f1] placeholder:text-[#3a855d]/50"
              />
              <button
                type="submit"
                className="bg-[#3a855d] text-white px-6 py-2 rounded-xl hover:bg-[#32724f] transition"
              >
                Generate QR Codes
              </button>
            </form>
          </section>
  
          {/* Table QR Cards */}
          <section>
            <h2 className="text-xl font-semibold mb-6">Existing Tables</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((tableNum) => (
                <div
                  key={tableNum}
                  className="bg-white rounded-xl shadow border border-[#3a855d]/20 p-4 flex flex-col items-center"
                >
                  <p className="font-medium mb-2">Table {tableNum}</p>
                  <div className="bg-[#f1f1f1] w-32 h-32 flex items-center justify-center rounded-lg border border-[#3a855d]/30">
                    <span className="text-sm text-[#3a855d]/60">QR Code</span>
                  </div>
                  <button className="mt-4 text-sm text-[#3a855d] hover:underline">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
  