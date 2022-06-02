var player1 = document.getElementsByClassName("p1")[0];
var player2 = document.getElementsByClassName("p2")[0];
var isStarted = false;
var isEmpty = true;
var buttonStart = document.getElementsByClassName("start")[0];
var gameFieldLenght;
var gameTable, col, row;
var win = false;

buttonStart.onclick = function () {
    clear();
    isStarted = false;
    win=false;
    game();
}

function game() {
    function randomPlayer() {
        if (isStarted == false) {
            let random = Math.floor(Math.random() * 2);
            isStarted = true;
            whoIsPlaying(random)
            return random;
        };
    }
    var player = randomPlayer();

    //checking whose is clicked
    gameFieldLenght = document.getElementsByClassName("game-field").length;
    var field;
    for (let i = 0; i < gameFieldLenght; i++) {
        document.getElementsByClassName("game-field")[i].onclick = function () {
            field = this.id;
            if (win == false)
                isEmpty = checkIsEmpty(field);
            if (isEmpty == true && win == false)
                round(field, player);
        };
    };

    //creating game-field table
    col = Math.sqrt(gameFieldLenght);
    row = col;
    gameTable = new Array(row);

    for (let i = 0; i < row; i++) {
        gameTable[i] = new Array(col);
    }

    function round(f, p) {
        let draw = document.getElementById(f).getElementsByTagName("span")[0];
        let fRow, fCol, charCharacter;
        if (p == 0) {
            player = playerSwitch(p);
            whoIsPlaying(player);
            draw.innerHTML = "X";
            fRow = f[0];
            fCol = f[1];
            charCharacter = fRow.charCodeAt(0) - 96;
            insertIntoTable(fCol, charCharacter, p);
        } else if (p == 1) {
            player = playerSwitch(p)
            whoIsPlaying(player);
            draw.innerHTML = "O";
            fRow = f[0];
            fCol = f[1];
            charCharacter = fRow.charCodeAt(0) - 96;
            insertIntoTable(fCol, charCharacter, p);
        }
        if (isWinnerD(p) || isWinnerDR(p) || isWinnerH(p) || isWinnerV(p)) {
            let winner = document.getElementsByClassName("error")[0];
            if (p == 0)
                winner.innerHTML = "Player 1 is winner"
            else
                winner.innerHTML = "Player 2 is winner"
            isStarted = false;
            win = true;
        } else if (isDraw() && (isWinnerD(p) == false && isWinnerDR(p) == false && isWinnerH(p) == false && isWinnerV(p) == false)) {
            let draw = document.getElementsByClassName("error")[0];
            draw.innerHTML = "Draw"
            isStarted = false;
            win = true;
        }
    };

    function insertIntoTable(c, ch, p) { // r-row c-col ch-char
        if (p == 0) {
            for (let i = ch - 1; i < ch; i++) {
                for (let j = 0; j < c; j++) {
                    if (j == c - 1)
                        gameTable[i][j] = "0";
                }
            }
        } else {
            for (let i = ch - 1; i < ch; i++) {
                for (let j = 0; j < c; j++) {
                    if (j == c - 1)
                        gameTable[i][j] = "1";
                }
            }
        }

    }

    //checking you can place there
    function checkIsEmpty(f) {
        let getSpan = document.getElementById(f).getElementsByTagName("span")[0];
        let errorP = document.getElementsByClassName("error")[0];
        if (getSpan.textContent == "") {
            errorP.innerHTML = "";
            return true;
        } else {
            errorP.innerHTML = "THIS PLACE IS ALREADY TAKEN";
            return false;
        }
    }


    //showing which player started
    function whoIsPlaying(p) {
        if (p == 0) {
            player1.classList.add("p1--active");
            player2.classList.remove("p2--active")
        } else if (p == 1) {
            player2.classList.add("p2--active");
            player1.classList.remove("p1--active")
        }
    };
    //switching player
    function playerSwitch(p) {
        if (p == 0)
            return 1;
        else
            return 0;
    }

    //checking winner or draw
    // D- diagonal DR -diagonal reverse H - horizontal V-vertical
    function isWinnerD(p) {
        let win = true;
        for (let i = 0; i < row; i++) {
            if (gameTable[i][i] != p) {
                win = false;
                break;
            }
        }
        return win;
    }

    function isWinnerDR(p) {
        let win = true;
        for (let i = row - 1; i >= 0; i--) {
            if (gameTable[row - 1 - i][i] != p) {
                win = false;
                break;
            }
        }
        return win;
    }

    function isWinnerH(p) {
        let win = true;
        for (let i = 0; i < row; i++) {
            win = true;
            for (let j = 0; j < col; j++) {
                if (gameTable[i][j] != p) {
                    win = false;
                    break;
                }
            }
            if (win)
                return win;
        }
        return win;
    }

    function isWinnerV(p) {
        let win = true;
        for (let i = 0; i < row; i++) {
            win = true;
            for (let j = 0; j < col; j++) {
                if (gameTable[j][i] != p) {
                    win = false;
                    break;
                }
            }
            if (win)
                return win;
        }
        return win;
    }

    function isDraw() {
        let draw = true;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (typeof (gameTable[i][j]) == "undefined") {
                    draw = false;
                    break;
                }
            }
        }
        return draw;
    }
}



function clear() {
    player1.classList.remove("p1--active");
    player2.classList.remove("p2--active");
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            gameTable[i][j] == "";
        }
    }
    let clearP = document.getElementsByClassName("error")[0];
    clearP.innerHTML = "";
    for (let i = 0; i < gameFieldLenght; i++) {
        document.getElementsByTagName("span")[i].innerHTML = "";
    }
}