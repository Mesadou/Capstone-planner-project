import { useState, useEffect } from 'react'
import api from '../api'

export function useSuggestions(eventId) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId) return

    api.get(`/api/events/${eventId}/suggestions`)
      .then(res => setSuggestions(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [eventId])

  async function addSuggestion(title, type, userId) {
    const res = await api.post(`/api/events/${eventId}/suggestions`, {
      title,
      type,
      user_id: userId
    })
    setSuggestions(prev => [...prev, res.data])
    return res.data
  }

  return { suggestions, loading, addSuggestion }
}