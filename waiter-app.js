module.exports = function (pool) {

  async function enterWaiter(name) {
        let waiter = await pool.query('SELECT * FROM waiters WHERE waiter = $1 ', [name])
        if (waiter.rowCount === 0) {
          await pool.query('INSERT into waiters (waiter) values($1)', [name])
        }
        let result = await pool.query('select * from waiters')
        return result.rows[0];
  }

  async function getDay() {
    let getDay = await pool.query('SELECT * FROM weekdays');
    return getDay.rows
  }

  async function getShift(name, day) {
    let waiter = await enterWaiter(name)
    
      for (let index = 0; index < day.length; index++) {
          let dayOfweek = day[index];
          console.log(dayOfweek);
          
          let dayId = await pool.query('SELECT id FROM weekdays WHERE day=$1',[dayOfweek]);
          console.log(dayId.rows);
          await pool.query('INSERT INTO shift (day_id, waiter_id) values($1, $2)', [dayId.rows[0].id, waiter.id]);
        }
        let shifts = await pool.query('select * from shift')
            return shifts.rows;
  }

  return {
    enterWaiter,
    getDay,
    getShift  }

}
