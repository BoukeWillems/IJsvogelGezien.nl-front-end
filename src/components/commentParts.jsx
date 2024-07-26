import PropTypes from "prop-types";

export const CommentHeader = ({
                                  commentData,
                                  setDeleting,
                                  setDeleteModalState,
                                  setEditing,
                              }) => (
    <div className="comment-header">
        <div className="profile-pic"></div>
        <div className="username">{commentData.username}</div>
        <div className="created-at">{commentData.createdAt.toLocaleString()}</div>
        {commentData.currentUser && (
            <div className="comment-actions">
                <button onClick={() => setEditing(true)}>Bewerk</button>
                <button
                    onClick={() => {
                        setDeleting(true);
                        setDeleteModalState(true);
                    }}
                >
                    Delete
                </button>
            </div>
        )}
    </div>
);

CommentHeader.propTypes = {
    commentData: PropTypes.shape({
        username: PropTypes.string.isRequired,
        createdAt: PropTypes.instanceOf(Date).isRequired,
        currentUser: PropTypes.bool.isRequired,
    }).isRequired,
    setReplying: PropTypes.func.isRequired,
    setDeleting: PropTypes.func.isRequired,
    setDeleteModalState: PropTypes.func.isRequired,
    setEditing: PropTypes.func.isRequired,
};

export const CommentFooter = ({
                                  setReplying,
                              }) => (
    <div className="comment-footer">
        <button onClick={() => setReplying(true)}>Reageer</button>
    </div>
);

CommentFooter.propTypes = {
    setReplying: PropTypes.func.isRequired,
};
