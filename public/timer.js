let timerText = document.getElementById("timer-text")
let gameStart = false;
// Set input text to be blank on page refresh
// let inputText = document.getElementById("write-box");
// inputText.value = '';
// Score values to be shown on game end 
let scoreContainer = document.getElementById("score");
let scoreWPM = document.getElementById("score-wpm");


function inputType(input) {
    let textInput = input.value;
    if (!gameStart) {
        startTimer(60, timerText);
        gameStart = true;
    }
}
// Start the timer 
function startTimer(duration, ele) {
    let timer = duration;
    let minutes;
    let seconds;
    let tick = setInterval(() => {
        // We parse Int because in the section below we append a String to the number value 
        minutes = parseInt(timer / 60);
        seconds = parseInt(timer % 60);

        // format the timer properly
        seconds = seconds < 10 ? "0" + seconds : seconds;

        ele.textContent = minutes + ":" + seconds;

        timer--;
        //IF timer goes below zero than game over
        if (timer < 0) {
            clearInterval(tick);
            ele.textContent = "Times Up ⏲️";
            // Show the game over text
            showGameOver();
        };
    }, 1000)
}
// Show game over 
function showGameOver() {
    // USer can no longer typw into input
    inputText.disabled = true;
    let currentWord = document.querySelector(`#test-box-text span:nth-child(${currentWordNumber})`);
    currentWord.setAttribute("class", "");
    inputText.value = "";
    // Show score
    let wordsPerMinute = Math.round((userScore / 60) * 100);
    scoreWPM.textContent = wordsPerMinute + "WPM";
    scoreContainer.style.display = "block";

}

// On focus Useful for "testBox" file
function onFocus() {
    isFocus = true;
}

function onBlur() {
    isFocus = false;
}