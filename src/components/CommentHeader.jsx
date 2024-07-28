import { useState, useEffect } from "react";
import { commentPostedTime } from "../utils/time.jsx";
import CommentBtn from './CommentBtn.jsx';

const CommentHeader = ({
                           commentData,
                           setReplying,
                           setDeleting,
                           setDeleteModalState,
                           setEditing,
                       }) => {
    const [time, setTime] = useState("");
    const createdAt = new Date(commentData.date);
    const today = new Date();

    useEffect(() => {
        const timeout = setTimeout(() => {
            const differenceInTime = today.getTime() - createdAt.getTime();
            setTime(commentPostedTime(differenceInTime));
        }, 1000);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="comment--header">
            <div className="username">{commentData.username}</div>
            {commentData.currentUser ? <div className="you-tag">you</div> : ""}
            <div className="comment-posted-time">{`${time} ago`}</div>
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

export default CommentHeader;
