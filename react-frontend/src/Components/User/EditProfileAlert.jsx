import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const EditProfileAlert = ({ show, setShow, message }) => {

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>
    );
  }

}

export default EditProfileAlert