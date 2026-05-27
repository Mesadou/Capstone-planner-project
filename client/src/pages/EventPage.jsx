import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDbUser } from "../context/UserContext";
import { useEvent } from "../hooks/useEvent";
import { useMembers } from "../hooks/useMembers";
import { useSuggestions } from "../hooks/useSuggestions";
import { useMessages } from '../hooks/useMessages';
import "./EventPage.css";
import AvailabilityGrid from "../components/AvailabilityGrid";
import EventCard from "../components/EventCard";
import Modal from "../components/Modal";
import UserList from "../components/UserList";

function EventPage() {
  const { id } = useParams();
  const { dbUser } = useDbUser();
  const { event, loading, error } = useEvent(id);
  const { members, loading: membersLoading } = useMembers(id);
  const { suggestions, loading: suggestionsLoading, addSuggestion, } = useSuggestions(id);
  const { messages, sendMessage } = useMessages(id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)
  const [messageText, setMessageText] = useState('')

  const featuredSuggestion = suggestions.length > 0 
    ? suggestions.reduce((top, s) =>
      (s.votes?.length || 0) > (top.votes?.length || 0) ? s : top, suggestions[0])
    : null

  function handleCantMakeIt() {
    console.log("User cant make it");
    setIsModalOpen(false);
  }

  function handleSuggestNewTime() {
    console.log("User wants to suggest new time");
    setIsModalOpen(false);
  }

  // REPLACE your current handleSuggest with this
  async function handleSuggest(activityTitle, activityType) {
    try {
      await addSuggestion(activityTitle, activityType, dbUser?.id);
      console.log("Suggestion added!");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSendMessage() {
    if (!messageText.trim() || !dbUser) return

    try {
      await sendMessage(messageText, dbUser.id)
      sendMessageText('')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong loading the event</p>
  if (!event) return <p>Event not found</p>;
  if (!dbUser) return <p>Loading User...</p>;

  return (
    <main className="event-main">
      {/*Text Box */}
      <section className="event-chat">
        {/*Group Name line */}
        <div className="event-name">
          <h1 className="group-name">
            {event ? event.title : "John Smiths Group"}
          </h1>
        </div>

        <section className="event-box">
          <div>
            {featuredSuggestion ? (
              <EventCard
              title={event.title}
              description={event.body || 'No description provided'}
              imageSrc=""
              members={members.map(m => ({
                id: m.user.id,
                name: m.user.username,
                avatar: `https://i.pravater.cc/150?img=${m.user.id}`
              }))}
            />
            ) : (<EventCard
              title="No activity suggested yet"
              description="Use the sidebar to suggest an activity"
              imageSrc=""
              members={members.map(m => ({
                id: m.user.id,
                name: m.user.username,
                avatar: `https://i.pravater.cc/150?img=${m.user.id}`
              }))}
              />
            )}
            

            <div className="event-actions">
              <div className="vote-tracker">
                <span className="votes-count">0</span>
                <span className="votes-divider">/</span>
                <span className="votes-total">9</span>
                <span className="votes-label">responded</span>
              </div>
              <div className="event-buttons">
                <button
                  className="availability-btn"
                  onClick={() => setIsAvailabilityOpen(true)}
                >
                  {" "}
                  Set Availability
                </button>

                <button
                  className="event-decline"
                  onClick={() => setIsModalOpen(true)}
                >
                  No
                </button>
                <button className="event-accept">Yes</button>
              </div>
            </div>
          </div>

          {/*<div className="availability-section">
            <h3>Your Availabilty</h3>
            <p>Cilck the times you're available this week</p>
            <AvailabilityGrid eventId={id} userId={2} />
          </div>*/}

          <div className="messages-list">
            {messages.map(msg => (
              <div key={msg.id} className={`message-item ${msg.user_id === dbUser?.id ? 'own-message' : ''}`}>
                <span className="message-username">{msg.user.username}</span>
                <span className="message-content">{msg.content}</span>
              </div>
            ))}
          </div>

          <div className="type-bar">
            <input
              type="text"
              placeholder="Message"
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && messageText.trim()) {
                  handleSendMessage()
                }
              }}
            />
            <button
              className="send-btn"
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
            >
              Send
            </button>
          </div>


        </section>
      </section>

      <section className="event-lists">
        <div className="users-list">
          <h3>Members</h3>
          <UserList
            members={members.map(m => ({
              id: m.user.id,
              name: m.user.username,
              avatar: 'https://i.pravatar.cc/150?img=$={m.user.id}'
            }))}
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
              <button
                className="suggest-btn"
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
              <button
                className="suggest-btn"
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
              <button
                className="suggest-btn"
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
        <div
          className="modal-overlay"
          onClick={() => setIsAvailabilityOpen(false)}
        >
          <div
            className="availability-modal"
            onClick={(e) => e.stopPropagation()}
          >
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

export default EventPage;
