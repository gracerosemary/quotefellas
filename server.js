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



client.connect().then(()=> {
  app.listen(port, () => {
    console.log("its alive");
  })
})
.catch (error => {
  console.log(error);
});

