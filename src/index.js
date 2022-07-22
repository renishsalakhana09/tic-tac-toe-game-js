//we store our game-status element to more easily use it later
const statusDisplay = document.querySelector(".game--status");
const restartBtn = document.querySelectorAll(".game--restart"); //we store all restart buttons to use it later

restartBtn.forEach((element) => {
  element.addEventListener("click", () => {
    //we reset the game
    game.reset();
    //we reset the UI
    game.UI.reset();
  });
});

var wonTone = new Audio("audio/winner.mp3");
var tone = new Audio("audio/Tingg.wav");
var drawTone = new Audio("audio/draw.wav");
var restartTone = new Audio("audio/restart.wav");
var acceptTone = new Audio("audio/accept.wav");

Array.from(restartBtn).forEach(
  (element) => {
    restartTone.play();
    element.addEventListener("click", restartGame, restartTone.play());
  },
  { once: true }
);

const cells = document.querySelectorAll(".cell"); //we store all cells to use it later
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gameActive = true; //game is active
let currentPlayer = "X"; //we set initial player to X
let playerX, playerO; //we store player names
let gameState = ["", "", "", "", "", "", "", "", ""]; //we start the game

const setTurnColor = () =>
  (document.getElementsByClassName("game--status")[0].style.color = "green");

const winningMessage = () => {
  //we set the winning message
  if (currentPlayer === "X") {
    //if current player is X
    wonTone.play();
    return `Player ${playerX} won!`;
  } else {
    wonTone.play();
    return `Player ${playerO} won!`;
  }
};

const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => {
  //we set initial message to let whose player turn is
  checkForName();
  if (currentPlayer === "O") {
    tone.play();
    return `${playerO}'s turn`;
  } else {
    tone.play();
    return `${playerX}'s turn`;
  }
};

acceptPlayerNames();
statusDisplay.innerHTML = currentPlayerTurn();
setTurnColor();

function acceptPlayerNames() {
  acceptTone.play();
  //we accept player names
  playerX = prompt("Enter the Player1 Name(X): ");
  playerO = prompt("Enter the Player2 Name(O): ");
  document.getElementsByClassName("game--status")[0].innerText =
    currentPlayerTurn();
  setTurnColor();
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", cellClicked));
document
  .querySelectorAll(".game--restart")
  .forEach((restartBtn) =>
    restartBtn.addEventListener("click", restartGame, restartTone.play())
  );
document
  .querySelector(".game--restart")
  .addEventListener("click", restartGame, restartTone.play());

function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target; //we store the cell that was clicked
  const clickedCellIndex = parseInt(
    //data-cell index string to integer
    clickedCell.getAttribute("data-cell-index")
  );
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    //if cell is not empty or game is not active
    return;
  }
  //if everything in order we will process with the game flow
  updateCell(clickedCell, clickedCellIndex);
  checkWinner();
  setTurnColor();

  // updateCell(clickedCell, clickedCellIndex); //cell,index //we update the cell clicked to current player
  // checkWinner();
}

function updateCell(clickedCell, clickedCellIndex) {
  //cell,index
  gameState[clickedCellIndex] = currentPlayer; //we update the cell clicked to current player
  clickedCell.innerHTML = currentPlayer;
  clickedCell.style.color = "#0000FF";
}

function checkWinner() {
  //we check if there is a winner
  winningConditions.forEach((element) => {
    let a = cells[element[0]];
    let b = cells[element[1]];
    let c = cells[element[2]];
    if (
      a.innerText === b.innerText &&
      c.innerText === b.innerText &&
      a.innerText !== ""
    ) {
      gameActive = false;
      a.style.color = b.style.color = c.style.color = "green";
      if (gameActive) {
        changePlayers();
        currentPlayer = changePlayers();
        statusDisplay.innerHTML = currentPlayerTurn();
        setTurnColor();
      }
    }
  });

  let roundWon = false; //t
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i]; //over all combinations
    let a = gameState[winCondition[0]]; //first cell in the combination
    let b = gameState[winCondition[1]]; //second cell in the combination
    let c = gameState[winCondition[2]]; //third cell in the combination
    if (a === "" || b === "" || c === "") {
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

  let roundDraw = !gameState.includes(""); //not empty
  if (roundDraw) {
    drawTone.play();

    statusDisplay.innerHTML = drawMessage();
    gameActive = false; //and game is not active anymore
    return;
  }
  changePlayers();
}

function changePlayers() {
  tone.play();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
  setTurnColor();
}

function restartGame() {
  restartTone.play();
  Array.from(cells).forEach((element) => {
    element.innerText = "";
    element.style.color = "#000000";
  });

  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = "")); //we reset the cells
  setTurnColor();
}

function checkForName() {
  //we check if player names are entered
  if (playerX === null || playerX === "") {
    //if playerX is not entered
    playerX = "X"; //if not we set default name
  }
  if (playerO === null || playerO === "") {
    playerO = "O";
  }
}
