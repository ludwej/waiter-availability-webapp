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
       let waiterId = await pool.query('INSERT into shift (waiter_id)  values($1)', [waiter.rows[0].id]);
       console.log(waiterId);
       
      
      
    //   let day = await pool.query('SELECT id FROM weekdays')
    //   console.log(day.rows);
      
         
    //   return day.rows

    }

    return {
        enterWaiter,
        getDay,
        getShift
    }

}