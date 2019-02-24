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
  return twoDPlane.map((row) => {
    row.push(color);
    return row;
  });
}

function convertCoordinates(twoDPlane, column1, column2, row1) {
  return twoDPlane.map((row, i) => {
    if (row[0] !== 0) {
      row[0] = column1;
    }
    row[1] = column2;
    row[2] += row1;
    return row;
  });
}

function convertToSenseHatString(row) {
  if (row[0] === 0) {
    return `${row[1]},${row[2]},${row[3]}`;
  }
  return `${row[0]}-${row[1]},${row[2]},${row[3]}`;
}

function createSenseHatString(twoDPlane) {
  let output = '';
  twoDPlane.forEach((row) => {
    if (output.length === 0) {
      output += convertToSenseHatString(row);
    } else {
      output += ',' + convertToSenseHatString(row);
    }
  });
  return output;
}

module.exports = {
  addColor,
  convertCoordinates,
  convertToSenseHatString,
  createSenseHatString,
  createTwoDimensions,
  fillColumn,
};
