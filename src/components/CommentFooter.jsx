import CommentBtn from './CommentBtn.jsx';

const CommentFooter = ({
                           commentData,
                           setReplying,
                           setDeleting,
                           setDeleteModalState,
                           setEditing,
                           type,
                       }) => {
    return (
        <div className="comment--footer">
            <CommentBtn
                commentData={commentData}
                setReplying={setReplying}
                setDeleting={setDeleting}
                setDeleteModalState={setDeleteModalState}
                setEditing={setEditing}
            />
        </div>
    );
};

export default CommentFooter;
