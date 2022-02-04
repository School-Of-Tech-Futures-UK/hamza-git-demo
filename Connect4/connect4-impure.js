/* eslint-disable no-undef */
/* eslint-disable node/no-path-concat */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line prefer-const

// Object that contains all variables required to control the game
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

// Responsible for placing discs on board
function drawBoard (gameStateCopy, switchPlayer, minRow, colNum) {
  document.getElementById('playerIndicator').style.backgroundColor = switchPlayer
  gameState.gameBoard[minRow][colNum] = gameStateCopy.player1
  document.getElementById(`R${minRow}C${colNum}`).style.backgroundColor = gameStateCopy.player1
  document.getElementById(`R${minRow}C${colNum}`).classList.add('fall')
  gameStateCopy.player1 = switchPlayer
}

// Collates checkRow, checkCol, checkPosDiag, checkNegDiag (from connect4-pure) to determine winner of the game
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

// Clears the board so that a new game can be played
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

// Opens overlay to present the winner and leaderboard
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
    winnerDisplay.style.display = 'flex'
    winnerName.innerText = 'Nobody wins!'
    document.getElementById('winnerOverlay').style.display = 'flex'
  } else if (gameState.overallWinner !== null) {
    updateScoreBoard(gameState, winningPlayerName, finalScore)
    winnerDisplay.style.display = 'flex'
    winnerName.innerText = `${winningPlayerName} wins for the ${gameState.overallWinner} team! Final score: ${finalScore}`
    winnerName.style.color = gameState.overallWinner
    getLeaderboardData()
    document.getElementById('winnerOverlay').style.display = 'flex'
  // eslint-disable-next-line no-unused-expressions
  } else getLeaderboardData()
}

// Checks to ensure whether player name fields are not left empty
function validateFields () {
  if (document.getElementById('playername1').value === '' && document.getElementById('playername2').value === '') {
    document.getElementById('nameError').style.display = 'block'
    document.getElementById('error1').style.color = 'red'
    document.getElementById('error2').style.color = 'red'
  } else if (document.getElementById('playername1').value === '') {
    document.getElementById('nameError').style.display = 'block'
    document.getElementById('error1').style.color = 'red'
    document.getElementById('error2').style.color = 'white'
  } else if (document.getElementById('playername2').value === '') {
    document.getElementById('nameError').style.display = 'block'
    document.getElementById('error1').style.color = 'white'
    document.getElementById('error2').style.color = 'red'
  } else {
    closeOverlay()
  }
}

// Closes the overlay once player names are entered
function closeOverlay () {
  resetBoard()
  document.getElementById('nameError').style.display = 'none'
  document.getElementById('overlay').style.display = 'none'
  gameState.player1Name = document.getElementById('playername1').value
  gameState.player2Name = document.getElementById('playername2').value
  document.getElementById('playername1Value').innerText = gameState.player1Name
  document.getElementById('playername2Value').innerText = gameState.player2Name
  // console.log(document.getElementById('player1Name').innerHTML)
}

// Opens the overlay to allow user to enter player names
function openOverlay () {
  document.getElementById('error1').style.color = 'white'
  document.getElementById('error2').style.color = 'white'
  document.getElementById('winnerOverlay').style.display = 'none'
  document.getElementById('overlay').style.display = 'flex'
  gameState.player1Name = document.getElementById('playername1').value
  gameState.player2Name = document.getElementById('playername2').value
  // console.log(document.getElementById('player1Name').innerHTML)
}

// Orders leaderboard data from highest to lowest and populates the leaderboard
function processUpdatedData (updatedData) {
  if (gameState.turn > 0) {
    const sortByScore = (a, b) => b.score - a.score
    // eslint-disable-next-line prefer-const
    let sortedData = updatedData.sort(sortByScore)
    // eslint-disable-next-line no-undef
    for (let i = 0; i < 10 && i < sortedData.length; i++) {
      // eslint-disable-next-line no-undef
      document.getElementById(`scoreName${i + 1}`).innerText = sortedData[i].playername
      // eslint-disable-next-line no-undef
      document.getElementById(`scoreValue${i + 1}`).innerText = sortedData[i].score
      document.getElementById(`scoreValue${i + 1}`).style.color = sortedData[i].playercounter
    }
  }
}

// Creates an overlay when a winner/nobody is a winner is declared
function winnerOverlay () {
  const winnerOverlay = document.getElementsByTagName('winnerOverlay')
  document.getElementById('winnerOverlay').style.display = 'flex'
}
