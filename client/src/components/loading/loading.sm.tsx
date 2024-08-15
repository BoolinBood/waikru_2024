import Image from "next/image";
import { Spinner } from "../spinner";

const SmallLoading = () => {
  return (
    <div className="loading">
      <div className="-sm">
        <div className="-top">
          <div className="-particles">
            <Image
              src="/assets/loading/sm/particle.svg"
              alt="particle1"
              width={50}
              height={50}
              layout="responsive"
            />
          </div>
          <div className="-flowers">
            <div className="-flower">
              <Image
                src="/assets/loading/sm/flowers.svg"
                alt="flower1"
                width={50}
                height={50}
                layout="responsive"
              />
            </div>
            <div className="-bg">
              <Image
                src="/assets/loading/sm/background.svg"
                alt="bg"
                width={100}
                height={100}
                layout="responsive"
              />
            </div>
          </div>
          <div className="-avatars">
            <Image
              src="/assets/loading/sm/teacher.svg"
              alt="avatar1"
              width={100}
              height={100}
            />
          </div>
          <div className="-texts">
            {/* <div className="-spinner"></div> */}
            <h1>
              SIT{" "}
              <span className="-spinner mb-2">
                <Spinner />
              </span>
              Waikru
            </h1>
            <p>Show your appreciation to the SIT professors here</p>
          </div>
        </div>
        <div className="-bottom"></div>
      </div>
    </div>
  );
};

export default SmallLoading;
