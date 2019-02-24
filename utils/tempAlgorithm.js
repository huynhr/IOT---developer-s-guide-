function fillColumn(n) {
  if (n === 1) {
    return [0, 1];
  }
  return [1, 1];
}

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

function createSenseHatLED(n, color, coordinates) {
  if (n === 0) {
    return '';
  }
  const twoDPlane = createTwoDimensions(n);
  const twoDPlaneColor = addColor(twoDPlane, color);
  const conCoordinates = convertCoordinates(twoDPlaneColor, coordinates.col1, coordinates.col2, coordinates.row);
  return createSenseHatString(conCoordinates);
}

module.exports = {
  addColor,
  convertCoordinates,
  createSenseHatLED,
  convertToSenseHatString,
  createSenseHatString,
  createTwoDimensions,
  fillColumn,
};
