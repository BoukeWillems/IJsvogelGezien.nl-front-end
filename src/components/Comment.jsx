import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Comment.css";
import AddComment from "./AddComment";
import ReplyContainer from "./ReplyContainer";
import { CommentHeader, CommentFooter } from "./commentParts";

const Comment = ({
                     commentData,
                     updateReplies,
                     editComment,
                     commentDelete,
                     setDeleteModalState,
                     currentUser
                 }) => {
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentData.content);

    const addReply = (newReply) => {
        const replies = [...commentData.replies, newReply];
        updateReplies(replies, commentData.id);
        setReplying(false);
    };

    const updateComment = () => {
        editComment(content, commentData.id);
        setEditing(false);
    };

    const deleteComment = (id) => {
        commentDelete(id);
    };

    const canEditOrDelete = currentUser && (currentUser.username === commentData.username || currentUser.role === 'admin');

    return (
        <div
            className={`comment-container ${
                commentData.replies.length > 0 ? "reply-container-gap" : ""
            }`}
        >
            <div className="comment">
                <div className="comment--body">
                    <CommentHeader
                        commentData={commentData}
                        setReplying={setReplying}
                        setDeleteModalState={setDeleteModalState}
                        canEditOrDelete={canEditOrDelete}
                    />
                    {!editing ? (
                        <div className="comment-content">{commentData.content}</div>
                    ) : (
                        <textarea
                            className="content-edit-box"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                        />
                    )}
                    {editing && (
                        <button className="update-btn" onClick={updateComment}>
                            Update
                        </button>
                    )}
                </div>
                <CommentFooter
                    setReplying={setReplying}
                    setDeleteModalState={setDeleteModalState}
                    setEditing={setEditing}
                />
            </div>
            {replying && (
                <AddComment
                    buttonValue={"Reply"}
                    addComments={addReply}
                    replyingTo={commentData.username}
                />
            )}
            {commentData.replies.length > 0 && (
                <ReplyContainer
                    commentData={commentData.replies}
                    addReply={addReply}
                    editComment={editComment}
                    deleteComment={deleteComment}
                    setDeleteModalState={setDeleteModalState}
                />
            )}
        </div>
    );
};

Comment.propTypes = {
    commentData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.instanceOf(Date).isRequired,
        username: PropTypes.string.isRequired,
        currentUser: PropTypes.bool.isRequired,
        replies: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    updateReplies: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    commentDelete: PropTypes.func.isRequired,
    setDeleteModalState: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
        username: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
    }).isRequired,
};

export default Comment;