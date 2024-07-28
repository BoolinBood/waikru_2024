"use client";

import React from "react";
import CommentItem from "./comment.item";
import LoadMoreComments from "./comment.loadmore";
import CommentFloatButton from "./comment.button";
import { useAppContext } from "@/context/AppContext";

const CommentList = () => {
  // Todo: Fetch only 4-8 comments on initial load
  const { trays: comments } = useAppContext();

  return (
    <div className="comment-section">
      <div className="comment-list">
        {comments.map((item, index) => (
          <CommentItem key={index} tray={item} index={index} />
        ))}

        {/* Load more comments */}
        <LoadMoreComments />
      </div>
      <div className="-btn">
        <CommentFloatButton />
      </div>
    </div>
  );
};

export default CommentList;
