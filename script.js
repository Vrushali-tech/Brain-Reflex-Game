let timer;
let score;
let hitrn;
let timerInterval;

/* Start Game */
document.querySelector("#startBtn")
.addEventListener("click", startGame);

function startGame(){
    timer = 60;
    score = 0;

    document.querySelector("#scoreval").textContent = score;
    document.querySelector("#timerval").textContent = timer;

    makeBubble();
    getNewHit();
    runTimer();
}

/* Score Increase */
function increaseScore(){
    score += 10;

    let scoreBox = document.querySelector("#scoreval");
    scoreBox.textContent = score;

    scoreBox.style.transform="scale(1.3)";
    setTimeout(()=>{
        scoreBox.style.transform="scale(1)";
    },200);
}

/* Random Hit */
function getNewHit(){
    hitrn = Math.floor(Math.random()*10);
    document.querySelector("#hitval").textContent = hitrn;
}

/* Create Bubbles */
function makeBubble(){
    let clutter="";

    for(let i=1;i<=126;i++){
        let rn=Math.floor(Math.random()*10);
        clutter += `<div class="bubble">${rn}</div>`;
    }

    document.querySelector("#pbtm").innerHTML = clutter;
}

/* Timer */
function runTimer(){

    clearInterval(timerInterval);

    timerInterval = setInterval(()=>{
        if(timer>0){
            timer--;
            document.querySelector("#timerval").textContent=timer;
        }
        else{
            clearInterval(timerInterval);
            gameOver();
        }
    },1000);
}

/* Game Over Screen */
function gameOver(){
    document.querySelector("#pbtm").innerHTML=
    `
    <div class="gameover">
        <h1>Game Over</h1>
        <h2>Your Score: ${score}</h2>
        <button onclick="startGame()">Play Again</button>
    </div>
    `;
}

/* Bubble Click */
document.querySelector("#pbtm")
.addEventListener("click",function(dets){

    if(!dets.target.classList.contains("bubble"))
        return;

    let clickedNum=Number(dets.target.textContent);

    if(clickedNum===hitrn){
        increaseScore();
        makeBubble();
        getNewHit();
    }
});