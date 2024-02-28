const CheckTeeTimeLock = (time, offset) => {
  let currentDate = new Date()
  let currentHours = currentDate.getUTCHours() + offset
  if (currentHours < 0) currentHours += 24
  const currentMins =  currentDate.getUTCMinutes()

  const timeSplit = time.split(' ')
  const teeTimeArr = timeSplit[0].split(':')
  let hoursOffset = 0
  if (timeSplit[1] === 'PM') hoursOffset = 12

  if (currentHours > Number(teeTimeArr[0]) + hoursOffset) return true
  else if (currentHours === Number(teeTimeArr[0]) + hoursOffset && currentMins > Number(teeTimeArr[1])) return true
  else return false
}

export default CheckTeeTimeLock