'use strict';

$(function(){
  $('#dropdown').click(event =>{
    console.log(event.target);
    $('#menu').slideToggle(500);
  });
});
