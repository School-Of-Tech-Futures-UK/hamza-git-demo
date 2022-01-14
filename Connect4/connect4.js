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

    if (turn==0){
        const playerTurn=document.getElementById("player-name")
        playerTurn.innerText = "red";
    }
}

function takeTurn(e) {

    const id = e.target.id

    const colNum = id[3]
    const rowNum = id[1]

    const minRow = getMinRow(colNum, gameBoard) //Lowest available row

    if (minRow !== null && overallWinner==null && turn<43) {
        turn++

        if (player1 === "red") {
            document.getElementById("playerIndicator").style.backgroundColor="yellow";
            gameBoard[minRow][colNum] = "red"
            document.getElementById(`R${minRow}C${colNum}`).style.backgroundColor = 'red';
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
    overallWinner=null
    document.getElementById("playerIndicator").style.backgroundColor="red";
    displayWinner()
    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 6; j++) {
            document.getElementById(`R${i}C${j}`).innerText=null
            document.getElementById(`R${i}C${j}`).style.backgroundColor="white"
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
    let winMatrix =[
        [0,1,2,3],
        [-1,0,1,2],
        [-2,-1,0,1],
        [-3,-2,-1,0]
    ]

    let rowNumInt = Number(minRow) //Convert minRow from string to integer
    let colNumInt = Number(colNum) //Convert colNum from string to integer

    for (checkCell=0; checkCell<4; checkCell++){

        //Rows
        if (gameBoard[rowNumInt][colNumInt+winMatrix[checkCell][0]]=="red" 
        && gameBoard[rowNumInt][colNumInt+winMatrix[checkCell][1]]=="red" 
        && gameBoard[rowNumInt][colNumInt+winMatrix[checkCell][2]]=="red" 
        && gameBoard[rowNumInt][colNumInt+winMatrix[checkCell][3]]=="red"){

            return overallWinner="red"

        } else if (gameBoard[rowNumInt][colNumInt+winMatrix[checkCell][0]]=="yellow" 
        && gameBoard[rowNumInt][colNumInt+winMatrix[checkCell][1]]=="yellow" 
        && gameBoard[rowNumInt][colNumInt+winMatrix[checkCell][2]]=="yellow" 
        && gameBoard[rowNumInt][colNumInt+winMatrix[checkCell][3]]=="yellow"){
            
            return overallWinner="yellow"

        //Columns
        } else if ((rowNumInt-winMatrix[checkCell][0])>=0 
        && (rowNumInt-winMatrix[checkCell][0])<=5
        && (rowNumInt-winMatrix[checkCell][1])>=0 
        && (rowNumInt-winMatrix[checkCell][1])<=5
        && (rowNumInt-winMatrix[checkCell][2])>=0 
        && (rowNumInt-winMatrix[checkCell][2])<=5
        && (rowNumInt-winMatrix[checkCell][3])>=0 
        && (rowNumInt-winMatrix[checkCell][3])<=5) {

                
                    if (gameBoard[rowNumInt-winMatrix[checkCell][0]][colNumInt]=="red" 
                    && gameBoard[rowNumInt-winMatrix[checkCell][1]][colNumInt]=="red" 
                    && gameBoard[rowNumInt-winMatrix[checkCell][2]][colNumInt]=="red" 
                    && gameBoard[rowNumInt-winMatrix[checkCell][3]][colNumInt]=="red"){

                        return overallWinner="red"

                    } else if (gameBoard[rowNumInt-winMatrix[checkCell][0]][colNumInt]=="yellow" 
                    && gameBoard[rowNumInt-winMatrix[checkCell][1]][colNumInt]=="yellow" 
                    && gameBoard[rowNumInt-winMatrix[checkCell][2]][colNumInt]=="yellow" 
                    && gameBoard[rowNumInt-winMatrix[checkCell][3]][colNumInt]=="yellow"){

                        return overallWinner="yellow"


                    } else if (gameBoard[rowNumInt-winMatrix[checkCell][0]][colNumInt+winMatrix[checkCell][0]]=="red" 
                    && gameBoard[rowNumInt-winMatrix[checkCell][1]][colNumInt+winMatrix[checkCell][1]]=="red"
                    && gameBoard[rowNumInt-winMatrix[checkCell][2]][colNumInt+winMatrix[checkCell][2]]=="red"  
                    && gameBoard[rowNumInt-winMatrix[checkCell][3]][colNumInt+winMatrix[checkCell][3]]=="red"){
    
                        return overallWinner="red"

                    } else if (gameBoard[rowNumInt-winMatrix[checkCell][0]][colNumInt+winMatrix[checkCell][0]]=="yellow" 
                    && gameBoard[rowNumInt-winMatrix[checkCell][1]][colNumInt+winMatrix[checkCell][1]]=="yellow"
                    && gameBoard[rowNumInt-winMatrix[checkCell][2]][colNumInt+winMatrix[checkCell][2]]=="yellow"  
                    && gameBoard[rowNumInt-winMatrix[checkCell][3]][colNumInt+winMatrix[checkCell][3]]=="yellow"){

                        return overallWinner="yellow"


                    } else if (
                        // console.log(obj = {
                        //     //[5][0]
                        //     current: `RowNum${rowNumInt}: R${[rowNumInt+winMatrix[checkCell][0]]}C${[colNumInt+winMatrix[checkCell][0]]}`,
                        //     //[]
                        //     prev1: `RowNum${rowNumInt}: R${[rowNumInt+winMatrix[checkCell][1]]}C${[colNumInt+winMatrix[checkCell][1]]}`,
                        //     //[]
                        //     prev2: `RowNum${rowNumInt}: R${[rowNumInt+winMatrix[checkCell][2]]}C${[colNumInt+winMatrix[checkCell][2]]}`,
                        //     //[]             
                        //     prev3: `RowNum${rowNumInt}: R${[rowNumInt+winMatrix[checkCell][3]]}C${[colNumInt+winMatrix[checkCell][3]]}`
                        // })
                        console.log("Test")
                    //     gameBoard[rowNumInt+winMatrix[checkCell][0]][colNumInt+winMatrix[checkCell][0]]=="red"
                    // && gameBoard[rowNumInt+winMatrix[checkCell][1]][colNumInt+winMatrix[checkCell][1]]=="red"
                    // && gameBoard[rowNumInt+winMatrix[checkCell][2]][colNumInt+winMatrix[checkCell][2]]=="red"
                    // && gameBoard[rowNumInt+winMatrix[checkCell][3]][colNumInt+winMatrix[checkCell][3]]=="red"
                    ) {

                        return overallWinner="red"
                    
                    } else null
        } else null
    }
}