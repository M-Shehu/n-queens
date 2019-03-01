
window.workerTest = function(n, m) {
  // var workers = [];
  // var onmessageFunctions = [];
  
  // for (let i = 0; i < n; i++) {
  //   workers.push(new Worker("asyncWorker.js"));
  // }
  
  
  // for (let i = 0; i < n; i++) {
    
  // }
  
  var worker = new Worker("asyncWorker.js");
  
  postMessage([n, m]);
  
  worker.onmessage = function(e) {
    console.log(e.data);
  };
  
};


window.optimizeFindNQueenSolutionsUsingWebworkers = function(n, columnObj, majorObj, minorObj, row, column) {
  // create 3 objects for columns, major and minor diagonal indexes
  columnObj = columnObj || {};
  majorObj = majorObj || {};
  minorObj = minorObj || {};
  row = row || 0;
  column = column || 0;
  var count = 0;
  
  // create new workers
  // iterate through columns
  for (let c = 0; c < n; c++) {
    // check for conflicts
    if (optimiseCheckForConflicts(c, row, columnObj, majorObj, minorObj)) {
      // if there's conflict, continue the iteration;
      continue;
    } else {
      // else check if last row
      if (row + 1 === n) {
        // if last row, add one to count
        return 1;
      } else {
        columnObj[c] = c;
        majorObj[c - row] = c - row;
        minorObj[c + row] = c + row;
        count += optimizeFindNQueenSolutions(n, columnObj, majorObj, minorObj, row + 1);
        // remove position attributes from all three objects
        delete columnObj[c];
        delete majorObj[c - row];
        delete minorObj[c + row];
      }
    }
  }
  // return count
  return count;
    
};

window.optimiseCheckForConflicts = function(column, row, columnObj, majorObj, minorObj) {
  var majorInd = column - row;
  var minorInd = column + row;
  
  if (majorObj[majorInd] !== undefined) {
    return true;
  }
  if (minorObj[minorInd] !== undefined) {
    return true;
  }
  if (columnObj[column] !== undefined) {
    return true;
  }
  return false;
};