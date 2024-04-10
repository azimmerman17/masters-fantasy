import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import StaticImages from '../assets/Files/Images'

const NotFound = () => {
  const { Image404 } = StaticImages
  const { photo, credit } = Image404

  return (
    <Container fluid>
      <Row>
        <Image src={photo} alt='404 Image' className=' px-0 img-fluid' />
        <p className='label-small text-center'>
          Photo by <a href='https://unsplash.com/@andrewshelley?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Andrew Shelley</a> on <a href='https://unsplash.com/photos/brown-wooden-dock-on-lake-during-daytime-dyXifZBEJBk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'>Unsplash</a>
        </p>
      </Row>
      <Row>
        <h3 className='text-center'>That one found the water...</h3>
        <p className='text-center'>You've navigated to a page that does not exist</p>
        <p className='text-center'><a className='text-success' href='/'>Take a drop</a></p>
      </Row>


    </Container>
  )
}

export default NotFound