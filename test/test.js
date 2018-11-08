let express = require('express')
let assert = require('assert')
//Connection
const pg = require('pg')
const Pool = pg.Pool
let useSSL = false
let local = process.env.LOCAL || false
if (process.env.DATABASE_URL && !local) {
  useSSL = true
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex-admin:code321@localhost:5432/waiter_availability'
const pool = new Pool({
  connectionString,
  ssl: useSSL
})

let waitersF= require('../waiter-app.js')
let waitersInst= waitersF(pool)

describe('Test Waiter Fucntions', function() {
    it('Should add a waiter to the database and return the name', async function() {
       let name = await waitersInst.enterWaiter('Ludwe')
       console.log(name)
       assert.equal(name[0].waiter, 'Ludwe')
    })

//     after(function(){
//    await pool.close()
//     } ) 
})