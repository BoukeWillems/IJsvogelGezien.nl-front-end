import { useState } from "react";
import '../styles/Reply.css'
import AddComment from "./AddComment";
import DeleteModal from "./DeleteModal";
import { CommentHeader, CommentFooter } from "./commentParts";

const Reply = ({
                   commentData,
                   addNewReply,
                   editComment,
                   deleteComment,
                   setDeleteModalState,
               }) => {
    const [replying, setReplying] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(commentData.text);
    const [deleting, setDeleting] = useState(false);

    const addReply = (newReply) => {
        addNewReply(newReply);
        setReplying(false);
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
        <div
            className={`comment-container ${
                commentData.replies.length ? "gap" : ""
            }`}
        >
            <div className="comment">
                <div className="comment--body">
                    <CommentHeader
                        commentData={commentData}
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
                    type="reply"
                />
            </div>

            {replying && (
                <AddComment
                    buttonValue={"reply"}
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

export default Reply;
