'use strict';

const express = require ('express');
const superagent = require ('superagent');
const cors = require ('cors');
const pg = require ('pg');
const methodOverride = require ('method-override');
require ('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.set('view engine', 'ejs');

const client = new pg.Client(process.env.DATABASE_URL);

// Sunny Route
app.get('/sunny', sunnyQuotes);

function sunnyQuotes (req, res){
  let API = 'http://sunnyquotes.net/q.php?random';

  superagent.get(API).then( data => {
    let newSunny = new Sunny(data.body);
    // res.status(200).send(newSunny);
    console.log(newSunny);
  });
  // .catch(error => console.log(error));
}
// Sunny Constructor
function Sunny(newSunnyQuote){
  this.quote = newSunnyQuote.sqQuote;
  this.quoter = newSunnyQuote.sqWho;
}
// ----------------------------------------
// Simpson Route
app.get('/simpsons', simpsonQuotes);
function simpsonQuotes (req, res){
  let API = 'https://thesimpsonsquoteapi.glitch.me/quotes';

  superagent.get(API).then(data => {
    console.log(data.body);
    let newSimpson = new Simpson(data.body);
    console.log(newSimpson);
  });
}
// Simpson Constructor
function Simpson(newSimpsonQuote){
  this.quote = newSimpsonQuote.quote;
  this.quoter= newSimpsonQuote.character;
  // currently throws UnhandledPromiseRejectionWarning - probably just needs catch block
}

client.connect().then(()=> {
  app.listen(port, () => {
    console.log('its alive');
  });
})
  .catch (error => {
    console.log(error);
  });
