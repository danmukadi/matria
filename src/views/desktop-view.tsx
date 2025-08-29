"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const cardData = [
  {
    title: "Common Questions",
    questions: [
      "Will my insurance cover a midwife?",
      "Are home births safe?",
    ]
  },
  {
    title: "Cost & Insurance",
    questions: [
      "How much does a midwife cost?",
      "What insurance plans cover midwifery care?",
    ]
  },
  {
    title: "Birth Experience",
    questions: [
      "Can I still have pain relief?",
      "What happens in an emergency?",
    ]
  },
  {
    title: "Finding Care",
    questions: [
      "How do I find a midwife near me?",
      "When should I start looking?",
    ]
  }
];

export default function DesktopView() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cardData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleJoinWaitlist = () => {
    if (!emailValue) {
      setEmailError("Please enter your email address");
      return;
    }
    
    if (!isValidEmail(emailValue)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setEmailError("");
    // Handle successful email submission here
    console.log("Valid email submitted:", emailValue);
  };
  return (
    <div className="flex relative min-h-screen h-screen bg-gradient-to-r from-[#FAF0F0] to-white">
      <div className="h-[3rem] w-full absolute bottom-0 bg-[#f2cdce]"></div>
      <div className="flex-1 flex flex-col justify-between px-[7rem] py-[5rem] text-[#2a2a2a] h-screen">
        <div className="relative flex items-center">
           <Image
              src="/matria-title-logo.svg"
              alt="mawa"
              width={150}
              height={150}
              className="rounded-tl-4xl object-cover"
            />
        </div>
        

        <div>
            <h1 className="text-5xl leading-tight text-gray-900" style={{fontFamily: 'DM Serif Display, serif'}}>
  Don't let  <span className="text-[#fd526b] underline decoration-dotted decoration-[#fd526b] decoration-5 underline-offset-4">bad healthcare</span> decide 
  <span className="inline-flex items-center gap-2">
    <div className="w-12 h-12 flex-shrink-0 border border-3 border-white rounded-md">
      <img src="/midwife-inline.png" alt="" className="w-full h-full rounded-md object-cover" />
    </div>
    how you
    <span className="relative overflow-hidden bg-gradient-to-r from-[#7fd1ae]/30 via-[#5fb894]/40 to-[#7fd1ae]/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/30">
      <span className="relative z-10 font-bold bg-gradient-to-r from-[#7fd1ae] via-[#5fb894] to-[#7fd1ae] bg-clip-text text-transparent">give birth</span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent w-full h-full -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]"></span>
    </span>
   <div className="w-40 h-12 flex-shrink-0 border border-3 border-white rounded-full">
      <img src="/baby-text.png" alt="" className="w-full h-full rounded-full object-cover" />
    </div>
  </span>
  
</h1>

        <p className="font-manrope text-[1rem] py-10 font-normal leading-relaxed text-gray-700 max-w-xl hidden">
         Tired of 5-minute doctor visits and $30,000 hospital bills for basic births? Connecticut's healthcare system treats birth like a medical emergency instead of the natural process it is. But families across the state are finding a better way. <br /><br />Midwives who remember your preferences, answer your 3am calls, and create birth experiences that are calm, connected, and empowering. They work in hospitals, birth centers, and homes - wherever you feel safest. Our directory helps you find midwives who align with your values, accept your insurance, and cost thousands less than traditional obstetric care. Because bringing life into the world should be beautiful, not bureaucratic. <br /><br />Your birth, your choice.
        </p>

         <p className="font-manrope text-[1rem] py-10 font-normal leading-relaxed text-gray-700 max-w-2xl">
Tired of doctors who don't know your name? <strong className="text-black font-bold">Connecticut has midwives who actually care about you as a person, not just another appointment.</strong> These women will sit with you for hours, answer your calls at 3am, and remember that you're scared of needles and this is your first baby. They cost way less than hospitals too.
Birth doesn't have to be scary or impersonal. You deserve someone who treats you like family, not a medical chart. <strong className="text-black">Find a midwife who gets it.</strong>       
</p>

        <div className="mt-5">
          <p className="font-manrope text-[0.9rem] mb-4 text-gray-700">
            Get early access to our midwife directory
          </p>
          <div className="flex gap-4 max-w-xl">
            <input
              type="email"
              placeholder="Enter your email"
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
                setEmailError(""); // Clear error when user types
              }}
              className="flex-1 px-6 py-4 font-inter text-sm border-0 rounded-full focus:outline-none focus:ring-1 focus:ring-pink-200 bg-white placeholder:text-gray-300 text-[#2a2a2a]"
            />
            <button 
              onClick={handleJoinWaitlist}
              className="px-8 py-4 bg-black text-white font-inter font-medium text-sm rounded-full relative overflow-hidden transition-all duration-300 cursor-pointer hover:bg-gray-800 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(127,209,174,0.8)] animate-[slowPulse_3s_ease-in-out_infinite] before:absolute before:-top-1 before:-left-1 before:-right-1 before:-bottom-1 before:rounded-full before:bg-gradient-to-r before:from-[#7fd1ae] before:via-[#5fb894] before:to-[#7fd1ae] before:bg-[length:300%_300%] before:animate-[borderFlow_4s_linear_infinite] before:opacity-100 before:-z-10 after:absolute after:-top-2 after:-left-2 after:-right-2 after:-bottom-2 after:rounded-full after:bg-gradient-to-r after:from-[rgba(127,209,174,0.8)] after:via-[rgba(95,184,148,0.6)] after:to-[rgba(127,209,174,0.8)] after:bg-[length:300%_300%] after:animate-[borderFlow_4s_linear_infinite] after:blur-lg after:opacity-100 after:-z-20"
            >
              <span className="relative z-10">Get Early Access</span>
            </button>
          </div>
          {emailError && (
            <p className="font-open-sans text-[0.75rem] text-red-500 mt-2">
              {emailError}
            </p>
          )}
          <p className={`font-open-sans text-[0.75rem] text-gray-500 mt-2 transition-opacity duration-500 ${emailValue && !emailError ? 'opacity-100' : 'opacity-0'}`}>
            Committed to launching here in CT! <span><i className="bx bxs-circle"></i>You'll be the first to know!</span>
          </p>
        </div>
        </div>
     

        <div>
          <div className="relative flex gap-2 items-center">
            <Image
              src="/mawa-logo.svg"
              alt="mawa"
              width={70}
              height={70}
              className="rounded-tl-4xl object-cover"
            />
            <p className="text-gray-600 text-xl mt-3 font-bold" style={{fontFamily: 'Playfair Display, serif'}}><i>MAWA</i> </p>
          </div>
          
          <p className="text-[0.75rem] w-[49%] font-normal text-gray-700">
            Matria is the first step in the <i>Mawa Initiative</i> - our commitment to protecting and helping mothers thrive through natural birth. We believe every woman deserves access to midwives who honor the sacred nature of bringing life into the world, away from impersonal hospital systems.
          </p>
        </div>
      </div>
      <div className="w-1/2 h-screen relative">
        <Image
          src="/matria-desktop-img1.webp"
          alt="Matria"
          fill
          className="rounded-tl-4xl object-cover"
        />
        
        {/* Glass card overlay */}
        <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2">
          {/* iOS-style indicator bubbles on top */}
          <div className="flex justify-center mb-4 space-x-2">
            {cardData.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentCard ? 'bg-white' : 'bg-gray-400/50'
                }`}
              />
            ))}
          </div>

          <div className="relative">
            {/* Background card (next card preview) */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 top-14 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-[30rem] shadow-lg opacity-50 blur-[1px] transition-all duration-500">
              <div className="text-white">
                <h3 className="font-manrope font-medium text-lg mb-3">
                  {cardData[(currentCard + 1) % cardData.length].title}
                </h3>
                <p className="font-open-sans text-sm leading-relaxed">
                  {cardData[(currentCard + 1) % cardData.length].questions.map((question, index) => (
                    <span key={index}>
                      "{question}"
                      {index < cardData[(currentCard + 1) % cardData.length].questions.length - 1 && <><br /></>}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            {/* Main card */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-[35rem] shadow-xl transition-all duration-500">
              <div className="text-white">
                <h3 className="font-manrope font-medium text-lg mb-3">
                  {cardData[currentCard].title}
                </h3>
                <p className="font-open-sans text-sm leading-relaxed">
                  {cardData[currentCard].questions.map((question, index) => (
                    <span key={index}>
                      "{question}"
                      {index < cardData[currentCard].questions.length - 1 && <><br /></>}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}