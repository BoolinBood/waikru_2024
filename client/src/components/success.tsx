import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const Success = () => {
  return (
    <div className={`success`}>
      <div className={`-icon ${inter.className}`}>
        <Image
          src="/assets/success/check-one.svg"
          alt="icon-close"
          width={36}
          height={36}
        />
      </div>
      <h1>Upload Successful</h1>
      <p>Your message has already been posted.</p>
    </div>
  );
};

export default Success;
