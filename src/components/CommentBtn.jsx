import iconReply from '../assets/icon-reply.svg';
import iconDelete from '../assets/icon-delete.svg';
import iconEdit from '../assets/icon-edit.svg';


const CommentBtn = ({
                        commentData,
                        setReplying,
                        setDeleting,
                        setDeleteModalState,
                        setEditing,
                    }) => {
    const showAddComment = () => {
        setReplying(true);
    };

    const showDeleteModal = () => {
        setDeleting(true);
        setDeleteModalState(true);
    };

    const showEditComment = () => {
        setEditing(true);
    };

    return (
        <div className="comment--btn">
            <button
                className={`reply-btn ${
                    !commentData.currentUser ? "" : "display--none"
                }`}
                onClick={showAddComment}
            >
                <img src={iconReply} alt="Reply" /> Reply
            </button>
            <button
                className={`delete-btn ${
                    commentData.currentUser ? "" : "display--none"
                }`}
                onClick={showDeleteModal}
            >
                <img src={iconDelete} alt="Delete" /> Delete
            </button>
            <button
                className={`edit-btn ${commentData.currentUser ? "" : "display--none"}`}
                onClick={showEditComment}
            >
                <img src={iconEdit} alt="Edit" /> Edit
            </button>
        </div>
    );
};

export default CommentBtn;
