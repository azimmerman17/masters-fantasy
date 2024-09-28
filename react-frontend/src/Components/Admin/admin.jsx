import Accordion from 'react-bootstrap/Accordion';
import AdminConfig from './AdminConfig';

const Admin = () => {

  return (
    <>
    <h3 className='m-3 text-center'>Admin Pages</h3>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Event Configuration</Accordion.Header>
        <Accordion.Body>
          <AdminConfig />
        </Accordion.Body>
      </Accordion.Item>
     </Accordion>
    </>
  )
}

export default Admin