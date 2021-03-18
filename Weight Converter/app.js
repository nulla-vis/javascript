const pounds = document.getElementById('poundsOutput');
const grams = document.getElementById('gramsOutput');
const kgs = document.getElementById('kgOutput');
const ounces = document.getElementById('ozOutput');
document.getElementsByClassName('card')[0].style.display = 'none'
document.getElementById('output').style.visibility = 'hidden';
document.getElementById('lbsInput').addEventListener('input',function(e) {
    document.getElementById('output').style.visibility = 'visible';
    let lbs = e.target.value;
    let index = document.getElementById('option-select').selectedIndex;

    switch(index){
        case 0:
            grams.textContent = lbs/0.0022046;
            kgs.textContent = lbs/2.2046;
            ounces.textContent = lbs*16;
            break;
        case 1:  
            pounds.textContent = lbs/0.0022046;
            kgs.textContent = lbs/2.2046;
            ounces.textContent = lbs*16;
            break;
        case 2: 
            pounds.textContent = lbs/2.2046;
            grams.textContent = lbs/0.0022046;
            ounces.textContent = lbs*16;
            break;
        case 3:
            pounds.textContent = lbs*16;
            grams.textContent = lbs/0.0022046;
            kgs.textContent = lbs/2.2046;
            break;
    }
})

document.getElementById('option-select').addEventListener('change',(e) => {
    document.getElementById('lbsInput').placeholder = `Enter ${e.target.value}...`;
    let index = document.getElementById('option-select').selectedIndex;
    document.getElementById('lbsInput').value = ''
    pounds.textContent = '';
    grams.textContent = '';
    kgs.textContent = '';
    ounces.textContent = '';
    cards = document.querySelectorAll('.card');
    console.log(cards.length)
    for(let i = 0 ; i < cards.length ; i++) {
        if(i === index) {
            document.getElementsByClassName('card')[i].style.display = 'none'
        } else {
            document.getElementsByClassName('card')[i].style.display = ''
        }
    }
});