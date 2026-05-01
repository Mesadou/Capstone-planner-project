import './Modal.css'

function Modal({ isOpen, onClose, onCantMakeIt, onSuggestNewTime }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        <h2>Can't make it?</h2>
        <p>Let the host know what works for you</p>

        <div className="modal-options">
          <button className="modal-btn" onClick={onCantMakeIt}>
            I can't make this date
          </button>
          <button className="modal-btn" onClick={onSuggestNewTime}>
            Suggest a different time
          </button>
        </div>

        <button className="modal-close" onClick={onClose}>
          Cancel
        </button>

      </div>
    </div>
  )
}

export default Modal