let boxes=document.querySelectorAll(".box");
let resetbutton=document.querySelector("#rest");
let newbutton=document.querySelector("#new");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let container=document.querySelector(".container");

let count;
let turnO=true;

const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const draw = () =>{
    msg.innerText = "Game Draw! Better Luck Next Time";
    msgcontainer.classList.remove("hide");
    container.style.marginTop = "5vmin";
}
const disablebox = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enablebox = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const resetgame = ()=>{
    turnO=true;
    msgcontainer.classList.add("hide");
    count=0;
    enablebox();
    removeHighlight();
}

// Function to allow the computer to make its move
const computerMove = () => {
    // Check for winning moves
    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText === "X" && boxes[b].innerText === "X" && boxes[c].innerText === "") {
            boxes[c].innerText = "X";
            boxes[c].style.color = "red";
            boxes[c].disabled = true;
            count++;
            checkwinner();
            turnO = true;
            return;
        } else if (boxes[b].innerText === "X" && boxes[c].innerText === "X" && boxes[a].innerText === "") {
            boxes[a].innerText = "X";
            boxes[a].style.color = "red";
            boxes[a].disabled = true;
            count++;
            checkwinner();
            turnO = true;
            return;
        } else if (boxes[a].innerText === "X" && boxes[c].innerText === "X" && boxes[b].innerText === "") {
            boxes[b].innerText = "X";
            boxes[b].style.color = "red";
            boxes[b].disabled = true;
            count++;
            checkwinner();
            turnO = true;
            return;
        }
    }

    // Check for blocking moves
    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText === "O" && boxes[b].innerText === "O" && boxes[c].innerText === "") {
            boxes[c].innerText = "X";
            boxes[c].style.color = "red";
            boxes[c].disabled = true;
            count++;
            checkwinner();
            turnO = true;
            return;
        } else if (boxes[b].innerText === "O" && boxes[c].innerText === "O" && boxes[a].innerText === "") {
            boxes[a].innerText = "X";
            boxes[a].style.color = "red";
            boxes[a].disabled = true;
            count++;
            checkwinner();
            turnO = true;
            return;
        } else if (boxes[a].innerText === "O" && boxes[c].innerText === "O" && boxes[b].innerText === "") {
            boxes[b].innerText = "X";
            boxes[b].style.color = "red";
            boxes[b].disabled = true;
            count++;
            checkwinner();
            turnO = true;
            return;
        }
    }

    // Select a moderately strong move
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    // Prioritize center box if available
    let centerBox = emptyBoxes.find(box => box.dataset.index === "4");
    if (centerBox) {
        centerBox.innerText = "X";
        centerBox.style.color = "red";
        centerBox.disabled = true;
        count++;
        checkwinner();
        turnO = true;
        return;
    }
    // If center box is not available, select a random available move
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    if (randomBox) {
        randomBox.innerText = "X";
        randomBox.style.color = "red";
        randomBox.disabled = true;
        count++;
        checkwinner();
        turnO = true;
    }
};

// // Function to allow the computer to make its move
// const computerMove = () => {
//     // Generate a random move for simplicity
//     let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
//     let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
//     if (randomBox) {
//         randomBox.innerText = "X"; // Display computer's choice
//         randomBox.disabled = true;
//         count++;
//         checkwinner();
//         turnO = true;
//     }
// };

// Modify the event listener to alternate between player and computer turns
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO && box.innerText === "") {
            box.innerText = "O";
            box.style.color = "#167D7F";
            box.disabled = true;
            count++;
            checkwinner();
            if (count < 9) {
                computerMove(); // Let computer make its move if the game is not over
            }
        }
    });
});


// Function to highlight winning boxes
const highlightWinner = (pattern) => {
    for (let index of pattern) {
        boxes[index].classList.add('highlight');
    }
}

// Function to remove highlight from all boxes
const removeHighlight = () => {
    for (let box of boxes) {
        box.classList.remove('highlight');
    }
}

// Modify the showWinner function to handle highlighting of winning patterns
const showWinner = (Winner, pattern) => {
    if (Winner === "O") {
        msg.innerText = "Congratulation! You win!";
    } else if (Winner === "X") {
        msg.innerText = "Computer win! Better luck next time.";
    } else {
        msg.innerText = "Game Draw! Better Luck Next Time";
    }
    msgcontainer.classList.remove("hide");
    container.style.marginTop = "5vmin";
    disablebox();
    highlightWinner(pattern); // Highlight the winning pattern
};

// Modify the checkwinner function to include highlighting of winning patterns
const checkwinner = () => {
    let winnerFound = false;

    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        let pos1val = boxes[a].innerText;
        let pos2val = boxes[b].innerText;
        let pos3val = boxes[c].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val, pattern);
                winnerFound = true;
                break; // Exit loop if a winner is found
            }
        }
    }

    if (!winnerFound && count === 9) {
        draw();
    }
};

newbutton.addEventListener("click", () =>{
    resetgame();
});
resetbutton.addEventListener("click", () => {
    resetgame();
});


          // existing code
// // Modify the showWinner function to handle both player and computer wins
// const showWinner = (Winner) => {
//     if (Winner === "O") {
//         msg.innerText = "Congratulation! You win!";
//     } else if (Winner === "X") {
//         msg.innerText = "Computer wins! Better luck next time.";
//     } else {
//         msg.innerText = "Game Draw! Better Luck Next Time";
//     }
//     msgcontainer.classList.remove("hide");
//     container.style.marginTop = "5vmin";
//     disablebox();
// };

// const checkwinner = () => {
//     let winnerFound = false;

//     for (let val of winpatterns) {
//         let pos1val = boxes[val[0]].innerText;
//         let pos2val = boxes[val[1]].innerText;
//         let pos3val = boxes[val[2]].innerText;

//         if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
//             if (pos1val === pos2val && pos2val === pos3val) {
//                 showWinner(pos1val);
//                 winnerFound = true;
//                 break; // Exit loop if a winner is found
//             }
//         }
//     }

//     if (!winnerFound && count === 9) {
//         draw();
//     }
// };

    // draw function add
// let boxes=document.querySelectorAll(".box");
// let resetbutton=document.querySelector("#rest");
// let newbutton=document.querySelector("#new");
// let msgcontainer=document.querySelector(".msg-container");
// let msg=document.querySelector("#msg");
// let container=document.querySelector(".container");

// let count;
// let turnO=true;

// const winpatterns = [
//     [0,1,2],
//     [0,3,6],
//     [0,4,8],
//     [1,4,7],
//     [2,5,8],
//     [2,4,6],
//     [3,4,5],
//     [6,7,8],
// ];

// const draw = () =>{
//     msg.innerText = "Game Draw! Better Luck Next Time";
//     msgcontainer.classList.remove("hide");
//     container.style.marginTop = "5vmin";
// }
// const disablebox = () =>{
//     for(let box of boxes){
//         box.disabled=true;
//     }
// }
// const enablebox = () =>{
//     for(let box of boxes){
//         box.disabled=false;
//         box.innerText="";
//     }
// }
// const resetgame = ()=>{
//     turnO=true;
//     msgcontainer.classList.add("hide");
//     count=0;
//     enablebox();
// }

// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         if(turnO){
//             box.innerText = "O";
//             turnO = false;
//         }
//         else{
//             box.innerText = "X";
//             turnO = true;
//         }
//         box.disabled = true;
//         count+=1;
//         checkwinner();
//     });
// });

// const showWinner = (Winner) => {
//     msg.innerText =`Congratulation!Winner is ${Winner}`;
//     msgcontainer.classList.remove("hide");
//     container.style.marginTop = "5vmin"; // Adjust margin top when winner is shown
//     disablebox();
// }

// const checkwinner = () => {
//     let winnerFound = false;

//     for (let val of winpatterns) {
//         let pos1val = boxes[val[0]].innerText;
//         let pos2val = boxes[val[1]].innerText;
//         let pos3val = boxes[val[2]].innerText;

//         if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
//             if (pos1val === pos2val && pos2val === pos3val) {
//                 showWinner(pos1val);
//                 winnerFound = true;
//                 break; // Exit loop if a winner is found
//             }
//         }
//     }

//     if (!winnerFound && count === 9) {
//         draw();
//     }
// };


// newbutton.addEventListener("click", () =>{
//     resetgame();
// });
// resetbutton.addEventListener("click", () => {
//     resetgame();
// });
    
    
    //my own code
// let boxes=document.querySelectorAll(".box");
// let resetbutton=document.querySelector("#rest");
// let newbutton=document.querySelector("#new");
// let msgcontainer=document.querySelector(".msg-container");
// let msg=document.querySelector("#msg");
// let container=document.querySelector(".container");

// let count;
// let turnO=true;

// const winpatterns = [
//     [0,1,2],
//     [0,3,6],
//     [0,4,8],
//     [1,4,7],
//     [2,5,8],
//     [2,4,6],
//     [3,4,5],
//     [6,7,8],
// ];

// const draw = () =>{
//     console.log(count);
//     msg.innerText = "Game Draw! Better Luck Next Time";
//     msgcontainer.classList.remove("hide");
//     container.style.marginTop = "5vmin";
// }
// const disablebox = () =>{
//     for(let box of boxes){
//         box.disabled=true;
//     }
// }
// const enablebox = () =>{
//     for(let box of boxes){
//         box.disabled=false;
//         box.innerText="";
//     }
// }
// const resetgame = ()=>{
//     turnO=true;
//     msgcontainer.classList.add("hide");
//     count=0;
//     enablebox();
// }

// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         if(turnO){
//             box.innerText = "O";
//             turnO = false;
//         }
//         else{
//             box.innerText = "X";
//             turnO = true;
//         }
//         box.disabled = true;
//         count+=1;
//         checkwinner();
//     });
// });

// const showWinner = (Winner) => {
//     msg.innerText =`Congratulation!Winner is ${Winner}`;
//     msgcontainer.classList.remove("hide");
//     container.style.marginTop = "5vmin"; // Adjust margin top when winner is shown
//     disablebox();
// }

// const checkwinner = () => {
//     for(let val of winpatterns){
//         let pos1val = boxes[val[0]].innerText;
//         let pos2val = boxes[val[1]].innerText;
//         let pos3val = boxes[val[2]].innerText;

//     if(pos1val !="" && pos2val !="" && pos3val !=""){
//         if(pos1val === pos2val && pos2val === pos3val){
//             showWinner(pos1val);
//         }
//     }
//     if(count==9){
//         if(pos1val !== pos2val && pos2val !== pos3val){
//             draw();
//         }
//     }
    
//     }
// };

// newbutton.addEventListener("click", () =>{
//     resetgame();
// });
// resetbutton.addEventListener("click", () => {
//     resetgame();
// });
    
    
