import { getFlowerPath } from "@/utils/flower.utils";
import Image from "next/image";
import React from "react";

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
            width={150}
            height={150}
          />
        </div>
        <h1 className="-name">{tray.name} คนระยองรักจริงหวังแต่ง</h1>
        <p className="-message">
          {tray.message}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          consequatur id possimus reiciendis tempore asperiores?
        </p>
      </div>
    </div>
  );
};

export default CommentView;
