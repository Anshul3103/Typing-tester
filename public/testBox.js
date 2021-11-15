// The currently targeted word 
let currentWordNumber = 1;
selectThisWord(currentWordNumber);
//Only allow new word . If user is focused on text box
let isFocus = false;
// TextboxText. To be moved up when on a new line 
let testBoxText = document.getElementById("test-box-text");
let minusMarginTop = 0;
//Score
let userScore = 0;



// Everytime the user releases a key stroke
let inputText = document.getElementById("write-box");
window.addEventListener("keyup", event => {
    // if the most recent key pressed was a space 
    if (event.code === "Space" && isFocus) {
        let wordStore = inputText.value.trim();
        console.log(wordStore);
        inputText.value = '';
        currentWordNumber++;
        selectThisWord(currentWordNumber, wordStore);
    }
})

// Give the currently selected styling to this word 
function selectThisWord(currentWordNumber, wordStore) {
    // Need to remove previous word once game has started
    let prevWord = null;
    if (currentWordNumber > 1) {
        prevWord = document.querySelector(`#test-box-text span:nth-child(${currentWordNumber - 1})`);
        prevWord.setAttribute("class", "");
        shouldUserScore(wordStore, prevWord);
    }
    let currentWord = document.querySelector(`#test-box-text span:nth-child(${currentWordNumber})`);
    currentWord.setAttribute("class", "current-word");
    // If the user selecting a word on a new line ?
    if (prevWord) isNewLine(prevWord, currentWord)
}

// Should the user score a point or not 
function shouldUserScore(userInput, prevWord) {
    console.log(prevWord);
    let textValue = prevWord.textContent;
    console.log(textValue);
    // Green: Success , Red: Fail

    if (userInput === textValue) {
        prevWord.style.color = "green";

        userScore++;
    } else {
        prevWord.style.color = "red";
        console.log(userInput);
        console.log("Hi2");
    }
}
function isNewLine(prevWord, currentWord) {
    let prevWordRect = prevWord.getBoundingClientRect();
    let currentWordRect = currentWord.getBoundingClientRect();
    if (prevWordRect.top !== currentWordRect.top) {
        minusMarginTop -= 65;
        testBoxText.style.marginTop = minusMarginTop + "px";
    }
}
