import React from "react";
import CommentItem from "./comment.item";

interface ICommentListProps {
  comments: TrayType[];
}
const CommentList = ({ comments }: ICommentListProps) => {
  return (
    <div className="comment-section">
      <div className="comment-list">
        {comments.map((item, index) => (
          <CommentItem key={index} tray={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
