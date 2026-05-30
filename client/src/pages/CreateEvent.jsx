import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDbUser } from '../context/UserContext'
import api from '../api'
import './CreateEvent.css'

function CreateEvent() {
  const navigate = useNavigate()
  const { dbUser } = useDbUser()

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    gameType: 'both'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [createdEvent, setCreatedEvent] = useState(null)  // holds event after creation


  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!dbUser) return

    setLoading(true)
    setError(null)

    try {
      const res = await api.post('/api/events', {
        title: formData.title,
        body: formData.body,
        host_user_id: dbUser.id,
        game_type: formData.gameType
      })

      setCreatedEvent(res.data)     //store it, don't navigate yet
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (createdEvent) {
    const inviteLink = `${window.location.origin}/join/${createdEvent.invite_token}`

    return (
      <main className="create-main">
        <div className="create-container">
          <h1>Event Created! 🎉</h1>
          <p>Share this link with your friends so they can join:</p>
        </div>

        <section className="create-bgcontainer">
          <div className="invite-box">
            <p className="invite-label">Invite Link</p>
            <div className="invite-link-row">
              <input
                className="invite-input"
                type="text"
                readOnly
                value={inviteLink}
              />
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(inviteLink)}
              >
                Copy
              </button>
            </div>

            <div className="invite-actions">
              <button
                className="create-btn"
                onClick={() => navigate(`/events/${createdEvent.id}`)}  // ← backticks fixed
              >
                Go to Event Page
              </button>
              <button
                className="secondary-btn"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="create-main">
      <div className="create-container">
        <h1>Welcome to Creating your group event </h1>
        <p>Plan your next game night with friends</p>
      </div>

      <section className="create-bgcontainer">


        <form className="create-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Friday Game Night"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="body"
              placeholder="Tell your friends what you're planning..."
              value={formData.body}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Game Type</label>
            <select
              name="gameType"
              value={formData.gameType}
              onChange={handleChange}
            >
              <option value="both">IRL and Online</option>
              <option value="irl">In Person Only</option>
              <option value="online">Online Only</option>
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="submit-buttons">
            <button
              type="submit"
              className="create-btn"
              disabled={loading || !formData.title}
            >
              {loading ? 'Creating...' : 'Publish Event'}
            </button>
          </div>

        </form>
      </section>
    </main>
  )
}

export default CreateEvent