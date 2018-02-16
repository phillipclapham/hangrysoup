/* HangrySoup.JS */

function mainRun() {
  "use strict";
  
  /* Initialize Page and Inital Game Variables*/
  let answerText = document.getElementById("answerTextId");
  answerText.innerText = "_ _ _ _ _ _ _ _";

  let gameOn = false;
  let gameDifficulty;
  
  /* Initialize event listeners */
  let eListen = document.getElementById("easyBtn");
  let mListen = document.getElementById("medBtn");
  let hListen = document.getElementById("hardBtn");
  let sTurn = document.getElementById("soupTurn");
  
  eListen.addEventListener("click", function() {
    if (gameOn) {
      alert("Game already in progress.");
    } else {
      gameDifficulty = "easy";
      alert(gameDifficulty);
    }
  });
  mListen.addEventListener("click", function() {
    alert("Medium");
  });
  hListen.addEventListener("click", function() {
    alert("Hard");
  });
  sTurn.addEventListener("click", function() {
    alert("Submit");
  });
  
}

mainRun();