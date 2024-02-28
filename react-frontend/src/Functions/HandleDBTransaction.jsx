const HandleDBTransaction = async (path, method, payload) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'mode': 'no-cors',
    },
    body: JSON.stringify(payload)
  }

  switch (method) {
    case 'GET':
      console.log('build get')
      break
    case 'POST':
      return await fetch(path, options)
      // return 'BUILD'
       //break
    case 'PUT':
      return await fetch(path, options)
      // break
    case 'DELETE':
      console.log('build delete')
      break
    default:
      console.log(`Build ${method}`)
  }
}

export default HandleDBTransaction