const desktop = document.querySelector('.game-desktop');
const main = document.querySelector('main');
const menuList = document.querySelector('.active-game-menu-list');
const menuBtn = document.createElement('div');
let isGame = false;
let result = [];
let countResult = 1;
let victoryWindow;
let countItem = [];
let item1;
let item2;
let item3;
let item4;
let item5;
let item6;
let item7;
let item8;
let item9;
let item10;
let item11;
let item12;
let item13;
let item14;
let item15;
let num;
let numArr = [];
// Получаем массив из рандомных чисел до 15
function randomNum(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

randomNum(1,15);
numArr.push(num);
for(let i = 1; i <= 14; i++ ){
  randomNum(1,15);
  if(numArr.indexOf(num) < 0){
    numArr.push(num);
  }else{
    i = i - 1;
    continue;
  }
}

// генератор новой игры
function generateNewGame() {
    for(let i = 0; i < 16; i++){
      if(i === 15){
        let element = document.createElement('div');
        element.className = `empty-plates-puzzles`;
        desktop.appendChild(element);
        element.classList.add(`position-${i}`);
      }else{
        let element = document.createElement('div');
        let span = document.createElement('span');
        span.innerHTML = `${numArr[i]}`;
        element.className = `puzzle-${numArr[i]} plates-puzzles`;
        element.appendChild(span);
        desktop.appendChild(element);
        element.classList.add(`position-${i}`);
      }
    }
    item1 = document.querySelector('.puzzle-1');
    item2 = document.querySelector('.puzzle-2');
    item3 = document.querySelector('.puzzle-3');
    item4 = document.querySelector('.puzzle-4');
    item5 = document.querySelector('.puzzle-5');
    item6 = document.querySelector('.puzzle-6');
    item7 = document.querySelector('.puzzle-7');
    item8 = document.querySelector('.puzzle-8');
    item9 = document.querySelector('.puzzle-9');
    item10 = document.querySelector('.puzzle-10');
    item11 = document.querySelector('.puzzle-11');
    item12 = document.querySelector('.puzzle-12');
    item13 = document.querySelector('.puzzle-13');
    item14 = document.querySelector('.puzzle-14');
    item15 = document.querySelector('.puzzle-15');
}

// событие на кнопке new game
let newGame = document.querySelector('.new-game');
let gameMenu = document.querySelector('.active-game-menu');
let gameMenuList = document.querySelector('.active-game-menu-list');

newGame.addEventListener('click', ()=>{
  gameMenu.classList.remove('active-game-menu');
  gameMenuList.classList.remove('active-game-menu-list');
  gameMenuList.classList.add('hidden-game-menu-list');
  desktop.classList.add('position-desktop');
  setInterval(checkVictory,2000);
  generatorTimer();
  setInterval(timer, 1000);
  generatorCountClick();
  resetButton();
  generateMenuBtn();
  generateNewGame();
  menuClick();
  setTimeout(musicGame,500);
  isGame = true;
});


//координаты элемента
desktop.addEventListener('click', (event) => {
  let target = event.target;
  let emptyPlate = document.querySelector('.empty-plates-puzzles');
  let xEmpty = emptyPlate.getBoundingClientRect().x;
  let yEmpty = emptyPlate.getBoundingClientRect().y;
  let posEmpty = emptyPlate.getBoundingClientRect();
  let x = target.getBoundingClientRect().x;
  let y = target.getBoundingClientRect().y;
  let pos =target.getBoundingClientRect();
  let xDifferent = xEmpty - x;
  let yDifferent = yEmpty - y;
  
  if(target.tagName === 'DIV'){
    console.log(target.innerText);
  }else{
    console.log(target.innerHTML);
    target = target.parentNode;
  }
  console.log(x);
  console.log(y);
  //console.log(pos);
  //console.log(emptyPlate);
  //console.log(xEmpty);
  //console.log(yEmpty);
  //console.log(posEmpty);
  //console.log(xDifferent);
  //console.log(yDifferent);



  if((xDifferent === 154 || xDifferent === 149) && (yDifferent === 154 || yDifferent === 113.5)){
    return;
  }else if((xDifferent === -154 || xDifferent === -159) && (yDifferent === -154 || yDifferent === -194.5)){
    return;
  }else if((xDifferent === 154 || xDifferent === 149) && (yDifferent === -154 || yDifferent === -113.5)){
    return;
  }else if((xDifferent === -154 || xDifferent === -159) && (yDifferent === 154 || yDifferent === 194.5)){
    return;
  }else if((xDifferent === -154 || xDifferent === -159) && (yDifferent === 154 || yDifferent === 113.5)){
    return;
  }else if((xDifferent === 154 || xDifferent === 149) && (yDifferent === -154 || yDifferent === -194.5)){
    return;
  }
// Определяем разницу координатов
  if(xDifferent === 154 || xDifferent === 149){
    if(yDifferent > 10 || yDifferent < -50){
      return;
    }
    toRight(target,emptyPlate);
  }else if(xDifferent === -154 || xDifferent === -159){
    if(yDifferent > 10 || yDifferent < -50){
      return;
    }
    toLeft(target,emptyPlate);
  }

  if(yDifferent === 154 || yDifferent === 113.5){
    if(xDifferent > 10 || xDifferent < -50){
      return;
    }
    toBottom(target,emptyPlate);
  }else if(yDifferent === -154 || yDifferent === -194.5){
    if(xDifferent > 10 || xDifferent < -50){
      return;
    }
    toTop(target,emptyPlate);
  }

});
// функции передвижений
function toRight(target,emptyPlate){
let leftTarget = window.getComputedStyle(target).left;
let leftEmptyPlate = window.getComputedStyle(emptyPlate).left;
if(leftTarget === '0px'){
  leftTarget = leftTarget.substr(0,1);
  leftEmptyPlate = leftEmptyPlate.substr(0,3);
  leftTarget = +leftTarget;
  leftEmptyPlate = +leftEmptyPlate;
  leftTarget += 154;
  leftEmptyPlate -= 154;
  target.style.left = `${leftTarget}px`;
  emptyPlate.style.left = `${leftEmptyPlate}px`;
  musicMove();
  CountClick()
}else{
  leftEmptyPlate = leftEmptyPlate.substr(0,3);
  leftTarget = leftTarget.substr(0,3);
  leftTarget = +leftTarget;
  leftEmptyPlate = +leftEmptyPlate;
  leftTarget += 154;
  leftEmptyPlate -= 154;
  target.style.left = `${leftTarget}px`;
  emptyPlate.style.left = `${leftEmptyPlate}px`;
  musicMove();
  CountClick()
}
}

function toLeft(target,emptyPlate){
  let leftTarget = window.getComputedStyle(target).left;
  let leftEmptyPlate = window.getComputedStyle(emptyPlate).left;
  if(leftEmptyPlate === '0px'){
    leftEmptyPlate = leftEmptyPlate.substr(0,1);
    leftTarget = leftTarget.substr(0,3);
    leftEmptyPlate = +leftEmptyPlate;
    leftTarget = +leftTarget;
    leftTarget -= 154;
    leftEmptyPlate += 154;
    target.style.left = `${leftTarget}px`;
    emptyPlate.style.left = `${leftEmptyPlate}px`;
    musicMove();
    CountClick();
  }else{
    leftEmptyPlate = leftEmptyPlate.substr(0,3);
    leftTarget = leftTarget.substr(0,3);
    leftTarget = +leftTarget;
    leftEmptyPlate = +leftEmptyPlate;
    leftTarget -= 154;
    leftEmptyPlate += 154;
    target.style.left = `${leftTarget}px`;
    emptyPlate.style.left = `${leftEmptyPlate}px`;
    musicMove();
    CountClick();
  }
 }
 
function toBottom(target,emptyPlate){
  let leftTarget = window.getComputedStyle(target).top;
  let leftEmptyPlate = window.getComputedStyle(emptyPlate).top;
  if(leftTarget === '0px'){
    leftTarget = leftTarget.substr(0,1);
    leftEmptyPlate = leftEmptyPlate.substr(0,3);
    leftEmptyPlate = +leftEmptyPlate;
    leftTarget = +leftTarget;
    leftTarget += 154;
    leftEmptyPlate -= 154;
    target.style.top = `${leftTarget}px`;
    emptyPlate.style.top = `${leftEmptyPlate}px`;
    musicMove();
    CountClick();
  }else{
    leftEmptyPlate = leftEmptyPlate.substr(0,3);
    leftTarget = leftTarget.substr(0,3);
    leftTarget = +leftTarget;
    leftEmptyPlate = +leftEmptyPlate;
    leftTarget += 154;
    leftEmptyPlate -= 154;
    target.style.top = `${leftTarget}px`;
    emptyPlate.style.top = `${leftEmptyPlate}px`;
    musicMove();
    CountClick();
  }
}

function toTop(target,emptyPlate){
  let leftTarget = window.getComputedStyle(target).top;
  let leftEmptyPlate = window.getComputedStyle(emptyPlate).top;
  if(leftEmptyPlate === '0px'){
    leftEmptyPlate = leftEmptyPlate.substr(0,1);
    leftTarget = leftTarget.substr(0,3);
    leftEmptyPlate = +leftEmptyPlate;
    leftTarget = +leftTarget;
    leftTarget -= 154;
    leftEmptyPlate += 154;
    target.style.top = `${leftTarget}px`;
    emptyPlate.style.top = `${leftEmptyPlate}px`;
    musicMove();
    CountClick();
  }else{
    leftEmptyPlate = leftEmptyPlate.substr(0,3);
    leftTarget = leftTarget.substr(0,3);
    leftTarget = +leftTarget;
    leftEmptyPlate = +leftEmptyPlate;
    leftTarget -= 154;
    leftEmptyPlate += 154;
    target.style.top = `${leftTarget}px`;
    emptyPlate.style.top = `${leftEmptyPlate}px`;
    musicMove();
    CountClick();
  }
}  

// Звуки

function musicMove(){
  let audio = new Audio();
  audio.src = 'assets/move.mp3';
  audio.autoplay = true;
}
let gameMusic;
function musicGame(){
  gameMusic = new Audio();
  gameMusic.src = 'assets/game.mp3';
  gameMusic.autoplay = true;
  gameMusic.volume = 0.2;
  gameMusic.loop = 'loop';
}

function musicGameOff(){
  gameMusic.autoplay = false;
  gameMusic.volume = 0;
}

function menuClick(){
  let audio = new Audio();
  audio.src = 'assets/menu-click.mp3';
  audio.autoplay = true;
  audio.volume = 1;
}

function musicWin(){
  let audio = new Audio();
  audio.src = 'assets/win.mp3';
  audio.autoplay = true;
  audio.volume = 1;
}

// кнопка сброса игры во время игры

function clearDesktop(){
  desktop.innerHTML = '';
  numArr = [];
}

function resetButton() {
  let  reset = document.createElement('div');
  let span = document.createElement('span');
  span.innerHTML = 'Reset';
  reset.className = 'reset-button';
  reset.appendChild(span);
  main.appendChild(reset);

  
 // навешиваем событие на резет
 reset.addEventListener('click',() =>{
  resetCount();
  clearDesktop();
  clearVictoryWindow();
  resetTimer();
  randomNum(1,15);
  musicGameOff();
  musicGame();
  desktop.appendChild(gameMenu);
  gameMenu.appendChild(gameMenuList);
  gameMenuList.classList.add('hidden-game-menu-list');
  numArr.push(num);
  for(let i = 1; i <= 14; i++ ){
    randomNum(1,15);
    if(numArr.indexOf(num) < 0){
      numArr.push(num);
    }else{
      i = i - 1;
      continue;
    }
  }
  generateNewGame();
 }); 
}

//счетчик ходов
let count = 0;

function generatorCountClick() {
  let  countClick = document.createElement('div');
  let span = document.createElement('span');
  span.innerHTML = `Steps: ${count}`;
  span.className = 'counter';
  countClick.className = 'count-click';
  countClick.appendChild(span);
  main.appendChild(countClick);
}

function CountClick(){
  count = +count + 1;
  count = count.toString();

  let counter = document.querySelector('.counter');
  counter.innerHTML = `Steps: ${count}`;
}

function resetCount() {
  count = 0;

  let counter = document.querySelector('.counter');
  counter.innerHTML = `Steps: ${count}`;
}

// Таймер
let min = 0;
let sec = 0;
function generatorTimer() {
  let timer = document.createElement('div');
  let span = document.createElement('span');
  span.innerHTML = `${min} : ${sec}`;
  span.classList.add('clock');
  timer.classList.add('timer');
  timer.appendChild(span);
  main.appendChild(timer);
}

function timer() {
  let timer = document.querySelector('.clock');
  sec++;
  if(sec === 60){
    min++;
    sec = 0;
  }
  timer.innerHTML = `${min} : ${sec}`;
}

function resetTimer() {
  let timer = document.querySelector('.clock');
  min = 0;
  sec = 0;
  timer.innerHTML = `${min} : ${sec}`;
}

//делаем кнопку меню в игре 

function generateMenuBtn() {
  menuBtn.classList.add('menu-button');
  menuBtn.innerHTML = 'Menu';
  main.appendChild(menuBtn);
}

const resume = document.createElement('li');

menuBtn.addEventListener('click', ()=>{
  resume.innerHTML = 'Resume';
  resume.classList.add('resume');
  gameMenuList.appendChild(resume);
  newGame.classList.add('hidden-game-menu-list');
  gameMenu.classList.add('active-game-menu');
  gameMenuList.classList.add('active-game-menu-list');
  gameMenuList.classList.remove('hidden-game-menu-list');
});

resume.addEventListener('click', ()=>{
  newGame.classList.add('hidden-game-menu-list');
  gameMenu.classList.remove('active-game-menu');
  gameMenuList.classList.remove('active-game-menu-list');
  gameMenuList.classList.add('hidden-game-menu-list');
  gameMenuList.removeChild(resume);
});

// определяем победу


function checkVictory() {
  countItem = [];
  let xcoord = item15.getBoundingClientRect().x;
  let ycoord = item15.getBoundingClientRect().y;
  console.log(`x-coord: ${xcoord}`);
  console.log(`y-coord: ${ycoord}`);
  if(item1.getBoundingClientRect().x === 654 && item1.getBoundingClientRect().y === 212){
    countItem.push('1')
  }
  if( item2.getBoundingClientRect().x === 808 && item2.getBoundingClientRect().y === 212){
    countItem.push('2')
  }
  if( item3.getBoundingClientRect().x === 962 && item3.getBoundingClientRect().y === 212){
    countItem.push('3')
  }
  if( item4.getBoundingClientRect().x === 1116 && item4.getBoundingClientRect().y === 212){
    countItem.push('4')
  }
  if( item5.getBoundingClientRect().x === 654 && item5.getBoundingClientRect().y === 366){
    countItem.push('5')
  }
  if( item6.getBoundingClientRect().x === 808 && item6.getBoundingClientRect().y === 366){
    countItem.push('6')
  }
  if( item7.getBoundingClientRect().x === 962 && item7.getBoundingClientRect().y === 366){
    countItem.push('7')
  }
  if( item8.getBoundingClientRect().x === 1116 && item8.getBoundingClientRect().y === 366){
    countItem.push('8')
  }
  if( item9.getBoundingClientRect().x === 654 && item9.getBoundingClientRect().y === 520){
    countItem.push('9')
  }
  if( item10.getBoundingClientRect().x === 808 && item10.getBoundingClientRect().y === 520){
    countItem.push('10')
  }
  if( item11.getBoundingClientRect().x === 962 && item11.getBoundingClientRect().y === 520){
    countItem.push('11')
  }
  if( item12.getBoundingClientRect().x === 1116 && item12.getBoundingClientRect().y === 520){
    countItem.push('12')
  }
  if( item13.getBoundingClientRect().x === 654 && item13.getBoundingClientRect().y === 674){
    countItem.push('13')
  }
  if( item14.getBoundingClientRect().x === 808 && item14.getBoundingClientRect().y === 674){
    countItem.push('14')
  }
  if( item15.getBoundingClientRect().x === 962 && item15.getBoundingClientRect().y === 674){
    countItem.push('15')
  }
  console.log(` length: ${main.children.length}`);
  console.log(` length-item: ${countItem.length}`);
  if(main.children.length === 5){
    if(countItem.length === 15){
      generateVictoryWindow(min,sec,count);
      setResultToStorage(min,sec,count);
    }
  }else{
    return;
  }
}

function generateVictoryWindow(min,sec,count){
  victoryWindow = document.createElement('div');
  victoryWindow.classList.add('victory-window');
  let victoryH1 = document.createElement('h1');
  victoryH1.classList.add('victory');
  victoryH1.innerHTML = 'VICTORY';
  let timeVictory = document.createElement('span');
  timeVictory.classList.add('time-victory');
  timeVictory.innerHTML = `time: ${min} : ${sec}`;
  let br = document.createElement('br');
  let stepsVictory = document.createElement('span');
  stepsVictory.classList.add('steps-victory');
  stepsVictory.innerHTML = `steps: ${count}`;

  victoryWindow.appendChild(victoryH1)
  victoryWindow.appendChild(timeVictory)
  victoryWindow.appendChild(br);
  victoryWindow.appendChild(stepsVictory)
  main.appendChild(victoryWindow);
  victoryWindow = document.querySelector('.victory-window');
  victoryWindow.classList.remove('victory-window-hidden');
  musicWin();
  musicGameOff();
}

function clearVictoryWindow(){
  if(main.children.length === 5){
    return;
  }else{
    victoryWindow.classList.add('victory-window-hidden');
    main.removeChild(victoryWindow);
  }
}

//результаты

let bestScores = document.querySelector('.best-scores');

bestScores.addEventListener('click', ()=>{
  let newGame = document.querySelector('.new-game');
  let bestScores = document.querySelector('.best-scores');
  let rules = document.querySelector('.rules');
  let settings = document.querySelector('.settings');
  newGame.classList.add('hidden-items');
  bestScores.classList.add('hidden-items');
  rules.classList.add('hidden-items');
  settings.classList.add('hidden-items');
  generateScoresWindow();
});

function generateListElementsOfBestScore(listBestScores) {
  for(let i = 1; i <= 10; i++){
    let listElement = document.createElement('li');
    let resultElem = localStorage.getItem(i);
    console.log();
    resultElem = JSON.parse(resultElem);
    if(resultElem == undefined){
      listElement.innerHTML = `${i})-------------------`;
    }else{
      listElement.innerHTML = `${i}) ${resultElem}`;
    }
    listElement.classList.add('list-element');
    listBestScores.appendChild(listElement);
  }
}

function generateScoresWindow(){
  if(isGame === true){
    gameMenuList.removeChild(resume);
  }
  let backToMenuBtn = document.createElement('div');
  backToMenuBtn.classList.add('back-to-menu-btn');
  backToMenuBtn.innerHTML = 'Back';
  let scoreWindow = document.createElement('div');
  scoreWindow.classList.add('score-window');
  menuList.appendChild(scoreWindow);
  scoreWindow.appendChild(backToMenuBtn);
  let listBestScores = document.createElement('ul');
  listBestScores.classList.add('list-best-scores');
  scoreWindow.appendChild(listBestScores);
  generateListElementsOfBestScore(listBestScores);
  //навешиваем событие на кнопку вернутся в меню
  backToMenuBtn.addEventListener('click', ()=> {
    if(isGame === true){
      gameMenuList.appendChild(resume);
    }
    let newGame = document.querySelector('.new-game');
    let bestScores = document.querySelector('.best-scores');
    let rules = document.querySelector('.rules');
    let settings = document.querySelector('.settings');
    newGame.classList.remove('hidden-items');
    bestScores.classList.remove('hidden-items');
    rules.classList.remove('hidden-items');
    settings.classList.remove('hidden-items');
    menuList.removeChild(scoreWindow);
  });
}
// записывае в локальное хранилище результаты

function setResultToStorage () {
  if(localStorage.length === 0){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(1,JSON.stringify(result));
  }else if(localStorage.length === 1){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(2,JSON.stringify(result));
  }else if(localStorage.length === 2){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(3,JSON.stringify(result));
  }else if(localStorage.length === 3){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(4,JSON.stringify(result));
  }else if(localStorage.length === 4){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(5,JSON.stringify(result));
  }else if(localStorage.length === 5){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(6,JSON.stringify(result));
  }else if(localStorage.length === 6){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(7,JSON.stringify(result));
  }else if(localStorage.length === 7){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(8,JSON.stringify(result));
  }else if(localStorage.length === 8){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(9,JSON.stringify(result));
  }else if(localStorage.length === 9){
    result.push(`Time  ${min} : ${sec} , steps ${count}`);
    localStorage.setItem(10,JSON.stringify(result));
  }
}
