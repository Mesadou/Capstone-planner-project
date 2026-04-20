import axios from 'axios'
import api from '../api'

// then inside your component
api.get('/api/events/1').then(res => console.log(res.data))

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export default api