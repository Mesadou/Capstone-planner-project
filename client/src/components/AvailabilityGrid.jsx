import { useState, useRef } from 'react'
import './AvailabilityGrid.css'
import api from '../api'

function AvailabilityGrid({ eventId, userId }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const times = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00'
  ]

  const [selected, setSelected] = useState({})
  const isDragging = useRef(false)
  const dragValue = useRef(true)

  function getCellKey(dayIndex, time) {
    return `${dayIndex}-${time}`
  }

  function handleMouseDown(dayIndex, timeIndex) {
    isDragging.current = true
    const key = getCellKey(dayIndex, timeIndex)
    const newValue = !selected[key]
    dragValue.current = newValue

    setSelected(prev => ({ ...prev, [key]: newValue }))
    sendToBackend(dayIndex, timeIndex, newValue)
  }

  function handleMouseEnter(dayIndex, timeIndex) {
    if (!isDragging.current) return
    const key = getCellKey(dayIndex, timeIndex)
    setSelected(prev => ({ ...prev, [key]: dragValue.current }))
    sendToBackend(dayIndex, timeIndex, dragValue.current)
  }

  function handleMouseUp() {
    isDragging.current = false
  }

  async function sendToBackend(dayIndex, timeIndex, isAvailable) {
    try {
      await api.post(`/api/events/${eventId}/availability`, {
        user_id: userId,
        day_of_week: dayIndex,
        time_slot: times[timeIndex],
        is_available: isAvailable
      })
    } catch (err) {
      console.error(err)
    }
  }

  function getWeekDays() {
    const today = new Date()
    const sunday = new Date(today)
    sunday.setDate(today.getDate() - today.getDay())

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sunday)
      date.setDate(sunday.getDate() + i)
      return {
        name: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
        date: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' })
      }
    })
  }

  const weekDays = getWeekDays()

  return (
    <div
      className="availability-grid"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header row with day names */}
      <div className="grid-header">
        <div className="time-col-label"></div>
        {weekDays.map(day => (
          <div key={day.name} className="day-label">
            <span className="day-name">{day.name}</span>
            <span className="day-date">{day.month} {day.date}</span>
          </div>
        ))}
      </div>

      {/* Time rows */}
      {times.map((time, timeIndex) => (
        <div key={time} className="grid-row">
          <div className="time-label">{time}</div>
          {days.map((day, dayIndex) => {
            const key = getCellKey(dayIndex, timeIndex)
            const isSelected = selected[key]
            return (
              <div
                key={dayIndex}
                className={`grid-cell ${isSelected ? 'selected' : ''}`}
                onMouseDown={() => handleMouseDown(dayIndex, timeIndex)}
                onMouseEnter={() => handleMouseEnter(dayIndex, timeIndex)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default AvailabilityGrid