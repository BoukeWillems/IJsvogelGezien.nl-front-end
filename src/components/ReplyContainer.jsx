import PropTypes from "prop-types";
import Reply from "./Reply";

const ReplyContainer = ({
                            commentData,
                            addReply,
                            editComment,
                            deleteComment,
                            setDeleteModalState,
                        }) => {
    return (
        <div className="reply-container">
            {commentData.map((data) => (
                <Reply
                    key={data.id}
                    commentData={data}
                    addNewReply={addReply}
                    editComment={editComment}
                    deleteComment={deleteComment}
                    setDeleteModalState={setDeleteModalState}
                />
            ))}
        </div>
    );
};

ReplyContainer.propTypes = {
    commentData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
            createdAt: PropTypes.instanceOf(Date).isRequired,
            username: PropTypes.string.isRequired,
            currentUser: PropTypes.bool.isRequired,
            replies: PropTypes.arrayOf(PropTypes.object).isRequired,
        }).isRequired
    ).isRequired,
    addReply: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    setDeleteModalState: PropTypes.func.isRequired,
};

export default ReplyContainer;