const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')

const prisma = new PrismaClient()
const app = express()
const PORT = 3000

//Middleware
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Game night server is running!' })
})

// Get all events
app.get('/api/events', async (req, res) => {
  const events = await prisma.event.findMany()
  res.json(events)
})

// Get all users
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// Create a new user
app.post('/api/users', async (req, res) => {
  const { username, email, password_hash } = req.body

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password_hash,
    }
  })

  res.json(user)
})

// Create a new event
app.post('/api/events', async (req, res) => {
  const { title, body, host_user_id } = req.body

  const event = await prisma.event.create({
    data: {
      title,
      body,
      host_user_id,
      invite_token: Math.random().toString(36).substring(2, 10)
    }
  })

  res.json(event)
})

// Get a single event by id
app.get('/api/events/:id', async (req, res) => {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(req.params.id) }
  })

  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }

  res.json(event)
})


//Get suggestions 
app.post('/api/events/:id/suggestions', async (req, res) => {
  // Step 1 - get event id from URL
  const eventId = parseInt(req.params.id)

  // Step 2 - get suggestion data from request body
  const { title, type, players, user_id } = req.body

  // Step 3 - create new suggestion in database
  const suggestion = await prisma.gameSuggestion.create({
    data: {
      title,
      type,
      players,
      event_id: eventId,
      user_id: parseInt(user_id)
    }
  })

  // Step 4 - send back created suggestion
  res.json(suggestion)
})

app.get('/api/events/:id/suggestions', async (req, res) => {
  // Step 1 - get the id from the URL
  const eventId = parseInt(req.params.id)

  // Step 2 - find suggestions in the database
  const suggestions = await prisma.gameSuggestion.findMany({
    where: { event_id: eventId }
  })

  // Step 3 - send back the data
  res.json(suggestions)
})


//Vote Route
app.post('/api/suggestions/:id/vote', async (req, res) => {
  // Which suggestion is being voted on? (from URL)
  const suggestionId = parseInt(req.params.id)

  // Who is voting and which direction? (from request body)
  const { user_id, value } = req.body

  // Has this user already voted on this suggestion?
  const existing = await prisma.vote.findFirst({
    where: {
      user_id: parseInt(user_id),
      game_suggestion_id: suggestionId
    }
  })

  if (existing) {
    // They voted before - just update their vote direction
    const updated = await prisma.vote.update({
      where: { id: existing.id },
      data: { value: parseInt(value) }
    })
    res.json(updated)
  } else {
    // First time voting - create a new vote row
    const vote = await prisma.vote.create({
      data: {
        user_id: parseInt(user_id),
        game_suggestion_id: suggestionId,
        value: parseInt(value)
      }
    })
    res.json(vote)
  }
})

// Get all availability for an event grouped by time slot
app.get('/api/events/:id/availability/summary', async (req, res) => {
  const eventId = parseInt(req.params.id)

  const slots = await prisma.availability.groupBy({
    by: ['day_of_week', 'time_slot'],
    where: {
      event_id: eventId,
      is_available: true
    },
    _count: {
      user_id: true
    },
    orderBy: {
      _count: {
        user_id: 'desc'
      }
    }
  })

  res.json(slots)
})

// Toggle a single availability slot
app.post('/api/events/:id/availability', async (req, res) => {
  const eventId = parseInt(req.params.id)
  const { user_id, day_of_week, time_slot, is_available } = req.body

  // Same upsert pattern as votes
  const existing = await prisma.availability.findFirst({
    where: {
      user_id: parseInt(user_id),
      event_id: eventId,
      day_of_week,
      time_slot
    }
  })

  if (existing) {
    const updated = await prisma.availability.update({
      where: { id: existing.id },
      data: { is_available }
    })
    res.json(updated)
  } else {
    const slot = await prisma.availability.create({
      data: {
        user_id: parseInt(user_id),
        event_id: eventId,
        day_of_week,
        time_slot,
        is_available
      }
    })
    res.json(slot)
  }
})

// Join an event
app.post('/api/events/:id/join', async (req, res) => {
  const eventId = parseInt(req.params.id)
  const { user_id } = req.body

  // Check if already a member
  const existing = await prisma.eventMember.findFirst({
    where: {
      event_id: eventId,
      user_id: parseInt(user_id)
    }
  })

  if (existing) {
    return res.status(400).json({ message: 'Already a member' })
  }

  const member = await prisma.eventMember.create({
    data: {
      event_id: eventId,
      user_id: parseInt(user_id),
      status: 'joined'
    }
  })

  res.json(member)
})

// Get all members of an event
app.get('/api/events/:id/members', async (req, res) => {
  const eventId = parseInt(req.params.id)

  const members = await prisma.eventMember.findMany({
    where: { event_id: eventId },
    include: { user: true }
  })

  res.json(members)
}) 

// Sync Clerk user with database
app.post('/api/users/sync', async (req, res) => {
  const { clerk_id, username, email } = req.body

  // Check if user already exists
  const existing = await prisma.user.findUnique({
    where: { clerk_id }
  })

  if (existing) {
    return res.json(existing)
  }

  // Create new user if they don't exist
  const user = await prisma.user.create({
    data: {
      clerk_id,
      username,
      email,
      password_hash: null
    }
  })

  res.json(user)
})

// Events the user is hosting
app.get('/api/users/:id/events', async (req, res) => {
  const userId = parseInt(req.params.id)

  const events = await prisma.event.findMany({
    where: { host_user_id: userId },
    orderBy: { created_at: 'desc' }
  })

  res.json(events)
})

// Events the user has joined as a member
app.get('/api/users/:id/joined-events', async (req, res) => {
  const userId = parseInt(req.params.id)

  const memberships = await prisma.eventMember.findMany({
    where: { user_id: userId },
    include: {
      event: {
        include: { host: true }
      }
    }
  })

  const events = memberships.map(m => m.event)
  res.json(events)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})