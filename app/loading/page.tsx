import CommentList from "@/components/comments/comment.list";
import { generateMockData } from "@/utils/mockup.utils";
import React from "react";

const data = generateMockData(14); // Change the number to generate a different amount of data

const Page: React.FC = () => {
  return <CommentList comments={data} />;
};

export default Page;
