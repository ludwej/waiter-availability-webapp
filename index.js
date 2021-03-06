let express = require('express')
let app = express()
let flash = require('express-flash')
const session = require('express-session')

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

let waitersF= require('./waiter-app.js')
let waitersInst= waitersF(pool)

app.use(flash())

var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(session({
  secret: '<add a secret string here>',
  resave: false,
  saveUninitialized: true
}))

app.use(flash())

  // app.get('/', async function (req, res) {


  //   res.render('home');
  // });
  app.get('/waiters/:username', async function (req, res) {
    let waiter =  req.params.username
    let inserWaiter = await waitersInst.enterWaiter(waiter)
    
   res.render('home',{
     inserWaiter,
     waiter
   }
 );
 });



app.post('/waiters/:username', async function (req, res) {
  let name = req.params.username;
  let days = req.body.day;
  let inserWaiter = await waitersInst.enterWaiter(name)  
  let getDay = await waitersInst.getShift(name, days)
 
  res.render('home', {
    name,
    inserWaiter,
    getDay
  });
});

app.get('/days', async function (req, res){
 const getDay = await waitersInst.getDay();
let admin = await waitersInst.admin();

  res.render('admin', 

 { admin,
  getDay
}
  );
});


let PORT = process.env.PORT || 3020;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});