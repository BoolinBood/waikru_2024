"use client";

import { getFlowerPath } from "@/utils/flower.utils";
import Image from "next/image";
import React from "react";
import { MotionDiv } from "../motion.div";
import { useModal } from "@/context/ModalContext";

interface ICommentItem {
  index: number;
  tray: TrayType;
}

const CommentItem = ({ index, tray }: ICommentItem) => {
  const { name, message, flower } = tray;
  const { setSelectedTray, setModalState } = useModal();

  const handleClick = () => {
    setSelectedTray(tray);
    setModalState("viewTray");
  };

  //TODO: Pop up animation when user submits a comment
  return (
    <MotionDiv
      className="comment"
      // animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
      // transition={{
      //   duration: 2,
      //   ease: "easeInOut",
      //   repeat: Infinity,
      //   repeatType: "loop",
      //   delay: index * 0.1,
      // }}
      onClick={handleClick}
    >
      <div className="-tag">
        <span className={`-${tray.dept}`}>{tray.dept}</span>
      </div>
      <div className="-message">
        <p>{message}</p>
      </div>
      <div className="-author">
        <p>{name}</p>
      </div>
      <div className="-tray">
        <Image
          src={getFlowerPath(flower)}
          alt={flower}
          width={50}
          height={50}
        />
      </div>
    </MotionDiv>
  );
};

export default CommentItem;
