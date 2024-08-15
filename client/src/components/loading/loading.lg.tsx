import Image from "next/image";
import { Spinner } from "../spinner";

const LargeLoading = () => {
  return (
    <div className="loading">
      <div className="-lg">
        <div className="-top">
          <div className="-particles">
            <Image
              src="/assets/loading/lg/particle.svg"
              alt="particle1"
              width={50}
              height={50}
              layout="responsive"
            />
          </div>
          <div className="-flowers">
            <div className="-flower">
              <Image
                src="/assets/loading/lg/flowers.svg"
                alt="flower1"
                width={50}
                height={50}
                layout="responsive"
              />
            </div>
            <div className="-bg">
              <Image
                src="/assets/loading/lg/background.svg"
                alt="bg"
                width={100}
                height={100}
                layout="responsive"
              />
            </div>
          </div>
          <div className="-avatars">
            <Image
              src="/assets/loading/lg/teacher.svg"
              alt="avatar1"
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
          <div className="-texts">
            <div className="-headers">
              <h1>SIT Waikru</h1>
              <Spinner />
            </div>
            <p>Show your appreciation to the SIT professors here</p>
          </div>
        </div>
        <div className="-bottom"></div>
      </div>
    </div>
  );
};

export default LargeLoading;
