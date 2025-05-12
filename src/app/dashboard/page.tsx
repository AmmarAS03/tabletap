export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f1f1f1] px-6 py-10 text-[#3a855d]">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-[#3a855d]/80">
            Manage your menu, tables, and customer orders below.
          </p>
        </header>

        {/* Dashboard Panels */}
        <div className="grid gap-8 md:grid-cols-3">
          <a
            href="/menu-editor"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-[#3a855d]/20"
          >
            <h2 className="text-xl font-semibold mb-2">Menu Editor</h2>
            <p className="text-[#3a855d]/80">
              Add, remove, and update food and drink items.
            </p>
          </a>

          <a
            href="/tables"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-[#3a855d]/20"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Tables</h2>
            <p className="text-[#3a855d]/80">
              Set the number of tables and generate QR codes.
            </p>
          </a>

          <a
            href="/orders"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-[#3a855d]/20"
          >
            <h2 className="text-xl font-semibold mb-2">Order Management</h2>
            <p className="text-[#3a855d]/80">
              View customer orders and mark them as complete.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
