import { useNavigate } from 'react-router-dom'        //Redirecting to other pages
import { useDbUser } from '../context/UserContext'    //get current logged in users' database record
import { useDashboard } from '../hooks/useDashboard'  //hook
import './Dashboard.css'

function Dashboard() { //Hook calls
  const navigate = useNavigate()
  const { dbUser } = useDbUser()
  const { hostedEvents, joinedEvents, loading, deleteEvent } = useDashboard(dbUser?.id) //?. optional chaining. Give me dbUser.id if dbUser exists otherwise undefined. Prevents crash if dbUser is null

  if (loading) return <p>Loading...</p>   //Early return. If data is being fetched show a loading message.

  return (
    <main className="dashboard-main">
      <div className="dashboard-header">
        {/*Shows user's name with optional chaining safety*/}
        <h1>Welcome back, {dbUser?.username}!</h1>
      </div>

      <div className="dashboard-content">

        <section className="events-section">
          <div className="events-header">
            <h2>Your Events</h2>
            <button
              className="create-btn"
              onClick={() => navigate('/create')}   //Client-side redirect without reloading the page. 
            >
              + Create Event
            </button>
          </div>


          {hostedEvents.length === 0 ? (        //Checks if array is empty. Ternary for empty message state or if there are some events
            <p>No events yet — create one!</p>
          ) : (
            <div className="events-list">
              {hostedEvents.map(event => (
                <div key={event.id} className="event-item" onClick={() => navigate(`/events/${event.id}`)}>
                  <div
                    className="event-item-content"
                    
                  >
                    <h3>{event.title}</h3>
                    <p>{event.body}</p>
                  </div>

                  <div className="event-item-actions">
                    <button
                      className="share-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(
                          `${window.location.origin}/join/${event.invite_token}`
                        )
                      }}
                    >
                      🔗 Copy Link
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteEvent(event.id)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}


        </section>


        <section className="invite-events-section">
          <h2>Invited Events</h2>
          {joinedEvents.length === 0 ? (        //Same pattern as hosted events
            <p>No invitations yet</p>
          ) : (
            <div className="events-list">
              {joinedEvents.map(event => (
                <div
                  key={event.id}
                  className="event-item invited-event-item"
                  onClick={() => navigate(`/join/${event.invite_token}`)}
                >
                  <div className="invited-event-host">
                    <img
                      className="host-avatar"
                      src={event.host?.image_url || `https://i.pravatar.cc/150?img=${event.host?.id}`}
                      alt={event.host?.username}
                    />
                    <div classname="invited-event-info">
                      <h3>{event.title}</h3>
                      {/*shows who create the event.*/}
                      <p>Hosted by {event.host?.username}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>


      </div>
    </main>
  )
}

export default Dashboard