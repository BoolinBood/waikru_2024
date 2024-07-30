import { getFlowerPath } from "@/utils/flower.utils";
import Image from "next/image";

interface IProps {
  tray: TrayType;
}

const CommentView: React.FC<IProps> = ({ tray }) => {
  return (
    <div className="comment-view">
      <div className="-box">
        <div className="-flower">
          <Image
            src={getFlowerPath(tray.flower)}
            alt="flower"
            layout="responsive"
            width={300}
            height={300}
            loading="lazy"
          />
        </div>
        <h1 className="-name">{tray.name} </h1>
        <p className="-message">{tray.message}</p>
      </div>
    </div>
  );
};

export default CommentView;
