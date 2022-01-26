/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
function takeTurn (e) {
  // resetAnimation()

  const gameStateCopy = { ...gameState }
  const id = e.target.id
  const colNum = id[3]

  const minRow = getMinRow(colNum, gameStateCopy.gameBoard) // Lowest available row
  const switchPlayer = gameStateCopy.player1 === 'red' ? 'yellow' : 'red'

  if (minRow !== null && gameStateCopy.overallWinner == null && gameStateCopy.turn < 43) {
    gameStateCopy.turn++
    drawBoard(gameStateCopy, switchPlayer, minRow, colNum)
    const rowNumInt = Number(minRow)
    const colNumInt = Number(colNum)
    checkWinner(rowNumInt, colNumInt)
  }
}

function getMinRow (colNum, gameBoard) {
  for (let i = 5; i >= 0; i--) {
    if (gameBoard[i][colNum] === null) {
      return i
    }
  }
  return null
}

function checkRows (gameState, rowNumInt, colNumInt) {
  const gameStateCopy = { ...gameState }
  for (gameStateCopy.checkCell = 0; gameStateCopy.checkCell < 4; gameStateCopy.checkCell++) {
    // Rows
    if (gameStateCopy.gameBoard[rowNumInt][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]] === 'red' &&
        gameStateCopy.gameBoard[rowNumInt][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]] === 'red' &&
        gameStateCopy.gameBoard[rowNumInt][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]] === 'red' &&
        gameStateCopy.gameBoard[rowNumInt][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]] === 'red') {
      // eslint-disable-next-line no-return-assign
      gameStateCopy.overallWinner = 'red'
    } else if (gameStateCopy.gameBoard[rowNumInt][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]] === 'yellow' &&
        gameStateCopy.gameBoard[rowNumInt][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]] === 'yellow' &&
        gameStateCopy.gameBoard[rowNumInt][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]] === 'yellow' &&
        gameStateCopy.gameBoard[rowNumInt][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]] === 'yellow') {
      // eslint-disable-next-line no-return-assign
      gameStateCopy.overallWinner = 'yellow'
    } else { ; }
  }
  return gameStateCopy
}

function checkColumns (gameState, rowNumInt, colNumInt) {
  const gameStateCopy = { ...gameState }
  for (gameStateCopy.checkCell = 0; gameStateCopy.checkCell < 4; gameStateCopy.checkCell++) {
    if ((rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][0]) >= 0 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][0]) <= 5 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][1]) >= 0 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][1]) <= 5 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][2]) >= 0 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][2]) <= 5 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][3]) >= 0 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][3]) <= 5) {
      if (gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][0]][colNumInt] === 'red' &&
                    gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][1]][colNumInt] === 'red' &&
                    gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][2]][colNumInt] === 'red' &&
                    gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][3]][colNumInt] === 'red') {
      // eslint-disable-next-line no-return-assign
        gameStateCopy.overallWinner = 'red'
      } else if (gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][0]][colNumInt] === 'yellow' &&
                    gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][1]][colNumInt] === 'yellow' &&
                    gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][2]][colNumInt] === 'yellow' &&
                    gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][3]][colNumInt] === 'yellow') {
      // eslint-disable-next-line no-return-assign
        gameStateCopy.overallWinner = 'yellow'
      } else { ; }
    }
  }
  return gameStateCopy
}

function checkPosDiag (gameState, rowNumInt, colNumInt) {
  const gameStateCopy = { ...gameState }
  for (gameStateCopy.checkCell = 0; gameStateCopy.checkCell < 4; gameStateCopy.checkCell++) {
    if ((rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][0]) >= 0 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][0]) <= 5 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][1]) >= 0 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][1]) <= 5 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][2]) >= 0 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][2]) <= 5 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][3]) >= 0 &&
        (rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][3]) <= 5) {
      if (gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][0]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]] === 'red' &&
      gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][1]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]] === 'red' &&
      gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][2]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]] === 'red' &&
      gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][3]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]] === 'red') {
      // eslint-disable-next-line no-return-assign
        gameStateCopy.overallWinner = 'red'
      } else if (gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][0]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]] === 'yellow' &&
      gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][1]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]] === 'yellow' &&
      gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][2]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]] === 'yellow' &&
      gameStateCopy.gameBoard[rowNumInt - gameStateCopy.winMatrix[gameStateCopy.checkCell][3]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]] === 'yellow') {
        // eslint-disable-next-line no-return-assign
        gameStateCopy.overallWinner = 'yellow'
      } else { ; }
    }
  }
  return gameStateCopy
}

function checkNegDiag (gameState, rowNumInt, colNumInt) {
  const gameStateCopy = { ...gameState }
  for (gameStateCopy.checkCell = 0; gameStateCopy.checkCell < 4; gameStateCopy.checkCell++) {
    if ((rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]) >= 0 &&
        (rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]) <= 5 &&
        (rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]) >= 0 &&
        (rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]) <= 5 &&
        (rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]) >= 0 &&
        (rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]) <= 5 &&
        (rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]) >= 0 &&
        (rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]) <= 5) {
      if (gameStateCopy.gameBoard[rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]] === 'red' &&
       gameStateCopy.gameBoard[rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]] === 'red' &&
       gameStateCopy.gameBoard[rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]] === 'red' &&
       gameStateCopy.gameBoard[rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]] === 'red') {
        // eslint-disable-next-line no-return-assign
        gameStateCopy.overallWinner = 'red'
      } else if (gameStateCopy.gameBoard[rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][0]] === 'yellow' &&
      gameStateCopy.gameBoard[rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][1]] === 'yellow' &&
      gameStateCopy.gameBoard[rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][2]] === 'yellow' &&
      gameStateCopy.gameBoard[rowNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]][colNumInt + gameStateCopy.winMatrix[gameStateCopy.checkCell][3]] === 'yellow') {
        // eslint-disable-next-line no-return-assign
        gameStateCopy.overallWinner = 'yellow'
      } else { ; }
    }
  }
  return gameStateCopy
}

function updateScoreBoard (gameState, winningPlayerName, finalScore) {
  const uploadScore = { playername: winningPlayerName, score: finalScore, playercounter: gameState.overallWinner }
  fetch('http://localhost:4000/scoreboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(uploadScore)
  })
    .then(function (response) {
      if (response.ok) {
        return
      } throw new Error('Request Failed')
    })
    .catch(function (error) {
      console.log(error)
    })
}

const calculateScore = (gameState) => 42 - gameState.turn

const getLeaderboardData = async () => {
  const resp = await fetch('http://localhost:4000/scoreboard_get')
  const updatedData = await resp.json()
  return await processUpdatedData(updatedData)
}

// if (typeof exports === 'object') {
//   console.log('Running in Node')
//   module.exports = { getMinRow, calculateScore }
// } else {
//   console.log('Running in Browser')
// }
