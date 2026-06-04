import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDbUser } from "../context/UserContext";
import { useEvent } from "../hooks/useEvent";
import { useMembers } from "../hooks/useMembers";
import { useSuggestions } from "../hooks/useSuggestions";
import { useMessages } from '../hooks/useMessages';
import "./EventPage.css";
import api from '../api'
import AvailabilityGrid from "../components/AvailabilityGrid";
import EventCard from "../components/EventCard";
import Modal from "../components/Modal";
import UserList from "../components/UserList";
import SuggestionBubble from '../components/SuggestionBubble'
import SuggestModal from '../components/SuggestModal'

function EventPage() {
  const { id } = useParams();
  const navigate  = useNavigate();
  const { dbUser } = useDbUser();
  const { event, loading, error } = useEvent(id);
  const { members, loading: membersLoading } = useMembers(id);
  const { suggestions, loading: suggestionsLoading, addSuggestion, refresh } = useSuggestions(id);
  const { messages, sendMessage } = useMessages(id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [showInvite, setShowInvite] = useState(false)
  const [isSuggestOpen, setIsSuggestOpen] = useState(false)
  const [prefillTitle, setPrefillTitle] = useState('')
  const [prefillType, setPrefillType] = useState('Board Game')

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

  async function handleDeleteSuggestion(suggestionId) {
    try {
      await api.delete(`/api/suggestions/${suggestionId}`)
      await refresh()
    } catch (err) {
      console.error(err)
    }
  }

  async function handleSendMessage() {
    if (!messageText.trim() || !dbUser) return

    try {
      await sendMessage(messageText, dbUser.id)
      setMessageText('')
    } catch (err) {
      console.error(err)
    }
  }

  async function handleVote(suggestionId, value) {
    if (!dbUser) return
    try {
      await api.post(`/api/suggestions/${suggestionId}/vote`, {
        user_id: dbUser.id,
        value
      })
      // Refresh suggestions to show updated votes
      // Your useSuggestions hook will need a refresh function
      await refresh()
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
        <div className="event-name-row">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>◀</button>
          {/*Group Name line */}
          <div className="event-name">
            <h1 className="group-name">{event.title} </h1>
            <div className="event-name-right">
              <button className="invite-btn" onClick={() => setShowInvite(prev => !prev)}>
                🔗 Invite
              </button>
              <img
                className="current-user-avatar"
                src={dbUser?.image_url || `https://i.pravatar.cc/150?img=${dbUser?.id}`}
                alt={dbUser?.username}
              />
            </div>
          </div>
        </div>

        {showInvite && (
          <div className="invite-link-bar">
            <input
              type="text"
              readOnly
              value={`${window.location.origin}/join/${event.invite_token}`}
            />
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/join/${event.invite_token}`)
                setShowInvite(false)
              }}
            >
              Copy
            </button>
          </div>
        )}

        <section className="event-box">
          <div className="event-content">
            <div className="event-box-bg">
              {featuredSuggestion ? (
                <EventCard
                  title={featuredSuggestion.title}
                  description={featuredSuggestion.type}
                  format={event.game_type}
                  date={event.finalized_date || null}
                  members={members.map(m => ({
                    id: m.user.id,
                    name: m.user.username,
                    avatar: m.user.image_url || `https://i.pravatar.cc/150?img=${m.user.id}`
                  }))}
                />
              ) : (
                <EventCard
                  title="No activity suggested yet"
                  description="Use the sidebar to suggest an activity"
                  format={event.game_type}
                  date={null}
                  members={members.map(m => ({
                    id: m.user.id,
                    name: m.user.username,
                    avatar: m.user.image_url || `https://i.pravatar.cc/150?img=${m.user.id}`
                  }))}
                />
              )}


              {/* Action buttons */}
              <div className="event-actions">
                <div className="vote-tracker">
                  <span className="votes-count">{members.length}</span>
                  <span className="votes-label">members</span>
                </div>
                <div className="event-buttons">
                  <button className="availability-btn" onClick={() => setIsAvailabilityOpen(true)}>
                    Set Availability
                  </button>
                  <button className="event-decline" onClick={() => setIsModalOpen(true)}>No</button>
                  <button className="event-accept">Yes</button>
                </div>
              </div>

              {/* Suggestion bubbles */}
              {suggestions.length > 0 && (
                <div className="suggestions-area">
                  <p className="suggestions-label">Suggested Activities</p>
                  {suggestions.map(suggestion => (
                    <SuggestionBubble
                      key={suggestion.id}
                      suggestion={suggestion}
                      isFeatured={suggestion.id === featuredSuggestion?.id}
                      currentUserId={dbUser?.id}
                      onVoteUp={() => handleVote(suggestion.id, 1)}
                      onVoteDown={() => handleVote(suggestion.id, -1)}
                      onDelete={() => handleDeleteSuggestion(suggestion.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="messages-list">
              {messages.map(msg => {
                const isOwn = msg.user_id === dbUser?.id
                return (
                  <div
                    key={msg.id}
                    className={`message-item ${isOwn ? 'own-message' : ''}`}
                  >
                    {/* Avatar only shows for other people's messages */}
                    {!isOwn && (
                      <img
                        className="message-avatar"
                        src={msg.user?.image_url || `https://i.pravatar.cc/150?img=${msg.user?.id}`}
                        alt={msg.user?.username}
                      />
                    )}

                    <div className="message-bubble">
                      {!isOwn && (
                        <span className="message-username">{msg.user?.username}:</span>
                      )}
                      <span className="message-content">{msg.content}</span>
                    </div>

                    {/* Avatar on right for own messages */}
                    {isOwn && (
                      <img
                        className="message-avatar"
                        src={dbUser?.image_url || `https://i.pravatar.cc/150?img=${dbUser?.id}`}
                        alt={dbUser?.username}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/*<div className="availability-section">
            <h3>Your Availabilty</h3>
            <p>Cilck the times you're available this week</p>
            <AvailabilityGrid eventId={id} userId={2} />
          </div>*/}



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
              avatar: m.user.image_url || `https://i.pravatar.cc/150?img=${m.user.id}`
            }))}
            layout="sidebar"
          />
        </div>

        {/* Recommend Event/Suggest new event */}
        <div className="create-event">
          <h3>Suggest an Activity</h3>

          {/* Show real suggestions from database */}
          <button
            className="suggest-submit-btn"
            onClick={() => {
              setPrefillTitle('')
              setPrefillType('Board Game')
              setIsSuggestOpen(true)
            }}
          >
            + New Suggestion
          </button>

          <div className="quick-suggestions">
            <p className="quick-label">Quick add:</p>
            <div className="quick-list">
              {[
                { title: "Dave & Busters", type: "Arcade" },
                { title: "Catan", type: "Board Game" },
                { title: "Bowling", type: "Activity" },
                { title: "Apex Legends", type: "Video Game" },
                { title: "Jackbox", type: "Party Game" }
              ].map(item => (
                <button
                  key={item.title}
                  className="quick-btn"
                  onClick={() => {
                    setPrefillTitle(item.title)
                    setPrefillType(item.type)
                    setIsSuggestOpen(true)
                  }}
                >
                  + {item.title}
                </button>
              ))}
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

      <SuggestModal
        isOpen={isSuggestOpen}
        onClose={() => setIsSuggestOpen(false)}
        prefillTitle={prefillTitle}
        prefillType={prefillType}
        onSubmit={async (title, type) => {
          await addSuggestion(title, type, dbUser?.id)
          await refresh()
        }}
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
            <AvailabilityGrid eventId={id} userId={dbUser?.id} />
          </div>
        </div>
      )}
    </main>
  );
}

export default EventPage;
