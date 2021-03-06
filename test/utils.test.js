var chai = require('chai');
var expect = chai.expect;

const {
  addColor,
  convertCoordinates,
  convertToSenseHatString,
  createSenseHatLED,
  createSenseHatString,
  createTwoDimensions,
  fillColumn,
} = require('../utils/tempAlgorithm');

describe('UTILS TESTING SUITE: ', () => {
  describe('fillColumn', () => {
    it('Should return [1, 1] for any number not 1', () => {
      const output = fillColumn(3);
      expect(output).to.eql([1, 1]);
    });
    it ('Should return [0, 1] for 1', () => {
      const output = fillColumn(1);
      expect(output).to.eql([0, 1]);
    }) 
  });

  describe('createTwoDimensions', () => {
    it('Should create two rows with one row completely filled', () => {
      const output = createTwoDimensions(3);
      expect(output).to.eql([[1, 1, 0], [0, 1, 1]]);
    });
    it('Should create two rows with both columns filled', () => {
      const output = createTwoDimensions(4);
      expect(output).to.eql([[1, 1, 0], [1, 1, 1]]);
    });
    it('Should create three rows with the last columns un-filled', () => {
      const output = createTwoDimensions(5);
      expect(output).to.eql([[1, 1, 0], [1, 1, 1], [0, 1, 2]]);
    });
    it('Should create three rows with all columns filled', () => {
      const output = createTwoDimensions(6);
      expect(output).to.eql([[1, 1, 0], [1, 1, 1], [1, 1, 2]]);
    });
  });

  describe('addColor', () => {
    it('Should add a color as the 3rd index', () => {
      const twoDPlane = createTwoDimensions(3);
      const output = addColor(twoDPlane, '#C0C0C0');
      expect(output).to.eql([[1, 1, 0, '#C0C0C0'], [0, 1, 1, '#C0C0C0']]);
    });
  });

  describe('convertCoordinates', () => {
    it('Should add the correct coordinate values passed in for column and row', () => {
      const twoDPlane = createTwoDimensions(3);
      const colorTwoDPlane = addColor(twoDPlane, '#C0C0C0');
      const output = convertCoordinates(colorTwoDPlane, 1, 2, 2);
      expect(output).to.eql([[1, 2, 2, '#C0C0C0'], [0, 2, 3, '#C0C0C0']]);
    });
  });

  describe('convertToSenseHatString', () => {
    it('Should convert the array into a SenseHat string', () => {
      const output = convertToSenseHatString([1, 2, 2, '#C0C0C0']);
      expect(output).to.eql('1-2,2,#C0C0C0');
    });
    it('Should handle one column', () => {
      const output = convertToSenseHatString([0, 2, 2, '#C0C0C0']);
      expect(output).to.eql('2,2,#C0C0C0');
    });
  });

  describe('createSenseHatString', () => {
    it('Should convert the 2D coordinates into a SenseHat String', () => {
      const twoDPlane = createTwoDimensions(3);
      const twoDPlaneColor = addColor(twoDPlane, '#C0C0C0');
      const conCoordinates = convertCoordinates(twoDPlaneColor, 1, 2, 2);
      const output = createSenseHatString(conCoordinates);
      expect(output).to.eql('1-2,2,#C0C0C0,2,3,#C0C0C0');
    });
  });

  describe('createSenseHatLED', () => {
    it('Should glue all the helper functions together to make the string', () => {
      const output = createSenseHatLED(3, '#C0C0C0', {col1: 1, col2: 2, row: 2});
      expect(output).to.be.equal('1-2,2,#C0C0C0,2,3,#C0C0C0');
    });
    it('Should work with 0', () => {
      const output = createSenseHatLED(0, '#C0C0C0', { col1: 1, col2: 2, row: 2 });
      expect(output).to.be.equal('');
    });
  });
});