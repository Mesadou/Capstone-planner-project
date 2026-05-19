import { useState, useEffect } from 'react'
import api from '../api'

export function useDashboard(userId) { //Hook to fetch events for userID
  const [hostedEvents, setHostedEvents] = useState([]) //events this user created as a host
  const [joinedEvents, setJoinedEvents] = useState([]) //events this user has joined as member
  const [loading, setLoading] = useState(true)         //true while fetching, false when done
  const [error, setError] = useState(null)             //stores any error that happens during fetching

  useEffect(() => {     //Runs after component is rendered
    if (!userId) return //Check for a user. If userId is null or user isn't logged in(undefined) stop and do nothing

    Promise.all([   //Makes two API calls at the same time, versus one after the other
      api.get(`/api/users/${userId}/events`),
      api.get(`/api/users/${userId}/joined-events`)
    ])
    .then(([hostedRes, joinedRes]) => {   //Runs both responses when requests finish. [] pulls them out in the same order they were entered in Promise.all
      setHostedEvents(hostedRes.data)
      setJoinedEvents(joinedRes.data)
    })
    .catch(err => setError(err))      //Error catch
    .finally(() => setLoading(false)) //Always runs at the end. Set to false whether loading succeded or failed
  }, [userId]) //re-run this effect if userId changes

  return { hostedEvents, joinedEvents, loading, error } //Returns all four values to be used in component hook
}