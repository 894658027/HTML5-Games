var stage, livesTxt, gameOverTxt, win;
var answer = "CREATEJS IS&AWESOME"
var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lives = 5;
var lettersNeeded = 0;
function init() {
   stage = new createjs.Stage(document.getElementById('canvas'));
   drawBoard();
   drawLetters();
   drawMessages();
   startGame();
}
function drawBoard() {
   var i, char, box;
   var xPos = 20;
   var yPos = 90;
   for (i = 0; i < answer.length; i++) {
      char = answer[i];
      if (char != ' ' && char != '&') {
         lettersNeeded++;
         box = new createjs.Shape();
         box.graphics.beginStroke("#000");
         box.graphics.drawRect(0, 0, 20, 24);
         box.regX = 10;
         box.regY = 12;
         box.x = xPos;
         box.y = yPos;
         box.name = 'box_' + i;
         box.key = char;
         stage.addChild(box);
      }
      xPos += 26;
      if (char == '&') {
         yPos += 40;
           xPos = 20;
} }
}
function drawLetters() {
   var i, char, txt, btn;
   var cnt = 0;
   var xPos = 20;
   var yPos = 200;
   for (i = 0; i < abc.length; i++) {
      char = abc[i];
      btn = new createjs.Shape();
      btn.graphics.beginFill("#000");
      btn.graphics.beginStroke("#000");
      btn.graphics.drawRect(0, 0, 20, 24);
      btn.regX = 10;
      btn.regY = 12;
      btn.x = xPos;
      btn.y = yPos;
      stage.addChild(btn);
      //create text
      txt = new createjs.Text(char);
      txt.color = "#FFF";
      txt.textAlign = 'center';
      txt.textBaseline = 'middle';
      txt.x = xPos;
      txt.y = yPos;
      stage.addChild(txt);
      btn.txt = txt;
      btn.addEventListener('click', onLetterClick);
      //adjust positions
       xPos += 24;
         cnt++;
         if (cnt == 13) {
yPos += 30;
xPos = 20; }
} }
function drawMessages() {
   var txt = new createjs.Text("WORD GAME", "26px Arial");
   txt.color = "#99000";
   txt.x = txt.y = 10;
   stage.addChild(txt);
   livesTxt = new createjs.Text("LIVES: " + lives, "16px Arial");
   livesTxt.textAlign = 'right';
   livesTxt.y = 16;
   livesTxt.x = stage.canvas.width - 10;
   stage.addChild(livesTxt);
}
function onLetterClick(e) {
   var btn = e.target;
   var txt = btn.txt;
   btn.removeEventListener('click', onLetterClick);
   checkForMatches(txt);
   checkGame();
}
function checkForMatches(txt) {
   var letter = txt.text
   var i, char, box, txtClone;
   var match = false;
   var l = answer.length;
     for (i = 0; i < l; i++) {
      char = answer[i];
      if (char == ' ' || char == '&') {
continue; }
      box = stage.getChildByName('box_' + i);
      if (box.key == letter) {
         lettersNeeded--;
         match = true;
         txtClone= txt.clone();
         txtClone.color = "#000";
         txtClone.x = box.x;
         txtClone.y = box.y;
         stage.addChild(txtClone);
} }
    stage.removeChild(txt);
    if (!match) {
lives--;
       livesTxt.text = "LIVES: " + lives;
   }
}
function checkGame() {
   if (lettersNeeded == 0) {
win = true;
      gameOver();
   }
   else if (lives == 0) {
      win = false;
      gameOver();
   }
}
function gameOver() {
   stage.removeAllChildren();
   var msg = win ? "YOU WIN!" : "YOU LOSE";
   gameOverTxt = new createjs.Text(msg, "36px Arial");
   gameOverTxt.alpha = 0;
   gameOverTxt.color = win ? 'blue' : 'red';
   gameOverTxt.textAlign = 'center';
   gameOverTxt.textBaseline = 'middle';
   gameOverTxt.x = stage.canvas.width / 2;
   gameOverTxt.y = stage.canvas.height / 2;
   stage.addChild(gameOverTxt);
   createjs.Tween.get(gameOverTxt).to({alpha:1},1000);
}
function startGame() {
   createjs.Ticker.setFPS(60);
   createjs.Ticker.addEventListener("tick", function (e) {
       stage.update();
   });
}