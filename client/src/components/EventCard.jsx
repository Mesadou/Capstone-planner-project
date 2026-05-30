import { useState } from 'react'
import './EventCard.css'


function EventCard({ title, description, members, date, format, onVoteUp, onVoteDown, voteCount, isFeatured }) {
  const [showAllNames, setShowAllNames] = useState(false)

  const voteTotal = voteCount ?? null
  const displayLimit = 3
  const visibleMembers = showAllNames
    ? members
    : members.slice(0, displayLimit)
  const hasMore = members.length > displayLimit

  return (
    <section className={`event-card ${isFeatured ? 'featured-card' : ''}`}>
      <div className="event-title">
        <h1>{title}</h1>
        {isFeatured && <span className="featured-badge">⭐ Top Pick</span>}
      </div>

      <div className="event-tags">
        {format && (
          <span className={`event-tag tag-format ${format === 'irl' ? 'tag-irl' : format === 'online' ? 'tag-online' : 'tag-both'}`}>
            {format === 'irl' ? '📍 In Person' : format === 'online' ? '💻 Online' : '📍💻 IRL & Online'}
          </span>
        )}
        {date && (
          <span className="event-tag tag-date">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        )}
      </div>

      <div className="event-desc">
        <p>{description}</p>
      </div>

      <div className="event-card-footer">
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
              <p className="names-expand" onClick={() => setShowAllNames(true)}>
                +{members.length - displayLimit} more...
              </p>
            )}
            {showAllNames && (
              <p className="names-expand" onClick={() => setShowAllNames(false)}>
                show less
              </p>
            )}
          </div>
        </div>

        {/* Only shows if vote props are passed */}
        {(onVoteUp || onVoteDown) && (
          <div className="card-vote-controls">
            <button className="vote-btn up" onClick={onVoteUp}>▲</button>
            <span className="vote-number">{voteTotal}</span>
            <button className="vote-btn down" onClick={onVoteDown}>▼</button>
          </div>
        )}
      </div>
    </section>

  )
}

export default EventCard

