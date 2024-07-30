"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useMediaQuery } from "react-responsive";

const LargeHeroBanner = dynamic(() => import("./hero-banner.lg"), {
  ssr: false,
});
const SmallHeroBanner = dynamic(() => import("./hero-banner.sm"), {
  ssr: false,
});

const HeroBanner = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  
  return (
    <div className="hero-banner">
      <div className="-opacity"></div>
      {!isMobile ? <SmallHeroBanner /> : <LargeHeroBanner />}
      <div className="-texts">
        <h1>SIT WAIKRU</h1>
        <p>Show your appreciation to the SIT professors here</p>
      </div>
    </div>
  );
};

export default HeroBanner;
