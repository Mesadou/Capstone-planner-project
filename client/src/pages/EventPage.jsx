function EventPage() {
  return (
    <main>
      <div>
        <h1>Welcome to Events page </h1>
        <p>Plan your next game night with friends</p>
      </div>
      {/* */}

      {/*Group Name line */}
      <div>
        <h1>John Smith's Group</h1>
      </div>

      {/*Users box */}
      <div>
        <img/>
        <p>John Smith</p>
      </div>

      {/*Text Box */}
      <section>
        <div>
          <img/>
          <h2>Game/Event Name</h2>
          <p>Game/Event Description</p>
          <p># Votes [0/9]</p>
          <button>No</button>
          <button>Yes</button>
        </div>
        <div>
          <p>Enter Text bottom bar</p>
        </div>
      </section>
    
    {/* Recommend Event/Suggest new event */}
      <div>
        <img/>
        <h2>Event/Game name</h2>
        <p>list of people who have</p>
      </div>


    </main>
  );
}

export default EventPage