"use client";

import { getFlowerPath } from "@/utils/flower.utils";
import Image from "next/image";
import React, { useMemo } from "react";
import { useModal } from "@/context/ModalContext";
import { MotionDiv } from "../motion.div";
import { useEffect, useState } from "react";
import { truncateString } from "@/utils/string.utils";

interface ICommentItem {
  index: number;
  tray: TrayType;
}

const getRandomAnimationValues = (index: number) => {
  const randomX = Math.random() * 10 - 5; // Random value between -5 and 5
  const randomY = Math.random() * 10 - 5; // Random value between -5 and 5
  const randomDuration = Math.random() * 2 + 5; // Random value between 1 and 3

  return {
    x: [0, randomX, 0],
    y: [0, randomY, 0],
    duration: randomDuration,
    delay: index * 0.1,
  };
};

const CommentItem = ({ index, tray }: ICommentItem) => {
  const { name, message, flower } = tray;
  const { setSelectedTray, setModalState } = useModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    setSelectedTray(tray);
    setModalState("viewTray");
  };

  // Memoize random animation values based on the index
  const { x, y, duration, delay } = useMemo(
    () => getRandomAnimationValues(index),
    [index]
  );

  return (
    <MotionDiv
      initial={{ x: -50, opacity: 0 }}
      animate={{
        x: 0,
        opacity: mounted ? 1 : 0,
        transition: { delay: 1.5, duration: 1 },
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
          <span className={`-${tray.dept}`}>{tray.dept}</span>
        </div>
        <div className="-message">
          <p>{truncateString(message, 50, ".....")}</p>
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
    </MotionDiv>
  );
};

export default React.memo(CommentItem);
