"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import { useMediaQuery } from "react-responsive";

// Dynamically import the components with no SSR
const LargeHeroBanner = dynamic(() => import("./hero-banner.lg"), {
  ssr: false,
});
const SmallHeroBanner = dynamic(() => import("./hero-banner.sm"), {
  ssr: false,
});

const HeroBanner = () => {
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  console.log("isTablet", isTablet);

  return (
    <div className="hero-banner">
      <div className="-opacity"></div>
      {!isTablet ? <SmallHeroBanner /> : <LargeHeroBanner />}
      <div className="-texts">
        <h1>SIT WAIKRU</h1>
        <p>Show your appreciation to the SIT professors here</p>
      </div>
    </div>
  );
};

export default HeroBanner;
