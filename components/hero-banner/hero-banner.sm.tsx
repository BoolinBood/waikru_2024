import Image from "next/image";

const SmallHeroBanner = () => {
  return (
    <div className="-sm">
      <div className="-mountains">
        <div className="-left">
          <Image
            src="/assets/hero-banner/sm/mountain-left.png"
            alt="mountain1"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
        <div className="-right">
          <Image
            src="/assets/hero-banner/sm/mountain-right.png"
            alt="mountain2"
            layout="responsive"
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
          layout="responsive"
        />
      </div>
      <div className="-flowers">
        <Image
          src="/assets/hero-banner/sm/flowers.png"
          alt="flowers"
          width={500}
          height={500}
          layout="responsive"
        />
      </div>
      <div className="-clouds">
        <div className="-left">
          <Image
            src="/assets/hero-banner/sm/cloud-left.png"
            alt="cloud-left"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>
        <div className="-right">
          <Image
            src="/assets/hero-banner/sm/cloud-right.png"
            alt="cloud-right"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default SmallHeroBanner;
