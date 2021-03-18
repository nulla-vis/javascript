window.onload = function() {
    document.getElementById("number-submit").addEventListener("click", playGame);
    document.getElementById("restart-game").addEventListener("click", initGame)
    initGame();
}

correctNumber = getRandomNumber();
guesses = [];

class sound {
  constructor(){
    this.audio = new Audio("./sounds/Tada-sound.mp3");
  }

  playsound = () =>{
    this.audio.currentTime = 0;
    this.audio.play();
  }
}

let win = new sound();

function playGame(){
  numberGuess = document.getElementById("number-guess").value;
  saveGuessHistory(numberGuess);
  displayResult(numberGuess,correctNumber);
  displayHistory();
  console.log(correctNumber);
}

function displayResult(numberGuess,correctNumber){
    if(numberGuess > correctNumber){
        showNumberAbove();
    }else if(numberGuess < correctNumber){
        showNumberBelow();
    }else{
        showYouWon();
    }
}

function initGame(){

  guesses = [];
  displayHistory();
  correctNumber = getRandomNumber();
  resetResultContent();
  document.getElementById("number-guess").innerHTML = "";
}

function resetResultContent(){
  document.getElementById("result").innerHTML = "";
}

function getRandomNumber(){

  return Math.floor(Math.random()*100) + 1;
  
}

function saveGuessHistory(guess) {
  guesses.push(guess);
}

function displayHistory() {
  let index=guesses.length-1;
  let list = "<ul class='list-group'>";

  while(index >= 0){
    list+=`<li class='list-group-item'>さっき、推測したのは ： ${guesses[index]} </li>`;
    index--;
  }
  list += '</ul>'
  document.getElementById("history").innerHTML = list;
}


function getDialog(dialogType, text){
  let dialog;
  switch(dialogType){
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>"
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>"
      break;
  }
  dialog += text;
  dialog += "</div>"
  return dialog;
}

function showYouWon(){
  const text = "Σ(゜ロ゜;)当たった！、すごいじゃん！(*≧▽≦)"
  dialog = getDialog("won",text);
  document.getElementById("result").innerHTML = dialog;
  win.playsound();
}

function showNumberAbove(){
  const text = "大きいですね、少し小さな数字かな？"

  dialog = getDialog("warning",text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow(){
  const text = "小さいですね、もう少し大きい数字かな？"

  dialog = getDialog("warning",text);
  document.getElementById("result").innerHTML = dialog;
}
