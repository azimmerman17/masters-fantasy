import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import DoughnutChart from "../Charts/DoughnutChart"
import PolarAreaChart from "../Charts/PolarAreaChart"

const PlayersGreensHitStat = ({ greens }) => {
  const DoughnutLabels = ['Greens Hit', 'Greens Missed']
  const DoughnutColors = ['#198754', '#adb5bd']
  const polarColors = ['#ffc10770', '#0d6efd80', '#dc354580', '#19875480']
  let polarLabels = []

  let total = null
  let round1 = null
  let round2 = null
  let round3 = null
  let round4 = null

  const configueRound = (rnd) => {
    let roundStat = greens.filter(r => r.round === rnd)[0]
    
    return roundStat.stat[0].data
  }
  
  const configueDataSet = (set) => {
    let hit = set.filter(round => round.type === 'player')[0]['successful']
    let attempts =  set.filter(round => round.type === 'player')[0]['total-effort']
    let formattedData = set.filter(round => round.type === 'player')[0]['formatted-data']
  
    return [hit, attempts - hit, formattedData]
  }

  for (let i = 0; i < greens.length; i++) {
    if (i === 0) total = configueDataSet(configueRound('Total'))
    if (i === 1) {
      round1 = configueDataSet(configueRound('1'))
      polarLabels.push('R1')
    }
    if (i === 2) {
      round2 = configueDataSet(configueRound('2'))
      polarLabels.push('R2')
    }
    if (i === 3) {
      round3 = configueDataSet(configueRound('3'))
      polarLabels.push('R3')
    }
    if (i === 4) {
      round4 = configueDataSet(configueRound('4'))
      polarLabels.push('R4')
    }
  }

  const configureRoundDataset = (r1, r2, r3, r4) => {
    let dataSet =[]
    if (r1) dataSet.push(r1)
    if (r2) dataSet.push(r2)
    if (r3) dataSet.push(r3)
    if (r4) dataSet.push(r4)

    return dataSet
  }

  return (
    <Container fluid >
            <Row className='my-2'>
        <Col sm={12} md={6}>
          <Row>
            <h6 className="text-center text-success">Round Summary</h6>
          </Row>
          <Row>
            <Col style={{maxWidth: '400px'}} className='m-auto' >
              <PolarAreaChart labels={polarLabels} backgroundColor={polarColors} dataSet={configureRoundDataset(round1[0], round2[0], round3[0], round4[0])} max={18}/>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <Row className='m-2'>
            <h6 className="text-center text-success">Tournament Summary</h6>
          </Row>
          <Row>
            <Col style={{maxWidth: '400px'}} className='m-auto' >
              <DoughnutChart labels={DoughnutLabels} backgroundColor={DoughnutColors} dataSet={[total[0], total[1]]} />
              <p className={`mb-0 mt-2 ${window.innerWidth > 775 ? '' : 'label-small'} text-center`}>Total Greens in Regulation: {total[0]} / {Number(total[0]) + Number(total[1])} ({total[2]})</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default PlayersGreensHitStat