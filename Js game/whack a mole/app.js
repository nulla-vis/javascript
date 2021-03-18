const square = document.querySelectorAll(".square");
const mole = document.querySelectorAll('.mole');
var timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
let result = 0;
let currentTime = timeLeft.textContent;


let music = new Audio('you cant touch this.mp3');
let whack = new Audio('whack.mp3');
let timerId;
let timerId2 = null;

function play() {
music.play();
music.currentTime = 2.2;

//invoke moveMole
moveMole();
timerId = setInterval(countDown, 1000);
}

function stops() {
clearInterval(timerId);
music.pause();
music.currentTime = 0;
clearInterval(timerId2);
square.forEach(className =>{
    className.classList.remove('mole');
})
score.textContent = 0;
timeLeft.textContent = 10;
currentTime = timeLeft.textContent;
}


function randomSquare() {
    square.forEach(className =>{
        className.classList.remove('mole');
    })

    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');

    //assign the id of the randomPosition to hitPosition for us to use later

    hitPosition = randomPosition.id;
    
}

square.forEach(ids=> {
    ids.addEventListener('mouseup', ()=>{
        if(ids.id === hitPosition){
            result++;
            score.textContent = result;
            whack.play();
            whack.currentTime = 0;
        }
    })
})

function moveMole() {
    timerId2 = setInterval(randomSquare, 400);
}



function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime === 0){
        timeLeft.textContent = 10;
        clearInterval(timerId);
    }
}




