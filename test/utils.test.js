var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should(); 

const {
  addColor,
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
});