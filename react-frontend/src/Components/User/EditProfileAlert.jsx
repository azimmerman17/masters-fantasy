import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const EditProfileAlert = ({ show, setShow, message, status }) => {

  if (show) {
    return (
      <Alert variant={status} onClose={() => setShow(false)} dismissible>
        {message}
      </Alert>
    );
  }

}

export default EditProfileAlert