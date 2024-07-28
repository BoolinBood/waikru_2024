import Image from "next/image";

const LargeHeroBanner = () => {
  return (
    <div className="-lg">
      <div className="-mountains">
        <Image
          src="/assets/hero-banner/lg/mountain.png"
          alt="mountain2"
          width={500}
          height={500}
          layout="responsive"
        />
      </div>
      <div className="-waves">
        <Image
          src="/assets/hero-banner/lg/waves.png"
          alt="waves"
          width={500}
          height={500}
          layout="responsive"
        />
      </div>
      <div className="-flowers">
        <Image
          src="/assets/hero-banner/lg/flowers.png"
          alt="flowers"
          width={500}
          height={500}
          layout="responsive"
        />
      </div>
      <div className="-clouds">
        <div className="-left">
          <Image
            src="/assets/hero-banner/lg/cloud-left.png"
            alt="cloud-left"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>
        <div className="-right">
          <Image
            src="/assets/hero-banner/lg/cloud-right.png"
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

export default LargeHeroBanner;
