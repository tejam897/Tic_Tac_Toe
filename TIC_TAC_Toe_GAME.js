let game = new Game();

const displayStatus = function(){
  let statusBoard = document.getElementById('statusBoard');
  statusBoard.innerText = game.status;
}

const playMove = function(event){
  let position =  event.target;
  let move = +position.id;
  if(game.isMoveAlreadyPlayed(move)) return;
  let selectedMove = document.getElementById(move);
  let player = game.getCurrentPlayer();
  selectedMove.innerText = player.symbol;
  game.playMove(move);
  displayStatus();
}

const changeToResetButton = function(button){
  button = document.getElementById(button);
  button.innerText = 'resetGame';
  return button;
}

const reset = function(){
  location.reload()
}

const playGame = function(){
  let resetButton = changeToResetButton('startButton')
  resetButton.onclick = reset;
  let table= document.getElementById('LEVEL 1');
  displayStatus();
  table.onclick = playMove;
}

const errorMessage = function(){
  let message = 'Please click on start button to start game'
  alert(message);
}

const loadGame = function(){
  let table= document.getElementById('LEVEL 1');
  table.onclick = errorMessage;
  let startButton = document.getElementById('startButton');
  startButton.onclick = playGame;
}

window.onload = loadGame;
