import { useState, useEffect } from 'react'
import api from '../api'

export function useMembers(eventId) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId) return

    api.get(`/api/events/${eventId}/members`)
      .then(res => setMembers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [eventId])

  return { members, loading }
}