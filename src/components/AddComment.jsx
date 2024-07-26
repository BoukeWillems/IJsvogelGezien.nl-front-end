import { useState } from 'react';
import PropTypes from 'prop-types';

const AddComment = ({ buttonValue, addComments }) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            addComments(commentText);
            setCommentText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type your comment here..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">{buttonValue}</button>
        </form>
    );
};

AddComment.propTypes = {
    buttonValue: PropTypes.string.isRequired,
    addComments: PropTypes.func.isRequired,
};

export default AddComment;