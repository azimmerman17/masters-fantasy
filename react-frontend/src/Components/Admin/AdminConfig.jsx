import { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { FantasyTournamentConfig } from '../../Contexts/FantasyTournamentConfig'
import Loading from '../Loading'
import HandleDBTransaction from '../../Functions/HandleDBTransaction';


const AdminConfig = () => {
  const {fantasyTournamentConfig, setFantasyTournamentConfig} = useContext(FantasyTournamentConfig)
  let [edit, setEdit] = useState(false)

  console.log(fantasyTournamentConfig.year)
  
  let keys = []
  for (const [key, value] of Object.entries(fantasyTournamentConfig)) {
    keys.push(key)
  }
  const showView = keys.map(key => {

    return (
      <Form.Group className='my-2' key={`Config-Admin-${key}`}>
         <Form.Label>{key}:</Form.Label>
         <Form.Control type="text" defaultValue={fantasyTournamentConfig[key]} onChange={e => setFantasyTournamentConfig({...fantasyTournamentConfig, [key]: e.target.value })} disabled={!edit || key === 'year'}/>
         <Form.Text className="text-muted">
           <small>Current Value: {fantasyTournamentConfig[key]}</small>
        </Form.Text>
      </Form.Group>
    )
  })
    
  const handleClick = async (e) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL

    if (edit) {
      let path = BASE_URL + 'admin/' + fantasyTournamentConfig.year
      let payload = fantasyTournamentConfig
      let method = 'PUT'

      let message = await HandleDBTransaction(path, 'PUT', payload)
      console.log(path)
    }
    setEdit(!edit)
  }


  if (fantasyTournamentConfig.tourny_active) {
    return (
      <Container>
        <Form>
          {showView}
          <Button variant={edit ? 'primary' : 'warning'} onClick={e => handleClick(e)}>
            {edit ? 'Submit' : 'Edit'}
          </Button>
        </Form>
      </Container>
    )
  } else return <Loading />
}

export default AdminConfig