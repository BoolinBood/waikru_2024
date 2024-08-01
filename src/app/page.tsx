"use client";

import dynamic from "next/dynamic";
import Loading from "@/src/components/loading/loading";
import { AnimatePresence } from "framer-motion";
import { useSuspenseLoader } from "@/src/hooks/suspense.hook";
import { MotionDiv } from "@/src/components/motion.div";

const HeroBanner = dynamic(
  () => import("@/src/components/hero-banner/hero-banner"),
  { suspense: true }
);
const CommentList = dynamic(
  () => import("@/src/components/comments/comment.list"),
  { suspense: true }
);

const motionProps = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 100, transition: { duration: 0.7 } },
};

export default function Home() {
  const loading = useSuspenseLoader(2500);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <MotionDiv key="loading" {...motionProps} className="loading-container">
          <Loading />
        </MotionDiv>
      ) : (
        <MotionDiv key="content" {...motionProps} className="root">
          <HeroBanner />
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
