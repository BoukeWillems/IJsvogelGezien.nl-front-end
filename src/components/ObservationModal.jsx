import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../styles/ObservationModal.css';

Modal.setAppElement('#root');

const ObservationModal = ({ isOpen, onRequestClose, observation }) => {
    const [likesAmount, setLikesAmount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (observation) {
            setLikesAmount(observation.likes || 0);
            // Assuming you fetch whether the current user has liked this observation
            fetchIsLiked(observation.id);
        }
    }, [observation]);

    const fetchIsLiked = async (observationId) => {
        try {
            const response = await fetch(`http://localhost:8081/api/likes/isLiked?observationId=${observationId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            setIsLiked(result);
        } catch (error) {
            console.error("Error fetching like status", error);
        }
    };

    const handleLikeButtonClick = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/likes/${isLiked ? 'unlike' : 'like'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ observationId: observation.id })
            });

            const result = await response.json();
            if (response.ok) {
                setIsLiked(!isLiked);
                setLikesAmount(result.likes);
            } else {
                console.error("Error updating like status", result);
            }
        } catch (error) {
            console.error("Error liking/unliking observation", error);
        }
    };

    if (!observation) return null;

    const photoUrl = `http://localhost:8081/uploads/${observation.photoPath.split('/').pop()}`;

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
