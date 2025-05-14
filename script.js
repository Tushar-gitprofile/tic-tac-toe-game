let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#New-btn");
let msgConatiner = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let modeSelect = document.querySelector("#mode");

let playWithComputer = modeSelect.value === "pvc";

let turn0 = true;

modeSelect.addEventListener("change", () => {
    playWithComputer = modeSelect.value === "pvc";
    resetGame(); 
});

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congrats! Winner is ${winner}`;
    msgConatiner.classList.remove("hide");
    disableboxes();
};

const checkDraw = () => {
    let filled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            filled = false;
            break;
        }
    }
    if (filled) {
        msg.innerText = "It's a Draw!";
        msgConatiner.classList.remove("hide");
    }
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length === 0) {
        checkDraw();
        return;
    }

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].disabled = true;
    turn0 = true;

    const winnerFound = checkWinner();
    if (!winnerFound) {
        checkDraw();
    }
};

const resetGame = () => {
    turn0 = true;
    enableboxes();
    msgConatiner.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;
        if (!msgConatiner.classList.contains("hide")) return; 

        if (turn0) {
            box.innerText = "O";
            box.disabled = true;
            turn0 = false;

            const winnerFound = checkWinner();
            if (!winnerFound) {
                if (playWithComputer) {
                    setTimeout(() => {
                        computerMove();
                    }, 300);
                } else {
                    checkDraw();
                }
            }
        } else if (!playWithComputer) {
            box.innerText = "X";
            box.disabled = true;
            turn0 = true;

            const winnerFound = checkWinner();
            if (!winnerFound) {
                checkDraw();
            }
        }
    });
});

newGamebtn.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);


