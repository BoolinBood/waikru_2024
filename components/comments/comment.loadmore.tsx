"use client";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import CommentItem from "./comment.item";
import { Spinner } from "../ui/spinner";

const LoadMoreComments = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [comments, setComments] = useState<TrayType[]>([]);

  useEffect(() => {
    console.log("Load more comments");
    //TODO: Fetch more comments when the user scrolls to the bottom
  }, [isInView]);
  return (
    <div>
      {comments.map((item, index) => (
        <CommentItem key={index} tray={item} index={index} />
      ))}

      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Spinner />
        </div>
      </section>
    </div>
  );
};

export default LoadMoreComments;
