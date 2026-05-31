import { useState } from 'react'
import './Modal.css'

function SuggestModal({ isOpen, onClose, onSubmit, prefillTitle, prefillType }) {
  const [title, setTitle] = useState(prefillTitle || '')
  const [type, setType] = useState(prefillType || 'Board Game')
  const [notes, setNotes] = useState('')

  if (!isOpen) return null

  function handleSubmit() {
    if (!title.trim()) return
    onSubmit(title, type, notes)
    setTitle('')
    setType('Board Game')
    setNotes('')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2>Suggest an Activity</h2>
        <p>Add your suggestion for the group to vote on</p>

        <div className="modal-options">
          <div className="form-group">
            <label>Activity Name</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Dave & Busters"
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="Board Game">Board Game</option>
              <option value="Video Game">Video Game</option>
              <option value="Card Game">Card Game</option>
              <option value="Arcade">Arcade</option>
              <option value="Activity">Activity</option>
              <option value="Party Game">Party Game</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Notes (optional)</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any details..."
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <button className="modal-btn" onClick={handleSubmit}>
            + Suggest
          </button>
          <button className="modal-close" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuggestModal