function JoinEvent() {
  return (
    <main>
      <div>
        <h1>Welcome to Joining Events</h1>
        <p>Plan your next game night with friends</p>
      </div>

      {/*Invitation from */}
      <div>
        <img/>
        <h1>*Person* has invited you to *Game Night*</h1>
      </div>

      {/* Event Details */}
      <section>
        <img/>
        <h1>Event/Game Name</h1>
        <p>Event/Game Description</p>
        <div>
          <img/>
          <p>List of names in group</p>
        </div>
      </section>

      <div>
        <button>Join Group</button>
      </div>

    </main>
  );
}

export default JoinEvent