const test = {};
const Player = require('./TTTplayer.js');
const Game = require('./Game.js');
const assert = require('assert');
exports.test = test;
test['player.addMove() will add given move into player playedMoves'] = function(){
  let player = new Player('X','player',1);
  player.addMove(2);
  assert.deepEqual(player.playedMoves,[2])
}

test['player.hasWon() will return true if player moves is a subset for one of winningCombinations'] = function(){
  let player = new Player('X','player',1);
  player.playedMoves = [1,3,5,7];
  assert.ok(player.hasWon());
}

test['player.hasWon() will return false if player moves is not a subset for any of winningCombinations'] = function(){
  let player = new Player('X','player',1);
  player.playedMoves = [4,7,8];
  assert.ok(!player.hasWon());
}

test['Player.getRowWinningCombinations() will give a list of rows with ids of a table in a list according to level'] = function(){
  let player = new Player('X','player',1);
  let expextedList = [[1,2,3],[4,5,6],[7,8,9]];
  assert.deepEqual(player.getRowWinningCombinations(),expextedList)
}

test['Player.getColumnWinningCombinations() will give a list of columns with ids of a table in a list according to level'] = function(){
  let player = new Player('X','Player',1);
  let expectedList = [[1,4,7],[2,5,8],[3,6,9]];
  assert.deepEqual(player.getColumnWinningCombinations(),expectedList);
}

test['Player.getdiagonalWinningCombinations() will give a list of 2 diagonals with ids of a table in a list according to level'] = function(){
  let player = new Player('X','Player',1);
  let expectedList = [[1,5,9],[3,5,7]];
  assert.deepEqual(player.getDiagonalWinningCombinations(),expectedList);
}

test['Player.getWinningCombinations() will give all possible winning combination for a level'] = function(){
  let player = new Player('X','Player',1);
  let expectedList = [
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7]
  ];
  assert.deepEqual(player.getWinningCombinations(),expectedList);
}

test['Game.isGameDrawn() should return true if totalMovesPlayed by all players is 9'] = function(){
  let game = new Game();
  let player1 = game.players[0];
  let player2 = game.players[1];
  player1.playedMoves = [1,2,3,4,5];
  player2.playedMoves = [1,2,3,4];
  assert.ok(game.isGameDrawn());
}

test['Game.isGameDrawn() should return false if totalMovesPlayed by all players is not equal to 9'] = function(){
  let game = new Game();
  let player1 = game.players[0];
  let player2 = game.players[1];
  player1.playedMoves = [1,2,3,4,5];
  player2.playedMoves = [1,2];
  assert.ok(!game.isGameDrawn());
}

test['Game.getTotalMoves() should give sum of the list of total moves played by all players'] = function(){
  let game = new Game();
  let player1 = game.players[0];
  let player2 = game.players[1];
  player1.playedMoves = [1,2,3,4,5];
  player2.playedMoves = [1,2,3,4];
  assert.deepEqual(game.getTotalMoves(),[1,2,3,4,5,1,2,3,4]);
}

test['Game.updateStatus() will change game status to won if player won the game'] = function(){
  let game = new Game();
  let player1 = game.players[0];
  let player2 = game.players[1];
  player1.playedMoves = [1,3,5,7];
  game.updateStatus();

  assert.deepEqual(game.status,'Player1 won')
}

test['Game.updateStatus() will change game status to draw if game is draw'] = function(){
  let game = new Game();
  let player1 = game.players[0];
  let player2 = game.players[1];
  player1.playedMoves = [2,4,5,7];
  player2.playedMoves = [1,3,6,8,9];
  game.updateStatus();
  assert.deepEqual(game.status,'Draw')
}

test['Game.updateStatus() will change game status to continue game if player not won the game and game is not drawn'] = function(){
  let game = new Game();
  let player1 = game.players[0];
  let player2 = game.players[1];
  player1.playedMoves = [1,2];
  game.updateStatus();
  assert.deepEqual(game.status,'Player2 Turn')
}


test['Game.getCurrentPlayer() will give the current player according to currentPlayerIndex'] = function(){
  let game = new Game();
  let player1 = game.players[0];
  player1.playedMoves = [];
  let expectedPlayerObject = {PlayerName:"Player1",symbol:'X',playedMoves:[],currentPlayingLevel:1};
  assert.deepEqual(game.getCurrentPlayer(),expectedPlayerObject);
}

test['Game.changePlayerTurn() will change currentPlayerIndex'] = function(){
  let game = new Game();
  assert.ok(game.changePlayerTurn(),1)
}


test['Game/Player.getMovesToPlay() should give a number list from 1 to 9 if level is 1'] = function(){
  let game = new Game();
  let player = new Player('teja','X',1)
  let expectedMoves = [1,2,3,4,5,6,7,8,9];
  assert.deepEqual(game.getCell_IDS_OfTable(),expectedMoves);
  assert.deepEqual(player.getCell_IDS_OfTable(),expectedMoves);
}

test['Game.createPlayerList() should give a list of two new Players with symbol X,O and names player1 and player2'] = function(){
  let game = new Game();
  let players = game.createPlayerList();
  assert.ok(players.length,2)
}
