module.exports = function(pool) {

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

    async function getShift(){
      let waiter = await pool.query('SELECT id FROM waiters');
      let day = await pool.query('select day from weekdays where day_id = $1 ', [waiter])    
      return day.rows

    }

    return {
        enterWaiter,
        getDay,
        getShift
    }

}