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

// a function that iterates through and creates the y-coordinates;
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

function addColor(twoDPlane, color) {
  var output = twoDPlane.map((row) => {
    row.push(color);
    return row;
  });
  return output;
}

function convertCoordinates(twoDPlane, column1, column2, row) {
  // iterate through the plan
  // if index 0 !== 0 then make index 0 = to column1
  // make index 1 === column2
  // make index 2 === row
  return twoDPlane.map((row) => {
    if (row[0] !== 0) {
      row[0] = column1;
    }
    row[1] = column2;
    row[2] = row;
    return row;
  });
}

module.exports = {
  addColor,
  createTwoDimensions,
  fillColumn,
};
