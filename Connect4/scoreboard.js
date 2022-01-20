const express = require('express')

const app = express()

app.use(express.json())

app.post('/scoreboard', (req, res) => {
  const winnerScore = req.body
  console.log(winnerScore)
  res.json(winnerScore)
})

var bodyParser = require('body-parser')
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
extended: true
}))

app.use(express.static(__dirname + '/'))

app.get('/connect',function(req,res) {
res.sendFile(__dirname + '/index.html');
});

app.listen(4000)