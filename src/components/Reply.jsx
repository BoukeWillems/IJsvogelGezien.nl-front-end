import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Comment.css";
import AddComment from "./AddComment";
import DeleteModal from "./DeleteModal";
import { CommentHeader, CommentFooter, } from "./commentParts";

const Reply = ({
                   commentData,
                   addNewReply,
                   editComment,
                   deleteComment,
                   setDeleteModalState,
               }) => {
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentData.content);
    const [deleting, setDeleting] = useState(false);

    const addReply = (newReply) => {
        addNewReply(newReply);
        setReplying(false);
    };

    const commentContent = () => {
        const text = commentData.content.trim().split(" ");
        const firstWord = text.shift().split(",");

        return !editing ? (
            <div className="comment-content">
                <span className="replyingTo">{firstWord}</span>
                {text.join(" ")}
            </div>
        ) : (
            <textarea
                className="content-edit-box"
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
        );
    };

    const updateComment = () => {
        editComment(content, commentData.id, "reply");
        setEditing(false);
    };

    const deleteReply = () => {
        deleteComment(commentData.id, "reply");
        setDeleting(false);
    };

    return (
        <div className={`comment-container ${commentData.replies.length > 0 ? "gap" : ""}`}>
            <div className="comment">
                <div className="comment--body">
                    <CommentHeader
                        commentData={commentData}
                        setReplying={setReplying}
                        setDeleting={setDeleting}
                        setDeleteModalState={setDeleteModalState}
                        setEditing={setEditing}
                    />
                    {commentContent()}
                    {editing && (
                        <button className="update-btn" onClick={updateComment}>
                            Update
                        </button>
                    )}
                </div>
                <CommentFooter
                    commentData={commentData}
                    setReplying={setReplying}
                    setDeleting={setDeleting}
                    setDeleteModalState={setDeleteModalState}
                    setEditing={setEditing}
                    type="reply"
                />
            </div>
            {replying && (
                <AddComment
                    buttonValue={"Reply"}
                    addComments={addReply}
                    replyingTo={commentData.username}
                />
            )}
            {commentData.replies.map((reply) => (
                <Reply key={reply.id} commentData={reply} addReply={addReply} />
            ))}
            {deleting && (
                <DeleteModal
                    setDeleting={setDeleting}
                    deleteComment={deleteReply}
                    setDeleteModalState={setDeleteModalState}
                />
            )}
        </div>
    );
};

Reply.propTypes = {
    commentData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.instanceOf(Date).isRequired,
        username: PropTypes.string.isRequired,
        currentUser: PropTypes.bool.isRequired,
        replies: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    addNewReply: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    setDeleteModalState: PropTypes.func.isRequired,
};

export default Reply;