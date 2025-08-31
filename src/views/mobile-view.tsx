"use client";

import Image from "next/image";
import { useState } from "react";


export default function MobileView() {
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

   const isValidEmail = (email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail.length > 254) return false;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(trimmedEmail);
  };

  const handleJoinWaitlist = async () => {
    const trimmedEmail = emailValue.trim();
    setIsLoading(true);
    if (!trimmedEmail) {
      setEmailError("Please enter your email address");
      setIsLoading(false);
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    setEmailError("");
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowThankYouModal(true);
        setEmailValue("");
      } else {
        setEmailError(data.error || 'Failed to join waitlist');
      }
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setEmailError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-b from-[#FAF0F0] to-white px-6 py-8">
      {/* Header */}
      <div className="relative flex items-center justify-center ">
        <Image
          src="/matria-title-logo.svg"
          alt="Matria"
          width={120}
          height={120}
          className="object-cover"
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-10 justify-cente px-10">
        <div className="flex flex-col space-y-3">
  <h1 className="text-5xl text-center leading-tight text-gray-900" style={{fontFamily: 'DM Serif Display, serif'}}>
    Don't let <span className="text-[#fd526b] underline decoration-dotted decoration-[#fd526b] decoration-3 underline-offset-3">
      bad healthcare
    </span>
  </h1>
      
  <h1 className="text-5xl text-center leading-tight text-gray-900 flex items-center justify-center gap-2" style={{fontFamily: 'DM Serif Display, serif'}}>
    decide
    <div className="w-13 h-13 md:w-10 md:h-10 flex-shrink-0 border border-2 border-white rounded-md -rotate-7">
      <img src="/midwife-inline.png" alt="" className="w-full h-full rounded-md object-cover" />
    </div>
    <span className="whitespace-nowrap">how you</span>
  </h1>

  <h1 className="text-5xl text-center justify-center flex flex-wrap items-center gap-x-2 gap-y-2" style={{fontFamily: 'DM Serif Display, serif'}}>
    <span className="relative overflow-hidden bg-gradient-to-r from-[#7fd1ae]/30 via-[#5fb894]/40 to-[#7fd1ae]/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/30 whitespace-nowrap">
      <span className="relative z-10 font-bold bg-gradient-to-r from-[#7fd1ae] via-[#5fb894] to-[#7fd1ae] bg-clip-text text-transparent">
        give birth
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent w-full h-full -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]"></span>
    </span>
    
    <div className="w-32 h-13 md:w-32 md:h-10 flex-shrink-0 border border-2 border-white rounded-full">
      <img src="/baby-text.png" alt="" className="w-full h-full rounded-full object-cover" />
    </div>
  </h1>
</div>
       

        {/* Email Signup */}
        <div className="mt-6">
        <p className="font-manrope text-[0.9rem] mb-4 text-gray-700">
              Get early access to our midwife directory. <strong>Verify your email for higher priority access when we launch!</strong>
            </p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
                setEmailError("");
              }}
              className="flex-1 px-4 py-3 font-inter text-sm border-0 rounded-full focus:outline-none focus:ring-1 focus:ring-pink-200 bg-white placeholder:text-gray-300 text-[#2a2a2a]"
            />
            <button 
              onClick={handleJoinWaitlist}
              className="px-6 py-3 bg-black text-white font-inter font-medium text-sm rounded-full relative overflow-hidden transition-all duration-300 cursor-pointer hover:bg-gray-800 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(127,209,174,0.8)] animate-[slowPulse_3s_ease-in-out_infinite] before:absolute before:-top-1 before:-left-1 before:-right-1 before:-bottom-1 before:rounded-full before:bg-gradient-to-r before:from-[#7fd1ae] before:via-[#5fb894] before:to-[#7fd1ae] before:bg-[length:300%_300%] before:animate-[borderFlow_4s_linear_infinite] before:opacity-100 before:-z-10 after:absolute after:-top-2 after:-left-2 after:-right-2 after:-bottom-2 after:rounded-full after:bg-gradient-to-r after:from-[rgba(127,209,174,0.8)] after:via-[rgba(95,184,148,0.6)] after:to-[rgba(127,209,174,0.8)] after:bg-[length:300%_300%] after:animate-[borderFlow_4s_linear_infinite] after:blur-lg after:opacity-100 after:-z-20"
            >
              <span className="relative z-10">Get Early Access</span>
            </button>
          </div>
          {emailError && (
            <p className="font-open-sans text-[0.75rem] text-red-500 mt-2">
              {emailError}
            </p>
          )}
          <p className={`font-open-sans text-[0.65rem] text-gray-500 mt-2 transition-opacity duration-500 ${emailValue && !emailError ? 'opacity-100' : 'opacity-0'}`}>
            Committed to launching here in CT! You'll be the first to know!
          </p>
        </div>

        <p className="font-manrope text-[0.9rem] leading-relaxed text-gray-700 mb-8">
          Tired of doctors who don't know your name? <strong className="text-black font-bold">Connecticut has midwives who actually care about you as a person, not just another appointment.</strong> These women will sit with you for hours, answer your calls at 3am, and remember that you're scared of needles and this is your first baby. They cost way less than hospitals too.
          <br /><br />
          Birth doesn't have to be scary or impersonal. You deserve someone who treats you like family, not a medical chart. <strong className="text-black">Find a midwife who gets it.</strong>
        </p>

        
      </div>

      {/* Footer */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Image
            src="/mawa-logo.svg"
            alt="mawa"
            width={40}
            height={40}
            className="object-cover"
          />
          <p className="text-gray-600 text-base font-bold" style={{fontFamily: 'Playfair Display, serif'}}>
            <i>MAWA</i>
          </p>
        </div>
        
        <p className="text-[0.7rem] font-normal text-gray-700 max-w-xs mx-auto">
          Matria is the first step in the <i>Mawa Initiative</i> - our commitment to protecting and helping mothers thrive through natural birth. We believe every woman deserves access to midwives who honor the sacred nature of bringing life into the world, away from impersonal hospital systems.
        </p>
      </div>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setShowThankYouModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="bx bx-x text-xl"></i>
            </button>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/matria-title-logo.svg"
                  alt="Matria"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-3" style={{fontFamily: 'DM Serif Display, serif'}}>
                Thank You!
              </h2>
              
              <p className="text-gray-600 font-manrope text-sm mb-4">
                You've successfully joined our waitlist! We'll notify you as soon as we launch in Connecticut.
              </p>
              
              <div className="bg-[#7fd1ae]/10 border border-[#7fd1ae]/20 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-700 font-manrope">
                  <strong>What's next?</strong> Keep an eye on your inbox for updates about midwives in your area.
                </p>
              </div>
              
              <button 
                onClick={() => setShowThankYouModal(false)}
                className="px-6 py-2 bg-[#7fd1ae] text-white font-inter font-medium text-sm rounded-full hover:bg-[#5fb894] transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}