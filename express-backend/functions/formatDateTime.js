const formatDateTime = (date) => {
  const newDate = new Date(date)

  return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:00`
}

module.exports = formatDateTime