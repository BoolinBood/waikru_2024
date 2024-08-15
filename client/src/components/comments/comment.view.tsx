import Image from "next/image";
import { useState } from "react";
import { LoadingSpinner } from "../spinner";
import { getFormatDegree } from "@/src/utils/string.utils";
import { getFlowerPath } from "@/src/utils/flower.utils";

interface IProps {
  tray: TrayType;
}

const CommentView = ({ tray }: IProps) => {
  const { flower, name, message, dept, degree } = tray;
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="comment-view">
      <div className="-box">
        <div
          className="-flower"
          style={{ display: isLoading ? "hidden" : "block" }}
        >
          {isLoading && <LoadingSpinner />}
          <Image
            src={getFlowerPath(flower)}
            alt="flower"
            fill
            quality={100}
            priority
            onLoad={handleImageLoad}
          />
        </div>

        <div className="-name">
          {name}
          <div className="-tag">
            <span className={`-${dept}`}>{dept}</span>
            <span className={`-${degree}`}>{getFormatDegree(degree)}</span>
          </div>
        </div>

        <p className="-message">{message}</p>
      </div>
    </div>
  );
};

export default CommentView;
