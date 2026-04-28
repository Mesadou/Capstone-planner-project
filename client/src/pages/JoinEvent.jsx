import './JoinEvent.css'

function JoinEvent() {
  return (
    <main className="join-main">

      <section className="invitation-card">
        {/*Invitation from */}
        <div className="invite-group">
          <img />
          <h1>*Person* has invited you to *Game Night*</h1>
        </div>

        {/* Event Details */}
        <section className="event-card">
          <div className="event-title">
            <img className="event-img" />
            <h1>Event/Game Name</h1>
          </div>

          <div className="event-desc">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit feugiat purus, elementum ultricies sem dapibus porttitor. Fusce hendrerit nisi risus, non pellentesque ex varius eget. Sed elementum fringilla sapien, vitae aliquam lorem blandit vitae. Vivamus non risus volutpat ex consectetur varius in sit amet massa. Vestibulum quis </p>
          </div>
          
          
          <div className="event-group">
            <img className="group-icons" />
            <p>List of names in group</p>
          </div>
        </section>

        <div className="event-join">
          <button>Join Group</button>
        </div>
      </section>
    </main>
  );
}

export default JoinEvent