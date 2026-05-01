import { useState } from 'react'
import './Modal.css'


function Modal({ isOpen, onClose, onCantMakeIt, onSuggestNewTime }) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [suggestedDate, setSuggestedDate] = useState('')

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        {!showDatePicker ? (
          <>
            <h2>Can't make it?</h2>
            <p>Let the host know what works for you</p>
            <div className="modal-options">
              <button className="modal-btn" onClick={onCantMakeIt}>
                I can't make this date
              </button>
              <button 
                className="modal-btn" 
                onClick={() => setShowDatePicker(true)}
              >
                Suggest a different time
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Suggest a new time</h2>
            <p>Pick a date and time that works for you</p>
            <input
              type="datetime-local"
              className="date-picker"
              value={suggestedDate}
              onChange={(e) => setSuggestedDate(e.target.value)}
            />
            <div className="modal-options">
              <button 
                className="modal-btn"
                onClick={() => onSuggestNewTime(suggestedDate)}
              >
                Submit suggestion
              </button>
              <button
                className="modal-btn"
                onClick={() => setShowDatePicker(false)}
              >
                Go back
              </button>
            </div>
          </>
        )}

        <button className="modal-close" onClick={onClose}>
          Cancel
        </button>

      </div>
    </div>
  )
}

export default Modal