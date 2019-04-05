// DOM
let boxes = document.querySelectorAll(".game-cell"),
    board = document.getElementById("game-board"),
    columns = board.dataset.colNum,
    rows = board.dataset.rowNum,
    retryButton = document.getElementById("retry-button");

retryButton.addEventListener('click', function(event) {
    boxes.forEach (function(box) {
        box.innerHTML = '';
    });
    boxes.forEach(box => box.addEventListener('click', play));
    shadowBoard = createBoardArray(rows,columns)
});

// GAME LOGIC
let shadowBoard = createBoardArray(rows, columns),
    round = 1;

function createBoardArray(rows, columns) {
    let boardArray = [];
    let row = [];

    for (let col=0; col < columns; col++) {
        row.push("");
    }
    for (let i = 0; i < rows; i++) {
        boardArray.push(row);
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
    round++;
    //check()
}

