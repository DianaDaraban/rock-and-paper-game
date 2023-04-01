// get elements from HTML

const elContainer = document.querySelector('.elements-container');
const rockEl = document.querySelector('.rock');
const paperEl = document.querySelector('.paper');
const scissorsEl = document.querySelector('.scissors');
const gameMessage = document.querySelector('.message');
const score = document.querySelector('.score');
const restartBtn = document.querySelector('.restart-btn');
const choices = document.querySelector('.choices');
let scoreNum = 0;



// function fot the initialization of a random number

function randomNumber(){
let randomValue = Math.floor(Math.random()*3);
return randomValue;
}



// ADD EVENTS TO HTML ELEMENTS

rockEl.addEventListener('click', rockFunction, false);
paperEl.addEventListener('click', paperFunction, false);
scissorsEl.addEventListener('click', scissorsFunction, false);


function rockFunction(){
    let randomValue = randomNumber();

    if(rockEl.classList.contains('movement-left') ){
        return;
    } 
    else {
        paperEl.classList.add('hide');
        scissorsEl.classList.add('hide');
        rockEl.classList.add('movement-left');

        revealText();
        randomEl(randomValue);
        winner(rockEl, randomValue);
    }
};

function paperFunction(){
    let randomValue = randomNumber();

    if(paperEl.classList.contains('movement-left') ){
        return;
    } 
    else {
        rockEl.classList.add('hide');
        scissorsEl.classList.add('hide');
        paperEl.classList.add('movement-left');

        revealText();
        randomEl(randomValue);
        winner(paperEl, randomValue);
}
};

function scissorsFunction(){
    let randomValue = randomNumber();

    if(scissorsEl.classList.contains('movement-left') ){
        return;
    } 
    else {
        paperEl.classList.add('hide');
        rockEl.classList.add('hide');
        scissorsEl.classList.add('movement-left');

        revealText();
        randomEl(randomValue);
        winner(scissorsEl, randomValue);
}
};


// FUNCTION FOR COMPUTER RANDOM CHOICE

function randomEl(randomValue){
    if(randomValue == 0){;
        const computerChoiceRock = document.createElement('div');
        computerChoiceRock.classList.add('rock');
        computerChoiceRock.classList.add('comp');
        computerChoiceRock.classList.add('movement-right');
        elContainer.appendChild(computerChoiceRock);
    } 
    else if(randomValue == 2){
        const computerChoiceScissors = document.createElement('div');
        computerChoiceScissors.classList.add('scissors');
        computerChoiceScissors.classList.add('comp');
        computerChoiceScissors.classList.add('movement-right');
        elContainer.appendChild(computerChoiceScissors);
    } 
    else if(randomValue == 1){
        const computerChoicePaper = document.createElement('div');
        computerChoicePaper.classList.add('paper');
        computerChoicePaper.classList.add('comp');
        computerChoicePaper.classList.add('movement-right');
        elContainer.appendChild(computerChoicePaper);
    }
}

// FUNCTION FOR LOOKING FOR WINNER

function winner(el, randomValue){
    const getValue = el.getAttribute('item-value')
    
    console.log(randomValue)
    if( getValue == randomValue){
        gameMessage.innerText = 'You tied!';
    } else if(getValue == 0 && randomValue == 1){
        gameMessage.innerText = 'You lost!';
        scoreNum--;
        loseSound();
    } else if(getValue == 0 && randomValue == 2){
        gameMessage.innerText = 'You win!';
        scoreNum++;
        winSound();
    } else if(getValue == 1 && randomValue == 0){
        gameMessage.innerText = 'You win!';
        scoreNum++;
        winSound();
    } else if(getValue == 1 && randomValue == 2){
        gameMessage.innerText = 'You lost!';
        scoreNum--;
        loseSound();
    } else if(getValue == 2 && randomValue == 0){
        gameMessage.innerText = 'You lost!';
        scoreNum--;
        loseSound();
    } else if(getValue == 2 && randomValue == 1){
        gameMessage.innerText = 'You win!';
        scoreNum++;
        winSound();
    }

    score.innerText = `Score: ${scoreNum}`;
    return scoreNum;
}

// SET RESTART GAME BUTTON

const chosenEl = document.getElementsByClassName('comp');


restartBtn.addEventListener('click', restartGame, false);



// RESTART GAME FUNCTION, RELOAD THE GAME WITHOUT LOSING THE SCORE

function restartGame(){

    chosenEl[chosenEl.length-1].classList.add('hide');

    removeHideClass();
    removeMovementClass();

    hideText();
    clickSound();
}


function removeHideClass(){
    if(rockEl.classList.contains('hide') || paperEl.classList.contains('hide') || scissorsEl.classList.contains('hide')){
        rockEl.classList.remove('hide');
        paperEl.classList.remove('hide');
        scissorsEl.classList.remove('hide');
    } 
}

function removeMovementClass(){
    if(rockEl.classList.contains('movement-left') || paperEl.classList.contains('movement-left') || scissorsEl.classList.contains('movement-left')){
        rockEl.classList.remove('movement-left');
        paperEl.classList.remove('movement-left');
        scissorsEl.classList.remove('movement-left');
    } 
}

// HIDING AND REVEALING TEXTS

function revealText(){
    choices.classList.remove('hide');
    gameMessage.classList.remove('hide');
}
function hideText(){
    choices.classList.add('hide');
    gameMessage.classList.add('hide');
}

// SET KEYPRESS FUNCTION FOR ENTER KEY ON KEYBOARD

document.body.addEventListener('keypress', keypressEnter, false);

function keypressEnter(e) {
    if (e.key == "Enter") {
    e.preventDefault();
    restartBtn.click();
    clickSound();
}
}

// SET SOUNDS FOR WINNING, FOR LOSING AND FOR CLICKING

function winSound(){
    new Audio('./sound/win.wav').play()
}

function loseSound(){
    new Audio('./sound/lose.wav').play()
}

function clickSound(){
    new Audio('./sound/click.wav').play()
}