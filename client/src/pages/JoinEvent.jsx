import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/react'
import { useDbUser } from '../context/UserContext'
import api from '../api'
import EventCard from '../components/EventCard'
import './JoinEvent.css'

function JoinEvent() {
  const { token } = useParams()
  const { dbUser } = useDbUser()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true) 
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() =>{
    if (!token) return
    
    api.get(`/api/events/join/${token}`)
      .then(res => setEvent(res.data))
      .catch(err => setError('Event not found'))
      .finally(() => setLoading(false))
  }, [token])

  async function handleJoin() {
    if (!dbUser || !event) return
    setJoining(true)

    try {
      await api.post(`/api/events/${event.id}/join`, {
        user_id: dbUser.id
      })
      navigate(`/events/${event.id}`)
    } catch (err) {
      setError('Could not join event. Try again.')
    } finally {
      setJoining(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!event) return <p>Event not found</p>


  return (
    <main className="join-main">
      <section className="invitation-card">

        <div className="invite-group">
          <img className="invite-avatar" src={`https://i.pravater.cc/150?img=${event.host?.id}`} alt="host" />
          <h1>{event.host?.username} has invited you to {event.title}</h1>
        </div>

        <EventCard
          title={event.title}
          description={event.body || 'Come join us!'}
          format={event.game_type}
          date={null}
          members={event.members.map(m => ({
            id: m.user.id,
            name: m.user.username,
            avatar: `https://i.pravater.cc/150?img=${m.user.id}`
          }))}
        />

        <div className="event-join">
          <button className="decline-btn" onClick={() => navigate('/')}>Decline</button>
          <button
            className="join-btn"
            onClick={handleJoin}
            disabled={joining}
          >
            {joining ? 'Joining...' : 'Join Group'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

      </section>
    </main>
  )
}

export default JoinEvent