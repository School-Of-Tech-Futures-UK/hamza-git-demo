let turn = 0
let player1 = 'red'
let resetInit = 0
let overallWinner = null
let checkCell = 0
let player1Score = 0
let player2Score = 0
let player1Name = ''
let player2Name = ''

let gameBoard = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null]
]

// eslint-disable-next-line no-unused-vars
const winMatrix = [
  [0, 1, 2, 3],
  [-1, 0, 1, 2],
  [-2, -1, 0, 1],
  [-3, -2, -1, 0]
]

function currentTurn () {
  if (turn === 0) {
    getLeaderboardData()
    document.getElementById('connect4Board').classList.remove('remove')
    // const playerTurn=document.getElementById("player-name")
    // playerTurn.innerText = "red";
  }
}

// eslint-disable-next-line no-unused-vars
function takeTurn (e) {
  currentTurn()

  const id = e.target.id

  const colNum = id[3]
  // const rowNum = id[1]

  const minRow = getMinRow(colNum, gameBoard) // Lowest available row

  if (minRow !== null && overallWinner == null && turn < 43) {
    turn++

    if (player1 === 'red') {
      document.getElementById('playerIndicator').style.backgroundColor = 'yellow'
      gameBoard[minRow][colNum] = 'red'
      document.getElementById(`R${minRow}C${colNum}`).style.backgroundColor = 'red'
      document.getElementById(`R${minRow}C${colNum}`).classList.add('fall')
      player1 = 'yellow'
      document.getElementById('player1Score').innerText = player1Score
    } else {
      document.getElementById('playerIndicator').style.backgroundColor = 'red'
      gameBoard[minRow][colNum] = 'yellow'
      document.getElementById(`R${minRow}C${colNum}`).style.backgroundColor = 'yellow'
      document.getElementById(`R${minRow}C${colNum}`).classList.add('fall')
      player1 = 'red'
      document.getElementById('player2Score').innerText = player2Score
    }

    // eslint-disable-next-line no-unused-vars
    const rowNumInt = Number(minRow) // Convert minRow from string to integer
    // eslint-disable-next-line no-unused-vars
    const colNumInt = Number(colNum) // Convert colNum from string to integer
    checkRows(rowNumInt, colNumInt)
    if (overallWinner === null) {
      checkColumns(rowNumInt, colNumInt)
      if (overallWinner === null) {
        checkPosDiag(rowNumInt, colNumInt)
        if (overallWinner === null) {
          checkNegDiag(rowNumInt, colNumInt)
        }
      }
    }
    displayWinner()
  }

  // console.log(`You clicked column ${colNum}`)
  // console.log(`Turn number ${turn}`)
  // console.log(gameBoard)
}

function getMinRow (colNum, gameBoard) {
  for (let i = 5; i >= 0; i--) {
    if (gameBoard[i][colNum] === null) {
      return i
    }
  }
  return null
}

// eslint-disable-next-line no-unused-vars
function resetBoard () {
  console.log('Game reset')
  turn = 0
  player1 = 'red'
  // eslint-disable-next-line no-undef
  minRow = 0
  resetInit = 1
  overallWinner = null
  player1Score = 42
  document.getElementById('player1Score').innerText = ''
  player2Score = 42
  document.getElementById('player2Score').innerText = ''
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
  gameBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]
  document.getElementById('connect4Board').classList.add('remove')
}

function displayWinner () {
  calculateScore()
  updateScoreBoard()
  getLeaderboardData()
  const winnerName = document.getElementById('winner-name')
  const winnerDisplay = document.getElementById('winner-display')
  // console.log(overallWinner)
  if (resetInit === 1) {
    winnerDisplay.style.display = 'none'
    resetInit = 0
  } else if (overallWinner === 'null') {
    winnerDisplay.style.display = 'none'
  } else if (overallWinner === 'red') {
    winnerDisplay.style.display = 'block'
    winnerName.innerText = 'red'
    // const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
    // // eslint-disable-next-line no-unused-vars
    // const offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
    //   // eslint-disable-next-line no-undef
    //   return new bootstrap.Offcanvas(offcanvasEl)
    // })
  } else if (overallWinner === 'yellow') {
    winnerDisplay.style.display = 'block'
    winnerName.innerText = 'yellow'
  } else if (turn === 42) {
    winnerDisplay.style.display = 'block'
    winnerName.innerText = 'nobody'
    return 'nobody'
  // eslint-disable-next-line no-unused-expressions
  } else null
}

function checkRows (rowNumInt, colNumInt) {
  for (checkCell = 0; checkCell < 4; checkCell++) {
    // Rows
    if (gameBoard[rowNumInt][colNumInt + winMatrix[checkCell][0]] === 'red' &&
        gameBoard[rowNumInt][colNumInt + winMatrix[checkCell][1]] === 'red' &&
        gameBoard[rowNumInt][colNumInt + winMatrix[checkCell][2]] === 'red' &&
        gameBoard[rowNumInt][colNumInt + winMatrix[checkCell][3]] === 'red') {
      // eslint-disable-next-line no-return-assign
      return overallWinner = 'red'
    } else if (gameBoard[rowNumInt][colNumInt + winMatrix[checkCell][0]] === 'yellow' &&
        gameBoard[rowNumInt][colNumInt + winMatrix[checkCell][1]] === 'yellow' &&
        gameBoard[rowNumInt][colNumInt + winMatrix[checkCell][2]] === 'yellow' &&
        gameBoard[rowNumInt][colNumInt + winMatrix[checkCell][3]] === 'yellow') {
      // eslint-disable-next-line no-return-assign
      return overallWinner = 'yellow'
    } else { overallWinner = null }
  }
}

function checkColumns (rowNumInt, colNumInt) {
  for (checkCell = 0; checkCell < 4; checkCell++) {
    if ((rowNumInt - winMatrix[checkCell][0]) >= 0 &&
        (rowNumInt - winMatrix[checkCell][0]) <= 5 &&
        (rowNumInt - winMatrix[checkCell][1]) >= 0 &&
        (rowNumInt - winMatrix[checkCell][1]) <= 5 &&
        (rowNumInt - winMatrix[checkCell][2]) >= 0 &&
        (rowNumInt - winMatrix[checkCell][2]) <= 5 &&
        (rowNumInt - winMatrix[checkCell][3]) >= 0 &&
        (rowNumInt - winMatrix[checkCell][3]) <= 5) {
      if (gameBoard[rowNumInt - winMatrix[checkCell][0]][colNumInt] === 'red' &&
                    gameBoard[rowNumInt - winMatrix[checkCell][1]][colNumInt] === 'red' &&
                    gameBoard[rowNumInt - winMatrix[checkCell][2]][colNumInt] === 'red' &&
                    gameBoard[rowNumInt - winMatrix[checkCell][3]][colNumInt] === 'red') {
      // eslint-disable-next-line no-return-assign
        return overallWinner = 'red'
      } else if (gameBoard[rowNumInt - winMatrix[checkCell][0]][colNumInt] === 'yellow' &&
                    gameBoard[rowNumInt - winMatrix[checkCell][1]][colNumInt] === 'yellow' &&
                    gameBoard[rowNumInt - winMatrix[checkCell][2]][colNumInt] === 'yellow' &&
                    gameBoard[rowNumInt - winMatrix[checkCell][3]][colNumInt] === 'yellow') {
      // eslint-disable-next-line no-return-assign
        return overallWinner = 'yellow'
      } else { overallWinner = null }
    }
  }
}

function checkPosDiag (rowNumInt, colNumInt) {
  for (checkCell = 0; checkCell < 4; checkCell++) {
    if ((rowNumInt - winMatrix[checkCell][0]) >= 0 &&
        (rowNumInt - winMatrix[checkCell][0]) <= 5 &&
        (rowNumInt - winMatrix[checkCell][1]) >= 0 &&
        (rowNumInt - winMatrix[checkCell][1]) <= 5 &&
        (rowNumInt - winMatrix[checkCell][2]) >= 0 &&
        (rowNumInt - winMatrix[checkCell][2]) <= 5 &&
        (rowNumInt - winMatrix[checkCell][3]) >= 0 &&
        (rowNumInt - winMatrix[checkCell][3]) <= 5) {
      if (gameBoard[rowNumInt - winMatrix[checkCell][0]][colNumInt + winMatrix[checkCell][0]] === 'red' &&
      gameBoard[rowNumInt - winMatrix[checkCell][1]][colNumInt + winMatrix[checkCell][1]] === 'red' &&
      gameBoard[rowNumInt - winMatrix[checkCell][2]][colNumInt + winMatrix[checkCell][2]] === 'red' &&
      gameBoard[rowNumInt - winMatrix[checkCell][3]][colNumInt + winMatrix[checkCell][3]] === 'red') {
      // eslint-disable-next-line no-return-assign
        return overallWinner = 'red'
      } else if (gameBoard[rowNumInt - winMatrix[checkCell][0]][colNumInt + winMatrix[checkCell][0]] === 'yellow' &&
      gameBoard[rowNumInt - winMatrix[checkCell][1]][colNumInt + winMatrix[checkCell][1]] === 'yellow' &&
      gameBoard[rowNumInt - winMatrix[checkCell][2]][colNumInt + winMatrix[checkCell][2]] === 'yellow' &&
      gameBoard[rowNumInt - winMatrix[checkCell][3]][colNumInt + winMatrix[checkCell][3]] === 'yellow') {
        // eslint-disable-next-line no-return-assign
        return overallWinner = 'yellow'
      } else { overallWinner = null }
    }
  }
}

function checkNegDiag (rowNumInt, colNumInt) {
  for (checkCell = 0; checkCell < 4; checkCell++) {
    if ((rowNumInt + winMatrix[checkCell][0]) >= 0 &&
        (rowNumInt + winMatrix[checkCell][0]) <= 5 &&
        (rowNumInt + winMatrix[checkCell][1]) >= 0 &&
        (rowNumInt + winMatrix[checkCell][1]) <= 5 &&
        (rowNumInt + winMatrix[checkCell][2]) >= 0 &&
        (rowNumInt + winMatrix[checkCell][2]) <= 5 &&
        (rowNumInt + winMatrix[checkCell][3]) >= 0 &&
        (rowNumInt + winMatrix[checkCell][3]) <= 5) {
      if (gameBoard[rowNumInt + winMatrix[checkCell][0]][colNumInt + winMatrix[checkCell][0]] === 'red' &&
       gameBoard[rowNumInt + winMatrix[checkCell][1]][colNumInt + winMatrix[checkCell][1]] === 'red' &&
       gameBoard[rowNumInt + winMatrix[checkCell][2]][colNumInt + winMatrix[checkCell][2]] === 'red' &&
       gameBoard[rowNumInt + winMatrix[checkCell][3]][colNumInt + winMatrix[checkCell][3]] === 'red') {
        // eslint-disable-next-line no-return-assign
        return overallWinner = 'red'
      } else if (gameBoard[rowNumInt + winMatrix[checkCell][0]][colNumInt + winMatrix[checkCell][0]] === 'yellow' &&
      gameBoard[rowNumInt + winMatrix[checkCell][1]][colNumInt + winMatrix[checkCell][1]] === 'yellow' &&
      gameBoard[rowNumInt + winMatrix[checkCell][2]][colNumInt + winMatrix[checkCell][2]] === 'yellow' &&
      gameBoard[rowNumInt + winMatrix[checkCell][3]][colNumInt + winMatrix[checkCell][3]] === 'yellow') {
        // eslint-disable-next-line no-return-assign
        return overallWinner = 'yellow'
      } else { overallWinner = null }
    }
  }
}

// function updateScoreBoard () {
//   const fetch = require('node-fetch')

//   fetch('localhost:4000/scoreboard')
//     .then(resp => resp.json())
//   const getHighestScore = async () => {
//     const resp = await fetch('localhost:4000/scoreboard')
//     const json = await resp.json()
//     return await json.score
//   }

//   getHighestScore().then(
//     score => console.log(`Ditto's score is ${score}`)
//   )
// }

function updateScoreBoard () {
  if (overallWinner === 'red') {
    const uploadScore = { playername: player1Name, score: player1Score, playercounter: 'red' }
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
  } else if (overallWinner === 'yellow') {
    const uploadScore = { playername: player2Name, score: player2Score, playercounter: 'ellow' }
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
  } else return null
}

// eslint-disable-next-line no-unused-vars
function closeOverlay () {
  document.getElementById('overlay').style.display = 'none'
  player1Name = document.getElementById('playername1').value
  player2Name = document.getElementById('playername2').value
  // console.log(document.getElementById('player1Name').innerHTML)
}

function calculateScore () {
  if (overallWinner === 'red') {
    player1Score = 42 - turn
    player2Score = 0
  } else if (overallWinner === 'yellow') {
    player1Score = 0
    player2Score = 42 - turn
  } else {
    player1Score = 0
    player2Score = 0
  }
}

const getLeaderboardData = async () => {
  const resp = await fetch('http://localhost:4000/scoreboard')
  const updatedData = await resp.json()
  return await processUpdatedData(updatedData)
}

function processUpdatedData (updatedData) {
  if (turn > 0) {
    const sortByScore = (a, b) => b.score - a.score
    let sortedData = updatedData.sort(sortByScore)
    console.log(sortedData)
    // eslint-disable-next-line no-undef
    for (i = 0; i < 5 && i < sortedData.length; i++) {
      // eslint-disable-next-line no-undef
      document.getElementById(`scoreName${i + 1}`).innerText = sortedData[i].playername
      // eslint-disable-next-line no-undef
      document.getElementById(`scoreValue${i + 1}`).innerText = sortedData[i].score
    }
  }
}
