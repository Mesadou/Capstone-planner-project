import './SuggestionBubble.css'

function SuggestionBubble({ suggestion, onVoteUp, onVoteDown, isFeatured, onDelete, currentUserId}) {
  const voteTotal = suggestion.votes?.reduce((sum, v) => sum + v.value, 0) || 0
  const isOwner = suggestion.user_id === currentUserId

  return (
    <div className={`suggestion-bubble ${isFeatured ? 'is-featured' : ''}`}>
      <div className="bubble-info">
        {isFeatured && <span className="top-pick"> Top Pick</span>}
        <span className="bubble-title">{suggestion.title}</span>
        <div className="bubble-meta">
          <span className="bubble-type">{suggestion.type}</span>
          <span className="bubble-suggester">
            suggested by {suggestion.suggested_by?.username || 'someone'}
          </span>
        </div>
      </div>
      <div className="bubble-actions">
        <div className="bubble-votes">
          <button className="bubble-vote-btn" onClick={onVoteUp}>▲</button>
          <span>{voteTotal}</span>
          <button className="bubble-vote-btn" onClick={onVoteDown}>▼</button>
        </div>

        {isOwner && (
          <button className="bubble-delete-btn" onClick={onDelete}>✕</button>
        )}
      </div>

    </div>
  )
}

export default SuggestionBubble