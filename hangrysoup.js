/* HangrySoup.JS */

//  Disable Enter Key
window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

// Initialize Page and Inital Game Variables
let answerText = document.getElementById("answerTextId");
answerText.innerText = "________";

let gameOn = false;
let gameDifficulty, gameWord, guess;
let resetModal = document.getElementById("resetModal");
let resetModalClose = document.getElementById("resetModalClose");
let resetModalCloseBtn = document.getElementById("closeBtn");
let resetBtn = document.getElementById("resetBtn");
let modalTextBox = document.getElementById("modalTextBox");
let hangInput = document.getElementById("hangInput");

// Grab Buttons 
let eListen = document.getElementById("easyBtn");
let mListen = document.getElementById("medBtn");
let hListen = document.getElementById("hardBtn");
let sTurn = document.getElementById("soupTurn"); 

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
  let answerText = document.getElementById("answerTextId");
  answerText.innerText = builtSpaces;
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
    resetModal.style.display = "none";
    gameOn = false;
    answerText.innerText = "________";
  };
  
  
  // Easy Button
  eListen.addEventListener("click", function() {
    if (gameOn) {
      resetModal.style.display = "block";
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
      modalTextBox.innerHTML = "<p class=\"modalText\">You already have a game in progress.<br>If you wish to reset your game, click Reset below, otherwise you may close this window.</p>";
    } else {
      gameDifficulty = "hard";
      gameWord = chooseWord(gameDifficulty);
      gameOn = true;

      // Reset blank spaces
      letterSpaceReset(gameWord);
    }
  });

  // Submit Button
  sTurn.addEventListener("click", function() {
    if (gameOn) {
      guess = hangInput.value;
      hangInput.value = "";
      alert(guess);
    } else {
      resetModal.style.display = "block";
      modalTextBox.innerHTML = '<p class="modalText">You do not have a game in progress or your input is bad.<br>Please try again.</p>';
      resetBtn.style.display = "none";
    }
  });
  
}

mainRun();