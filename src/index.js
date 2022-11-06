const fieldsElements = document.querySelectorAll(".board__item");
const info = document.querySelector(".info");
const resetBtn = document.querySelector(".reset-btn");

let fields;
let activePlayer;
let gameActive;

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

const resetGame = () => {
    fields = ["", "", "", "", "", "", "", "", ""];
    activePlayer = "x";
    gameActive = true;
};


const displayWinMessage = () => {
    info.innerText = `Wygrana! Gratulacje! ${activePlayer}`;
};

const displayRemisMessage = () => {
    info.innerText = "Remis";
}

const clearMessage = () => {
    info.innerText = "";
}


const validateGame= () => {
    let gameWon = false;
    for(let i = 0; i <= 7; i++) {
        const [positionA, positionB, positionC] = winningConditions[i];
        const value1 = fields[positionA];
        const value2 = fields[positionB];
        const value3 = fields[positionC];

        // console.group(i)
        // console.log(value1);
        // console.log(value2);
        // console.log(value3);
        // console.groupEnd();

        if (value1 !== "" && value1 === value2 && value1 === value3) {
            gameWon = true;
            break;
        }
    }
    if(gameWon) {
        gameActive = false;
        displayWinMessage(); 
    } else if (isBoardFull()) {
        gameActive = false;
        displayRemisMessage();
    }
};


const isBoardFull = () => {
    return fields.find(field => field === "") === undefined;
};

const handleItemClick = event => {
    const {position} = event.target.dataset;

    if (gameActive && fields[position] === "") {
        fields[position] = activePlayer;
        event.target.classList.add(`board__item--filled-${activePlayer}`);
        validateGame();
        activePlayer = activePlayer === "x" ? "o" : "x";
    }
}

fieldsElements.forEach(field => {
    field.addEventListener("click", handleItemClick);
});

const resetBoardClasess = () => {
    fieldsElements.forEach(field => {
    field.classList.remove("board__item--filled-x", "board__item--filled-o");
    });
};

const handleButtonClick = () => {
    resetGame();
    resetBoardClasess();
    clearMessage();
};

resetBtn.addEventListener("click", handleButtonClick);
resetGame();