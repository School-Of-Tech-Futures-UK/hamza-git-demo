const express = require('express')
const fs = require('fs')

const app = express()
// const leaderBoard = [{'playername':'Num1','score':35,'playercounter':'Red'},{'playername':'Num1','score':35,'playercounter':'Red'},{'playername':'Num1','score':35,'playercounter':'Red'},{'playername':'Num1','score':35,'playercounter':'Red'},{'playername':'Num1','score':35,'playercounter':'Red'},{'playername':'Num1','score':35,'playercounter':'Red'},{'playername':'Num1','score':35,'playercounter':'Red'},{'playername':'Num1','score':35,'playercounter':'Red'},{'playername':'Num1','score':35,'playercounter':'Red'},{'playername':'Num1','score':35,'playercounter':'Red'}]

// let leaderboard = require('jsonfile')

app.use(express.json())
app.use(express.static(__dirname + '/'))

app.post('/scoreboard', (req, res) => {
  const winnerScore = req.body
  // const winnerScore = JSON.stringify(req.body)
  let readJSON = fs.readFileSync(__dirname + '/leaderboard.json', 'utf8')
  let readScores = JSON.parse(readJSON)
  readScores.push(winnerScore)
  const postScores = JSON.stringify(readScores)
  // leaderBoard.push(winnerScore)
  fs.writeFile(__dirname + '/leaderboard.json', postScores, err => {
    console.log('write')
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
  // jsonFile.writeFile
  res.send('Ok')
})

app.get('/scoreboard_get', (req, res) => {
  const scoreJSON = fs.readFileSync(__dirname + '/leaderboard.json', 'utf8')
  res.send(scoreJSON)
})

// eslint-disable-next-line no-var
var bodyParser = require('body-parser')
const { response } = require('express')
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
