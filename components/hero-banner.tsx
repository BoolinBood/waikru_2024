import Image from "next/image";
import React from "react";

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="-opacity">
        <Image
          src="/assets/hero-banner/sm/opacity.png"
          alt="opacity"
          width={500}
          height={500}
        />
      </div>
      <div className="-lg">
        <div className="-mountains">
          <Image
            src="/assets/hero-banner/lg/mountain.png"
            alt="mountain2"
            width={500}
            height={500}
          />
        </div>
        <div className="-waves">
          <Image
            src="/assets/hero-banner/lg/waves.png"
            alt="waves"
            width={500}
            height={500}
          />
        </div>
        <div className="-flowers">
          <Image
            src="/assets/hero-banner/lg/flowers.png"
            alt="flowers"
            width={500}
            height={500}
          />
        </div>
        <div className="-clouds">
          <div className="-left">
            <Image
              src="/assets/hero-banner/lg/cloud-left.png"
              alt="cloud-left"
              width={500}
              height={500}
            />
          </div>
          <div className="-right">
            <Image
              src="/assets/hero-banner/lg/cloud-right.png"
              alt="cloud-right"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <div className="-sm">
        <div className="-mountains">
          <div className="-left">
            <Image
              src="/assets/hero-banner/sm/mountain-left.png"
              alt="mountain1"
              width={500}
              height={500}
            />
          </div>
          <div className="-right">
            <Image
              src="/assets/hero-banner/sm/mountain-right.png"
              alt="mountain2"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="-waves">
          <Image
            src="/assets/hero-banner/sm/waves.png"
            alt="waves"
            width={500}
            height={500}
          />
        </div>
        <div className="-flowers">
          <Image
            src="/assets/hero-banner/sm/flowers.png"
            alt="flowers"
            width={500}
            height={500}
          />
        </div>
        <div className="-clouds">
          <div className="-left">
            <Image
              src="/assets/hero-banner/sm/cloud-left.png"
              alt="cloud-left"
              width={500}
              height={500}
            />
          </div>
          <div className="-right">
            <Image
              src="/assets/hero-banner/sm/cloud-right.png"
              alt="cloud-right"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="-texts">
        <h1>SIT WAIKRU</h1>
        <p>Show your appreciation to the SIT professors here</p>
      </div>
    </div>
  );
};

export default HeroBanner;
