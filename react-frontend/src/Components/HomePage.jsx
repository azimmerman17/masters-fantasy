import { useContext } from "react" 

import { CurrentUser } from "../Contexts/CurrentUserContext"
import Login from "./Login"
import UserProfile from "./User/UserProfile"

const  HomePage = () => {
  const {currentUser, setCurrentUser} = useContext(CurrentUser)

  if (!currentUser) return <Login />
  else return <UserProfile />
}

export default HomePage