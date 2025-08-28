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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cardData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex min-h-screen h-screen bg-[#FAF0F0]">
      <div className="flex-1 flex flex-col justify-between px-[7rem] py-[5rem] text-black h-screen">
        <h1 className="text-3xl font-poppins font-medium">Matria</h1>

        <div>
             <h2 className=" text-[3rem] font-manrope">
          Don’t let bad healthcare decide how you give birth
        </h2>

        <p className="font-manrope text-[1rem] py-10">
         Tired of 5-minute doctor visits and $30,000 hospital bills for basic births? Connecticut's healthcare system treats birth like a medical emergency instead of the natural process it is. But families across the state are finding a better way. <br /><br />Midwives who remember your preferences, answer your 3am calls, and create birth experiences that are calm, connected, and empowering. They work in hospitals, birth centers, and homes - wherever you feel safest. Our directory helps you find midwives who align with your values, accept your insurance, and cost thousands less than traditional obstetric care. Because bringing life into the world should be beautiful, not bureaucratic. Your birth, your choice.
        </p>

        <div className="mt-8">
          <p className="font-manrope text-[0.9rem] mb-4 text-gray-700">
            Get early access to our midwife directory
          </p>
          <div className="flex gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 font-open-sans text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 bg-white"
            />
            <button className="px-6 py-3 bg-black text-white font-manrope font-medium text-sm rounded-lg hover:bg-gray-800 transition-colors">
              Join Waitlist
            </button>
          </div>
          <p className="font-open-sans text-[0.75rem] text-gray-500 mt-2">
            We'll notify you when we launch in Connecticut
          </p>
        </div>
        </div>
     

        <div>
          <p className=""><i>MAWA</i> initiative</p>
          <p className="text-[0.8rem] w-[50%]">
            Matria is the first step in the Mawa Initiative - our commitment to protecting and helping mothers thrive through natural birth. We believe every woman deserves access to midwives who honor the sacred nature of bringing life into the world, away from impersonal hospital systems.

            <br /><br />Because birth should be beautiful, not broken.
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