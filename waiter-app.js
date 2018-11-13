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
      let dayId = dayIdResults.rows[0].id;
      
      await pool.query('INSERT INTO shift (day_id, waiter_id) values($1, $2)', [dayId, idWaiter]);
    }

    let joinTables = await pool.query('SELECT waiters.waiter, weekdays.day FROM waiters INNER JOIN shift ON waiters.id = shift.waiter_id INNER JOIN weekdays ON shift.day_id = weekdays.id')
     
      
        return joinTables.rows
  }

  async function admin(name){
  
  let join = await pool.query('select * from weekdays left join shift on shift.day_id = weekdays.id left join waiters on waiters.id= waiter_id where waiter=$1;', [waiter.id])
        // console.log(join);
  return join.rows
  }
    //   SELECT character.name, actor.name FROM character INNER JOIN
// character_actor ON character.id = character_actor.character_id INNER JOIN
// actor ON character_actor.actor_id=actor.id;

  return {
    enterWaiter,
    getDay,
    getShift,
    admin
  }

}
