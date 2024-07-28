"use client";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import CommentItem from "./comment.item";
import Skeleton from "../skeleton";

const LoadMoreComments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [comments, setComments] = useState<TrayType[]>([]);

  useEffect(() => {
    console.log("Load more comments");
    //TODO: Fetch more comments when the user scrolls to the bottom
  }, [isInView]);
  return (
    <>
      {comments.map((item, index) => (
        <CommentItem key={index} tray={item} index={index} />
      ))}

      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </>
  );
};

export default LoadMoreComments;
