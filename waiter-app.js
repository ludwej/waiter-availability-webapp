module.exports = function(pool) {

    async function enterWaiter(name) {
        let waiter = name;
        if (waiter !== ''){
            let enteredWaiter = await pool.query('SELECT waiter FROM waiters WHERE waiter = $1 ', [waiter])
            
            
            if (enteredWaiter.rowCount === 0) {
              await pool.query('INSERT into waiters (waiter) values($1)', [waiter])
             
            }
            if (waiter === ''){
                return 'PLEASE ENTER YOUR NAME'
            }

        }
       
    }

    async function enterShift(shift) {


    }






    return {
        enterWaiter,
        enterShift
    }






}