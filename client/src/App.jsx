import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import Home from './pages/Home'
import CreateEvent from './pages/CreateEvent'
import EventPage from './pages/EventPage'
import JoinEvent from './pages/JoinEvent'

function App() {
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