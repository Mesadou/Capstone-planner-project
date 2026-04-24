import './JoinEvent.css'

function JoinEvent() {
  return (
    <main className="join-main">

      <section className="invitation-card">
        {/*Invitation from */}
        <div>
          <img />
          <h1>*Person* has invited you to *Game Night*</h1>
        </div>

        {/* Event Details */}
        <section className="event-card">
          <div className="event-title">
            <img className="event-img" />
            <h1>Event/Game Name</h1>
          </div>

          <p>Event/Game Description</p>
          
          <div className="event-group">
            <img className="group-icons" />
            <p>List of names in group</p>
          </div>
        </section>

        <div>
          <button>Join Group</button>
        </div>
      </section>
    </main>
  );
}

export default JoinEvent