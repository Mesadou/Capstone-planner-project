import { useState } from 'react'
import './JoinEvent.css'
import EventCard from '../components/EventCard';
import Modal from '../components/Modal'


function JoinEvent() {
  return (
    <main className="join-main">
      <section className="invitation-card">

        {/*Invitation from */}
        <div className="invite-group">
          <img className="invite-avatar" src="https://i.pravatar.cc/150?img=4" />
          <h1>*Person* has invited you to *Game Night*</h1>
        </div>

        {/* Event Details */}
        <div className="event-card-wrapper">
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
        </div>


        {/* Join Button*/}
        <div className="event-join">
          <button>Join Group</button>
        </div>

      </section>
    </main>
  );
}

export default JoinEvent