import { useState } from "react";
import '../styles/AddComment.css';

const AddComment = ({ buttonValue, addComments, replyingTo }) => {
    const replyingToUser = replyingTo ? `@${replyingTo}, ` : "";
    const [comment, setComment] = useState(replyingToUser);

    const clickHandler = () => {
        if (comment.trim() === "") return;

        const newComment = {
            id: Math.floor(Math.random() * 100) + 5,
            text: replyingToUser + comment.replace(replyingToUser, ""),
            date: new Date(),
            username: "juliusomo", // assuming a hardcoded current user for simplicity
            replies: [],
        };

        addComments(newComment);
        setComment("");
    };

    return (
        <div className="add-comment">
      <textarea
          className="comment-input"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => {
              setComment(e.target.value);
          }}
      />
            <button className="add-btn" onClick={clickHandler}>
                {buttonValue}
            </button>
        </div>
    );
};

export default AddComment;
