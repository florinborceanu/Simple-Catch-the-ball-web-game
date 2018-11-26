//Game Core
var isStarted = 0;
var timer = 60;
var timerCounter;
var score = 0;
var securityCheck = 0;
var scoreBoard = localStorage.getItem('Scores');
if (scoreBoard == null) {
    scoreBoard = [0, 0, 0, 0, 0];
    localStorage.setItem('Scores', scoreBoard);
}

//Screens
var menu = document.getElementById('menu');
var game = document.getElementById('game');
var endScreen = document.getElementById('end-screen');
var scores = document.getElementById('scores');
var scorePlaces = document.getElementsByClassName('place');

//Characters
var character = document.getElementById('character');
var food = document.getElementById('food');
var timerElement = document.getElementById('timer');
var scoreElement = document.getElementById('end-score');

//Consts
const moveKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

function startArrows() {
    if (isStarted) {
        console.error("Game is already started");
        return;
    }

    isStarted = 1;
    menu.style.display = "none";
    endScreen.style.display = "none";
    game.style.display = "block";

    document.addEventListener('keydown', (event) => {
        if (isStarted == 1) {
            return keyPressed(event.key);
        }
    });

    character.innerHTML = score;
    startTimer();
    randomFood();
}

function startMouse() {
    if (isStarted) {
        console.error("Game is already started");
        return;
    }

    isStarted = 1;
    menu.style.display = "none";
    endScreen.style.display = "none";
    game.style.display = "block";


    document.addEventListener('mousemove', () => {
        character.style.top = event.clientY;
        character.style.left = event.clientX;

        checkFoodCollision();
    });

    character.innerHTML = score;
    startTimer();
    randomFood();
}

function checkFoodCollision() {
    var coords = character.getBoundingClientRect();
    var foodCoords = food.getBoundingClientRect();

    if (foodCoords.top + 65 >= coords.top && foodCoords.top - 65 <= coords.top && securityCheck == 0) {
        if (foodCoords.left + 65 >= coords.left && foodCoords.left - 65 <= coords.left) {
            randomFood();
            score += 61 - timer;
            character.innerHTML = score;
            securityCheck = 1;
            securityInterval();
        }
    }
}

function stopGame() {
    game.style.display = "none";
    endScreen.style.display = "block";
    scoreElement.innerHTML = score + " points";
    isStarted = 0;
    timer = 60;
    score = 0;
}

function showScores() {
    menu.style.display = "none";
    game.style.display = "none";
    endScreen.style.display = "none";
    scores.style.display = "block";
    scorePlaces[0] = scoreBoard[0];
    scorePlaces[1] = scoreBoard[0];
    scorePlaces[2] = scoreBoard[0];
    scorePlaces[0] = scoreBoard[0];
    scorePlaces[0] = scoreBoard[0];
}

function goBack() {
    menu.style.display = "flex";
    game.style.display = "none";
    endScreen.style.display = "none";
    scores.style.display = "none";
}

function keyPressed(key) {
    if (moveKeys.indexOf(key) > -1) {
        switch (moveKeys.indexOf(key)) {
            case 0:
                {
                    moveCharacter(1, 0, 0, 0);
                    break;
                }
            case 1:
                {
                    moveCharacter(0, 1, 0, 0);
                    break;
                }
            case 2:
                {
                    moveCharacter(0, 0, 1, 0);
                    break;
                }
            case 3:
                {
                    moveCharacter(0, 0, 0, 1);
                    break;
                }
            default:
                break;
        }
    }
}

function moveCharacter(up, down, left, right) {
    var coords;

    if (up == 1) {
        coords = character.getBoundingClientRect();
        if (coords.top > 0) {
            character.style.top = coords.top + 50 - up * 20 + 'px';
        }
    }

    if (down == 1) {
        coords = character.getBoundingClientRect();
        if (coords.top < document.body.clientHeight - 100) {
            character.style.top = coords.top + 50 + down * 20 + 'px';
        }
    }


    if (left == 1) {
        coords = character.getBoundingClientRect();
        if (coords.left > 0) {
            character.style.left = coords.left + 50 - left * 20 + 'px';
        }
    }

    if (right == 1) {
        coords = character.getBoundingClientRect();
        if (coords.left < document.body.clientWidth - 100) {
            character.style.left = coords.left + 50 + right * 20 + 'px';
        }
    }

    checkFoodCollision();
}

function randomFood() {
    let randomHeight = Math.floor(Math.random() * document.body.clientHeight);
    let randomWidth = Math.floor(Math.random() * document.body.clientWidth);

    if (randomHeight < 50) {
        food.style.top = randomHeight + 50;
    } else {
        food.style.top = randomHeight;
    }

    if (randomHeight > document.body.clientHeight) {
        food.style.top = docume.body.clientHeight - 100;
    } else {
        food.style.top = randomHeight;
    }

    if (randomWidth < 50) {
        food.style.left = randomWidth + 50;
    } else {
        food.style.left = randomWidth;
    }

    if (randomWidth > document.body.clientWidth) {
        food.style.top = docume.body.clientWidth - 100;
    } else {
        food.style.left = randomWidth;
    }

    food.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
}

function startTimer() {
    timerElement.innerHTML = timer;
    timerCounter = setInterval(() => {
        timer -= 1;
        timerElement.innerHTML = timer;
        if (timer == 0) {
            clearInterval(timerCounter);
            stopGame();
        }
    }, 1000);
}

function securityInterval() {
    setTimeout(() => {
        securityCheck = 0;
    }, 500);
}

function updateScoreBoard() {
    //TODO

    localStorage.setItem('Scores', scoreBoard);
}