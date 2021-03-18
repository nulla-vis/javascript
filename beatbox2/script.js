window.addEventListener('keydown', playSound);

function playSound(e) {
    // console.log(e.keyCode);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"`);
    // console.log(audio);
    // console.log(key);
    if(!audio) return //stop the function from running all together
    audio.currentTime = 0; //rewind to the start so can hit same key over n over again
    audio.play();
    key.classList.add('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition) );;

function removeTransition(e) {
    // if(e.propertyName !== 'transform') return; //skip it if its not a transform
    // console.log(e.propertyName);
    this.classList.remove('playing');
}