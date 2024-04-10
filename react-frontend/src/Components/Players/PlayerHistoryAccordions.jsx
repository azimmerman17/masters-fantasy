import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import { FaTrophy } from 'react-icons/fa6';

const PlayerHistoryAccordion = ({ pastMasters }) => {
  let fields = ['Year', 'Place', 'R1', 'R2', 'R3', 'R4', 'Total']


  const formatScore = (score, par) => {
    if (score == 0) return 'text-dark'
    if (par > score) return 'text-danger'
    if (par == score) return 'text-success'
    if (par < score) return 'text-dark'
  }

  const headers = fields.map(field => {
    return(
      <th className='text-center' key={`history-header-${field}`}>
        {field}
      </th>
    )
  })

  const rows = pastMasters.map(past => {
    const { year, position, r1, r2, r3, r4, total } = past

    let roundCount = 0
    if (r1 > 0) roundCount += 1
    if (r2 > 0) roundCount += 1
    if (r3 > 0) roundCount += 1
    if (r4 > 0) roundCount += 1


    const data = fields.map(field => {
      switch (field) {
        case 'Year':
            return <td key={`history-data-${field}-${year}`} className='text-center'>{year}</td>
          case 'Place':
            return <td key={`history-data-${field}-${year}`} className={`text-center ${position == 1 || position == 'T1' ? 'text-warning' : ''}`} >{position == 1 || position == 'T1' ? <FaTrophy /> : position }</td>
          case 'R1':
            return <td key={`history-data-${field}-${year}`} className={`text-center ${formatScore(r1, 72)}`}>{r1 == 0 ? '-' : r1}</td>          
          case 'R2':
            return <td key={`history-data-${field}-${year}`} className={`text-center ${formatScore(r2, 72)}`}>{r2 == 0 ? '-' : r2}</td>
          case 'R3':
            return <td key={`history-data-${field}-${year}`} className={`text-center ${formatScore(r3, 72)}`}>{r3 == 0 ? '-' : r3}</td>
          case 'R4':
            return <td key={`history-data-${field}-${year}`} className={`text-center ${formatScore(r4, 72)}`}>{r4 == 0 ? '-' : r4}</td>
          case 'Total':
            return <td key={`history-data-${field}-${year}`} className={`text-center ${formatScore(total, 72 * roundCount)}`}>{total}</td>
  }
    })

    return (
      <tr key={`history-year-${year}`}>
        {data}
      </tr>
    )
  })

  return (
    <Container fluid>
      <Accordion className='m-0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Previous Finishes</Accordion.Header>
          <Accordion.Body>
            <Table hover size='sm' >
              <thead>
                <tr>
                  {headers}
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>
    </Container>
  )
}

export default PlayerHistoryAccordion