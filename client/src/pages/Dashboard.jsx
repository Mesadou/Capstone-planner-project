import { useNavigate } from 'react-router-dom'        //Redirecting to other pages
import { useDbUser } from '../context/UserContext'    //get current logged in users' database record
import { useDashboard } from '../hooks/useDashboard'  //hook
import './Dashboard.css'

function Dashboard() { //Hook calls
  const navigate = useNavigate()
  const { dbUser } = useDbUser()
  const { hostedEvents, joinedEvents, loading } = useDashboard(dbUser?.id) //?. optional chaining. Give me dbUser.id if dbUser exists otherwise undefined. Prevents crash if dbUser is null

  if (loading) return <p>Loading...</p>   //Early return. If data is being fetched show a loading message.

  return (
    <main className="dashboard-main">
      <div className="dashboard-header">
        <h1>Welcome back, {dbUser?.username}!</h1>  {/*Shows user's name with optional chaining safety*/}
        <button 
          className="create-btn"
          onClick={() => navigate('/create')}   //Client-side redirect without reloading the page. 
        >
          + Create Event
        </button>
      </div>

      <section className="events-section">
        <div className="events-header">
          <h2>Your Events</h2>
        </div>
        
        {hostedEvents.length === 0 ? (        //Checks if array is empty. Ternary for empty message state or if there are some events
          <p>No events yet — create one!</p>
        ) : (
          <div className="events-list">
            {hostedEvents.map(event => (      //Loops through each event returns JSX for each one
              <div 
                key={event.id}                // required when using .map()
                className="event-item"
                onClick={() => navigate(`/events/${event.id}`)} //Renders events as clickable cards. Navigates to event's page using real id
              >
                <h3>{event.title}</h3>
                <p>{event.body}</p>
                <span className="event-status">{event.status}</span>
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
                className="event-item"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <h3>{event.title}</h3>
                <p>Hosted by {event.host?.username}</p> //shows who create the event.
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Dashboard
