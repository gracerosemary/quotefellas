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

app.get('/office', officeAPI);
app.get('/swanson', swansonAPI);




//----------- Office API and Constructor
function officeAPI(req, res){
  console.log('thats what she said');
  const URL = `https://officeapi.dev/api/quotes/random`;
  superagent.get(URL)
    .then(data => {
      let quote = new Office((JSON.parse(data.text)).data);
      console.log(quote);
      res.status(200).send(quote);
    })
    .catch(error => console.log(error));
}
function Office(obj){
  this.quote = obj.content;
  let name = `${obj.character.firstname} ${obj.character.lastname}`;
  this.quoter = name;
}
//------------ Ron Swanson API and Constructor
function swansonAPI(req, res){
  console.log('no');
  const URL = `https://ron-swanson-quotes.herokuapp.com/v2/quotes`;
  superagent.get(URL)
    .then(data => {
      let quote = new Swanson(data.body[0]);
      console.log(quote);
      res.status(200).send(quote);
    })
    .catch(error => console.log(error));
}
function Swanson(quote){
  this.quote = quote;
  this.quoter = 'Ron Swanson';
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
