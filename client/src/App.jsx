import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Show, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react'
import { useEffect } from 'react'
import api from './api'
import Home from './pages/Home'
import CreateEvent from './pages/CreateEvent'
import EventPage from './pages/EventPage'
import JoinEvent from './pages/JoinEvent'

function App() {
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn && user) {
      api.post('/api/users/sync', {
        clerk_id: user.id,
        username: user.username || user.firstName || user.emailAddresses[0].emailAddress.split('@')[0],
        email: user.emailAddresses[0].emailAddress
      })
        .then(res => {
          // Store the database user id somewhere accessible
          console.log('Database user:', res.data)
        })
        .catch(err => console.error(err))
    }
  }, [isSignedIn, user])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - anyone can see these */}
        <Route path="/" element={<Home />} />
        <Route path="/join/:token" element={<JoinEvent />} />

        {/* Protected routes */}
        <Route path="/create" element={
          <>
            <Show when="signed-in">
              <CreateEvent />
            </Show>
            <Show when="signed-out">
              <Home />
            </Show>
          </>
        } />
        <Route path="/events/:id" element={
          <>
            <Show when="signed-in">
              <EventPage />
            </Show>
            <Show when="signed-out">
              <Home />
            </Show>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App