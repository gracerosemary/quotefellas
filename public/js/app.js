'use strict';

// drop down menu control
$(() => {
  $('#dropdown').click(() => {
    $('#menu').slideToggle(500);
  });
});

// submit button.  Handles the front end stuff and then shows button to call /answer route
$(() => {
  $('#submit-answer').click(() => {
    let answer = $('input[name=answer]:checked').val();
    let correct = $('input[name=correct]').val();
    $('.radios').addClass('click-thru'); // lock answer in by making element click through
    $('#submit-answer').fadeToggle(1000); // remove submit button
    $('#next-question').fadeToggle(1000); //show continue button
    // if the answer is incorrect highlight in red
    if(answer !== correct){
      $(`input[name=answer]:checked`).parent().addClass('incorrect-answer');
      let children = $('input[name=answer]');
      //highlight the correct answer in green
      for (let i = 0; i < 4; i++){
        if (children[i].value === correct){
          $(`#${children[i].id}`).parent().addClass('correct-answer');
        }
      }
    } else {
      $(`input[name=answer]:checked`).parent().addClass('correct-answer');
      // update score board in real time before route call
      let score = $('#player-score').text();
      score++;
      $('#player-score').text(score);
    }
  });
});

// loading bar controls for home page
$(() => {
  $('#start-quiz').click(() => {
    let validator = $('input').val();
    if(validator.length > 0){
      $('#fader').toggle();
      $('#loading').toggle();
    }
  });
});

// saved quote text change
$(() => {
  $('#save-button').click(() => {
    $('#save').fadeToggle(1000); // remove save button
    $('#saved').fadeToggle(1000); //show saved
  });
});
