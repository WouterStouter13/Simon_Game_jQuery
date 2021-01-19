//Global Game Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
//Start the Game - Press any key (or touch screen on mobile) to start
var started = false;
var level = 0;

$(document).on("keypress touchstart", function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

// Compare the user answer to the game answer
// Check the answer for each click
// Firstly, check if latest input click does not match the relevant game buttonColours. If no match, game over 
// Secondly, if the last item in the array is correct, then proceed to the next round
$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}
//Game to pick a random colour each round
// A random number will be generated and used to index from the array of available button Colours
// The relevant sound and an animation will be played for Colours
function nextSequence() {
	userClickedPattern = [];

	level++;

	$("#level-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomChosenColour);
}

// Function to animate the colour button which has been pressed
function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");

	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

// Function to play a sound of a colour (used by game and user)
function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}
// Start Over Fucntion - Reset all variables and restart game
function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
