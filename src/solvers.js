/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({n:n});
  for (let i = 0; i < n; i++) {
    board.togglePiece(i, i);
    solution.push(board.get(i));
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //var solutionCount = undefined; //fixme
  var result = n;
  for (let i = n - 1; i > 1; i--) {
    n *= i;
  }
  console.log('Number of solutions for ' + n + ' rooks:', n);
  return n;
  //return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //var solution = undefined; //fixme
  if (n === 0) {
    console.log('Single solution for ' + n + ' queens:', JSON.stringify([]));
    return [];
  }
  var board = new Board({n:n});
  var solutions = findAllQueensSolutions(n, board, 0);
  if (solutions.length === 0) {
    return createBoardArray(new Board({n:n}));
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions[0]));
  return solutions[0];
  
  
  
  
  //return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  
  var board = new Board({n:n});
  var solutions = findAllQueensSolutions(n, board, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutions.length);
  
  return solutions.length;
};

window.findAllQueensSolutions = function(n, board, row) {
  var allBoards = []; // store all board Arrays for each index from 0 to n - 1;
  
  for (let c = 0; c < n; c++) {
    //place a piece at row 'row' and col 'c'
    board.togglePiece(row, c);
    if (hasAnyConflicts(board)) {
      board.togglePiece(row, c);
      continue;
    } else {
      if (row === n - 1) {
        allBoards.push(createBoardArray(board));
        board.togglePiece(row, c);
      } else {
        var nextBoards = findAllQueensSolutions(n, board, row + 1);
        for (let b = 0; b < nextBoards.length; b++) {
          allBoards.push(nextBoards[b]);
        }
        board.togglePiece(row, c);
      }
    }
  }
  
  return allBoards;
};

window.createBoardArray = function(board) {
  var arr = [];
  for (let i = 0; i < board.get('n'); i++) {
    var innerArr = [];
    for (let j = 0; j < board.get('n'); j++) {
      innerArr.push(board.get(i)[j]);
    }
    arr.push(innerArr);
  }
  
  return arr;
};


window.hasAnyConflicts = function(board) {
  if (board.hasAnyColConflicts()) {
    return true;
  }
  if (board.hasAnyRowConflicts()) {
    return true;
  }
  if (board.hasAnyMajorDiagonalConflicts()) {
    return true;
  }
  if (board.hasAnyMinorDiagonalConflicts()) {
    return true;
  }
  return false
}
















