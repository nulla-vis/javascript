//Global Variables===========================================
let numberguess = [];
let answer;
let showNumber = document.querySelector('#number');
let userScore = 0;
let userchanges = 3;
let score = document.querySelector('#score');
let timeleft = document.querySelector('.time-left');
let revCD;
let timeReveal;
let timerReveal;

//create child for reveal time
let h2 = document.createElement('h2');
h2.setAttribute('id','time-reveal');
let revealTime = document.createTextNode('10');
h2.appendChild(revealTime);
//functions==================================================


function start() {
  numberguess = [];
  generateStart();
  revealNumber();
}
function generateStart() {
  while(numberguess.length < 5) {
    numberguess.push(generateNumber());
  }
}

function revealcount() {
  document.querySelector('.reveal').appendChild(h2);
  revCD = document.getElementById('time-reveal');
  timeReveal = document.getElementById('time-reveal').textContent;
}

function revealCountDown() {
  timeReveal--;
  revCD.textContent = timeReveal;
  if(timeReveal === 0) {
    resetelement();
  }
}
function revealNumber() {
  timerReveal = setInterval(revealCountDown,1000);
  revealcount();
  answer = numberguess.join('');
  showNumber.textContent = answer;
}

function generateNumber() {
  let number = Math.floor(Math.random() * 10);
  return number;
}

function resetelement() {
  timeReveal = 10;
  revCD.textContent = 10;
  clearInterval(timerReveal);
  document.getElementById('time-reveal').remove();
  showNumber.textContent = "?????"
}

function check() {
  let userInput = document.getElementById('number-guess').value;
  if(numberguess.length === 99){
    alert('CONGRATIOLATION YOU WIN THE GAME!');
    reset();
    answer = '';
    document.getElementById('number-guess').value=''
  }else if(userInput === answer){
    alert('Nice, now to Next Level');
    userScore += 10;
    score.textContent = userScore;
    answer = '';
    document.getElementById('number-guess').value=''
  }
  else {
    alert('BOO BOOO!, WRONG' + numberguess);
    userchanges--;
    gamecount();
  }
}

function gamecount(){
  alert ('Change(s) Left' + userchanges);
  if (userchanges === 0){
    alert('GAME OVER')
    reset();
  }
}

function reset() {
  score.textContent = 0;
  userchanges = 3;
  timeleft.textContent = 60;
  numberguess = [];
  document.getElementById('number-guess').value='';
}

function next() {
  numberguess.push(generateNumber());
  numberguess.push(generateNumber());
  revealNumber();
}




