import { getFlowerPath } from "@/utils/flower.utils";
import Image from "next/image";
import React from "react";

interface IProps {
  tray: TrayType;
}

const CommentView: React.FC<IProps> = ({ tray }) => {
  return (
    <div className="comment-view">
       <span className={`-${tray.dept}`}>{tray.dept}</span>
      <div className="-box">
        <div className="-flower">
          <Image
            src={getFlowerPath(tray.flower)}
            alt="flower"
            layout="fixed"
            width={100}
            height={100}
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
