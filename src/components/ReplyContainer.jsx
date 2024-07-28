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

export default ReplyContainer;
