
let to_move = 'X';
let arr = ['', '', '', '', '', '', '', '', ''];
setToMove();

function setToMove() {
    const el = document.querySelector('#to-move');
    el.innerHTML = '';
    el.appendChild(createImg());
}


function createImg() {
    const img = document.createElement('img');
    img.src = './img/' + to_move + '.png';
    img.style.width = '100%';
    return img;
}

function move(index) {
    if (arr[index] === '') {
        arr[index] = to_move;

        const element = document.querySelector('.cell' + (index + 1));
        const img = createImg();
        element.appendChild(img);

        if (to_move == 'X') {
            to_move = 'O';
        }
        else {
            to_move = 'X';
        }

        setToMove();
    }
    console.log(index);
}