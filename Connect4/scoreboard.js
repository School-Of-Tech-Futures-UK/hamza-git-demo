const express = require('express')

const app = express()
const leaderBoard = []

app.use(express.json())

app.post('/scoreboard', (req, res) => {
  const winnerScore = req.body
  leaderBoard.push(winnerScore)
})

app.get('/scoreboard', (req, res) => {
  res.send(leaderBoard)
})

var bodyParser = require('body-parser')
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

// eslint-disable-next-line node/no-path-concat
app.use(express.static(__dirname + '/'))

app.get('/connect', function (req, res) {
// eslint-disable-next-line node/no-path-concat
  res.sendFile(__dirname + '/index.html')
})

app.listen(4000)
