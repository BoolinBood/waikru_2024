import CommentList from "@/components/comments/comment.list";
import HeroBanner from "@/components/hero-banner/hero-banner";

export default async function Home() {
  async function handleLoading() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  await handleLoading();

  return (
    <div className="root">
      <HeroBanner />

      <div className="-comments">
        <CommentList />
      </div>
    </div>
  );
}
