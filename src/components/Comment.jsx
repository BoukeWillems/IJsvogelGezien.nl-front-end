import { useState } from "react";
import '../styles/Comment.css'
import AddComment from "./AddComment";
import ReplyContainer from "./ReplyContainer";
import DeleteModal from "./DeleteModal";
import { CommentHeader, CommentFooter } from "../components/commentParts";

const Comment = ({
                     commentData,
                     updateReplies,
                     editComment,
                     commentDelete,
                     setDeleteModalState,
                 }) => {
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentData.text);
    const [deleting, setDeleting] = useState(false);

    const addReply = (newReply) => {
        const replies = [...commentData.replies, newReply];
        updateReplies(replies, commentData.id);
        setReplying(false);
    };

    const updateComment = () => {
        editComment(content, commentData.id, "comment");
        setEditing(false);
    };

    const deleteComment = (id, type) => {
        const finalType = type !== undefined ? type : "comment";
        const finalId = id !== undefined ? id : commentData.id;
        commentDelete(finalId, finalType, commentData.id);
        setDeleting(false);
    };

    return (
        <div
            className={`comment-container ${
                commentData.replies.length ? "reply-container-gap" : ""
            }`}
        >
            <div className="comment">
                <div className="comment--body">
                    <CommentHeader
                        commentData={commentData}
                        replying={replying}
                        setReplying={setReplying}
                        setDeleting={setDeleting}
                        setDeleteModalState={setDeleteModalState}
                        setEditing={setEditing}
                    />
                    {!editing ? (
                        <div className="comment-content">{commentData.text}</div>
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
                            update
                        </button>
                    )}
                </div>
                <CommentFooter
                    commentData={commentData}
                    setReplying={setReplying}
                    setDeleting={setDeleting}
                    setDeleteModalState={setDeleteModalState}
                    setEditing={setEditing}
                    type="comment"
                />
            </div>

            {replying && (
                <AddComment
                    buttonValue={"reply"}
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

            {deleting && (
                <DeleteModal
                    setDeleting={setDeleting}
                    deleteComment={deleteComment}
                    setDeleteModalState={setDeleteModalState}
                />
            )}
        </div>
    );
};

export default Comment;
