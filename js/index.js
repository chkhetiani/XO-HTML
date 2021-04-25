let to_move;
let arr;
let isGamePlaying;
startGame();

function startGame() {
    to_move = 'X';
    arr = ['', '', '', '', '', '', '', '', ''];
    isGamePlaying = true;

    document.querySelector('#result').style.display = 'none';
    const cells = document.querySelectorAll('.cell');

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].style.border = 'none';
    }

    setToMove();
}

function setToMove() {
    const el = document.querySelector('#to-move');
    el.innerHTML = '';
    el.appendChild(createImg());
}


function createImg() {
    if (to_move == '') {
        return document.createElement('div');
    }
    const img = document.createElement('img');
    img.src = './img/' + to_move + '.png';
    img.style.width = '100%';
    return img;
}

function move(index) {
    if (arr[index] === '' && isGamePlaying) {
        arr[index] = to_move;

        const cell = document.querySelector('.cell' + (index + 1));
        const img = createImg();
        cell.appendChild(img);

        to_move = (to_move === 'X') ? 'O' : 'X';

        const result = checkWin();
        if (result.winner != '') {
            isGamePlaying = false;
            to_move = '';
            document.querySelector('.play-again').style.display = 'block';
            drawResult(result);
        }
        setToMove();
    }
}

function checkWin() {
    const winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winLines.length; i++) {
        const ind1 = winLines[i][0];
        const ind2 = winLines[i][1];
        const ind3 = winLines[i][2];
        if (arr[ind1] === arr[ind2] && arr[ind1] === arr[ind3] && arr[ind1] != '') {
            return {
                winner: arr[ind1],
                indices: winLines[i]
            };
        }
    }
    if (arr.every(function (c) { return c != '' })) {
        return {
            winner: 'draw'
        }
    }
    return {
        winner: ''
    };
}


function drawResult(winResult) {
    const result = document.querySelector('#result');
    result.style.display = 'block';
    if (winResult.winner == 'draw') {
        result.innerText = 'The game is drawn!';
    }
    else {
        result.innerText = 'The winner is ' + winResult.winner + '!';
        for (let i = 0; i < winResult.indices.length; i++) {
            const number = winResult.indices[i] + 1;
            const cell = document.querySelector('.cell' + number);
            cell.style.border = "15px solid green";
        }
    }
}

function startAgain() {
    document.querySelector('.play-again').style.display = 'none';
    startGame();
}