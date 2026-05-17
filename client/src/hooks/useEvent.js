import { useState, useEffect } from 'react'
import api from '../api'

export function useEvent(eventId) {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!eventId) return

    setLoading(true)
    api.get(`/api/events/${eventId}`)
      .then(res => setEvent(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [eventId])

  return { event, loading, error }
}