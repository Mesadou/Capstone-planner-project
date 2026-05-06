function AvailabilityGrid({ slots, totalMembers }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', 
                 '14:00', '15:00', '16:00', '17:00', '18:00', 
                 '19:00', '20:00', '21:00']

  function getColor(count) {
    if (count === 0) return 'rgba(255,255,255,0.1)'
    const intensity = count / totalMembers
    return `rgba(0, 255, 100, ${intensity})`
  }

  return (
    <div className="availability-grid">
      <div className="grid-header">
        <div className="time-label"></div>
        {days.map(day => (
          <div key={day} className="day-label">{day}</div>
        ))}
      </div>

      {times.map(time => (
        <div key={time} className="grid-row">
          <div className="time-label">{time}</div>
          {days.map((day, dayIndex) => {
            const slot = slots.find(
              s => s.day_of_week === dayIndex && s.time_slot === time
            )
            const count = slot?._count?.user_id || 0
            return (
              <div
                key={dayIndex}
                className="grid-cell"
                style={{ background: getColor(count) }}
                title={`${count} people available`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}