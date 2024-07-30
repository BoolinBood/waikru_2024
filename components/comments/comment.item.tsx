"use client";

import { getFlowerPath } from "@/utils/flower.utils";
import Image from "next/image";
import React, { useMemo } from "react";
import { useModal } from "@/context/ModalContext";
import { MotionDiv } from "../motion.div";
import { truncateString } from "@/utils/string.utils";

interface ICommentItem {
  index: number;
  tray: TrayType;
}

const getRandomAnimationValues = (index: number) => {
  const randomX = Math.random() * 10 - 5;
  const randomY = Math.random() * 10 - 5;
  const randomDuration = Math.random() * 2 + 5;

  return {
    x: [0, randomX, 0],
    y: [0, randomY, 0],
    duration: randomDuration,
    delay: index * 0.1,
  };
};

const CommentItem: React.FC<ICommentItem> = ({ index, tray }) => {
  const { name, message, flower, dept } = tray;
  const { setSelectedTray, setModalState } = useModal();

  const handleClick = () => {
    setSelectedTray(tray);
    setModalState("viewTray");
  };

  const { x, y, duration, delay } = useMemo(
    () => getRandomAnimationValues(index),
    [index]
  );

  return (
    <MotionDiv
      initial={{ y: -50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 1 },
      }}
      layout
      className="comment-item-container"
    >
      <MotionDiv
        animate={{ x, y }}
        transition={{
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay,
        }}
        className="comment"
        onClick={handleClick}
      >
        <div className="-tag">
          <span className={`-${dept}`}>{dept}</span>
        </div>
        <div className="-message">
          <p>{truncateString(message, 50, "...")}</p>
        </div>
        <div className="-author">
          <p>{truncateString(name, 24, "...")}</p>
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
    </MotionDiv>
  );
};

export default CommentItem;
