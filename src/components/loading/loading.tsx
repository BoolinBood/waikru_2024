"use client";

import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const SmallLoading = dynamic(() => import("./loading.sm"), {
  ssr: false,
});

const LargeLoading = dynamic(() => import("./loading.lg"), {
  ssr: false,
});

const Loading = () => {
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  if (isTablet) {
    return <LargeLoading />;
  }

  return <SmallLoading />;
};

export default Loading;
