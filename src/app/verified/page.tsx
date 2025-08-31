// app/verified/page.js
import Image from 'next/image';

export default function VerifiedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#FAF0F0] to-white">
      <div className="bg-white rounded-2xl p-8 max-w-[40rem] w-full mx-4 text-center">
        <div className="flex items-center justify-center mx-auto mb-6">
          <Image
            src="/matria-title-logo.svg"
            alt="mawa"
            width={150}
            height={150}
            className="rounded-tl-4xl object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>
          Email Verified!
        </h1>
        <p className="text-gray-600 font-manrope mb-6">
          You’ve secured <strong>higher priority access</strong> to Matria’s midwife directory. You’re now authorized for early access when we launch in Connecticut!
        </p>
        <a
          href="/"
          className="px-8 py-4 bg-black text-white font-inter font-medium text-sm rounded-full inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}