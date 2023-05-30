var gamePattern = [];
var userClickPattern = [];
var buttonColors = ["red" , "blue" , "green" , "yellow"];


var gameStarted = false;
var level = 0;
$(document).keypress(function (){
    if(!gameStarted){
        $("h1").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = this.getAttribute("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
    }
);



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length === userClickPattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        var audio2 = new Audio("sounds/wrong.mp3");
        audio2.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over ! Press any Key to Restart");
        startOver();
    }

    
}

function nextSequence(){
    userClickPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumb = Math.floor(4*Math.random());
    var randomChosenColor = buttonColors[randomNumb];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

function animatePress(colorChosen){
    var elemPressed = $("#" + colorChosen);
    // elemPressed.fadeIn(100).fadeOut(100).fadeIn(100);
    elemPressed.addClass("pressed");
    setTimeout(function (){
        elemPressed.removeClass("pressed");
    },100);
}

function playSound(colorChosen){
    var audio = new Audio("sounds/" + colorChosen + ".mp3");
    audio.play();
}

function startOver(){
    gameStarted = false;
    level = 0 ;
    gamePattern = [];
}


