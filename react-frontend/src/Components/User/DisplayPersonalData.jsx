//  Displays data from the User and User_Data tables - contact information is hidden if not the current User
const DisplayPersonalData = ({ varible, label, hide, hidePersonalData }) => {
    if (hidePersonalData && hide) {
      return (
        <>
         <h5 className='text-center fw-light fst-italic'>Hidden</h5>
         <p className='label-small text-center'>{label}</p>
        </>
      )
    }
    else {  
      return (
        <>
          <h5 className='text-center'>{varible}</h5>
          <p className='label-small text-center'>{label}</p>
        </>
        )
    }
  }


export default DisplayPersonalData