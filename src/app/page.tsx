export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f1f1f1] text-[#3a855d]">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white/90 shadow border-b border-[#3a855d]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#3a855d]">TableTap</h1>
          <nav className="space-x-4">
            <a
              href="/login"
              className="text-[#3a855d] hover:underline font-medium"
            >
              Login
            </a>
            <a
              href="/login"
              className="bg-[#3a855d] text-white px-4 py-2 rounded-xl hover:bg-[#32724f] transition"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 px-6 py-20 bg-[#f1f1f1]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Streamline Restaurant Ordering with TableTap
          </h2>
          <p className="text-lg text-[#3a855d]/80 mb-10">
            Create digital menus, manage table orders, and delight your guests with a simple QR scan.
          </p>
          <a
            href="/login"
            className="inline-block bg-[#3a855d] text-white px-6 py-3 text-lg rounded-xl hover:bg-[#32724f] transition"
          >
            Start Now
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 border-t border-[#3a855d]/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-[#f1f1f1] p-6 rounded-xl shadow-sm border border-[#3a855d]/20">
            <h3 className="text-xl font-semibold mb-2">Digital Menu Builder</h3>
            <p className="text-[#3a855d]/80">
              Easily add, edit, and organize your restaurant’s menu with categories and items.
            </p>
          </div>
          <div className="bg-[#f1f1f1] p-6 rounded-xl shadow-sm border border-[#3a855d]/20">
            <h3 className="text-xl font-semibold mb-2">QR Code Generator</h3>
            <p className="text-[#3a855d]/80">
              Instantly generate unique QR codes for every table in your restaurant.
            </p>
          </div>
          <div className="bg-[#f1f1f1] p-6 rounded-xl shadow-sm border border-[#3a855d]/20">
            <h3 className="text-xl font-semibold mb-2">Order Management</h3>
            <p className="text-[#3a855d]/80">
              View and manage customer orders as they come in — no paper tickets needed.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f1f1f1] py-6 text-center text-sm text-[#3a855d]/60 border-t border-[#3a855d]/20">
        &copy; {new Date().getFullYear()} TableTap. All rights reserved.
      </footer>
    </div>
  );
}
