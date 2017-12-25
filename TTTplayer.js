const isSubset = function(set,superset){
  return set.every(function(element){
    return superset.includes(element);
  })
}

const Player = function(name,symbol,playingLevel){
  this.PlayerName = name;
  this.symbol = symbol;
  this.currentPlayingLevel = playingLevel;
  this.playedMoves = [];
}

Player.prototype.addMove = function (move) {
  this.playedMoves.push(move);
};

Player.prototype.getCell_IDS_OfTable = function(){
  let level = this.currentPlayingLevel;
  let gridSize = level+2;
  let numberOfmovesToPlay = gridSize*gridSize;
  let moves = [];
  for (var i = 0; i < numberOfmovesToPlay; i++) {
    moves.push(i+1);
  }
  return moves;
}

Player.prototype.getRowWinningCombinations = function(){
  let level = this.currentPlayingLevel;
  let rows = level+2;
  let moves = this.getCell_IDS_OfTable();
  let rowCombinations = [];
  for (var id = 0; id < moves.length; id+=rows) {
    let combination = moves.slice(id,id+rows);
    rowCombinations.push(combination);
  }
  return rowCombinations;
}

Player.prototype.getColumnWinningCombinations = function(){
  let level = this.currentPlayingLevel;
  let totalColumns = level+2;
  let moves = this.getCell_IDS_OfTable();
  let columnCombinations = []
  for (var column = 0; column < totalColumns; column++) {
    let combination = [];
    for (var i = column; i < moves.length; i+=totalColumns) {
      combination.push(moves[i]);
    }
    columnCombinations.push(combination);
  }
  return columnCombinations;
}

Player.prototype.getDiagonalWinningCombinations = function(){
  let rowCombinations = this.getRowWinningCombinations();
  return rowCombinations.reduce(function(diagonalsList,combination,index){
    let RightToLeftdiagonal = diagonalsList[0];
    let LeftToRightdiagonal = diagonalsList[1];
    let indexOfLeftToRightDiagonalid = combination.length-1-index;
    RightToLeftdiagonal.push(combination[index]);
    LeftToRightdiagonal.push(combination[indexOfLeftToRightDiagonalid]);
    return [RightToLeftdiagonal,LeftToRightdiagonal]
  },[[],[]])
}

Player.prototype.getWinningCombinations = function(){
  let combinations = this.getRowWinningCombinations();
  combinations = combinations.concat(this.getColumnWinningCombinations());
  combinations = combinations.concat(this.getDiagonalWinningCombinations());
  return combinations;
}

Player.prototype.hasWon = function(){
  let winningCombinations = this.getWinningCombinations();
  let playedMoves = this.playedMoves;
  return winningCombinations.some(function(combination){
    return isSubset(combination,playedMoves)
  })
}

//module.exports = Player;
