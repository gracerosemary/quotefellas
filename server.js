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

// ---------------------------------Routes
app.get('/', homePage);
app.get('/scores', savedScores);
app.post('/scores', addScores);
app.get('/saved', savedQuote);
app.post('/save', addQuote);
app.get('/about', about);
app.post('/quiz', startQuiz);
app.post('/quiz/:id', answerCheck);

//---------------------------------Home Page
function homePage(req, res){
  res.status(200).render('index');
}

//-------------------------------- About
function about(req, res){
  res.status(200).render('about');
}

// ------------------------------------------------------ Start Quiz
//------ Global Variables
let questionArray = [];
let nameList = [];
let score = 0;
let quiz = {};
let playerName = '';
// ------ Start the journey into the multiverse worm hole
function startQuiz(req, res){
  // reset all globals
  score = 0;
  questionArray = [];
  nameList = [];
  quiz = {};
  playerName = req.body.player;
  sunnyQuotes(req, res);
}
// ---------------------Randomizes array order
function shuffleArray(array){
  for (let i = 0; i < 1000; i++) {
    let arrayOne = Math.floor((Math.random() * array.length));
    let arrayTwo = Math.floor((Math.random() * array.length));
    let reset = array[arrayOne];
    array[arrayOne] = array[arrayTwo];
    array[arrayTwo] = reset;
  }
  return array;
}
//--------- Get the list of names from DB to populate options
function getNames(req, res){
  const SQL = `SELECT * FROM dummy`;
  client.query(SQL)
    .then(data => {
      nameList = data.rows.map(name => name.speaker);
      buildQuiz(req, res);
    });
}
//-------- Builds the actual quiz object
function buildQuiz(req, res){
  quiz = (shuffleArray(questionArray.map(question => {
    let wrongAnswers = nameList;
    wrongAnswers = wrongAnswers.filter(name => name !== question.quoter ? true : false);
    wrongAnswers = (shuffleArray(wrongAnswers)).slice(0,3);
    wrongAnswers.push(question.quoter);
    let options = shuffleArray(wrongAnswers);
    return new QuizObject(question, options);
  }))).map((obj, i) => {
    obj.id = i;
    return obj;
  });
  res.status(200).render('quiz', {
    quote: quiz[0],
    player: req.body.player,
    score: score
  });
}
//---- check answer and goto next
function answerCheck(req, res){
  let questionID = req.params.id;
  if(req.body.answer === quiz[questionID].quoter){
    score++;
  }
  questionID++;
  if(questionID > 4){
    addScores(req, res);
  }else{
    console.log(questionID)
    res.status(200).render('quiz', {
      quote: quiz[questionID],
      player: req.body.player,
      score: score
    });
  }
}
//---------------------------------------------------------API CALLS
//------------------------------ Always Sunny API
function sunnyQuotes (req, res){
  let API = 'http://sunnyquotes.net/q.php?random';
  superagent.get(API).then( data => {
    questionArray.push(new Sunny(data.body));
    breakingBadAPI(req, res);
  })
    .catch(error => console.log(error));
}

//----------------------------- Breaking Bad API
function breakingBadAPI(req, res){
  const URL = `https://breaking-bad-quotes.herokuapp.com/v1/quotes`;
  superagent.get(URL)
    .then(data => {
      questionArray.push(new BadQuote(data.body[0]));
      officeAPI(req, res);
    })
    .catch(error => console.log(error));
}

//----------------------------- Office API
function officeAPI(req, res){
  const URL = `https://officeapi.dev/api/quotes/random`;
  superagent.get(URL)
    .then(data => {
      questionArray.push(new Office((JSON.parse(data.text)).data));
      swansonAPI(req, res);
    })
    .catch(error => console.log(error));
}

//--------------------------- Ron Swanson API
function swansonAPI(req, res){
  const URL = `https://ron-swanson-quotes.herokuapp.com/v2/quotes`;
  superagent.get(URL)
    .then(data => {
      questionArray.push(new Swanson(data.body[0]));
      kanyeAPI(req, res);
    })
    .catch(error => console.log(error));
}
//------------------------------- Kanye API
function kanyeAPI(req, res){
  const URL = `https://api.kanye.rest`;
  superagent.get(URL)
    .then(data =>{
      questionArray.push(new Kanye(data.body.quote));
      getNames(req, res);
    })
    .catch(error => console.log(error));
}

//--------------------------------- Simpsons API (Stretch Goal)
// function simpsonQuotes (req, res){
//   let API = 'https://thesimpsonsquoteapi.glitch.me/quotes';

//   superagent.get(API).then(data => {
//     console.log(data.body);
//     let newSimpson = new Simpson(data.body);
//     console.log(newSimpson);
//   });
// }

//-------------------------------------------------------- Constructors
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
function QuizObject(quote, options){
  this.quote = quote.quote;
  this.quoter = quote.quoter;
  this.optionA = options[0];
  this.optionB = options[1];
  this.optionC = options[2];
  this.optionD = options[3];
  this.image = 'https://place-hold.it/175x250';
}
function ScoreBoard(obj) {
  this.name = obj.firstname;
  this.score = obj.score_number;
  this.outOf = obj.out_of;
}

// DATABASE STUFF ----------------------------------------------------------

//--------------------------------- Add Quote
function addQuote(request, response) {
  const SQL = 'INSERT INTO quotes (quotes, note) VALUES ($1, $2) RETURNING id';
  const params = [quiz[0].quote, request.body.note];
  
  // console.log(params);
  // console.log(quiz[0].quote);
  
  client.query(SQL, params)
  .then(results => {
      console.log(results.rows);
      response.status(200).redirect('/saved'); // need to have it not redirect but I'm not sure how
    })
    .catch(error => {
      console.log(error);
    });
}

//--------------------------------- Saved Quotes
function savedQuote(request, response) {
  const SQL = 'SELECT * FROM quotes;';

  return client.query(SQL)
    .then(results => {
      console.log(results.rows);
      response.status(200).render('./partial/quote', { quizobject : results.rows });
    })
    .catch(error => {
      console.log(error);
    });
}
//--------------------------------- Add Scores
function addScores(req, res) {
  const SQL = 'INSERT INTO users (firstName, score_number, out_of) VALUES ($1, $2, $3) RETURNING *';
  const params = [playerName, score, quiz.length];
  client.query(SQL, params)
    .then(results => {
      res.status(200).redirect(`/scores`);
    })
    .catch(error => {
      console.log(error);
    });
}

//------------------------------ Get Saved Scores
function savedScores(req, res) {
  const SQL = 'SELECT * FROM users;';
  return client.query(SQL)
    .then(results => {
      let scores = results.rows.map(score => new ScoreBoard(score));
      res.status(200).render('scores', {scores: scores});
    })
    .catch(error => {
      console.log(error);
    });
}

//--------------------------------- Add Notes
// ---------- (need to keep quote input hidden so only note is visibly updated)
app.put('/note/:id, addQuoteNote');
function addQuoteNote(request, response) {
  const SQL = 'UPDATE quotes SET quotes = $1, note = $2 WHERE id = $3';
  const params = [request.body.quotes, request.body.note, request.params.id];

  client.query(SQL, params)
    .then(results => {
      response.status(200).redirect('view/saved');
    })
    .catch(error => {
      console.log(error);
    });
}

//--------------------------------- Delete Quote
app.delete('/delete/:id', deleteQuote);
function deleteQuote(request, response) {
  const SQL = 'DELETE from quotes WHERE id = $1';
  const params = [request.params.id];

  client.query(SQL, params)
    .then(results => {
      response.status(200).redirect('view/saved');
    })
    .catch(error => {
      console.log(error);
    });
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



// {
//   id: question number,
//   quote: 'quote',
//   quoter: 'quoter',
//   optionA: name1,
//   optionB: name2,
//   optionC: name3,
//   optionD: name4,
//   image: image_path
//   }









