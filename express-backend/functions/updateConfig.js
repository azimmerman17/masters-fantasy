const { mysqlPool, pgPool } = require('../models/db')


const updateConfig = async (rnd, tourny_actve, rnd_actve, rnd1_lck, rnd2_lck, rnd3_lck, rnd4_lck, posted, year) => {
  const query = `UPDATE \`major-fantasy-golf\`.Fantasy_Config
  SET updated_at = NOW()
  ${rnd ? `, rnd = ${rnd}` : ''}
  ${rnd1_lck ? `, rnd1_lck = ${rnd1_lck}` : ''}
  ${rnd2_lck ? `, rnd2_lck = ${rnd2_lck}` : ''}
  ${rnd3_lck ? `, rnd3_lck = ${rnd4_lck}` : ''}
  ${rnd4_lck ? `, rnd4_lck = ${rnd4_lck}` : ''}
  ${tourny_actve ? `, tourny_actve = '${tourny_actve}'` : ''}
  ${rnd_actve ? `, rnd_actve = '${rnd_actve}'` : ''}
  ${posted ? `, posted = ${posted}` : ''}
  WHERE year = ${year};`



  try {
    const [response, metadata] = await mysqlPool.query(query)
    if (response.error) return {status: response.error , msg: 'Error - Config update Failed'}
    else return {status: 'Success' , msg: 'Config Updated'}
  } catch (error) {
    console.error(error)
    return {status: error , msg: 'Error - Config update Failed'}
  }


  


}
module.exports = updateConfig