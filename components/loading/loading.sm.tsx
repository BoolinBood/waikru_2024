import Image from "next/image";
import { Spinner } from "../ui/spinner";

const SmallLoading = () => {
  return (
    <div className="-sm">
      <div className="-top">
        <div className="-particles">
          <Image
            src="/assets/loading/sm/particle.png"
            alt="particle1"
            width={50}
            height={50}
            layout="responsive"
          />
        </div>
        <div className="-flowers">
          <div className="-flower">
            <Image
              src="/assets/loading/sm/flowers.png"
              alt="flower1"
              width={50}
              height={50}
              layout="responsive"
            />
          </div>
          <div className="-bg">
            <Image
              src="/assets/loading/sm/background.png"
              alt="bg"
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
        </div>
        <div className="-avatars">
          <Image
            src="/assets/loading/sm/teacher.png"
            alt="avatar1"
            width={100}
            height={100}
          />
        </div>
        <div className="-texts">
          <div className="-spinner">
            <Spinner />
          </div>
          <h1>SIT Waikru</h1>
          <p>Show your appreciation to the SIT professors here</p>
        </div>
      </div>
      <div className="-bottom"></div>
    </div>
  );
};

export default SmallLoading;
