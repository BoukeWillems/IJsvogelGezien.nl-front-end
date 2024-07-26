import PropTypes from 'prop-types';
import "../styles/DeleteModal.css";

const DeleteModal = ({ setDeleting, deleteComment, setDeleteModalState }) => {
    const cancelDelete = () => {
        setDeleting(false);
        setDeleteModalState(false);
    };

    const deleteBtnClick = () => {
        deleteComment();
        setDeleteModalState(false);
    };

    return (
        <div className="delete-confirmation-wrapper">
            <div className="delete-container">
                <div className="title">Verwijder Reactie</div>
                <div className="confirmation-message">
                    Weet je zeker dat je deze reactie wilt verwijderen? Het verwijderen van een
                    reactie kan niet ongedaan worden.
                </div>
                <div className="btn-container">
                    <button className="cancel-btn" onClick={cancelDelete}>
                        Annuleer
                    </button>
                    <button className="delete-btn" onClick={deleteBtnClick}>
                        Verwijderen
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteModal.propTypes = {
    setDeleting: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    setDeleteModalState: PropTypes.func.isRequired,
};

export default DeleteModal;