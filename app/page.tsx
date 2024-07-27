import CommentList from "@/components/comments/comment.list";
import { generateMockData } from "@/utils/mockup.utils";

const data = generateMockData(6); // Change the number to generate a different amount of data

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="h-full overflow-scroll">
        <CommentList comments={data} />
      </div>
    </div>
  );
}
