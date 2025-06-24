
const statusDisplay = document.querySelector('.game--status'); //deez displays text
const xscore = document.querySelector('.xscore');
const oscore = document.querySelector('.oscore');
const xbanner = document.querySelector('.left');
const obanner = document.querySelector('.right');
const bg = document.querySelector('.container');

let xtotal = 0;
let ototal = 0;

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""]; // deez are, the cells?? Yas every click gets stored here and also displayed.

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`; // whats with the arrows
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`; // constants with parameters? is it a function?

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {   
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-cell-index')
        );
        
        if (gameState[clickedCellIndex] !== "" || !gameActive) { // checks if clicked cell is not empty and game is active, then nothing should happen.
            return;
        }
   
        handleCellPlayed(clickedCell, clickedCellIndex); // lets the current player put it in
        handleResultValidation(); // checks if panalo
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    
        gameState[clickedCellIndex] = currentPlayer; // puts the current players symbol into the array
        clickedCell.innerHTML = currentPlayer; // displays it sa html
    }

    const winningConditions = [ // konti lang pala winning combinations kaya ililist lang ng ganto. kala ko mas complex pa. baka pwede gawing complex.
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function handleResultValidation() {
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
                break
            }
        }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;

        if (currentPlayer == "X") {
            xtotal += 1;
            xscore.innerHTML = xtotal;
        }
        else if (currentPlayer == "O") {
            ototal += 1;
            oscore.innerHTML = ototal;
        }
        else {
            return;
        }
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange(); 
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // wa is hapenin tho
    statusDisplay.innerHTML = currentPlayerTurn();

    if (currentPlayer == "X") {
        xbanner.classList.add('active');
        obanner.classList.remove('active');
        bg.classList.add('red');
        bg.classList.remove('blue');
    } else {
        obanner.classList.add('active');
        xbanner.classList.remove('active');
        bg.classList.add('blue');
        bg.classList.remove('red');
    }
}

function handleRestartGame() { //clears everything
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
    xbanner.classList.add('active');
    obanner.classList.remove('active');
    bg.classList.add('red');
    bg.classList.remove('blue');
}    