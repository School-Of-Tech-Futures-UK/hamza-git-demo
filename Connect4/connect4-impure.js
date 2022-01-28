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

function drawBoard (gameStateCopy, switchPlayer, minRow, colNum) {
  document.getElementById('playerIndicator').style.backgroundColor = switchPlayer
  gameState.gameBoard[minRow][colNum] = gameStateCopy.player1
  document.getElementById(`R${minRow}C${colNum}`).style.backgroundColor = gameStateCopy.player1
  document.getElementById(`R${minRow}C${colNum}`).classList.add('fall')
  gameStateCopy.player1 = switchPlayer
}

function checkWinner (rowNumInt, colNumInt) {
  const rowResult = checkRows(gameState, rowNumInt, colNumInt)
  const colResult = checkColumns(gameState, rowNumInt, colNumInt)
  const posDiagResult = checkPosDiag(gameState, rowNumInt, colNumInt)
  const negDiagResult = checkNegDiag(gameState, rowNumInt, colNumInt)
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
  const finalScore = calculateScore(gameState)
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
    updateScoreBoard(gameState, winningPlayerName, finalScore)
    winnerDisplay.style.display = 'block'
    winnerName.innerText = `${winningPlayerName} wins for the ${gameState.overallWinner} team! Final score: ${finalScore}`
    getLeaderboardData()
  // eslint-disable-next-line no-unused-expressions
  } else getLeaderboardData()
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

// if (typeof exports === 'object') {
//   module.exports = { getMinRow, calculateScore }
// } else { ; }
