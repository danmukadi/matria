"use client";

import { useState, useEffect } from "react";
import DesktopView from "@/views/desktop-view";
import LaptopView from "@/views/laptop-view";
import TabletView from "@/views/tablet-view";
import MobileView from "@/views/mobile-view";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render based on screen size
  if (windowWidth >= 1760) {
    return <DesktopView />;
  } else if (windowWidth >= 1440) {
    return <LaptopView />;
  } else if (windowWidth >= 768) {
    return <TabletView />;
  } else {
    return <MobileView />;
  }
}
