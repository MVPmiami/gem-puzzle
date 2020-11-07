const desktop = document.querySelector('.game-desktop');
const main = document.querySelector('main');
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
}

// событие на кнопке new game
let newGame = document.querySelector('.new-game');
let gameMenu = document.querySelector('.active-game-menu');
let gameMenuList = document.querySelector('.active-game-menu-list');

newGame.addEventListener('click', ()=>{
  gameMenu.classList.remove('active-game-menu');
  gameMenuList.classList.remove('active-game-menu-list');
  gameMenuList.classList.add('hidden-game-menu-list');
  generatorCountClick();
  resetButton();
  generateNewGame();
  menuClick();
  setTimeout(musicGame,500);
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
  //console.log(x);
  //console.log(y);
  //console.log(pos);
  console.log(emptyPlate);
  //console.log(xEmpty);
  //console.log(yEmpty);
  //console.log(posEmpty);
  console.log(xDifferent);
  console.log(yDifferent);



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

// Звук перемещения плитки

function musicMove(){
  let audio = new Audio();
  audio.src = 'assets/move.mp3';
  audio.autoplay = true;
}

function musicGame(){
  let audio = new Audio();
  audio.src = 'assets/game.mp3';
  audio.autoplay = true;
  audio.volume = 0.2;
  audio.loop = 'loop';
}

function menuClick(){
  let audio = new Audio();
  audio.src = 'assets/menu-click.mp3';
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
  clearDesktop();
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
  generateNewGame();
 }); 
}

//счетчик ходов
let count = 0;

function generatorCountClick() {
  let  countClick = document.createElement('div');
  let span = document.createElement('span');
  span.innerHTML = `Steps: `;
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








