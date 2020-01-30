// DOM
let boxes = document.querySelectorAll(".game-cell"),
    board = document.getElementById("game-board"),
    columns = board.dataset.colNum,
    rows = board.dataset.rowNum,
    retryButton = document.getElementById("retry-button"),
    winSize = board.dataset.winSize;

retryButton.addEventListener('click', function (event) {
    boxes.forEach(function (box) {
        box.innerHTML = '';
    });
    boxes.forEach(box => box.addEventListener('click', play));
    shadowBoard = createBoardArray(rows, columns)
});

// GAME LOGIC
let shadowBoard = createBoardArray(rows, columns),
    round = 1;

// Works correctly because thanks to asigning boards to new variable using .slice() method. Arrays inside are passed by
// values to the outside array. Otherwise when passed by reference when we want to replace one element on 1st position,
// the 1st element is changed in all the inside arrays.
function createBoardArray(rows, columns) {
    let board = [];
    let row = [];

    for (let col = 0; col < columns; col++) {
        row.push("");
    }
    for (let i = 0; i < rows; i++) {
        board.push(row);
    }
    let boardArray = [];
    for (let i = 0; i < rows; i++) {
        boardArray[i] = board[i].slice();
    }
    return boardArray
}


boxes.forEach(box => box.addEventListener('click', play));

function play(event) {
    let coordinateX = event.target.dataset.coordinateX;
    let coordinateY = event.target.dataset.coordinateY;
    let turn = round % 2 === 0 ? 'O' : 'X';
    event.target.innerHTML = turn;
    event.target.removeEventListener('click', play);
    shadowBoard[coordinateY][coordinateX] = turn;
    console.log(shadowBoard);
    checkWin(shadowBoard, winSize);
    round++;

}

function checkWin(shadowBoard, winSize) {
    // horizontal win
    for (row of shadowBoard) {
        handleWin(row);
    }

    //vertical win
    for (let col = 0; col < winSize; col++) {
        check = [];

        for (row of shadowBoard) {
            check.push(row[col]);
        }
        handleWin(check);
    }

    //diagonal win
    diagonalCheck = [];
    for (let col = winSize - 1, row = 0; col >= 0, row < winSize; col--, row++) {
        diagonalCheck.push(shadowBoard[row][col])
    }
    handleWin(diagonalCheck);

    diagonalCheck = [];
    for (let col = 0, row = 0; col < winSize; col++, row++) {
        diagonalCheck.push(shadowBoard[row][col])
    }
    handleWin(diagonalCheck);

}

function handleWin(checkList) {
    xWins = checkList.filter((el) => (el === 'X')).length === Number(winSize);
    oWins = checkList.filter((el) => (el === 'O')).length === Number(winSize);
    if (xWins) {
        alert("Player X won!");   // use modal to not block the code execution
        boxes.forEach(box => box.removeEventListener('click', play));
    } else if (oWins) {
        alert("Player O won!");
        boxes.forEach(box => box.removeEventListener('click', play));
    }
}