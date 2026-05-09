import { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from '@clerk/react'
import api from '../api'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const { user, isSignedIn } = useUser()
  const [dbUser, setDbUser] = useState(null)

  useEffect(() => {
    if (isSignedIn && user) {
      api.post('/api/users/sync', {
        clerk_id: user.id,
        username: user.username || 
                  user.firstName || 
                  user.emailAddresses[0].emailAddress.split('@')[0],
        email: user.emailAddresses[0].emailAddress
      })
      .then(res => setDbUser(res.data))
      .catch(err => console.error(err))
    }
  }, [isSignedIn, user])

  return (
    <UserContext.Provider value={{ dbUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useDbUser() {
  return useContext(UserContext)
}