import { getFlowerPath } from "@/src/utils/flower.utils";
import Image from "next/image";
import { useState } from "react";
import { LoadingSpinner } from "../ui/spinner";

interface IProps {
  tray: TrayType;
}

const CommentView: React.FC<IProps> = ({ tray }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    console.log("Image loaded");
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
            src={getFlowerPath(tray.flower)}
            alt="flower"
            layout="responsive"
            width={300}
            height={300}
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </div>
        <h1 className="-name">{tray.name} </h1>
        <p className="-message">{tray.message}</p>
      </div>
    </div>
  );
};

export default CommentView;
