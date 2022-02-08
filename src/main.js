'use strict';

const SEA_LIFE_COUNT = 10;
const POO_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTitle = document.querySelector('.game__title');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popup = document.querySelector('.popup');
const popupMessage = document.querySelector('.popup__message');
const popupRefresh = document.querySelector('.popup__refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let timer = undefined;
let score = 0;

const icons = [
  {
    className: 'poo',
    count: SEA_LIFE_COUNT,
    imgPath: './img/poo.png'
  },
  {
    className: 'sealife',
    count: SEA_LIFE_COUNT,
    imgPath: './img/fish.png'
  },
  {
    className: 'sealife',
    count: SEA_LIFE_COUNT,
    imgPath: './img/shark.png'
  },
  {
    className: 'sealife',
    count: SEA_LIFE_COUNT,
    imgPath: './img/seahorse.png'
  }
]

field.addEventListener('click', onFieldClick);

popupRefresh.addEventListener('click', () => {
  gameStart();
  hidePopup();
});

gameBtn.addEventListener('click', () => {
  if(started) {
    gameStop();
  } else {
    gameStart();
  }
});

function gameStart() {
  started = true;
  hideTitle();
  gameInit();
  showStopBtn();
  startGameTimer();
  playSound(bgSound);
}

function gameStop() {
  started = false;
  hideGameBtn();
  stopGameTimer();
  stopSound(bgSound);
  playSound(alertSound);
  showPopupWithText('REPLAY?🧐');
}

function gameFinish(win) {
  started = false;
  hideGameBtn();
  if(win) {
    playSound(winSound);
  } else {
    stopSound(bugSound);
  }
  stopSound(bgSound);
  stopGameTimer();
  showPopupWithText(win? 'YOU WIN:)':'YOU LOSE:(');
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if(remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(POO_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  gameTimer.innerText = `${minute}:${second}`;
}

function showStopBtn() {
  const icon = document.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.classList.remove('hide');
}

function showPopupWithText(text) {
  popupMessage.innerText = text;
  popup.classList.remove('hide');
}

function hideGameBtn() {
  gameBtn.classList.add('hide');
}

function hidePopup() {
  popup.classList.add('hide');
}

function hideTitle() {
  gameTitle.classList.add('hide');
}

function onFieldClick(event) {
  if(!started) {
    return;
  }
  const target = event.target;
  if(target.matches('.poo')) {
    target.remove('poo');
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if(score === POO_COUNT) {
      gameFinish(true);
    }
  } else if(target.matches('.sealife')){
    gameFinish(false);
    playSound(bugSound);
  }
}

function updateScoreBoard() {
  gameScore.innerText = POO_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - 90;
  const y2 = fieldRect.height - 90;
  for(let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNum(x1, x2);
    const y = randomNum(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function gameInit() {
  score = 0;
  field.innerHTML = '';
  gameScore.innerText = POO_COUNT;
  addItem('poo', POO_COUNT, './img/poo.png');
  addItem('sealife', SEA_LIFE_COUNT, './img/fish.png');
  addItem('sealife', SEA_LIFE_COUNT, './img/shark.png');
  addItem('sealife', SEA_LIFE_COUNT, './img/jellyfish.png');
  addItem('sealife', SEA_LIFE_COUNT, './img/seahorse.png');
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}