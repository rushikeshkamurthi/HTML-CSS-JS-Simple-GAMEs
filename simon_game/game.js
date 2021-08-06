var buttonColours=["red","blue","green","yellow"];
var randomChosenColour;
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(".btn").click(function(){
var userChosenColor=$(this).attr("id");
userClickedPattern.push(userChosenColor);
//console.log(userClickedPattern);
playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function() {
if(!started){
  $("#level-title").text("Level " + level);

  nextSequence();
  started=true;
}else {
  startOver();
}
});
function startOver(){
  gamePattern=[];
   userClickedPattern=[];
 level=0;
  nextSequence();
}

function nextSequence(){
  var randNumber;
  userClickedPattern=[];
  level=level+1;
  $("#level-title").text("Level " + level);
  randNumber=Math.random();
  randNumber=randNumber*4;
  randNumber=Math.floor(randNumber);
randomChosenColour=buttonColours[randNumber];
gamePattern.push(randomChosenColour);
playSound(randomChosenColour);
}
function playSound(name){

  $("#" +name).fadeIn(200).fadeOut(200).fadeIn(200);
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){

  $("#"+currentColour).addClass('pressed');
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 200);

}


function checkAnswer(currentLevel){

if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){

  console.log('success');

  if(userClickedPattern.length===gamePattern.length){
    setTimeout(function(){nextSequence();},500);

  }

}else{

  $("h1").text("Game over press any key to restart");
  $("body").addClass('game-over');
  playSound("wrong");
  setTimeout(function(){
$("body").removeClass('game-over');},400);


}
}
