"use client";

import React from "react";
import CommentItem from "./comment.item";
import LoadMoreComments from "./comment.loadmore";
import CommentFloatButton from "./comment.button";
import { useAppContext } from "@/context/AppContext";

const Petal = () => {
  const images = [
    "/assets/petal/flower/1.png",
    "/assets/petal/flower/2.png",
    "/assets/petal/flower/3.png",
    "/assets/petal/flower/4.png",
    "/assets/petal/flower/5.png",
    "/assets/petal/flower/6.png",
    "/assets/petal/flower/7.png",
    "/assets/petal/flower/8.png",
    "/assets/petal/flower/9.png",
    "/assets/petal/flower/10.png",
    // "/assets/petal/desktop/11.svg",
    // "/assets/petal/desktop/12.svg",

  ];

  return (
    <div className="petal">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`petal-${index + 1}`} />
      ))}
    </div>
  );
};

const CommentList = () => {
  // Fetch only 4-8 comments on initial load
  const { trays: comments } = useAppContext();

  return (
    <div className="comment-section">
      <Petal />
      <div className="comment-list">
        {comments.map((item, index) => (
          <CommentItem key={index} tray={item} index={index} />
        ))}
        {/* Load more comments */}
        <LoadMoreComments />
      </div>
      <div className="comment-button">
        <CommentFloatButton />
      </div>
    </div>
  );
};

export default CommentList;
