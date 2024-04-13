const pool = require('../models/db')

//  Derive the date
const year = (new Date().getFullYear())

const updateSeqNum = async () => {
  // get the scores
  const fetchQuery = `SELECT A.user_name,
      B.holes_completed,
      B.seq_num,
      B.holes_display,
      B.display_round,
      (B.round1 + B.round2 + B.round3 + B.round4) as "total",
      B.round1,
      B.round2,
      B.round3,
      B.round4,      
      (B.round1_aggr + B.round2_aggr + B.round3_aggr + B.round4_aggr) as "total_aggr",
      B.round1_aggr,
      B.round2_aggr, 
      B.round3_aggr,
      B.round4_aggr,
      A.user_id
    FROM public."Users" A, public."Fantasy_Scoring" B
    WHERE A.user_id = B.user_id
      AND year = ${year}
      AND A.user_name <>  'azimmerman17'
    ORDER BY 6, 2 desc, 10, 9, 8, 7, 11 asc, 15 asc, 14 asc, 13 asc, 12 asc;`
    
  // set global seqNum vars and 
  let lastSeq
  let lastScore

  try {
    const response = await pool.query(fetchQuery)
    
    if (response.error) {
      updateScoresFile.process_active = 0
      return response.error
    } else if (response.rows > 1) {
      updateScoresFile.process_active = 0
      console.log('no players - quit')
      return 'no players - quit'
    } else {
      const { rows } = response 
      // For each record on public."Fanstay_Scoring" - update seqnum
      rows.forEach(async (row, i) => {
        const { user_id, total } = row
        let seqNum
        // if score is equal to previous - copy
        if (total === lastScore) {
          seqNum = lastSeq
        }
        // if score is equal to next - T${i+1} - update globals
        // cannot check on last record
        else if (i < rows.length - 1) {
          if (total === rows[i + 1]['total']) {

            seqNum = `T${i+1}`
            lastSeq = seqNum
            lastScore = total
          }  else {
            seqNum = `${i+1}`
            lastSeq = seqNum
            lastScore = total 
          }

        }
        // if score is unique - i+1 - update globals
        else {
          seqNum = `${i+1}`
          lastSeq = seqNum
          lastScore = total 
        }

        // update the scoring record
        let updateQuery = `UPDATE public."Fantasy_Scoring" 
          SET updated_at = NOW(),
            seq_num = '${seqNum}'
          WHERE year = ${year}
            AND user_id = '${user_id}'`

        await pool.query(updateQuery)
      })
    }
  } catch (error) {
    console.error(error)
    return error
  }
}

module.exports = updateSeqNum