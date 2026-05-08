import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/react'
import api from '../api'
import './JoinEvent.css'
import EventCard from '../components/EventCard'

function JoinEvent() {
  const { token } = useParams()
  const { user } = useUser()
  const navigate = useNavigate()
  const [joining, setJoining] = useState(false)

  async function handleJoin() {
    setJoining(true)
    try {
      await api.post(`/api/events/9/join`, {
        user_id: 1
      })
      navigate('/events/9')
    } catch (err) {
      console.error(err)
    } finally {
      setJoining(false)
    }
  }

  return (
    <main className="join-main">
      <section className="invitation-card">
        <div className="invite-group">
          <img className="invite-avatar" src="https://i.pravatar.cc/150?img=4" />
          <h1>*Person* has invited you to *Game Night*</h1>
        </div>

        <EventCard
          title="Event/Game Name"
          description="Come join us for a fun evening!"
          imageSrc=""
          members={[
            {id: 1, name: "Rylee", avatar: "https://i.pravatar.cc/150?img=1"},
            {id: 2, name: "Darty", avatar: "https://i.pravatar.cc/150?img=2"},
          ]}
        />

        <div className="event-join">
          <button className="decline-btn">Decline</button>
          <button 
            className="join-btn" 
            onClick={handleJoin}
            disabled={joining}
          >
            {joining ? 'Joining...' : 'Join Group'}
          </button>
        </div>
      </section>
    </main>
  )
}

export default JoinEvent