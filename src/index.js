//we store our game-status element to more easily use it later
// t = temporary variable
const statusDisplay = document.querySelector('.game--status');
const restartBtn = document.querySelectorAll(".game--restart");
const cells = document.querySelectorAll(".cell");

let gameActive = true; //t

let currentPlayer = "X"; //keep track current player
let playerX,playerO;

let gameState = ["", "", "", "", "", "", "", "", ""];  //placeholder

const winningMessage = () => {

    if(currentPlayer === "X"){

        return `Player ${playerX} Won!`;

    }else{

        return `Player ${playerO} Won!`;

    }
}

const drawMessage = () => `Game ended in a draw!`;

const currentPlayerTurn = () => {  //we set initial message to let whose player turn is
    checkForName();
    if(currentPlayer === "O"){

        return `It's ${playerO}'s turn`;

    } else{

        return `It's ${playerX}'s turn`;

    }
    
}


acceptPlayerNames();

statusDisplay.innerHTML = currentPlayerTurn();

function acceptPlayerNames(){

    playerX = prompt("Enter the Player1 Name(X): ");
    playerO = prompt("Enter the Player2 Name(O): ");

}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClicked));

document.querySelector('.game--restart').addEventListener('click', restartGame);

function cellClicked(clickedCellEvent) {
       
        const clickedCell = clickedCellEvent.target;
   
        const clickedCellIndex = parseInt(  //data-cell index string to integer
          clickedCell.getAttribute('data-cell-index')
        );
    
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
        //if everything in order we will process with the game flow
        updateCell(clickedCell, clickedCellIndex); //cell,index
        checkWinner();
    }


    function updateCell(clickedCell, clickedCellIndex) {  //cell,index
        
            gameState[clickedCellIndex] = currentPlayer;  //updates the cell clicked to current player
            clickedCell.innerHTML = currentPlayer; //updates the placeholder
        }

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function checkWinner() {
            let roundWon = false;  //t
            for (let i = 0; i <= 7; i++) {

                const winCondition = winningConditions[i]; //over all combinations

                let a = gameState[winCondition[0]];  
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];

                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break
                }
            }
        if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                gameActive = false;
                return;
            }
        
            let roundDraw = !gameState.includes("");  //not empty 

            if (roundDraw) { //true 
                statusDisplay.innerHTML = drawMessage();
                gameActive = false; //and game is not active
                return;
            }
        
            changePlayers();
        }

        function changePlayers() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerHTML = currentPlayerTurn();
        }

        function restartGame() {
            gameActive = true;
           // currentPlayer = "X";
            gameState = ["", "", "", "", "", "", "", "", ""];
            statusDisplay.innerHTML = currentPlayerTurn();
            document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
            
        }

function checkForName(){
    if(playerX === null || playerX === ""){
        playerX = "X";
    }
    if(playerO=== null|| playerO==="" ){
        playerO = "O";
    }
}
