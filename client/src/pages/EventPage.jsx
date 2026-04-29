import "./EventPage.css"
import EventCard from '../components/EventCard';

function EventPage() {
  return (
    <main className="event-main">
      {/* className="" */}
     
      
      {/*Text Box */}
      <section className="event-chat">
        {/*Group Name line */}
        <div className="event-name">
          <h1 className="group-name">John Smith's Group</h1>
        </div>

        <section className="event-box">
         <div>
            <EventCard
            title="Event/Game Name"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit feugiat purus, elementum ultricies sem dapibus porttitor. Fusce hendrerit nisi risus, non pellentesque ex varius eget. Sed elementum fringilla sapien, vitae aliquam lorem blandit vitae. Vivamus non risus volutpat ex consectetur varius in sit amet massa. Vestibulum quis "
            imageSrc=""
            members={[
              {id: 1, name: "Rylee", avatar: "https://i.pravatar.cc/150?img=1"},
              {id: 2, name: "Darty", avatar: "https://i.pravatar.cc/150?img=2"},
              {id: 3, name: "Jordan", avatar: "https://i.pravatar.cc/150?img=3"}
            ]}
         />
          <p># Votes [0/9]</p>
            <button>No</button>
           <button>Yes</button>
         </div>
          
          <div className="type-bar">
            <p>Enter Text bottom bar</p>
          </div>
        
        </section>
 
      </section>

      <section className="event-lists">
        {/*Users box */}
        <div className="users-list">
          <img />
          <p>John Smith</p>
        </div>

        {/* Recommend Event/Suggest new event */}
        <div className="create-event">
          <img />
          <h2>Event/Game name</h2>
          <p>list of people who have</p>
        </div>
      </section>

    </main>
  );
}

export default EventPage