/* HangrySoup.JS */

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
  
  // Initialize Page and Inital Game Variables
  let answerText = document.getElementById("answerTextId");
  answerText.innerText = "________";

  let gameOn = false;
  let gameDifficulty, gameWord;

  let resetModal = document.getElementById("resetModal");
  let resetModalClose = document.getElementById("resetModalClose");
  let resetModalCloseBtn = document.getElementById("closeBtn");
  let resetBtn = document.getElementById("resetBtn")

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
  }
  
  // Grab Buttons 
  let eListen = document.getElementById("easyBtn");
  let mListen = document.getElementById("medBtn");
  let hListen = document.getElementById("hardBtn");
  let sTurn = document.getElementById("soupTurn");
  
  // Easy Button
  eListen.addEventListener("click", function() {
    if (gameOn) {
      resetModal.style.display = "block";
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
    alert("Submit");
  });
  
}

mainRun();