const statusDisplay = document.querySelector('.game--status');
const restartBtn = document.querySelectorAll(".game--restart");
const cells = document.querySelectorAll(".cell");
let gameActive = true;
let currentPlayer = "X";
let playerX,playerO;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => {
    if(currentPlayer === "X"){
        return `Player ${playerX} Won!`;
    }else{
        return `Player ${playerO} Won!`;
    }
}
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => {
    if(currentPlayer === "O"){
        return `It's ${playerO}'S Turn`;
    }else{
        return `It's ${playerX}'S Turn`;
    }
}

acceptPlayerNames();

statusDisplay.innerHTML = currentPlayerTurn();

function acceptPlayerNames(){
    playerX = prompt("Enter the Player1 Name(X):");
    playerO = prompt("Enter the Player2 Name(O):");
 }

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClicked));

document.querySelector('.game--restart').addEventListener('click', restartGame);

function cellClicked(clickedCellEvent) {
       
        const clickedCell = clickedCellEvent.target;
   
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-cell-index')
        );
    
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
        
        updateCell(clickedCell, clickedCellIndex);
        checkWinner();
    }


    function updateCell(clickedCell, clickedCellIndex) {
        
            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.innerHTML = currentPlayer;
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
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
        if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                gameActive = false;
                return;
            }
        
            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                statusDisplay.innerHTML = drawMessage();
                gameActive = false;
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
            gameState = ["", "", "", "", "", "", "", "", ""];
            statusDisplay.innerHTML = currentPlayerTurn();
            document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
            
        }


    function selectFirstTurn() {
         let firstTurn = ["X", "O"];
         currentPlayer = firstTurn[Math.floor(Math.random() * firstTurn.length)];
         checkForName();
        }
        function checkForName() {
             if (playerX === null || playerX === "") {
                playerX = "X";
            }
            if (playerO === null || playerO === "") {
                 playerO = "O";
                }
            }
