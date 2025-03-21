import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const PlayerBio = ({ bio }) => {
  const { player } = bio
  const { age, amateur, countryCode, countryName, height, swing, turnedPro, weight, wins, first_name, last_name } = player
 
  // create data arreys
  const data = [age, countryName, height, weight,  swing, turnedPro, wins]
  const labels = ['Age', 'Country', 'Height', 'Weight', 'Swings', 'Turned Pro', 'PGA Tour Wins']

  const updateData = (label) => {
    let index = labels.indexOf(label)
    switch (label) {
      case 'Country':
        data[index] = countryCode
        break
      case 'Turned Pro':
        data[index] = 'Amateur'
        break
      }
    }
    

    if (window.innerWidth < 775) updateData('Country')
  if (amateur) updateData('Turned Pro')

  data.forEach((point, i) => {
    if (point === '') data[i] = 'N/A'
  })

  const bioData = data.map((dataPoint , i) => {
    return (
      <Col key={`bio-data-${i}`} xs={6}  sm={4} md={3} className='my-2'>
        <h6 className='fs-3 text-success text-center'>{dataPoint}</h6>
        <p className='m-0 label-small text-center'>{labels[i]}</p>
      </Col>
    )
  })

  return (
    <Container fluid>
      <h5 className={`text-success ${window.innerWidth < 775 ? 'text-end' : 'text-start'}`}>{first_name} {last_name} Bio</h5>
      <Row>
          {bioData}
      </Row> 
    </Container>
  )
}

export default PlayerBio