// context for the current user's roster
import { useEffect, createContext, useState, useContext } from 'react';

import { CurrentUser } from './CurrentUserContext';

export const UserRoster = createContext()

const UserRosterProvider = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUser)
  const [userRoster, setUserRoster] = useState(null)

  useEffect(() => {
    if (currentUser) {
      const { roster, user_id } = currentUser
      setUserRoster({
        roster,
        user_id
      })
    }
    
  }, [currentUser])

  return (
    <UserRoster.Provider value={{ userRoster, setUserRoster }}>
        {children}
    </UserRoster.Provider>
  )
}

export default UserRosterProvider
