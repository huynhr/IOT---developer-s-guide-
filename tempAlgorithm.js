// var temp = flow.get('temperature');
/**
 * limits on the x-axis is 1-2
 * limits on the y axis is 2-6
 * 
 */ 

// if (msg.payload.screen === 'on') {
//   msg.payload = "*,*,#800000,1-2,2-6,#C0C0C0,5-6,2-6,#C0C0C0";
// } else if (msg.payload.screen === "off") {
//   msg.payload = "*,*,green,1-2,2-6,#C0C0C0,5-6,2-6,#C0C0C0";
// } else {
//   msg.payload = "*,*,#000000";
// }


// return msg;


function fillColumn(n) {
  if (n === 1) {
    return [0, 1];
  }
  return [1, 1];
}

// a function that iterates through and creates the y-cordinate;
// output of this will be [[1, 1], [0, 1]] a matrix 2 by (n/2) where (n/2 is the rows);
// 
function createTwoDimensions(num) {
  let numb = num;
  let rowNumber = 0;
  let xyPlane = [];
  while (numb > 0) {
    const columnsFilled = fillColumn(numb);
    xyPlane.push([...columnsFilled, rowNumber]);
    rowNumber++;
    numb-= 2;
  }
  return xyPlane;
}

var output = createTwoDimensions(3);//[[1, 1, 0][0, 1, 1]]
console.log(output);
































