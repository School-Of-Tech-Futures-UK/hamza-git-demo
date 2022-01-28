/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable no-undef */
const gameModule = require('./connect4-pure')

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

describe('When determining the winning colour', () => {
  test('We can check rows to determine if there are 4 reds in a row', () => {
  // Arrange
    const passArray = []
    const gameState = {
      turn: 0,
      player1: 'red',
      resetInit: 0,
      overallWinner: null,
      checkCell: 0,
      player1Score: 0,
      player2Score: 0,
      player1Name: '',
      player2Name: '',
      gameBoard: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ],
      winMatrix: [
        [0, 1, 2, 3],
        [-1, 0, 1, 2],
        [-2, -1, 0, 1],
        [-3, -2, -1, 0]
      ]
    }
    let passScore = 0
    const rowNumInt = 5
    const colNumInt = 0
    const expectedWinner = 'red'
    const expectedPassState = 'pass'
    // Act
    for (i = rowNumInt; i >= 0; i--) {
      let checkCol = 0
      for (j = colNumInt; j < 4; j++) {
        gameState.gameBoard = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        passScore = 0
        gameState.gameBoard[i][j] = 'red'
        gameState.gameBoard[i][j + 1] = 'red'
        gameState.gameBoard[i][j + 2] = 'red'
        gameState.gameBoard[i][j + 3] = 'red'
        // console.log(gameState.gameBoard)
        for (k = checkCol; k < (checkCol + 4) && checkCol < 4; k++) {
          actualOut = gameModule.checkRows(gameState, i, k)
          if (actualOut.overallWinner === expectedWinner) {
            passScore++
          } else { passScore = 0 }
        }
        checkCol++
        if (passScore === 4) {
          passArray.push('pass')
        } else {
          passArray.push('fail')
        }
      }
    }
    passArray.sort()
    actualPassState = passArray[0]
    // Assert
    expect(actualPassState).toBe(expectedPassState)
  })

  test('We can check rows to determine if there are 4 reds in a column', () => {
    // Arrange
    const passArray = []
    const gameState = {
      turn: 0,
      player1: 'red',
      resetInit: 0,
      overallWinner: null,
      checkCell: 0,
      player1Score: 0,
      player2Score: 0,
      player1Name: '',
      player2Name: '',
      gameBoard: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ],
      winMatrix: [
        [0, 1, 2, 3],
        [-1, 0, 1, 2],
        [-2, -1, 0, 1],
        [-3, -2, -1, 0]
      ]
    }
    let passScore = 0
    const rowNumInt = 5
    const colNumInt = 0
    const expectedWinner = 'red'
    const expectedPassState = 'pass'
    // Act
    for (i = colNumInt; i < 2; i++) {
      let checkRow = 5
      for (j = rowNumInt; j >= 4; j--) {
        gameState.gameBoard = [
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null]
        ]
        passScore = 0
        gameState.gameBoard[j][i] = 'red'
        gameState.gameBoard[j - 1][i] = 'red'
        gameState.gameBoard[j - 2][i] = 'red'
        gameState.gameBoard[j - 3][i] = 'red'
        // console.log(gameState.gameBoard)
        for (k = checkRow; k > (checkRow - 4) && checkRow > 0; k--) {
          actualOut = gameModule.checkColumns(gameState, k, i)
          if (actualOut.overallWinner === expectedWinner) {
            passScore++
          } else { passScore = 0 }
        }
        checkRow--
        // console.log(passScore)
        if (passScore === 4) {
          passArray.push('pass')
        } else {
          passArray.push('fail')
        }
      }
    }
    passArray.sort()
    actualPassState = passArray[0]
    // Assert
    expect(actualPassState).toBe(expectedPassState)
  })

  test('We can check the diagonals to determine if there are 4 colours in a positive diagonal', () => {
    // Arrange
    const gameState = {
      turn: 0,
      player1: 'red',
      resetInit: 0,
      overallWinner: null,
      checkCell: 0,
      player1Score: 0,
      player2Score: 0,
      player1Name: '',
      player2Name: '',
      gameBoard: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 'red', null, null, null],
        [null, null, 'red', null, null, null, null],
        [null, 'red', null, null, null, null, null],
        ['red', null, null, null, null, null, null]
      ],
      winMatrix: [
        [0, 1, 2, 3],
        [-1, 0, 1, 2],
        [-2, -1, 0, 1],
        [-3, -2, -1, 0]
      ]
    }
    const rowNumInt = 5
    const colNumInt = 0
    const expectedWinner = 'red'
    // Act
    actualOut = gameModule.checkPosDiag(gameState, rowNumInt, colNumInt)
    // Assert
    expect(actualOut.overallWinner).toBe(expectedWinner)
  })

  test('We can check the diagonals to determine if there are 4 colours in a negative diagonal', () => {
    // Arrange
    const gameState = {
      turn: 0,
      player1: 'red',
      resetInit: 0,
      overallWinner: null,
      checkCell: 0,
      player1Score: 0,
      player2Score: 0,
      player1Name: '',
      player2Name: '',
      gameBoard: [
        ['red', null, null, null, null, null, null],
        [null, 'red', null, null, null, null, null],
        [null, null, 'red', null, null, null, null],
        [null, null, null, 'red', null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ],
      winMatrix: [
        [0, 1, 2, 3],
        [-1, 0, 1, 2],
        [-2, -1, 0, 1],
        [-3, -2, -1, 0]
      ]
    }
    const rowNumInt = 0
    const colNumInt = 0
    const expectedWinner = 'red'
    // Act
    actualOut = gameModule.checkNegDiag(gameState, rowNumInt, colNumInt)
    // Assert
    expect(actualOut.overallWinner).toBe(expectedWinner)
  })
})
