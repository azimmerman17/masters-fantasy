const FormatTime = (date) => {
  let hours = date.getUTCHours()
  let mins = date.getMinutes()

  if (hours === 0) hours = 12
  else if (hours > 12) hours -= 12

  return `${hours}:${mins} ${date.getUTCHours() < 12 ? 'AM' : 'PM'}`
}

export default FormatTime