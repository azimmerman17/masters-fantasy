import { useContext } from "react"

import { CurrentUser } from "../Contexts/CurrentUserContext"

const CreateUpdateLineup = () => {
  const {currentUser, setCurrentUser} = useContext(CurrentUser)

  if (currentUser) console.log(currentUser)
  
}

export default CreateUpdateLineup