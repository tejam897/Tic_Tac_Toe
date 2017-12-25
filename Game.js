//const Player = require('./TTTplayer.js');

const Game = function(level = 1){
  this.level = level;
  this.players = this.createPlayerList();
  this.currentPlayerIndex = 0;
  this.status = 'Player1 Turn';
  this.totalMoves = [];
}

Game.prototype.getTotalMoves = function(){
  let Players = this.players;
  return Players.reduce(function(totalMoves,player){
    return totalMoves.concat(player.playedMoves);
  },[])
}

Game.prototype.isGameDrawn = function(){
  let totalMovesPlayed = this.getTotalMoves();
  return totalMovesPlayed.length == 9;
}

Game.prototype.getCell_IDS_OfTable = function(){
  let level = this.level;
  let gridSize = level+2;
  let movesToPlay = gridSize*gridSize;
  let moves = [];
  for (var i = 0; i < movesToPlay; i++) {
    moves.push(i+1);
  }
  return moves;
}

Game.prototype.createPlayerList = function(){
  let playingLevel = this.level
  let player1 = new Player('Player1','X',playingLevel);
  let player2 = new Player('Player2','O',playingLevel);
  let playersList = [player1,player2];
  return playersList;
}

Game.prototype.changePlayerTurn = function(){
  this.currentPlayerIndex = 1 - this.currentPlayerIndex;
  return this.currentPlayerIndex;
}

Game.prototype.getCurrentPlayer = function(){
  return this.players[this.currentPlayerIndex];
}

Game.prototype.updateStatus = function(){
  let player = this.getCurrentPlayer();
  if (player.hasWon()){
    this.totalMoves = [1,2,3,4,5,6,7,8,9];
    return this.status = player.PlayerName+' won';
  } else if (this.isGameDrawn()){
    return this.status = 'Draw';
  }
  this.changePlayerTurn();
  player = this.getCurrentPlayer();
  return this.status = player.PlayerName+' Turn';
}

Game.prototype.isMoveAlreadyPlayed = function(move){
  let totalMoves = this.getTotalMoves();
  console.log('get Total moves function giving',totalmoves);
  console.log('current move'+move);
  console.log('total moves',this.totalMoves);
  return totalMoves.includes(move);
}

Game.prototype.playMove = function(move){
  this.totalMoves.push(move);

  let player = this.getCurrentPlayer();
  player.addMove(move);
  this.updateStatus();
}

//module.exports = Game;
