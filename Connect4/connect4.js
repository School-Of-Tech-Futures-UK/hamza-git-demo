// eslint-disable-next-line prefer-const
let gameState = {
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

// function resetAnimation () {
//   if (gameState.turn === 0) {
//     getLeaderboardData()
//     document.getElementById('connect4Board').classList.remove('remove')
//     // const playerTurn=document.getElementById("player-name")
//     // playerTurn.innerText = "red";
//   }
// }

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

function drawBoard (gameStateCopy, switchPlayer, minRow, colNum) {
  document.getElementById('playerIndicator').style.backgroundColor = switchPlayer
  gameState.gameBoard[minRow][colNum] = gameStateCopy.player1
  document.getElementById(`R${minRow}C${colNum}`).style.backgroundColor = gameStateCopy.player1
  document.getElementById(`R${minRow}C${colNum}`).classList.add('fall')
  // gameState.player1 = 'yellow'
}

function getMinRow (colNum, gameBoard) {
  for (let i = 5; i >= 0; i--) {
    if (gameBoard[i][colNum] === null) {
      return i
    }
  }
  return null
}

function checkWinner (rowNumInt, colNumInt) {
  const rowResult = checkRows(rowNumInt, colNumInt)
  const colResult = checkColumns(rowNumInt, colNumInt)
  const posDiagResult = checkPosDiag(rowNumInt, colNumInt)
  const negDiagResult = checkNegDiag(rowNumInt, colNumInt)
  if (rowResult.overallWinner !== null) {
    gameState = rowResult
  } else if (colResult.overallWinner !== null) {
    gameState = colResult
  } else if (posDiagResult.overallWinner !== null) {
    gameState = posDiagResult
  } else if (negDiagResult.overallWinner !== null) {
    gameState = negDiagResult
  } else { ; }
  const winningPlayerName = gameState.overallWinner === 'red' ? gameState.player1Name : gameState.player2Name
  displayWinner(winningPlayerName)
}

// eslint-disable-next-line no-unused-vars
function resetBoard () {
  gameState.turn = 0
  gameState.player1 = 'red'
  // eslint-disable-next-line no-undef
  minRow = 0
  gameState.resetInit = 1
  gameState.overallWinner = null
  document.getElementById('playerIndicator').style.backgroundColor = 'red'
  displayWinner()
  for (let i = 0; i <= 5; i++) {
    for (let j = 0; j <= 6; j++) {
      document.getElementById(`R${i}C${j}`).innerText = null
      document.getElementById(`R${i}C${j}`).style.backgroundColor = 'white'
      document.getElementById(`R${i}C${j}`).classList.remove('fall')
      console.log((`R${i}C${j}`).innerText)
    }
  }
  gameState.gameBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]
  document.getElementById('connect4Board').classList.add('remove')
  openOverlay()
}

function displayWinner (winningPlayerName) {
  const finalScore = calculateScore()
  const winnerName = document.getElementById('winner-name')
  const winnerDisplay = document.getElementById('winner-display')

  if (gameState.resetInit === 1) {
    winnerDisplay.style.display = 'none'
    gameState.resetInit = 0
  } else if (gameState.overallWinner === 'null') {
    winnerDisplay.style.display = 'none'
  } else if (gameState.turn === 42) {
    winnerDisplay.style.display = 'block'
    winnerDisplay.style.display = 'Nobody wins'
  } else if (gameState.overallWinner !== null) {
    updateScoreBoard(winningPlayerName, finalScore)
    winnerDisplay.style.display = 'block'
    winnerName.innerText = `${winningPlayerName} wins for the ${gameState.overallWinner} team! Final score: ${finalScore}`
    getLeaderboardData()
  // eslint-disable-next-line no-unused-expressions
  } else getLeaderboardData()
}

function checkRows (rowNumInt, colNumInt) {
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

function checkColumns (rowNumInt, colNumInt) {
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

function checkPosDiag (rowNumInt, colNumInt) {
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

function checkNegDiag (rowNumInt, colNumInt) {
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

function updateScoreBoard (winningPlayerName, finalScore) {
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

// eslint-disable-next-line no-unused-vars
function closeOverlay () {
  document.getElementById('overlay').style.display = 'none'
  gameState.player1Name = document.getElementById('playername1').value
  gameState.player2Name = document.getElementById('playername2').value
  document.getElementById('playername1Value').innerText = gameState.player1Name
  document.getElementById('playername2Value').innerText = gameState.player2Name
  // console.log(document.getElementById('player1Name').innerHTML)
}

function openOverlay () {
  document.getElementById('overlay').style.display = 'block'
  gameState.player1Name = document.getElementById('playername1').value
  gameState.player2Name = document.getElementById('playername2').value
  // console.log(document.getElementById('player1Name').innerHTML)
}

const calculateScore = () => 42 - gameState.turn

const getLeaderboardData = async () => {
  const resp = await fetch('http://localhost:4000/scoreboard_get')
  const updatedData = await resp.json()
  return await processUpdatedData(updatedData)
}

function processUpdatedData (updatedData) {
  if (gameState.turn > 0) {
    const sortByScore = (a, b) => b.score - a.score
    // eslint-disable-next-line prefer-const
    let sortedData = updatedData.sort(sortByScore)
    // eslint-disable-next-line no-undef
    for (i = 0; i < 10 && i < sortedData.length; i++) {
      // eslint-disable-next-line no-undef
      document.getElementById(`scoreName${i + 1}`).innerText = `${sortedData[i].playername} (${sortedData[i].playercounter})`
      // eslint-disable-next-line no-undef
      document.getElementById(`scoreValue${i + 1}`).innerText = sortedData[i].score
    }
  }
}

if (typeof exports === 'object') {
  console.log('Running in Node')
  module.exports = { getMinRow, calculateScore }
} else {
  console.log('Running in Browser')
}
