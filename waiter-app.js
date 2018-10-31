module.exports = function (pool) {

  async function enterWaiter(name) {
      console.log(name)
        let waiter = await pool.query('SELECT * FROM waiters WHERE waiter = $1 ', [name])
        console.log(waiter.rowCount)
        if (waiter.rowCount === 0) {
          await pool.query('INSERT into waiters (waiter) values($1)', [name])
          console.log('done')
        }
        let result = await pool.query('select * from waiters')
        return result.rows
  }

  async function getDay() {
    let getDay = await pool.query('SELECT * FROM weekdays');
    return getDay.rows
  }

  async function getShift(name, dayOftheweek) {

      

      for (let index = 0; index < dayOftheweek.length; index++) {
          let dayOfweek = dayOfthewetek[index];
          let dayId = await pool.query('SELECT id FROM weekdays WHERE day=$1',[dayOfweek])

          await pool.query('INSERT into shift (day_id , waiter_id)  values($1, $2)', [waiter.rows[0].id, dayId.rows[0].id ]);
        }
        let shifts = await pool.query('select * from shift')
            return shifts.rows;
  }

  return {
    enterWaiter,
    getDay,
    getShift  }

}
