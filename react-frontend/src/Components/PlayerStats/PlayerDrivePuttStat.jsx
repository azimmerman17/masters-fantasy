import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import GroupedBarChart from '../Charts/GroupedBarChart'

const PlayerDrivePuttStat = ({ statTop, statBottom, mode }) => {

  let total = null
  let round1 = null
  let round2 = null
  let round3 = null
  let round4 = null
  let labels = []

  const configueRound = (rnd) => {
    let roundStatTop = statTop.filter(r => r.round === rnd)[0]
    let roundStatBottom  = statBottom.filter(r => r.round === rnd)[0]
    
    return [roundStatTop.stat[0].data, roundStatBottom.stat[0].data ]
  }

  const configueDataSet = (set) => {
    let topData = set[0].filter(round => round.type === 'player')[0]['formatted-data']
    let bottomData = set[1].filter(round => round.type === 'player')[0]['formatted-data']

    if (mode === 'Putting') {
      bottomData = set[1].filter(round => round.type === 'player')[0]['three-putts']
    }

    return [Number(topData), Number(bottomData)]
  }

  for (let i = 0; i < statTop.length; i++) {
    if (i === 0) total = configueDataSet(configueRound('Total'))
    if (i === 1) {
      round1 = configueDataSet(configueRound('1'))
      labels.push('R1')
    }
    if (i === 2) {
      round2 = configueDataSet(configueRound('2'))
      labels.push('R2')
    }
    if (i === 3) {
      round3 = configueDataSet(configueRound('3'))
      labels.push('R3')
    }
    if (i === 4) {
      round4 = configueDataSet(configueRound('4'))
      labels.push('R4')
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
          <Row className='m-2'>
            <h6 className='text-center text-success'>Round Summary</h6>
          </Row>
          <Row>
            <Col style={{maxWidth: '400px'}} className='m-auto' >
              <GroupedBarChart dataSet={configureRoundDataset(round1, round2, round3, round4)} label={labels} topLabel={mode === 'Putting' ? 'Putting Average' : 'Driving Distance'} bottomLabel={mode === 'Putting' ? '3 Putts' : 'Longest Drive'}  />
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <Row className='m-2'>
            <h6 className='text-center text-success'>Tournament Summary</h6>
          </Row>
          <Row>
            <Col style={{maxWidth: '400px'}} className='m-auto' >
              <GroupedBarChart dataSet={[total]} label ={['Total']} topLabel={mode === 'Putting' ? 'Putting Average' : 'Driving Distance'} bottomLabel={mode === 'Putting' ? '3 Putts' : 'Longest Drive'}  />
            </Col>
          </Row>
        </Col>
        {mode === 'Putting' ? null : <p className='text-center mb-0 mt-2'>{statTop[0]['stat'][0]['info-text']}</p>}
      </Row>
    </Container>
  )





  
}

export default PlayerDrivePuttStat