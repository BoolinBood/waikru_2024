import React from "react";
import CommentItem from "./comment.item";
import LoadMoreComments from "./comment.loadmore";
import Button from "../ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import CommentFloatButton from "./comment.button";

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
        <CommentFloatButton />
      </div>
    </div>
  );
};

export default CommentList;
