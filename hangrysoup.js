/* HangrySoup.JS */

//  Disable Enter Key
window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

// Initialize Page and Inital Game Variables
let answerText = document.getElementById("answerTextId");
answerText.innerText = "________";

let gameOn = false;
let gameDifficulty, gameWord, targetID, imgURL, win;
let resetModal = document.getElementById("resetModal");
let resetModalClose = document.getElementById("resetModalClose");
let resetModalCloseBtn = document.getElementById("closeBtn");
let resetBtn = document.getElementById("resetBtn");
let modalTextBox = document.getElementById("modalTextBox");
let hangImgID = document.getElementById("hangImgID");
let wrongGuesses = 0;
let clicked = [];

// Grab Buttons and Other Event Elements
let eListen = document.getElementById("easyBtn");
let mListen = document.getElementById("medBtn");
let hListen = document.getElementById("hardBtn");
let answerBox = document.querySelector(".answerBox");

// Return random word by chosen difficulty
function chooseWord(gameDifficulty) {
  
  let wordList = {
    "easy": ["broth", "stew", "dish", "egg drop", "food", "meat", "cream", "noodles", "pesto", "cheese", "tofu", "butter", "bread", "meal", "chili", "rice", "water", "flour", "liquid", "bowl", "fried", "gumbo", "wonton", "lentil", "tomato", "leek"],
    "medium": ["vegetable", "bouillon", "bisque", "gazpacho", "minestrone", "consomme", "salisbury", "composition", "julienne", "eggplant", "chowder", "borscht", "cucumber", "breadsticks", "goulash"],
    "hard": ["ratatouille", "provender", "zucchini", "commissariat", "salmagundi", "nourishment",
      "bolognese", "worcestershire", "hollandaise", "mulligatawny", "vichyssoise", "corn chowder"]
  };

  return wordList[gameDifficulty][Math.floor(Math.random() * wordList[gameDifficulty].length)];
}

// Rebuild blank spaces by number of letters in word to guess
function letterSpaceReset(word) {
  let i, builtSpaces = "";
  for (i = 0; i < word.length; i++) {
    builtSpaces += "_";
  }

  answerText.innerText = builtSpaces;
}

// Test if letter is already clicked
function alreadyClicked(clickTarget) {
  for (let i of clicked) {
    if (i === clickTarget) return true;
  }
  return false;
}

// Main game loop
function mainRun() {
  "use strict";

  // Initialize event listeners
  // When the user clicks on <span> (x), close the modal
  resetModalClose.onclick = function() {
    resetModal.style.display = "none";
  };

  // When the user clicks on the close button, close the modal
  resetModalCloseBtn.onclick = function() {
    resetModal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == resetModal) {
      resetModal.style.display = "none";
    }
  };

  // When the user clicks on reset button reset game
  resetBtn.onclick = function() {
    // Resets visuals, for now keep as just reloading whole page, modify later...
    // resetModal.style.display = "none";
    // gameOn = false;
    // answerText.innerText = "________";
    location.reload();
  };
  
  
  // Easy Button
  eListen.addEventListener("click", function() {
    if (gameOn) {
      resetModal.style.display = "block";
      resetBtn.style.display = "block";
      modalTextBox.innerHTML = "<p class=\"modalText\">You already have a game in progress.<br>If you wish to reset your game, click Reset below, otherwise you may close this window.</p>";
    } else {
      gameDifficulty = "easy";
      gameWord = chooseWord(gameDifficulty);
      gameOn = true;

      // Reset blank spaces
      letterSpaceReset(gameWord);
    }
  });

  // Medium Button
  mListen.addEventListener("click", function() {
    if (gameOn) {
      resetModal.style.display = "block";
      resetBtn.style.display = "block";
      modalTextBox.innerHTML = "<p class=\"modalText\">You already have a game in progress.<br>If you wish to reset your game, click Reset below, otherwise you may close this window.</p>";
    } else {
      gameDifficulty = "medium";
      gameWord = chooseWord(gameDifficulty);
      gameOn = true;

      // Reset blank spaces
      letterSpaceReset(gameWord);
    }
  });

  // Hard Button
  hListen.addEventListener("click", function() {
    if (gameOn) {
      resetModal.style.display = "block";
      resetBtn.style.display = "block";
      modalTextBox.innerHTML = "<p class=\"modalText\">You already have a game in progress.<br>If you wish to reset your game, click Reset below, otherwise you may close this window.</p>";
    } else {
      gameDifficulty = "hard";
      gameWord = chooseWord(gameDifficulty);
      gameOn = true;

      // Reset blank spaces
      letterSpaceReset(gameWord);
    }
  });
  
  // Letter Clicks - Needs to prevent already clicked letters from working
  answerBox.addEventListener("click", function(e) {
    if (e.target !== e.currentTarget) {
      if (gameOn) {
        if (!alreadyClicked(e.target.id)) {
          // Set Letter on Screen to Checkmark
          targetID = e.target.id;
          let guess = targetID.split("")[targetID.length - 1].toLowerCase();
          let targetIDSel= document.querySelector("#" + targetID);
          targetIDSel.innerHTML = "&#10003;";
          clicked.push(targetID);

          // Check against gameWord
          let gameWordArray = gameWord.split("");
          let gameWordText = gameWord[0].toUpperCase() + gameWord.substring(1,gameWord.length);
          // If found...
          if (gameWordArray.indexOf(guess) !== -1) {
            let foundIndexes = [];
            for (let i in gameWordArray) {
              if (gameWordArray[i] === guess) foundIndexes.push(i);
            }

            let replaceAnswerText = answerText.innerText.split("");
            for (let i of foundIndexes) {
              replaceAnswerText.splice(i, 1, guess.toUpperCase());
            }
            answerText.innerText = replaceAnswerText.join("");
            // Test for Win
            win = true;
            for (let i of replaceAnswerText) {
              if (i === "_") win = false;
            }
            if (win) {
              resetModal.style.display = "block";
              resetBtn.style.display = "block";
              let mtbWinText = "<p class=\"modalText\">You Win!<br>To play again, choose Reset below.</p>";
              mtbWinText += `<p class="modalText">Your Word:<br>${gameWordText}</p>`;
              modalTextBox.innerHTML = mtbWinText;
            }
          } else {
            // Else output to wrong choices
            wrongGuesses++;
            imgURL = "assets/img/Hangman-" + wrongGuesses + ".png";
            hangImgID.src = imgURL;
            if (wrongGuesses === 6) {
              resetModal.style.display = "block";
              resetBtn.style.display = "block";
              let mtbLoseText = "<p class=\"modalText\">You Lose!<br>To play again, choose Reset below.</p>";
              mtbLoseText += `<p class="modalText">Your Word:<br>${gameWordText}</p>`;
              modalTextBox.innerHTML = mtbLoseText;
            }
            let wrongLetterText = document.getElementById("hangText");
            if (wrongLetterText.innerText === "None") {
              wrongLetterText.innerText = "";
            }
            wrongLetterText.innerText += " " + guess.toUpperCase();
          }
        }
      } else {
        resetModal.style.display = "block";
        resetBtn.style.display = "none";
        modalTextBox.innerHTML = "<p class=\"modalText\">You do not have a game in progress.<br>To start a game close this popup and select your game difficulty.</p>";
      }
    }
    e.stopPropagation();
  });
  
}

mainRun();