var userClickedPattern = [];
var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"]
var level = 0;
var started = false;
var clicked = false;
$(document).keypress(function () {
    if (!started) {
        $("h1").text("level " + level);
        nextSequence();
        started = true;
        clicked = false;
    }
});

$(".btn").click(function () {
if (!clicked) {
    var userClickButton = $(this).attr("id");
    userClickedPattern.push(userClickButton);

    playSound(userClickButton);
    animatePress(userClickButton);

    checkAnswer(userClickedPattern.length - 1);
}
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("right");
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over! Press any key to restart");
        clicked = true;
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);

    //autoAnimation
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //autoAudioPlay
    playSound(randomChosenColour);

    level += 1;
    $("h1").text("level " + level);
}


function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
}