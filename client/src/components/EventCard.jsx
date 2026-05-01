import { useState } from 'react'
import './EventCard.css'


function EventCard({ title, description, members, imageSrc }) {
  const [showAllNames, setShowAllNames] = useState(false)

  const displayLimit = 3
  const visibleMembers = showAllNames
    ? members
    : members.slice(0, displayLimit)
  const hasMore = members.length > displayLimit


  return (
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
          {visibleMembers.map((member) => (
            <p key={member.id}>{member.name}</p>
          ))}
          {hasMore && !showAllNames && (
            <p
              className="names-expand"
              onClick={() => setShowAllNames(true)}
            >
              +{members.length - displayLimit} more...
            </p>
          )}
          {showAllNames && (
            <p
              className="names-expand"
              onClick={() => setShowAllNames(false)}
            >
              show less
            </p>
          )}
        </div>

      </div>
    </section>

  )
}

export default EventCard

