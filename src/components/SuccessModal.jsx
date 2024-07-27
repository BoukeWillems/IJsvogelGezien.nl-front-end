
import PropTypes from 'prop-types';

const SuccessModal = ({ isOpen, onClose, onUploadAnother, onGoHome }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Waarneming succesvol geüpload!</h2>
                <button onClick={onUploadAnother} className="modal-button">Nog een waarneming uploaden</button>
                <button onClick={onGoHome} className="modal-button">Terug naar de homepage</button>
                <button onClick={onClose} className="modal-button">Sluiten</button>
            </div>
        </div>
    );
};

SuccessModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onUploadAnother: PropTypes.func.isRequired,
    onGoHome: PropTypes.func.isRequired
};

export default SuccessModal;
