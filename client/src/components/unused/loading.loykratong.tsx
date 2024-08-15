import Image from "next/image";
import { Spinner } from "../spinner";

interface IAirProps {
  className: string;
}

const Air = ({ className }: IAirProps) => (
  <div className={`air ${className}`}></div>
);

const AirWaves: React.FC = () => (
  <div className="-wave">
    <Air className="air1" />
    <Air className="air2" />
    <Air className="air3" />
  </div>
);

interface IMountainProps {
  src: string;
  alt: string;
}

const Mountain = ({ src, alt }: IMountainProps) => (
  <Image src={src} alt={alt} width={500} height={500} />
);

const Mountains: React.FC = () => (
  <div className="-mountain">
    <div className="-mobiles">
      <div className="-left">
        <Mountain src="/assets/loading/sm/mountain1.png" alt="mountain1" />
      </div>
      <div className="-right">
        <Mountain src="/assets/loading/sm/mountain2.png" alt="mountain2" />
      </div>
    </div>

    <div className="-desktops">
      <div className="-left">
        <Mountain src="/assets/loading/lg/mountain1.png" alt="mountain1" />
      </div>
      <div className="-right">
        <Mountain src="/assets/loading/lg/mountain2.png" alt="mountain2" />
      </div>
    </div>
  </div>
);

const LoadingLoyKratong: React.FC = () => (
  <div className="loading">
    <div className="-stars"></div>
    <AirWaves />
    <Mountains />
    <div className="-clouds">
      <div className="-left">
        <Image
          src="/assets/loading/sm/cloud-left.png"
          alt="cloud1"
          width={500}
          height={500}
        />
      </div>
      <div className="-right">
        <Image
          src="/assets/loading/sm/cloud-right.png"
          alt="cloud2"
          width={500}
          height={500}
        />
      </div>
    </div>
    <div className="-moons">
      <Image
        src="/assets/loading/lg/moon.png"
        alt="moon"
        width={372}
        height={334}
      />
    </div>
    <div className="-boat">
      <Image
        src="/assets/loading/sm/boat.png"
        alt="boat"
        width={500}
        height={500}
      />
    </div>
    <div className="-contents">
      <Spinner />
      <div className="-texts">
        <h1>SIT WAIKRU</h1>
        <p>Show your appreciation to the SIT professors here</p>
      </div>
    </div>
  </div>
);

export default LoadingLoyKratong;
