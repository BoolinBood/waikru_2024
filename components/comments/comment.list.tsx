import { useEffect, useRef } from "react";
import CommentItem from "./comment.item";
import CommentFloatButton from "./comment.button";
import { useAppContext } from "@/context/AppContext";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import CommentFilterButton from "./comment.dropdown";

const Skeleton = dynamic(
  () => import("@/components/skeleton/skeleton.comment")
);
const Petal = dynamic(() => import("@/components/petal"));

const CommentList: React.FC = () => {
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

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loadMoreTrays]);

  // Filter out duplicate comments by ID
  const uniqueComments = Array.from(
    new Map(comments.map((comment) => [comment._id, comment])).values()
  );

  return (
    <div className="comment-section">
      <div className="-wrap">
        <CommentFilterButton />

        <Petal />
        <div className="comment-list">
          <AnimatePresence>
            {uniqueComments.map((item, index) => (
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
    </div>
  );
};

export default CommentList;
