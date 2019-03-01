onmessage = function(e) {
  console.log('Worker: Message received from main script');
  //let result = e.data[0] * e.data[1];
  //postMessage(workerResult);
  var result = e.data[0] * e.data[1];
  
  console.log('Worker: Posting message back to main script');
  postMessage(result);
}