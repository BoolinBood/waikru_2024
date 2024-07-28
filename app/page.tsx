import CommentList from "@/components/comments/comment.list";
import HeroBanner from "@/components/hero-banner/hero-banner";
import { generateMockData } from "@/utils/mockup.utils";

const data = generateMockData(8); // Change the number to generate a different amount of data

export default async function Home() {
  async function handleLoading() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  await handleLoading();
  
  return (
    <div className="root">
      <HeroBanner />

      <div className="-comments">
        <CommentList comments={data} />
      </div>
    </div>
  );
}
