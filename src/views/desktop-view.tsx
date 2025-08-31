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
      {/* Background ring */}
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
        {/* Progress ring */}
        <circle
          key={resetKey}
          cx="30"
          cy="30"
          r="25"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="157.08" /* 2 * π * 25 */
          strokeDashoffset="157.08"
          className="loader-ring"
        />
      </svg>
    </div>
  );
};

export default function DesktopView() {
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
    <div className="w-12 h-12 flex-shrink-0 border border-3 border-white rounded-md -rotate-7">
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
Tired of doctors who don't know your name? <strong className="text-black font-bold">Connecticut has midwives who actually care about you as a person, not just another appointment.</strong><br /><br /> These women will sit with you for hours, answer your calls at 3am, and remember that you're scared of needles and this is your first baby. They cost way less than hospitals too.
Birth doesn't have to be scary or impersonal. You deserve someone who treats you like family, not a medical chart. <strong className="text-black">Find a midwife who gets it.</strong>       
</p>

        <div className="mt-5">
         <p className="font-manrope text-[0.9rem] mb-4 text-gray-700">
              Get early access to our midwife directory. <strong>Verify your email for higher priority access when we launch!</strong>
            </p>
          <div className="flex gap-4 max-w-2xl">
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
        <div className="h-[3rem] w-full absolute bottom-0 bg-[#564147] z-10"></div>
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="Matria"
            fill
            className={`rounded-tl-4xl object-cover transition-opacity duration-1000 absolute inset-0 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        
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
                  "{cardData[(currentCard + 1) % cardData.length].review}"
                </p>
              </div>
            </div>

            {/* Main card */}
            <div className="flex flex-col items-center justify-center relative bg-black/10 backdrop-blur-xl rounded-2xl px-25 py-5 w-[40rem] transition-all duration-500">
              {/* Card Counter and Loader */}
              <div className="absolute top-[20px] right-7 flex items-center gap-2">
                <span className="text-white/70 text-sm font-manrope">
                  {currentCard + 1}/{cardData.length}
                </span>
                <IOSLoader resetKey={currentCard} />
              </div>
              
              <div className="text-white">
                 <Image
                    src={profileImages[currentCard]}
                    alt="profile"
                    width={75}
                    height={75}
                    className="rounded-xl object-cover border border-white border-2 absolute -top-[20px] left-0 -rotate-10"
                  />
                  <div className="flex flex-col">
                     <h3 className="font-dancing-script font-bold text-[1.7rem] italic">
                    {cardData[currentCard].title}
                  </h3>
              
                <p className="font-manrope text-gray-200 text-md leading-relaxed">
                  {cardData[currentCard].review}
                </p>
                  </div>
              </div>
              {/* Star Rating */}
              <div className="absolute bottom-3 right-4 flex">
                {[...Array(5)].map((_, index) => (
                  <i 
                    key={index}
                    className={`bx ${index < cardData[currentCard].rating ? 'bxs-star' : 'bx-star'} text-[#7fd1ae] text-xl`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-[40rem] w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={() => setShowThankYouModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="bx bx-x text-2xl"></i>
            </button>
            
            {/* Success content */}
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
              
              <h2 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'DM Serif Display, serif' }}>
                You're on the Waitlist!
              </h2>
              <p className="text-gray-600 font-manrope mb-6 text-md">
                Check your email (including spam/junk) for a verification link. <strong>Click it to get higher priority access</strong> when we launch in Connecticut!
              </p>
              <div className="bg-[#7fd1ae]/10 border border-[#7fd1ae]/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 font-manrope">
                  <strong>What's next?</strong> Verify your email to secure your spot at the top of the list. We'll notify you with updates about midwives in your area and our upcoming launch.
                </p>
              </div>

              <div className="flex items-center gap-1">
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