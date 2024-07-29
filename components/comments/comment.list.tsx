"use client";

import React, { useEffect, useRef } from "react";
import CommentItem from "./comment.item";
import CommentFloatButton from "./comment.button";
import { useAppContext } from "@/context/AppContext";
import { useInView } from "framer-motion";
import Skeleton from "../skeleton";

const CommentList = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { trays: comments, loadMoreTrays, hasMore } = useAppContext();

  useEffect(() => {
    if (isInView && hasMore) {
      loadMoreTrays();
    }

    console.log("isInView", isInView);
  }, [isInView, hasMore]);

  return (
    <div className="comment-section">
      <div className="comment-list">
        {comments.map((item, index) => (
          <CommentItem key={index} tray={item} index={index} />
        ))}
        <div ref={ref} className="none"></div>
      </div>

      {/* Load more comments */}
      {hasMore && (
        <div className="comment-list">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )}

      <div className="-btn">
        <CommentFloatButton />
      </div>
    </div>
  );
};

export default CommentList;
