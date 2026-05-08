import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./EventPage.css"
import AvailabilityGrid from '../components/AvailabilityGrid'
import EventCard from '../components/EventCard'
import Modal from '../components/Modal'
import UserList from '../components/UserList'
import api from '../api'

function EventPage() {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)

  function handleCantMakeIt() {
    console.log('User cant make it')
    setIsModalOpen(false)
  }

  function handleSuggestNewTime() {
    console.log('User wants to suggest new time')
    setIsModalOpen(false)
  }

  async function handleSuggest(activityTitle, activityType) {
    try {
      await api.post(`/api/events/${id}/suggestions`, {
        title: activityTitle,
        type: activityType,
        players: null,
        user_id: 1
      })
      console.log('Suggestion added!')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    api.get(`/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!event) return <p>Event not found</p>


  return (
    <main className="event-main">

      {/*Text Box */}
      <section className="event-chat">
        {/*Group Name line */}
        <div className="event-name">
          <h1 className="group-name">{event ? event.title : 'John Smiths Group'}</h1>
        </div>

        <section className="event-box">
          <div>
            <EventCard
              title="Event/Game Name"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit feugiat purus, elementum ultricies sem dapibus porttitor. Fusce hendrerit nisi risus, non pellentesque ex varius eget. Sed elementum fringilla sapien, vitae aliquam lorem blandit vitae. Vivamus non risus volutpat ex consectetur varius in sit amet massa. Vestibulum quis "
              imageSrc=""
              members={[
                { id: 1, name: "Rylee", avatar: "https://i.pravatar.cc/150?img=1" },
                { id: 2, name: "Darty", avatar: "https://i.pravatar.cc/150?img=2" },
                { id: 3, name: "Jordan", avatar: "https://i.pravatar.cc/150?img=3" },
                { id: 4, name: "Rylan", avatar: "https://i.pravatar.cc/150?img=5" }
              ]}
            />
            <div className="event-actions">
              <div className="vote-tracker">
                <span className="votes-count">0</span>
                <span className="votes-divider">/</span>
                <span className="votes-total">9</span>
                <span className="votes-label">responded</span>
              </div>
              <div className="event-buttons">
                <button className="availability-btn" onClick={() => setIsAvailabilityOpen(true)}> Set Availability</button>

                <button className="event-decline" onClick={() => setIsModalOpen(true)}>No</button>
                <button className="event-accept">Yes</button>
              </div>
            </div>
          </div>
            
          {/*<div className="availability-section">
            <h3>Your Availabilty</h3>
            <p>Cilck the times you're available this week</p>
            <AvailabilityGrid eventId={id} userId={2} />
          </div>

          <div className="type-bar">
            <input type="text" placeholder="Message" />
          </div>*/}
        </section>

      </section>

      <section className="event-lists">
        <div className="users-list">
          <h3>Members</h3>
          <UserList
            members={[
              { id: 1, name: "Rylee", avatar: "https://i.pravatar.cc/150?img=1" },
              { id: 2, name: "Darty", avatar: "https://i.pravatar.cc/150?img=2" },
              { id: 3, name: "Jordan", avatar: "https://i.pravatar.cc/150?img=3" }
            ]}
            layout="sidebar"
          />
        </div>

        {/* Recommend Event/Suggest new event */}
        <div className="create-event">
          <h3>Suggest an Activity</h3>

          <div className="suggestions-list">
            <div className="suggestion-item">
              <img className="suggestion-img" />
              <div className="suggestion-info">
                <p className="suggestion-name">Dave & Busters</p>
                <p className="suggestion-type">Arcade</p>
              </div>
              <button className="suggest-btn"
                onClick={() => handleSuggest("Dave & Busters", "Arcade")}
              >
                + Suggest
              </button>
            </div>

            <div className="suggestion-item">
              <img className="suggestion-img" />
              <div className="suggestion-info">
                <p className="suggestion-name">Catan</p>
                <p className="suggestion-type">Board Game</p>
              </div>
              <button className="suggest-btn"
                onClick={() => handleSuggest("Catan", "Board Game")}
              >
                + Suggest
              </button>
            </div>

            <div className="suggestion-item">
              <img className="suggestion-img" />
              <div className="suggestion-info">
                <p className="suggestion-name">Bowling</p>
                <p className="suggestion-type">Activity</p>
              </div>
              <button className="suggest-btn"
                onClick={() => handleSuggest("Bowling", "Activity")}
              >
                + Suggest
              </button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCantMakeIt={handleCantMakeIt}
        onSuggestNewTime={handleSuggestNewTime}
      />

      {isAvailabilityOpen && (
        <div className="modal-overlay" onClick={() => setIsAvailabilityOpen(false)}>
          <div className="availability-modal" onClick={(e) => e.stopPropagation()}>
            <div className="availability-modal-header">
              <h2>Set Your Availability</h2>
              <button
                className="modal-close"
                onClick={() => setIsAvailabilityOpen(false)}
              >
                ✕
              </button>
            </div>
            <p>Click and drag to mark when you're available</p>
            <AvailabilityGrid eventId={id} userId={1} />
          </div>
        </div>
      )}

    </main>
  );
}

export default EventPage