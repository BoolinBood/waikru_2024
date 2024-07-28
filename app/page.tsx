import CommentList from "@/components/comments/comment.list";
import HeroBanner from "@/components/hero-banner";
import { generateMockData } from "@/utils/mockup.utils";
import Image from "next/image";

const data = generateMockData(8); // Change the number to generate a different amount of data

export default function Home() {
  return (
    <div className="root">
      <HeroBanner />

      <div className="-comments">
        <CommentList comments={data} />
      </div>
    </div>
  );
}
