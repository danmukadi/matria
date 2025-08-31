"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const cardData = [
  {
    title: "Everything I hoped for!!",
    rating: 5,
    review: "Her calm presence helped me stay focused, and she advocated for my birth plan when things got intense."
  },
  {
    title: "Felt like having a friend near",
    rating: 5,
    review: "The birth went smoothly and she was very encouraging throughout the whole process."
  },
  {
    title: "Finally someone who I could talk to",
    rating: 5,
    review: "She caught a potential issue early and helped me navigate the best options for my baby and me."
  },
  {
    title: "Couldn't have done it without Maria",
    rating: 4,
    review: " When labor started, she came to my home and labored with me for hours before we went to the birth center. "
  },
  {
    title: "Like a part of the family",
    rating: 5,
    review: "She knows my medical history inside and out, remembers details about my family, and somehow manages to make each appointment feel unhurried even though I know she's busy."
  }
];

const heroImages = [
  "/matria-desktop-img1.webp",
  "/married-couple-talking.webp", 
  "/newborn.webp",
  "/rejoice.webp",
  "/midwife-checkup.webp"
];

const profileImages = [
  "/profile/profile1.png",
  "/profile/profile2.png",
  "/profile/profile3.png", 
  "/profile/profile4.png",
  "/profile/profle5.png"
];

// iOS Style Loader Component
const IOSLoader = ({ resetKey }: { resetKey: number }) => {
  return (
    <div className="relative w-6 h-6">
      <svg 
        className="w-full h-full -rotate-90" 
        viewBox="0 0 60 60"
      >
        <circle
          cx="30"
          cy="30"
          r="25"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="6"
          fill="none"
        />
        <circle
          key={resetKey}
          cx="30"
          cy="30"
          r="25"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="157.08"
          strokeDashoffset="157.08"
          className="loader-ring"
        />
      </svg>
    </div>
  );
};

export default function TabletView() {
  const [currentCard, setCurrentCard] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cardData.length);
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="relative min-h-screen h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="Matria"
            fill
            className={`object-cover transition-opacity duration-1000 absolute inset-0 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-md bg-black/10"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-between px-8 py-8 text-white">
        {/* Header */}
        <div className="flex justify-center">
          <Image
            src="/matria-title-logo.svg"
            alt="Matria"
            width={130}
            height={130}
            className="object-cover drop-shadow-lg"
          />
        </div>
        
        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl leading-tight text-white drop-shadow-lg mb-8" style={{fontFamily: 'DM Serif Display, serif'}}>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              Don't let 
              <span className="text-[#fd526b] underline decoration-dotted decoration-[#fd526b] decoration-3 underline-offset-3">
                bad healthcare
              </span> 
              decide
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mt-2">
              <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 border border-3 border-white rounded-md -rotate-7">
                <img src="/midwife-inline.png" alt="" className="w-full h-full object-cover " />
              </div>
              
              <span className="whitespace-nowrap">how you</span>
              
  <span className="text-[#7fd1ae] relative z-10 font-bold drop-shadow-lg underline decoration-dotted decoration-[#7fd1ae] decoration-3 underline-offset-3">
    give birth
  </span>
  
              
              <div className="w-32 h-10 md:w-40 md:h-12 flex-shrink-0 border border-3 border-white rounded-full">
                <img src="/baby-text.png" alt="" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
          </h1>

         <p className="font-manrope text-[1rem] py-10 font-normal leading-relaxed  max-w-2xl">
Tired of doctors who don't know your name? <strong className="font-bold text-[#7fd1ae]">Connecticut has midwives who actually care about you as a person, not just another appointment.</strong><br /><br /> These women will sit with you for hours, answer your calls at 3am, and remember that you're scared of needles and this is your first baby. They cost way less than hospitals too.
Birth doesn't have to be scary or impersonal. You deserve someone who treats you like family, not a medical chart. <strong className="text-[#7fd1ae]">Find a midwife who gets it.</strong>       
</p>

          {/* Email Signup */}
          <div className="mb-8 w-full max-w-lg">
            <p className="font-manrope text-[0.9rem] mb-4">
              Get early access to our midwife directory. <strong>Verify your email for higher priority access when we launch!</strong>
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                  setEmailError("");
                }}
                className="flex-1 px-5 py-4 font-inter text-sm border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7fd1ae] bg-white/90 backdrop-blur-sm placeholder:text-gray-500 text-[#2a2a2a]"
              />
              <button 
                onClick={handleJoinWaitlist}
                className="px-8 py-4 bg-[#7fd1ae] text-white font-inter font-medium text-sm rounded-full relative overflow-hidden transition-all duration-300 cursor-pointer hover:bg-[#5fb894] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(127,209,174,0.8)] animate-[slowPulse_3s_ease-in-out_infinite]"
              >
                <span className="relative z-10">Get Early Access</span>
              </button>
            </div>
            {emailError && (
              <p className="font-open-sans text-sm text-red-300 mt-2 drop-shadow-md">
                {emailError}
              </p>
            )}
            <p className={`font-open-sans text-sm mt-2 transition-opacity duration-500 drop-shadow-md ${emailValue && !emailError ? 'opacity-100' : 'opacity-0'}`}>
              Committed to launching here in CT! You'll be the first to know!
            </p>
          </div>

          {/* Testimonial Card - Simplified */}
          <div className="relative bg-black/20 backdrop-blur-xl rounded-2xl p-6 max-w-lg border border-white/20">
            {/* Card Counter and Loader */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="text-white/70 text-sm font-manrope">
                {currentCard + 1}/{cardData.length}
              </span>
              <IOSLoader resetKey={currentCard} />
            </div>
            
            <div className="text-white">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={profileImages[currentCard]}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-xl object-cover border border-white border-2 -rotate-6"
                />
                <h3 className="font-dancing-script font-bold text-lg italic">
                  {cardData[currentCard].title}
                </h3>
              </div>
              
              <p className="font-manrope text-gray-200 text-sm leading-relaxed">
                {cardData[currentCard].review}
              </p>
            </div>
            
            {/* Star Rating */}
            <div className="absolute bottom-3 right-4 flex">
              {[...Array(5)].map((_, index) => (
                <i 
                  key={index}
                  className={`bx ${index < cardData[currentCard].rating ? 'bxs-star' : 'bx-star'} text-[#7fd1ae] text-base`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 mb-3">
            <Image
              src="/mawa-logo.svg"
              alt="mawa"
              width={50}
              height={50}
              className="object-cover drop-shadow-lg"
            />
            <p className="text-lg font-bold drop-shadow-lg" style={{fontFamily: 'Playfair Display, serif'}}>
              <i>MAWA</i>
            </p>
          </div>
          
          <p className="text-sm font-normal max-w-md mx-auto drop-shadow-md opacity-90">
            Matria is the first step in the <i>Mawa Initiative</i> - our commitment to protecting and helping mothers thrive through natural birth. We believe every woman deserves access to midwives who honor the sacred nature of bringing life into the world, away from impersonal hospital systems.
          </p>
        </div>
      </div>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl relative">
            <button
              onClick={() => setShowThankYouModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="bx bx-x text-2xl"></i>
            </button>
            
             <div className="text-center">
                          <div className="flex items-center justify-center mx-auto mb-6">
                             <Image
                                src="/matria-title-logo.svg"
                                alt="mawa"
                                width={150}
                                height={150}
                                className="rounded-tl-4xl object-cover"
                              />
                          </div>
                          
                          <h2 className="text-4xl font-bold text-gray-900 mb-3" style={{fontFamily: 'DM Serif Display, serif'}}>
                            Thank You!
                          </h2>
                          
                          <p className="text-gray-600 font-manrope mb-6">
                            You've successfully joined our waitlist! We'll notify you as soon as we launch in Connecticut.
                          </p>
                          
                          <div className="bg-[#7fd1ae]/10 border border-[#7fd1ae]/20 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-700 font-manrope">
                              <strong>What's next?</strong> Keep an eye on your inbox for updates about midwives in your area and our upcoming launch.
                            </p>
                          </div>
            
                          <div className="flex justify-center items-center gap-1">
                            <div className="w-[7rem] h-[12rem] rounded-full overflow-hidden">
                              <Image
                                src={heroImages[0]}
                                alt="Matria"
                                width={112}
                                height={192}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-[7rem] h-[12rem] rounded-full overflow-hidden">
                              <Image
                                src={heroImages[1]}
                                alt="Matria"
                                width={112}
                                height={192}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-[7rem] h-[12rem] rounded-full overflow-hidden">
                              <Image
                                src={heroImages[2]}
                                alt="Matria"
                                width={112}
                                height={192}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-[7rem] h-[12rem] rounded-full overflow-hidden">
                              <Image
                                src={heroImages[3]}
                                alt="Matria"
                                width={112}
                                height={192}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-[7rem] h-[12rem] rounded-full overflow-hidden">
                              <Image
                                src={heroImages[4]}
                                alt="Matria"
                                width={112}
                                height={192}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
          </div>
        </div>
      )}
    </div>
  );
}