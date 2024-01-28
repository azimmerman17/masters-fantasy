// context for the Tournament Participants
import { useEffect, createContext, useContext, useState } from "react";

import { EventConfig } from './EventConfig'

export const PlayersContext = createContext()

const PlayersContextProvider = ({ children }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)

  const [playersContext, setPlayersContext] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      console.log(eventConfig)
      const { scoringData } = eventConfig
      const { playerList } = scoringData
      const response = await fetch('https://www.masters.com' + playerList)
      const data = await response.json()
      setPlayersContext(data)
    }
    
    if (eventConfig && playersContext === null) fetchData()

  }, [playersContext, eventConfig])

  return (
    <PlayersContext.Provider value={{ playersContext, setPlayersContext }}>
      {children}
    </PlayersContext.Provider>
  )
}

export default PlayersContextProvider