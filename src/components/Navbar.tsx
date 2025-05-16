'use client'

import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    window.location.href = '/login'
  }
  

  return (
    <nav className="w-full px-6 py-4 bg-[#3a855d] text-white flex justify-between items-center">
      <h1 className="text-lg font-bold">TableTap</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-[#3a855d] px-4 py-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
      >
        Logout
      </button>
    </nav>
  )
}
