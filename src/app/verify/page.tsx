"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function VerifyContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already_verified'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    // Call verification API
    fetch(`/api/verify?token=${token}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setEmail(data.email);
          if (data.already_verified) {
            setStatus('already_verified');
            setMessage('Your email was already verified');
          } else {
            setStatus('success');
            setMessage('Your email has been verified successfully!');
          }
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed');
        }
      })
      .catch(error => {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred during verification');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF0F0] to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/matria-title-logo.svg"
            alt="Matria"
            width={120}
            height={120}
            className="object-cover"
          />
        </div>

        {/* Loading State */}
        {status === 'loading' && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7fd1ae] mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{fontFamily: 'DM Serif Display, serif'}}>
              Verifying your email...
            </h1>
            <p className="text-gray-600 font-manrope">
              Please wait while we confirm your email address.
            </p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div>
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily: 'DM Serif Display, serif'}}>
              Email Verified!
            </h1>
            
            <div className="bg-[#7fd1ae]/10 border border-[#7fd1ae]/20 rounded-lg p-6 mb-6">
              <p className="text-gray-700 font-manrope mb-2">
                <strong>🎉 You're all set!</strong>
              </p>
              <p className="text-sm text-gray-600 font-manrope">
                Your email <strong>{email}</strong> has been verified and you now have <strong>high priority access</strong> when we launch in Connecticut.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 font-manrope">
                <strong>What happens next?</strong><br />
                Keep an eye on your inbox for updates about midwives in your area and our upcoming launch. Verified users get first access!
              </p>
            </div>

            <button 
              onClick={() => window.close()}
              className="px-6 py-3 bg-[#7fd1ae] text-white font-inter font-medium text-sm rounded-full hover:bg-[#5fb894] transition-colors"
            >
              Close Window
            </button>
          </div>
        )}

        {/* Already Verified State */}
        {status === 'already_verified' && (
          <div>
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily: 'DM Serif Display, serif'}}>
              Already Verified
            </h1>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-gray-700 font-manrope">
                Your email <strong>{email}</strong> was already verified. You have high priority access when we launch!
              </p>
            </div>

            <button 
              onClick={() => window.close()}
              className="px-6 py-3 bg-[#7fd1ae] text-white font-inter font-medium text-sm rounded-full hover:bg-[#5fb894] transition-colors"
            >
              Close Window
            </button>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div>
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily: 'DM Serif Display, serif'}}>
              Verification Failed
            </h1>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <p className="text-red-800 font-manrope mb-2">
                <strong>Unable to verify your email</strong>
              </p>
              <p className="text-sm text-red-600 font-manrope">
                {message}
              </p>
            </div>

            <p className="text-sm text-gray-600 font-manrope mb-6">
              The verification link may have expired or been used already. Please try signing up again if needed.
            </p>

            <a 
              href="/"
              className="inline-block px-6 py-3 bg-[#7fd1ae] text-white font-inter font-medium text-sm rounded-full hover:bg-[#5fb894] transition-colors"
            >
              Return to Matria
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Image
              src="/mawa-logo.svg"
              alt="mawa"
              width={30}
              height={30}
              className="object-cover"
            />
            <p className="text-gray-600 text-sm font-bold" style={{fontFamily: 'Playfair Display, serif'}}>
              <i>MAWA</i>
            </p>
          </div>
          <p className="text-xs text-gray-500 font-manrope">
            Part of the Mawa Initiative
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#FAF0F0] to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7fd1ae]"></div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}