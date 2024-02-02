const RemoveValueArray = (array, value) => {
  let index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array
}

export default RemoveValueArray