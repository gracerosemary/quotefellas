'use strict';

//dependencies
const express = require ('express');
const superagent = require ('superagent');
const cors = require ('cors');
const pg = require ('pg');
const methodOverride = require ('method-override');
require ('dotenv').config();

//port setup
const port = process.env.PORT || 3000;
//turning things on
const app = express();
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.set('view engine', 'ejs');
//database set up
const client = new pg.Client(process.env.DATABASE_URL);


//Routes
app.get('/', homePage);
app.get('/sunny', sunnyQuotes);
app.get('/breakingbad', breakingBadAPI);
app.get('/office', officeAPI);
app.get('/swanson', swansonAPI);
app.get('/kanye', kanyeAPI);
// app.get('/simpsons', simpsonQuotes);

//---------------------------------Home Page
function homePage(req, res){
  res.status(200).send('homepage');
}

//------------------------------ Always Sunny API
function sunnyQuotes (req, res){
  let API = 'http://sunnyquotes.net/q.php?random';
  superagent.get(API).then( data => {
    let newSunny = new Sunny(data.body);
    // res.status(200).send(newSunny);
    console.log(newSunny);
  });
  // .catch(error => console.log(error));
}

//----------------------------- Breaking Bad API
function breakingBadAPI(req, res){
  const URL = `https://breaking-bad-quotes.herokuapp.com/v1/quotes`;
  superagent.get(URL)
    .then(data => {
      let quote = new BadQuote(data.body[0]);
      res.status(200).send(quote);
      console.log(quote);
    })
    .catch(error => console.log(error));
}

//----------------------------- Office API
function officeAPI(req, res){
  // console.log('thats what she said');
  const URL = `https://officeapi.dev/api/quotes/random`;
  superagent.get(URL)
    .then(data => {
      let quote = new Office((JSON.parse(data.text)).data);
      // console.log(quote);
      res.status(200).send(quote);
    })
    .catch(error => console.log(error));
}

//--------------------------- Ron Swanson API
function swansonAPI(req, res){
  // console.log('no');
  const URL = `https://ron-swanson-quotes.herokuapp.com/v2/quotes`;
  superagent.get(URL)
    .then(data => {
      let quote = new Swanson(data.body[0]);
      // console.log(quote);
      res.status(200).send(quote);
    })
    .catch(error => console.log(error));
}

//------------------------------- Kanye API
function kanyeAPI(req, res){
  console.log('Aquaman was here');
  const URL = `https://api.kanye.rest`;
  superagent.get(URL)
    .then(data =>{
      let quote = new Kanye(data.body.quote);
      console.log(quote);
      res.status(200).send(quote);
    })
    .catch(error => console.log(error));
}

//--------------------------------- Simpsons API
// function simpsonQuotes (req, res){
//   let API = 'https://thesimpsonsquoteapi.glitch.me/quotes';

//   superagent.get(API).then(data => {
//     console.log(data.body);
//     let newSimpson = new Simpson(data.body);
//     console.log(newSimpson);
//   });
// }

//------------------------------- Constructors
function Sunny(newSunnyQuote){
  this.quote = newSunnyQuote.sqQuote;
  this.quoter = newSunnyQuote.sqWho;
}
function BadQuote(quote){
  this.quote = quote.quote;
  this.quoter = quote.author;
}
function Office(obj){
  this.quote = obj.content;
  let name = `${obj.character.firstname} ${obj.character.lastname}`;
  this.quoter = name;
}
function Swanson(quote){
  this.quote = quote;
  this.quoter = 'Ron Swanson';
}
function Kanye(quote){
  this.quote = quote;
  this.quoter = 'Kanye West';
}

// turn the server on
client.connect()
  .then(()=> {
    app.listen(port, () => {
      console.log('its alive');
    });
  })
  .catch (error => {
    console.log(error);
  });






















































  // DATABASE STUFF -----------------------------------------------------------|

  // Route to saved quotes
  app.get('/saved', savedQuote);
  function savedQuote(request, response) {
    const SQL = 'SELECT * FROM user;';

    return client.query(SQL)
    .then(results => {
      response.status(200).render('view/saved') // need to enter returning object
    })
    .catch(error => {
      console.log(error);
    });
  }

  // Route to saved score
  app.get('/scores', savedQuote);
  function savedScores(request, response) {
    const SQL = 'SELECT * FROM quotes;';

    return client.query(SQL)
    .then(results => {
      response.status(200).render('view/scores') // need to enter returning object
    })
    .catch(error => {
      console.log(error);
    });
  }

  // Need to add update/delete