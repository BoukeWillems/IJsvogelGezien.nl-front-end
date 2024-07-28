import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../styles/ObservationModal.css';
import Comment from './Comment'; // Zorg ervoor dat het pad klopt
import AddComment from './AddComment'; // Zorg ervoor dat het pad klopt

Modal.setAppElement('#root');

const ObservationModal = ({ isOpen, onRequestClose, observation }) => {
    const [likesAmount, setLikesAmount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (observation) {
            console.log("Observation data:", observation);
            fetchLikes(observation.id);
            fetchIsLiked(observation.id);
            fetchComments(observation.id);
        }
    }, [observation]);

    const fetchLikes = async (observationId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/likes/observation/count/${observationId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            setLikesAmount(parseInt(result["Total Likes"], 10));
        } catch (error) {
            console.error("Error fetching like count", error);
        }
    };

    const fetchIsLiked = async (observationId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/likes/observation/${observationId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const likes = await response.json();
            const currentUserLike = likes.find(like => like.username === "/");
            setIsLiked(!!currentUserLike);
        } catch (error) {
            console.error("Error fetching like status", error);
        }
    };

    const fetchComments = async (observationId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/comments/observation/${observationId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            console.log("Fetched comments:", result); // Debugging line
            setComments(result);
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };

    const handleLikeButtonClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/likes/like_unlike/${observation.id}`, {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                fetchLikes(observation.id); // Fetch likes again after liking/unliking
                fetchIsLiked(observation.id); // Update like status
            } else {
                console.error("Error updating like status");
            }
        } catch (error) {
            console.error("Error liking/unliking observation", error);
        }
    };

    const addComment = async (text) => {
        try {
            const response = await fetch(`http://localhost:8080/api/comments/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    text,
                    uploadId: observation.id
                })
            });

            if (response.ok) {
                fetchComments(observation.id); // Fetch comments again after adding a new comment
            } else {
                console.error("Error adding comment");
            }
        } catch (error) {
            console.error("Error adding comment", error);
        }
    };

    if (!observation) return null;

    const photoUrl = `http://localhost:8080/uploads/${observation.photoPath.split('/').pop()}`;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Observation Details"
            className="observation-modal"
            overlayClassName="observation-modal-overlay"
        >
            <div className="modal-content">
                <button className="close-button" onClick={onRequestClose}>Close</button>
                <div className="details-Modal">
                    <span className="date-time">{new Date(observation.date).toLocaleString()}</span>
                    <span className="location">{observation.location}</span>
                </div>
                <div className="image-container">
                    <img src={photoUrl} alt="Observation" className="observation-image" />
                    <div className="like-button" onClick={handleLikeButtonClick}>
                        <div className={`heart-bg ${isLiked ? 'liked' : ''}`}>
                            <div className={`heart-icon ${isLiked ? 'liked' : ''}`}></div>
                        </div>
                        <span className="likes-amount">{likesAmount}</span>
                    </div>
                </div>

                <figcaption>
                    <strong>{observation.username ? observation.username : 'Onbekende gebruiker'}:</strong> {observation.description}
                </figcaption>

                <div className="comments-section">
                    {comments.length > 0 ? comments.map(comment => (
                        <Comment
                            key={comment.id}
                            commentData={comment}
                            updateReplies={(replies, commentId) => {
                                setComments(comments.map(c => c.id === commentId ? { ...c, replies } : c));
                            }}
                            editComment={(content, commentId) => {
                                setComments(comments.map(c => c.id === commentId ? { ...c, text: content } : c));
                            }}
                            commentDelete={(commentId) => {
                                setComments(comments.filter(c => c.id !== commentId));
                            }}
                            setDeleteModalState={() => {}}
                        />
                    )) : <p>No comments available</p>}
                </div>
                <AddComment buttonValue="Add Comment" addComments={addComment} />
            </div>
        </Modal>
    );
};

ObservationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    observation: PropTypes.shape({
        id: PropTypes.number.isRequired,
        photoPath: PropTypes.string,
        date: PropTypes.string,
        location: PropTypes.string,
        username: PropTypes.string,
        description: PropTypes.string,
        likes: PropTypes.number,
    }),
};

export default ObservationModal;
