/* eslint-disable no-undef */
const gameModule = require('./connect4')

describe('When calling the minRow function', () => {
  test('We can check the lowest possible position in a column', () => {
    // Arrange
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]
    const colNum = 1
    const expectedOut = 5
    // Act
    actualOut = gameModule.getMinRow(colNum, board)
    // Assert
    expect(actualOut).toBe(expectedOut)
  })
})

// describe('When calling the calculateScore function', () => {
//   test('We can determine the final score of the winner')
//   // Arrange
//   const turn = 7
//   const expectedOut = 35
//   // Act
//   actualOut = gameModule.calculateScore(turn)
//   console.log(actualOut)
//   // Assert
//   expect(actualOut).toBe(expectedOut)
// })

describe('When calling the minRow function', () => {
  test('We can check the lowest possible position in a column', () => {
    // Arrange
    const board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]
    const colNum = 1
    const expectedOut = 5
    // Act
    actualOut = gameModule.getMinRow(colNum, board)
    // Assert
    expect(actualOut).toBe(expectedOut)
  })
})
