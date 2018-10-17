module.exports = function (pool) {


  async function regNum(regN) {
    let tag = regN.substr(0, 3).trim();
    let town = await pool.query('SELECT id FROM towns WHERE initial = $1', [tag])
    if (town.rowCount > 0) {
      let duplicate = await pool.query('SELECT id FROM registrationNumbers WHERE registrationNo=$1', [regN])
      if (duplicate.rowCount === 1) {
        return 'REGISTRATION ALREADY EXISTS!';
      } 
      await pool.query('INSERT into registrationNumbers (registrationNo, town_id)  values($1, $2)', [regN, town.rows[0].id]);
      return "REGISTRATION SUCCESSFULLY ADDED!"
    }
    return 'PLEASE ENTER A REGISTRATION PLATE!';
  }



  async function Towns() {
    let getTown = await pool.query('SELECT * FROM registrationNumbers');

    return getTown.rows;
  }

  async function filter(regN) {
    if (regN === 'ALL'){
      let getTown = await pool.query('SELECT * FROM registrationNumbers');

    return getTown.rows;
    }

   else {
     let registration = regN.substr(0, 3).trim();
    let filterReg = await pool.query('SELECT id FROM towns WHERE initial = $1 ', [registration])
    // console.log(filterReg.rows[0].id);
    let filtering = await pool.query('select registrationNo from registrationNumbers where town_id = $1 ', [filterReg.rows[0].id])
    return filtering.rows
  }
  }


    
  
  return {
    Towns,
    regNum,
    filter
  }
}