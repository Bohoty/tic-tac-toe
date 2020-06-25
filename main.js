// The game board module
const gameBoard = (()=>{
    let _grid = [].fill('', 0, 9);
    let sz = 3;

    const _setSize = (n) => {
        sz = n;
        _grid = [].fill('', 0, sz * sz);
    }

    const createBoard = (n) => {
        _setSize(n);
        
        const body = document.querySelector('body');
        const board = document.createElement('table');
        
        for(i = 0 ; i < sz ; i++) {
            const currentRow = document.createElement('tr');
            for(j = 0 ; j < sz ; j++) {
                const currentCell = document.createElement('th');
                let id = i.toString() + 'z' + j.toString();
                const currentCellButton = document.createElement('button');
                // css selector
                currentCellButton.style.backgroundColor = "white";
                currentCellButton.style.color = "black";
                currentCellButton.style.opacity = 1;
                currentCellButton.style.width = "100%";
                currentCellButton.style.height = "100%";
                currentCellButton.style.border = "0px";
                currentCellButton.style.borderRadius = "0px";
                currentCellButton.style.fontSize = "50px";
                //
                currentCellButton.id = id;
                currentCellButton.textContent = _grid[i * sz + j];
                currentCellButton.addEventListener ('click', () => {
                    if (currentCellButton.textContent.toString() != '')
                        alert("Please Choose An Empty Cell");
                    else {
                        let tmp = currentCellButton.id.toString();
                        playRound(tmp.charAt(0), tmp.charAt(2));
                    }
                })
                currentCell.appendChild(currentCellButton);
                currentRow.appendChild(currentCell);
            }
            board.appendChild(currentRow);
        }
        body.appendChild(board);
    }
    
    const setCell = (x, y, val) => {
        _grid[x * sz + y] = val;
        console.log(`${(x * sz + y)} ${_grid[0]} ${_grid[x *sz + y]}`);
        _renderCell(x, y, val);  // Apply the new value to the rendered grid
    }
    
    const checkWinner = (symbol) => {
        // check horizontal
        for (i = 0 ; i < sz ; i++) {
            let cnt = 0;
            for(j = 0 ; j < sz ; j++) 
            cnt += (symbol == _grid[i * sz + j]);
            if (cnt == sz) 
            return true;
        }
        
        // check vertical
        for(j = 0 ; j < sz ; j++) {
            let cnt = 0;
            for(i = 0 ; i < sz ; i++)
            cnt += (symbol == _grid[i * sz + j]);
            if (cnt == sz) 
            return true; 
            console.log(cnt);
        }
        
        // check main diagonal
        let cnt = 0;
        for(i = 0 ; i < sz ; i++) 
        cnt += (symbol == _grid[i * sz + i]);
        if (cnt == sz) 
        return true;
        
        // check the other diagonal
        cnt = 0;
        for(i = 0 ; i < sz ; i++) 
        cnt += (symbol == _grid[i * sz + (2 - i)]);
        if (cnt == sz) 
        return true;
        
        return false;
    }
        
    function _renderCell (x, y, val = '') {
        let idd = x.toString() + 'z' + y.toString();
        const currentCell = document.getElementById(idd);
        currentCell.textContent = val;
    }

    return {
        setCell,
        checkWinner,
        createBoard,
    };
    
})()

// The player factory function
function Player (name, symbol) {
    return {
        name,
        symbol,
    };
}

let currentPlayer = 0;
let player = [];
function play () {
    let sz = parseInt(document.querySelector("#boardSize").value.toString());
    let p1 = document.querySelector('#p1').value.toString();
    let p2 = document.querySelector('#p2').value.toString();
    player[0] = Player(p1, 'X');
    player[1] = Player(p2, 'O');
    gameBoard.createBoard(sz);
}

function playRound (x, y) {
    gameBoard.setCell(parseInt(x), parseInt(y), player[currentPlayer].symbol);
    if (gameBoard.checkWinner(player[currentPlayer].symbol)){
        setTimeout(function(){alert(player[currentPlayer].name + ' is the winner!!!!')}, 100);
        
    }
    currentPlayer ^= 1;
}


const startButton = document.querySelector('#startGameButton');
startButton.addEventListener('click', play);
