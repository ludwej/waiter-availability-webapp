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
    return getDay.rows[0]
  }

  async function getShift(name, day) {
    let waiterId = await pool.query('SELECT id from waiters WHERE waiter=$1', [name])
    let idWaiter = waiterId.rows[0].id

    for (let index = 0; index < day.length; index++) {
      let dayOfweek = day[index];
      let dayIdResults = await pool.query('SELECT id FROM weekdays WHERE day=$1', [dayOfweek]);
      let dayId = dayIdResults.rows[0].id;
      await pool.query('INSERT INTO shift (day_id, waiter_id) values($1, $2)', [dayId, idWaiter]);
    }
  }

  return {
    enterWaiter,
    getDay,
    getShift
  }

}
