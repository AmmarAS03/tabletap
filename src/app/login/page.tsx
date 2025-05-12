export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1] px-4 py-12">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border border-[#3a855d]/30">
        <h2 className="text-2xl font-bold text-center text-[#3a855d] mb-6">
          Login to TableTap
        </h2>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#3a855d]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="ammar@gmail.com"
              className="mt-1 w-full px-4 py-2 rounded-xl border border-[#3a855d]/50 bg-[#f1f1f1] text-gray-800 shadow-sm focus:ring-2 focus:ring-[#3a855d]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#3a855d]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 rounded-xl border border-[#3a855d]/50 bg-[#f1f1f1] text-gray-800 shadow-sm focus:ring-2 focus:ring-[#3a855d]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3a855d] text-white py-2 px-4 rounded-xl hover:bg-[#32724f] transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{' '}
          <a href="#" className="text-[#3a855d] hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
