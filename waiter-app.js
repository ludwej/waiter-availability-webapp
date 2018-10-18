module.exports = function () {

    function enterWaiter(waiter) {
        let waiters = waiter.toUpperCase()
        let waterE = await pool.query('SELECT * FROM waiters WHERE user_name = $1 ', [waiters])
        if (waterE.rowCount === 0) {
            await pool.query('INSERT into waiters (waiter) values($1, $2)', [waterE, 0])
          }
    }

    function enterShift(shift){

    }






    return {
        enterWaiter,
        enterShift
    }






}