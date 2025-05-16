'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get('table');

  return (
    <div className="min-h-screen bg-[#f1f1f1] px-4 py-16 text-[#3a855d] flex items-center justify-center">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow border border-[#3a855d]/20 space-y-6">
        <div className="text-4xl">✅</div>
        <h1 className="text-2xl font-bold">Order Placed!</h1>
        <p className="text-[#3a855d]/80">
          Thank you for your order. Our team is preparing it and will serve you shortly.
        </p>

        <p className="text-sm text-[#3a855d]/60">Estimated wait time: ~10–15 minutes</p>

        <a
          href={`/customer/menu?table=${tableId}`}
          className="inline-block mt-4 bg-[#3a855d] text-white px-6 py-2 rounded-xl hover:bg-[#32724f] transition"
        >
          Order Again
        </a>
      </div>
    </div>
  );
}

export default function OrderConfirmation() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-[#3a855d]">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
