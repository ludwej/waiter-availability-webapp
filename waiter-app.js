module.exports = function (pool) {

  async function enterWaiter(name) {
    let waiter = name;
    let enteredWaiter = await pool.query('SELECT waiter FROM waiters WHERE waiter = $1 ', [waiter])
    if (enteredWaiter.rowCount === 0) {
      await pool.query('INSERT into waiters (waiter) values($1)', [waiter])
    }

  }

  async function getDay() {
    let getDay = await pool.query('SELECT * FROM weekdays');
    return getDay.rows
  }

  async function getShift(waiters, dayOftheweek) {

      let waiter = await enterWaiter(waiters);

      for (let index = 0; index < dayOftheweek.length; index++) {
          let dayOfweek = dayOftheweek[index];
          let dayId = await pool.query('SELECT id FROM weekdays WHERE day=$1',[dayOfweek])

          await pool.query('INSERT into shift (day_id , waiter_id)  values($1, $2)', [waiter.rows[0].id, dayId.rows[0].id ]);
        }
        let shifts = await pool.query('select * from shift')
            return shifts.rows;
  }

  return {
    enterWaiter,
    getDay,
    getShift
  }

}
