"use client";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "@/src/components/motion.div";
import { useSuspenseLoader } from "../hooks/suspense.hook";

const HeroBanner = dynamic(
  () => import("@/src/components/hero-banner/hero-banner")
);
const CommentList = dynamic(
  () => import("@/src/components/comments/comment.list")
);

const Loading = dynamic(() => import("@/src/components/loading/loading"));

const motionProps = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.7 } },
};

export default function Home() {
  const loading = useSuspenseLoader(2000);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <MotionDiv key="loading" {...motionProps} className="loading-container">
          <Loading />
        </MotionDiv>
      ) : (
        <MotionDiv
          key="content"
          {...motionProps}
          className="root overflow-hidden"
        >
          <HeroBanner key="hero-banner" />
          <MotionDiv
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
            className="-comments"
            key="comments"
          >
            <CommentList />
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
