let turn = 0
let player1 = "red"
let resetInit=0
let overallWinner = null

let gameBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]

function currentTurn(){

    //console.log(turn)
    if (turn==0){
        const playerTurn=document.getElementById("player-name")
        playerTurn.innerText = "red";
    }
}

function takeTurn(e) {

    const id = e.target.id   // R0C0
    // 'rowY-colX' 

    const colNum = id[3]
    const rowNum = id[1]

    const minRow = getMinRow(colNum, gameBoard)
    // console.log(`Lowest available row: ${minRow}`)

    if (minRow !== null) {
        turn++

        if (player1 === "red") {
            document.getElementById("playerIndicator").style.backgroundColor="yellow";
            gameBoard[minRow][colNum] = "red"
            document.getElementById(`R${minRow}C${colNum}`).style.backgroundColor = 'red';            // document.getElementById(`R${minRow}C${colNum}`).innerText="Red"
            player1 = "yellow"
        } else {
            document.getElementById("playerIndicator").style.backgroundColor="red";
            gameBoard[minRow][colNum] = "yellow"
            document.getElementById(`R${minRow}C${colNum}`).style.backgroundColor = 'yellow';
            player1 = "red"
        }

        // const playerTurn=document.getElementById("player-name")
        // playerTurn.innerText = player1;
        checkWinner(minRow,colNum)
        displayWinner()

    }


    // console.log(`You clicked column ${colNum}`)
    //console.log(`Turn number ${turn}`)
    // console.log(gameBoard)
}


function getMinRow(colNum, gameBoard) {
    for (let i = 5; i >= 0; i--) {
        if (gameBoard[i][colNum] === null) {
            return i
        }
    }
    return null;
}

function resetBoard() {
    console.log("Game reset")
    turn=0
    player1 = "red"
    minRow=0
    resetInit=1
    displayWinner()
    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
            document.getElementById(`R${i}C${j}`).innerText=null
            document.getElementById(`R${i}C${j}`).style.backgroundColor="white"
            console.log((`R${i}C${j}`).innerText)
        }
    }
    let gameBoard = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]
}

function displayWinner(){
    const winnerName=document.getElementById("winner-name")
    const winnerDisplay=document.getElementById("winner-display")
    //console.log(overallWinner)
    if (resetInit==1){
        winnerDisplay.style.display="none";
        resetInit=0
    }else if (overallWinner=="null"){
        winnerDisplay.style.display="none";
    }else if (overallWinner=="red"){
        winnerDisplay.style.display = "block";
        winnerName.innerText = "red";
    }else if (overallWinner=="yellow"){
        winnerDisplay.style.display = "block";
        winnerName.innerText = "yellow";
    } else if (turn==42){
        winnerDisplay.style.display = "block";
        winnerName.innerText = "nobody";
        return "nobody"
    }else null
}

function checkWinner(minRow,colNum){
    let winRow1=[0,1,2,3]
    let winRow2=[-1,0,1,2]
    let winRow3=[-2,-1,0,2]
    let winRow =[
        [0,1,2,3],
        [-1,0,1,2],
        [-2,-1,0,1],
        [-3,-2,-1,0]
    ]
    let rowNumInt = Number(minRow)
    let colNumInt = Number(colNum)
    
    for (checkRow=0; checkRow<4 && colNumInt; checkRow++){
            // console.log(obj={
            //     current: gameBoard[rowNumInt][colNumInt+winRow[checkRow][0]],
            //     plus1: gameBoard[rowNumInt][colNumInt+winRow[checkRow][1]],
            //     plus2: gameBoard[rowNumInt][colNumInt+winRow[checkRow][2]],
            //     plus3: gameBoard[rowNumInt][colNumInt+winRow[checkRow][3]]
            // })
            if (gameBoard[rowNumInt][colNumInt+winRow[checkRow][0]]=="red" 
            && gameBoard[rowNumInt][colNumInt+winRow[checkRow][1]]=="red" 
            && gameBoard[rowNumInt][colNumInt+winRow[checkRow][2]]=="red" 
            && gameBoard[rowNumInt][colNumInt+winRow[checkRow][3]]=="red"){
                console.log("Red Wins")
                return overallWinner=="red"
            } else null
        }

    // let winRowFinal = winRow.filter((col) => col >= 0 && col<= 6 && col<=colNumInt+4 && col>=colNumInt-4)
    // winRowFinal=winRowFinal.sort()
    // console.log(winRowFinal)

    // for (r=rowNumInt; r>=0 && r<=5; r)[

    // ]

//     for (r=rowNumInt; r>=0 && r<=5; r){
//         for (c=colNum; c>=0 && c<=6; c++){
//             if (gameBoard[r][c]!=="red" && gameBoard[r][c+1]!=="red" && gameBoard[r][c+2]=="red" && gameBoard[r][c+3]=="red") {
//                     console.log("Winner")
//                     return overallWinner="red"
//             }else if (gameBoard[r][c]=="red" && gameBoard[r][c-1]=="red" && gameBoard[r][c-2]=="red" && gameBoard[r][c-3]=="red") {
//                 console.log("Winner")
//                 return overallWinner="red"
//             }else return overallWinner=null
//         }
//     }
}