import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./EventPage.css"
import EventCard from '../components/EventCard'
import Modal from '../components/Modal'
import UserList from '../components/UserList'
import api from '../api'

function EventPage() {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  function handleCantMakeIt() {
    console.log('User cant make it')
    setIsModalOpen(false)
  }

  function handleSuggestNewTime() {
    console.log('User wants to suggest new time')
    setIsModalOpen(false)
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
                <button className="event-decline" onClick={() => setIsModalOpen(true)}>No</button>
                <button className="event-accept">Yes</button>
              </div>
            </div>


          </div>

          <div className="type-bar">
            <input type="text" placeholder="Message" />
          </div>
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
              <button className="suggest-btn">+ Suggest</button>
            </div>

            <div className="suggestion-item">
              <img className="suggestion-img" />
              <div className="suggestion-info">
                <p className="suggestion-name">Catan</p>
                <p className="suggestion-type">Board Game</p>
              </div>
              <button className="suggest-btn">+ Suggest</button>
            </div>

            <div className="suggestion-item">
              <img className="suggestion-img" />
              <div className="suggestion-info">
                <p className="suggestion-name">Bowling</p>
                <p className="suggestion-type">Activity</p>
              </div>
              <button className="suggest-btn">+ Suggest</button>
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

    </main>
  );
}

export default EventPage