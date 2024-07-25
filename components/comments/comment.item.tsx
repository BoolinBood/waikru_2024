"use client";

import { getFlowerPath } from "@/utils/flower.utils";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface ICommentItem {
  index: number;
  tray: TrayType;
}

const CommentItem = ({ index, tray }: ICommentItem) => {
  const { name, message, selectedTray } = tray;

  return (
    <motion.div
      className="comment"
      animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: index * 0.1,
      }}
    >
      <div className="-message">
        <p>{message}</p>
      </div>
      <div className="-author">
        <p>{name}</p>
      </div>
      <div className="-tray">
        <Image
          src={getFlowerPath(selectedTray)}
          alt="tray"
          width={50}
          height={50}
        />
      </div>
    </motion.div>
  );
};

export default CommentItem;
