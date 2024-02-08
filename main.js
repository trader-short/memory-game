var colors = ['green', 'red', 'yellow', 'blue'];
var level = 0;
var userSequence = [];
var randomSequence = [];



function createRandomColor() {
    var num = Math.floor(Math.random() * 4);
    var randomColor = colors[num];
    setTimeout(function() {
        $("." + randomColor).fadeOut(200).fadeIn(200);
        playSound(randomColor);
    }, 600);
    userSequence = [];
    return randomColor;

}

function endGame() {
    var endSound = new Audio("sounds/wrong.mp3");
    endSound.play();
    $("h1").text("Game over, press any key to restart");
    $("body").addClass("end")
    setTimeout(function() {
        $("body").removeClass("end");
    },300);
    level = 0;
}

function startGame() {
    userSequence = [];
    level = 0;
    randomSequence = [];
    var currentColor = createRandomColor();
    randomSequence.push(currentColor);
    level += 1;
    $("h1").text("Level " + level);

}

$(document).keydown(function() {
    if (level === 0) {
        startGame();
    }
})

function addAnimation(element) {
    element.classList.add("pressed");
    setTimeout(function() {
        element.classList.remove("pressed");
    }, 200);
}

function playSound(color) {
    var filePath = "sounds/" + color + ".mp3";
    var sound = new Audio(filePath);
    sound.play();
}

function continueGamePlay() {
    var currentColor = createRandomColor();
    randomSequence.push(currentColor);
    level += 1;
    $("h1").text("Level " + level);

}

function checkGamePlay(userColor) {
    userSequence.push(userColor);
    for (var i=0; i < userSequence.length; i++) {
        if (userSequence[i] !== randomSequence[i]) {
            endGame();
            return;
        }
    }

    if (userSequence.length === level) {
        continueGamePlay();
    }
}

$("button").click(function(event) {
    addAnimation(event.target);
    var userColor = event.target.classList[1];
    playSound(userColor);
    setTimeout(function() {
        checkGamePlay(userColor);
    },400);
    
})