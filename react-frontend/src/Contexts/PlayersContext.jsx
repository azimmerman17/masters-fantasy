// context for the Tournament Participants
import { useEffect, createContext, useContext, useState } from "react";

import { EventConfig } from './EventConfig'
import MASTERS_URL from "../assets/Files/MASTERS_URL";

export const PlayersContext = createContext()

const PlayersContextProvider = ({ children }) => {
  const { eventConfig, setEventConfig } = useContext(EventConfig)

  const [playersContext, setPlayersContext] = useState(null)

  useEffect(() => {
    const fetchData = async (playerList) => {
      try {
        const response = await fetch(MASTERS_URL + playerList)
        const data = await response.json()
        setPlayersContext(data)
      } catch (error) {
        console.log('error')
        setPlayersContext('No Player Data Avalible')
      }
    }
    
    if (eventConfig && playersContext === null) {
      const { scoringData, cmsData } = eventConfig

      // first try the player endpoint from scoing object
      if (scoringData.playerList) fetchData(scoringData.playerList)
      else if (cmsData.playerList) fetchData(cmsData.playerList)
      else  setPlayersContext('No Player Data Avalible')
    }
  }, [playersContext, eventConfig])


  return (
    <PlayersContext.Provider value={{ playersContext, setPlayersContext }}>
      {children}
    </PlayersContext.Provider>
  )
}

export default PlayersContextProvider