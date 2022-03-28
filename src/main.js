'use strict';

const SEA_LIFE_COUNT = 10;
const POO_COUNT = 10;
const ITEM_SIZE = 90;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameTitle = document.querySelector('.game__title');
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popup = document.querySelector('.popup');
const popupRefresh = document.querySelector('.popup__refresh');
const popupMessage = document.querySelector('.popup__message');

let started = false;
let timer = undefined;
let score = 0;

field.addEventListener('click', onFieldClick);

popupRefresh.addEventListener('click', () => {
  hidePopup();
  gameStart();
})

gameBtn.addEventListener('click', () => {
  if (started) {
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
}

function gameStop() {
  started = false;
  stopGameTimer();
  hideGameBtn();
  showPopupWithText('REPLAY?');
}

function gameFinish(win) {
  stopGameTimer();
  hideGameBtn();
  showPopupWithText(win ? 'YOU WIN:)' : 'YOU LOSE:(');
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      gameFinish();
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

function updateScoreBoard() {
  gameScore.innerText = POO_COUNT - score;
}

function showPopupWithText(text) {
  popup.classList.remove('hide');
  popupMessage.innerText = text;
}

function showStopBtn() {
  const icon = document.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-start');
  gameBtn.classList.remove('hide');
}

function hideTitle() {
  gameTitle.classList.add('hide');
}

function hideGameBtn() {
  gameBtn.classList.add('hide');
}

function hidePopup() {
  popup.classList.add('hide');
}

function onFieldClick(event) {
  if (!started) {
    return
  }
  const target = event.target;
  if (target.matches('.poo')) {
    target.remove('poo');
    score++;
    updateScoreBoard();
    if (POO_COUNT === score) {
      gameFinish(true);
    }
  } else if (target.matches('.sealife')) {
    gameFinish(false);
  }
}

function addItme(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - ITEM_SIZE;
  const y2 = fieldRect.height - ITEM_SIZE;
  for (let i = 0; i < count; i++) {
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
  addItme('poo', POO_COUNT, './img/poo.png');
  addItme('sealife', SEA_LIFE_COUNT, './img/fish.png');
  addItme('sealife', SEA_LIFE_COUNT, './img/jellyfish.png');
  addItme('sealife', SEA_LIFE_COUNT, './img/turtle.png');
  addItme('sealife', SEA_LIFE_COUNT, './img/seahorse.png');
  addItme('sealife', SEA_LIFE_COUNT, './img/shark.png');
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}