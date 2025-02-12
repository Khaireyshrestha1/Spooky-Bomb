const gameBoard = document.getElementById("gameBoard");
const gameMessage = document.getElementById("gameMessage");
const restartButton = document.getElementById("restartButton");

let cells = [];
let bombPosition = null;
let gameOver = false;

// Function to initialize the game
function startGame() {
    gameBoard.innerHTML = '';
    cells = [];
    bombPosition = null;
    gameOver = false;
    gameMessage.textContent = 'Click on a cell to begin.';

    // Create 3x3 grid of cells
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
            cells.push(cell);
        }
    }

    // Place 1 random bomb
    bombPosition = Math.floor(Math.random() * 9);  // Random index from 0 to 8
}

// Handle cell click
function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    const cellIndex = getCellIndex(cell.dataset.row, cell.dataset.col);

    if (bombPosition === cellIndex) {
        gameOver = true;
        gameMessage.textContent = 'You lose the game! You clicked a bomb!';
        revealBomb();
    } else {
        cell.classList.add('revealed');
        cell.textContent = 'Safe';
        checkForWin();
    }
}

// Reveal the bomb if the game is over
function revealBomb() {
    const bombCell = cells[bombPosition];
    bombCell.classList.add('revealed');
    bombCell.textContent = 'Bomb!';
}

// Check if the player has won
function checkForWin() {
    const revealedCells = document.querySelectorAll('.cell.revealed');
    if (revealedCells.length === 8) {  // 9 cells minus the bomb
        gameOver = true;
        gameMessage.textContent = 'Congratulations! You won!';
    }
}

// Get the index of the cell in the grid
function getCellIndex(row, col) {
    return row * 3 + col;
}

// Initialize the game when the page loads
startGame();
