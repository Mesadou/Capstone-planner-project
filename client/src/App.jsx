import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateEvent from './pages/CreateEvent'
import EventPage from './pages/EventPage'
import JoinEvent from './pages/JoinEvent'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/join/:token" element={<JoinEvent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App