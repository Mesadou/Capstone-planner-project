import { useState, useEffect } from 'react'
import api from '../api'

export function useMessages(eventId) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventId) return

    api.get(`/api/events/${eventId}/messages`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [eventId])

  async function sendMessage(content, userId) {
    const res = await api.post(`/api/events/${eventId}/messages`, {
      content,
      user_id: userId
    })
    setMessages(prev => [...prev, res.data])
    return res.data
  }

  return { messages, loading, sendMessage }
}