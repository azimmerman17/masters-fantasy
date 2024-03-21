// context for tournament data from the Masters
import { useEffect, createContext, useState } from "react";


export const EventConfig = createContext()


const EventConfigProvider = ({ children }) => {
  const [eventConfig, setEventConfig] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://www.masters.com/en_US/json/gen/config_web.json')
      const data = await response.json()
      const { dataSettings, scoringData, cmsData } = data
      setEventConfig({
        dataSettings,
        scoringData,
        cmsData
      })
    }

    if (eventConfig === null) fetchData()

    let interval = setInterval(() => {
      fetchData() 
    }, 60 * 60 * 1000)  //refresh every hour

    return () => clearInterval(interval)

  }, [eventConfig])

  return (
    <EventConfig.Provider value={{ eventConfig, setEventConfig }}>
      {children}
    </EventConfig.Provider>
  )
}

export default EventConfigProvider