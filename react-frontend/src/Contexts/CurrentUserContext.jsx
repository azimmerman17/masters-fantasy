// context for the current user
import { useEffect, createContext, useState } from 'react';

export const CurrentUser = createContext()

const CurrentUserProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const getLoggedInUser = async () => {
      const options = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'user': currentUser
        },
      }

      let response = await fetch(BASE_URL + 'auth/profile', options)
      let user = await response.json()
      setCurrentUser(user)
    }
    getLoggedInUser()
  }, [])
  
  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </CurrentUser.Provider>
  )
}

export default CurrentUserProvider
