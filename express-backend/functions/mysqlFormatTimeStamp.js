
// helper funtion to transfer POSTGRES Timestamps to mySQl - needed format   'YYYY-MM-DD HH:MM:SS'
const mysqlFormatTimeStamp = (pgTimestamp) => {
  let date = new Date(pgTimestamp)

  const formatDigit = (int) => {
    if (int < 10) return `0${int}`
    else return int
  }


  // Format Month
  let month = formatDigit(date.getMonth() + 1)

  // Format Date
  let day = formatDigit(date.getDate())

  // Format Hours
  let hours = formatDigit(date.getHours())

  // Format Minutes
  let mins = formatDigit(date.getMinutes())
  
  // Format Seconds
  let secs = formatDigit(date.getSeconds())

  return `${date.getFullYear()}-${month}-${day} ${hours}:${mins}:${secs}`
}

module.exports = mysqlFormatTimeStamp