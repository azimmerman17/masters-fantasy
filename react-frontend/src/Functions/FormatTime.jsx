const FormatTime = (date) => {
  let hours = date.getHours()
  let mins = date.getMinutes()

  if (hours === 0) hours = 12
  else if (hours > 12) hours -= 12

  return `${hours}:${mins} ${date.getHours() < 12 ? 'AM' : 'PM'}`
}

export default FormatTime