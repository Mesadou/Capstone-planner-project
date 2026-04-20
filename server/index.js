const express = require('express')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const PORT = 3000

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
      password_hash
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})