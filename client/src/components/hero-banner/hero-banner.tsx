"use client";

import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";

const LargeHeroBanner = dynamic(() => import("./hero-banner.lg"));
const SmallHeroBanner = dynamic(() => import("./hero-banner.sm"));

const HeroBanner = () => {
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

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
