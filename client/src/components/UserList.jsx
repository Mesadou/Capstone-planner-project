import './UserList.css'

function UserList({ members, layout }) {
  return (
    <div className={`user-list ${layout === 'sidebar' ? 'user-list-sidebar' : 'user-list-card'}`}>
      {members.map((member) => (
        <div className="user-item" key={member.id}>
          <img
            className="user-avatar"
            src={member.avatar}
            alt={member.name}
          />
          <p className="user-name">{member.name}</p>
        </div>
      ))}
    </div>
  )
}

export default UserList