'use strict';

// drop down menu control
$(() => {
  $('#dropdown').click(() => {
    $('#menu').slideToggle(500);
  });
});


$(() => {
  $('#submit-answer').click(() => {
    let answer = $('input[name=answer]:checked').val();
    let correct = $('input[name=correct]').val();
    console.log(correct);
    console.log(answer);
    $('.radios').addClass('click-thru');
    $('#submit-answer').fadeToggle(1000);
    $('#next-question').fadeToggle(1000);

    console.log($('input[]').val());

    if(answer === correct){
      $(`input[name=answer]:checked`).parent().addClass('correct-answer');
    }
    else {
      $('input[name=answer]:checked').parent().addClass('incorrect-answer');
      // highlight correct answer
    }
  });
});












// SCORE CALCULATION NOTES: Last Update 8:58pm 11/19
// totals score at the end of the quiz. Answers are selected by the player, then transferred to DB as a string. when the scoreTotal is
// initiated the answers in the DB (array of objects, string value), are then compared to the answers stored from the api call.

// EXAMPLE:
// var myGamePiece;
// var myObstacles = [];
// var myScore;

// function startGame() {
//   myGamePiece = new component(30, 30, "red", 10, 160);
//   myScore = new component("30px", "Consolas", "black", 280, 40, "text");
//   myGameArea.start();
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// OBJ:
// 1-global variables for the DB objects, Score Total then acknowledges those objects,
// 2-Quiz session values will return an object from DB
// 3-Take those objects and organize them (a = b)
// 4-Calculate those objects (at the end)
// 5-Calculations = Variable []
// 6- Save Variable [] to DB
// 7- Take Variable[] and post to ejs as a partial.

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1-2-
// Presentation TBD
// x1 data [integer]BreakingBad || page 1-5;
// x2 data [integer]Kanye || page 1-5;
// x3 data [integer]Always Sunny in Philly || page 1-5;
// x4 data [integer]Office Quotes || page 1-5;
// x5 data [integer]Ron Swanson || page 1-5;
// x6 data [integer]Simpsons || page 1-5;

// x = correctA ( x will have to be accounted for each session value(s), x for each page,)

// Presentation TBD
// 3-

// NEED Function To Collect data (Improve)

// playerAnswers = (arr) => {DBfile.map.return};
// storedAnswers = (arr) => {DBfile.map.return};

// NEED Function To Compare data (Improve)

// function compareData {
// 	correctA = [];
// 	playerAnswers.foreach(function (CALCULATE SOMETHING) {
// 		if (n =

// NEED Function to (TBD)

// function correctA (arr) => {

// function scoreTotal = () => {
