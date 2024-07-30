"use client";

import React, { useEffect, useRef } from "react";
import CommentItem from "./comment.item";
import CommentFloatButton from "./comment.button";
import { useAppContext } from "@/context/AppContext";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Skeleton = dynamic(() => import("@/components/skeleton"));
const Petal = dynamic(() => import("@/components/petal"));

const CommentList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { trays: comments, loadMoreTrays, hasMore } = useAppContext();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreTrays();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasMore, loadMoreTrays]);

  return (
    <div className="comment-section">
      <Petal />
      <div className="comment-list">
        <AnimatePresence>
          {comments.map((item, index) => (
            <CommentItem key={item._id!} tray={item} index={index} />
          ))}
        </AnimatePresence>
        <div ref={ref} className="none"></div>
      </div>

      {/* Load more comments */}
      {hasMore && (
        <div className="comment-list">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={`skeleton-${index}`} />
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
