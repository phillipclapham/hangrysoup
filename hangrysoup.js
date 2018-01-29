/* HangrySoup.JS */

function firstRun() {
  "use strict";
  
  /* Initialize Page */
  let answerText = document.getElementById("answerTextId");
  answerText.innerText = "_ _ _ _ _ _ _ _";
  
  /* Initialize event listeners */
  let eListen = document.getElementById("easyBtn");
  let mListen = document.getElementById("medBtn");
  let hListen = document.getElementById("hardBtn");
  let sTurn = document.getElementById("soupTurn");
  
  eListen.addEventListener("click", function() {
    alert("Easy");
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

firstRun();