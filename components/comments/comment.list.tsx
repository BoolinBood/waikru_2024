import React from "react";
import CommentItem from "./comment.item";
import LoadMoreComments from "./comment.loadmore";
import Button from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";

export interface ICommentListProps {
  comments: TrayType[];
}

const CommentList = ({ comments }: ICommentListProps) => {
  // Todo: Fetch only 4-8 comments on initial load
  return (
    <div className="comment-section">
      <div className="comment-list">
        {comments.map((item, index) => (
          <CommentItem key={index} tray={item} index={index} />
        ))}

        {/* Load more comments */}
        <LoadMoreComments />
      </div>
      <div className="-btn">
        <Button>
          <h1>Create pedestal tray</h1>
          <AiOutlinePlus />
        </Button>
      </div>
    </div>
  );
};

export default CommentList;
