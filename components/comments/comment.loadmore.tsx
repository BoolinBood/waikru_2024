"use client";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import CommentItem from "./comment.item";

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

      <div
        ref={ref}
        className="grid place-items-center w-full border-4 border-solid border-red-500"
      >
        {/* <Spinner /> */}
      </div>
    </>
  );
};

export default LoadMoreComments;
