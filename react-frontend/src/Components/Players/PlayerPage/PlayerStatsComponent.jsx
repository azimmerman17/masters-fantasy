import Container from "react-bootstrap/Container"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PlayerStatsHeaders from "../../../assets/Files/PlayerStatsHeaders";
import PlayerScoringStat from "../../PlayerStats/PlayerScoringStat";


const PlayerStatsComponent = ({ stats }) => {
  const { round } = stats

  console.log(round)

  const buildArr = (text) => {

    let arr = []

    round.forEach(item => {
      const { stat, id } = item

      arr.push({
        round: id,
        stat: stat.filter(display => display.display_text === text)
      })
      
    })

    return arr
  }

  const selectTab = (header) => {
    switch (header) {
      case 'Scoring':
        let eagles = buildArr('EAGLES')
        let birdies = buildArr('BIRDIES')
        let pars = buildArr('PARS')
        let bogeys = buildArr('BOGEYS')
        let doubleBogeys = buildArr('DOUBLE BOGEYS')
        
        return <PlayerScoringStat eagles={eagles} birdies={birdies} pars={pars} bogeys={bogeys} doubleBogeys={doubleBogeys} />
      case 'Greens Hit':
        let greens = buildArr('GREENS HIT')
  
      case 'Fairways Hit':
        let fairways = buildArr('FAIRWAYS HIT')
    
      case 'Putting':
        let putting = buildArr('AVERAGE PUTTS')

      case 'Driving':
        let avgDrive = buildArr('AVERAGE DRIVING DISTANCE')
        let longDrive = buildArr('LONGEST DRIVE')

      case 'Sand Saves':
        let sand = buildArr('SAND SAVES')

    }
  }
  
  const statTabs = PlayerStatsHeaders.map((header, i) => {
    return (
      <Tab eventKey={header} title={header} key={`${header}-stat-${i}`} >
        {selectTab(header)}
      </Tab>
    )
  })

  return (
    <Container fluid className="m-0 p-0">
      <h5 className={`text-success ${window.innerWidth < 775 ? 'text-end' : 'text-start'}`}>Tournament Statistics</h5>
      <Tabs defaultActiveKey={PlayerStatsHeaders[0]} id="stats-tab-switcher">
        {statTabs}
      </Tabs>
    </Container>
  )
}

export default PlayerStatsComponent