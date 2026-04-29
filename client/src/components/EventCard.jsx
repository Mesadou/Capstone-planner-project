import './EventCard.css'

function EventCard({ title, description, members, imageSrc }) {
  return (
    <main>
      <section className="event-card">
        <div className="event-title">
          <img className="event-img" src={imageSrc} alt="event" />
          <h1>{title}</h1>
        </div>

        <div className="event-desc">
          <p>{description}</p>
        </div>

        <div className="event-group">
          <div className="avatar-stack">
            {members.map((member) => (
              <img
                className="member-avatar"
                key={member.id}
                src={member.avatar}
                alt={member.name}
              />
            ))}
          </div>

          <div className="member-names">
            {members.map((member) => (
              <p key={member.id}>{member.name}</p>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}

export default EventCard

