let leftDiv = document.createElement('div');
leftDiv.id = 'leftDiv';
document.body.appendChild(leftDiv);
let rightDiv = document.createElement('div');
rightDiv.id = 'rightDiv';
document.body.appendChild(rightDiv);
let centerDiv = document.createElement('div');
centerDiv.id = 'centerDiv';
document.body.appendChild(centerDiv);

let blueCounter = 0;
let redCounter = 0;
let fighting = false;
let timerNum = 15;
let highscoreNum = 0;

let startButtonShadow = document.createElement('a');
startButtonShadow.id = 'startButtonShadow';
document.getElementById('centerDiv').appendChild(startButtonShadow);
let startButton = document.createElement('input');
startButton.id = 'startButton';
startButton.type = 'button';
startButton.value = 'Start';
document.getElementById('startButtonShadow').appendChild(startButton);

let timer = document.createElement('p');
timer.id = 'timer';
timer.textContent = timerNum;
document.getElementById('centerDiv').appendChild(timer);

let instructions = document.createElement('p');
instructions.id = 'instructions';
instructions.textContent = 'Tap as fast as you can for 15 seconds. Highest taps wins!'
document.getElementById('centerDiv').appendChild(instructions);

let instructionsBlue = document.createElement('p');
instructionsBlue.id = 'instructionsBlue';
instructionsBlue.textContent = 'Blue: Tap Z';
document.getElementById('leftDiv').appendChild(instructionsBlue);
let instructionsRed = document.createElement('p');
instructionsRed.id = 'instructionsRed';
instructionsRed.textContent = 'Red: Tap M';
document.getElementById('rightDiv').appendChild(instructionsRed);

let highscore = document.createElement('p');
highscore.id = 'highscore';
highscore.textContent = 'Highscore: 0';
document.getElementById('centerDiv').appendChild(highscore);

let redScore = document.createElement('p');
redScore.id = 'redScore';
redScore.textContent = redCounter;
document.getElementById('rightDiv').appendChild(redScore);
let blueScore = document.createElement('p');
blueScore.id = 'blueScore';
blueScore.textContent = blueCounter;
document.getElementById('leftDiv').appendChild(blueScore);

let redBar = document.createElement('div');
redBar.id = 'redBar';
document.getElementById('rightDiv').appendChild(redBar);
let blueBar = document.createElement('div');
blueBar.id = 'blueBar';
document.getElementById('leftDiv').appendChild(blueBar);

let redSwordGuy = document.createElement('img');
redSwordGuy.id = 'redSwordGuy';
redSwordGuy.src = 'img/redSwordGuy.png';
document.getElementById('rightDiv').appendChild(redSwordGuy);
let blueSwordGuy = document.createElement('img');
blueSwordGuy.id = 'blueSwordGuy';
blueSwordGuy.src = 'img/blueSwordGuy.png';
document.getElementById('leftDiv').appendChild(blueSwordGuy);

let victoryScreen = document.createElement('div');
victoryScreen.id = 'victoryScreen';
document.body.appendChild(victoryScreen);

let victoryScreenBlue = document.createElement('div');
victoryScreenBlue.id = 'victoryScreenBlue';
document.getElementById('victoryScreen').appendChild(victoryScreenBlue);
let victoryTextBlue = document.createElement('p');
victoryTextBlue.id = 'victoryTextBlue';
victoryTextBlue.textContent = 'Blue VICTORY!';
document.getElementById('victoryScreenBlue').appendChild(victoryTextBlue);

let victoryScreenRed = document.createElement('div');
victoryScreenRed.id = 'victoryScreenRed';
document.getElementById('victoryScreen').appendChild(victoryScreenRed);
let victoryTextRed = document.createElement('p');
victoryTextRed.id = 'victoryTextRed';
victoryTextRed.textContent = 'Red VICTORY!';
document.getElementById('victoryScreenRed').appendChild(victoryTextRed);

let victoryScreenTie = document.createElement('div');
victoryScreenTie.id = 'victoryScreenTie';
document.getElementById('victoryScreen').appendChild(victoryScreenTie);
let victoryTextTie = document.createElement('p');
victoryTextTie.id = 'victoryTextTie';
victoryTextTie.textContent = 'TIE!';
document.getElementById('victoryScreenTie').appendChild(victoryTextTie);



startButton.onclick = function() {startButtonClick()};

const startButtonClick = function startWar() {
    startButton.onclick = null;
    startButton.value = '3';
    timerNum = 15;
    redCounter = 0;
    redScore.textContent = redCounter;
    blueCounter = 0;
    blueScore.textContent = blueCounter;
    document.getElementById('redBar').style.height = 0 + 'px';
    document.getElementById('blueBar').style.height = 0 + 'px';
    timer.textContent = timerNum;
    setTimeout(function(){startButton.value = '2'}, 1000);
    setTimeout(function(){startButton.value = '1'}, 2000);
    setTimeout(function(){
        startButton.value = 'GO!';
        fight()
    }, 3000);
}

const fight = function war(){
    let timer2 = setInterval(updateTimer, 1000);
    fighting = true;
    document.addEventListener('keydown', scoring);
    document.getElementById('leftDiv').addEventListener('touchstart', scoringBlue);
    document.getElementById('rightDiv').addEventListener('touchstart', scoringRed);
    setTimeout(function(){
        fighting = false;
        startButton.onclick = function() {startButtonClick()};
        document.removeEventListener('keydown', scoring);
        document.getElementById('leftDiv').removeEventListener('touchstart', scoringBlue);
        document.getElementById('rightDiv').removeEventListener('touchstart', scoringRed);
        clearInterval(timer2);
        startButton.value = 'Start';
        victory();
        }, 15000);
}

function scoring(addingScore) {
    if (addingScore.keyCode === 90 && fighting === true) {
        blueCounter++;
        document.getElementById('blueBar').style.height = blueCounter * 3 + 'px';
    }
    else if (addingScore.keyCode === 77 && fighting === true) {
        redCounter++;
        document.getElementById('redBar').style.height = redCounter * 3 + 'px';
    }
}

function scoringBlue() {
    blueCounter++;
    document.getElementById('blueBar').style.height = blueCounter * 3 + 'px';
}

function scoringRed() {
    redCounter++;
    document.getElementById('redBar').style.height = redCounter * 3 + 'px';
}

function updateTimer() {
    if (timerNum > 0) {
    timerNum--;
    timer.textContent = timerNum;
    }
}

function victory() {
    redScore.textContent = redCounter;
    blueScore.textContent = blueCounter;
    if (blueCounter > redCounter) {
        victoryScreen.style.display = 'block';
        victoryScreenBlue.style.display = 'block';
        if (highscoreNum < blueCounter) {
            highscore.textContent = 'Highscore: ' + blueCounter;
        }
    } else if (redCounter > blueCounter) {
        victoryScreen.style.display = 'block';
        victoryScreenRed.style.display = 'block';
        if (highscoreNum < redCounter) {
            highscore.textContent = 'Highscore: ' + redCounter;
        }
    } else {
        victoryScreen.style.display = 'block';
        victoryScreenTie.style.display = 'block';
        if (highscoreNum < blueCounter) {
            highscore.textContent = 'Highscore: ' + blueCounter;
        }
    }
}

document.addEventListener('keydown', animate1);
document.addEventListener('keyup', animate2);

function animate1(whatever) {
    if (whatever.keyCode === 90) {
        document.getElementById('blueSwordGuy').style.left = 5 + 'px';
    } else if (whatever.keyCode === 77) {
        document.getElementById('redSwordGuy').style.right = 5 + 'px';
    }
}
function animate2(whatever) {
    if (whatever.keyCode === 90) {
        document.getElementById('blueSwordGuy').style.left = -5 + 'px';
    } else if (whatever.keyCode === 77) {
        document.getElementById('redSwordGuy').style.right = -5 + 'px';
    }
}

victoryScreen.onclick = function resume() {
    victoryScreen.style.display = 'none';
    victoryScreenBlue.style.display = 'none';
    victoryScreen.style.display = 'none';
    victoryScreenRed.style.display = 'none';
    victoryScreen.style.display = 'none';
    victoryScreenTie.style.display = 'none';
}

// window.onclick = function test() {
//     victoryScreen.style.display = 'block';
//     victoryScreenTie.style.display = 'block';
// }