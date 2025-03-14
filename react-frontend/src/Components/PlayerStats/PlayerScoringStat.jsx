import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import DoughnutChart1 from '../charts/DoughnutChart1'
import StackedHorizontalChart from '../Charts/StackedHorizontalChart'

const PlayerScoringStat = ({ eagles, birdies, pars, bogeys, doubleBogeys }) => {
  const labels = ['Eagles', 'Birdies', 'Pars', 'Bogeys', 'Dbl Bogeys+']
  const colors = ['#0a3622', '#198754', '#d1e7dd', '#adb5bd', '#6c757d']

  const configueRound = (roundNum) => {
    let roundEagles = eagles.filter(item => item.round === roundNum)[0]
    let roundBirdies = birdies.filter(item => item.round === roundNum)[0]
    let roundPars = pars.filter(item => item.round === roundNum)[0]
    let roundBogeys = bogeys.filter(item => item.round === roundNum)[0]
    let roundDblBogeys = doubleBogeys.filter(item => item.round === roundNum)[0]

    return {
      roundEagles: roundEagles.stat[0].data,
      roundBirdies: roundBirdies.stat[0].data,
      roundPars: roundPars.stat[0].data,
      roundBogeys: roundBogeys.stat[0].data,
      roundDblBogeys: roundDblBogeys.stat[0].data
    }
  }

  let total = null
  let round1 = null
  let round2 = null
  let round3 = null
  let round4 = null
  let yLabels = []

  for (let i = 0; i < eagles.length; i++) {
    if (i === 0) total = configueRound('Total')
    if (i === 1) {
      round1 = configueRound('1')
      yLabels.push('R1')
    }
    if (i === 2) {
      round2 = configueRound('2')
      yLabels.push('R2')
    }
    if (i === 3) {
      round3 = configueRound('3')
      yLabels.push('R3')
    }
    if (i === 4) {
      round4 = configueRound('4')
      yLabels.push('R4')
    }
  }

  const configueDataSet = (set) => {
    const { roundEagles, roundBirdies, roundPars, roundBogeys, roundDblBogeys } = set
    let dataSet = [
      roundEagles.filter(round => round.type === 'player')[0]['formatted-data'],
      roundBirdies.filter(round => round.type === 'player')[0]['formatted-data'],
      roundPars.filter(round => round.type === 'player')[0]['formatted-data'],
      roundBogeys.filter(round => round.type === 'player')[0]['formatted-data'],
      roundDblBogeys.filter(round => round.type === 'player')[0]['formatted-data'],
    ]
    return dataSet
  }

  const configureRoundDataset = (r1, r2, r3, r4) => {
    let dataSet =[]
    if (r1) dataSet.push(configueDataSet(r1))
    if (r2) dataSet.push(configueDataSet(r2))
    if (r3) dataSet.push(configueDataSet(r3))
    if (r4) dataSet.push(configueDataSet(r4))

    return dataSet
  }

  return (
    <Container fluid >
      <Row className='my-2'>
        <Col sm={12} md={6}> 
          <Row className='m-2'>
            <h6 className='text-center text-success'>Round Summary</h6>
          </Row>
          <Row>
            <Col className='m-auto' >
              <StackedHorizontalChart yLabels={yLabels} xLabels={labels} backgroundColor={colors} dataSet={configureRoundDataset(round1, round2, round3, round4)} xMax={18}/>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <Row className='m-2'>
            <h6 className='text-center text-success'>Tournament Summary</h6>
          </Row>
          <Row>
            <Col style={{maxWidth: '400px'}} className='m-auto' >
              <DoughnutChart1 labels={labels} backgroundColor={colors} dataSet={configueDataSet(total)} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default PlayerScoringStat