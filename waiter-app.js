module.exports = function (pool) {

  async function enterWaiter(name) {
    let waiter = await pool.query('SELECT * FROM waiters WHERE waiter = $1 ', [name])
    if (waiter.rowCount === 0) {
      await pool.query('INSERT into waiters (waiter) values($1)', [name])
    }
    if (waiter.rowCount === 1){
      return 'waiter already selected their days'
    }
      
    let result = await pool.query('select * from waiters')
    return result.rows[0];
  }

  async function getDay() {
    let getDay = await pool.query('SELECT day FROM weekdays');
    return getDay.rows
  }

  async function getShift(name, day) {
    let waiterId = await pool.query('SELECT id from waiters WHERE waiter=$1', [name])
    let idWaiter = waiterId.rows[0].id
    for (let index = 0; index < day.length; index++) {
      let dayOfweek = day[index];
      let dayIdResults = await pool.query('SELECT id FROM weekdays WHERE day=$1', [dayOfweek]);
      let dayId = dayIdResults;
      await pool.query('INSERT INTO shift (day_id, waiter_id) values($1, $2)', [dayId.rows[0].id, idWaiter]);
    }

    let joinTables = await pool.query('SELECT waiters.waiter, weekdays.day FROM waiters INNER JOIN shift ON waiters.id = shift.waiter_id INNER JOIN weekdays ON shift.day_id = weekdays.id')
        return joinTables.rows
  }

  async function admin(){
  let join = await pool.query('select day_id,day,waiter  from weekdays join shift on weekdays.id = shift.day_id  join waiters on shift.waiter_id= waiters.id;')
  console.log(join.rows);
  
  return join.rows
  }

  return {
    enterWaiter,
    getDay,
    getShift,
    admin
  }

}
