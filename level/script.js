// Creating the container blocks
let obstacleA = document.createElement("span");
obstacleA.classList.add("obstacle-A");
let obstacleB = document.createElement("span");
obstacleB.classList.add("obstacle-B");
let obstacleC = document.createElement("span");
obstacleC.classList.add("obstacle-C");

var playerScore;

let fillerBlock = document.createElement("span");


let startScreen = document.createElement("span");
startScreen.id = "start-screen";
startScreen.innerText = "Click to start Game"

// Creating level container

const gameContainer = document.createElement("div");
gameContainer.id = "level";

function defGameContainer() {
    gameContainer.innerHTML = `
    <div id="obstacles-container"></div>
    <div id="level-ground"></div>
    `}

function levelWindowListener() {
    let loadLevel = document.querySelector("#load-level");
    loadLevel.addEventListener('change', gameFileSelect, false);
}

function gameFileSelect (event) {
        let levelWindowContent = document.querySelector("#level-window-content");
        defGameContainer();
        levelWindowContent.innerHTML = "";
        levelWindowContent.appendChild(gameContainer);
    const reader = new FileReader();
    reader.onload = gameFileLoad;
    reader.readAsText(event.target.files[0]);
}

function gameFileLoad(event) {
    const fileContent = event.target.result;
    obstaclesContainerUpdate(fileContent);
}

function obstaclesContainerUpdate(jmprFile) {
    let obstaclesContainer = document.querySelector("#obstacles-container");
    let object = JSON.parse(jmprFile);
    document.querySelector("#title-level-window").innerText = object.creator + " - " + object.title
    gameSpeed = object.difficulty*0.01 + 1;
    let char = document.createElement("span");
    char.id = "char";
    obstaclesContainer.append(char);
    // 2 filler blocks at the start so get enough time to start
    obstaclesContainer.append(fillerBlock.cloneNode(true), fillerBlock.cloneNode(true));
    for (block of object.blocks) {
        if (block.block == "A") {
            obstaclesContainer.append(obstacleA.cloneNode(true));
        } else if (block.block == "B") {
            obstaclesContainer.append(obstacleB.cloneNode(true));
        } else if (block.block == "C") {
            obstaclesContainer.append(obstacleC.cloneNode(true));
        }
    }
    // 2 filler blocks at the end
    obstaclesContainer.append(fillerBlock.cloneNode(true), fillerBlock.cloneNode(true));
    gameStartCondition();
}

function gameStartCondition() {
    let levelGameContainer = document.querySelector("#level-window-content");
    levelGameContainer.insertBefore(startScreen, levelGameContainer.firstChild);
    startScreen.addEventListener("click", () => {
        levelGameContainer.removeChild(levelGameContainer.firstChild);
        startGame();
    })
}

function startGame() {


    gameSpeed = 1;
    gameActive = true;
    document.addEventListener("keydown", (e) => {
        if ((e.key == binds.jump) && inJump == false) {
            inJump = true;
            char.classList.add("jumping")
            setTimeout(() => {
                char.classList.remove("jumping")
                inJump = false;
            },400)
        }
    })
    document.addEventListener("keydown", (e) => {
        if ((e.key == binds.crouch) && inJump == false) {
            if (char.classList.contains("crouching") == false) {
                char.classList.add("crouching")
            }
        }
    })
    document.addEventListener("keyup", (e) => {
        if ((e.key == binds.crouch) && inJump == false) {
            char.classList.remove("crouching")
        }
    })
    autoScroll();
}

function autoScroll() {
    let obstaclesContainer = document.querySelector("#obstacles-container");
    obstaclesContainer.scrollBy(gameSpeed*6,0);
    hitDetection()
    if (obstaclesContainer.lastChild.getBoundingClientRect().left > 1300 && gameActive == true) {
        console.log(obstaclesContainer.lastChild.getBoundingClientRect().left)
        setTimeout(autoScroll,10);
    } else if (gameActive == true) {
        winningScreen()
        gameActive = false
        return
    } return
}

var gameSpeed;
var gameActive = false;
var inJump = false;

function hitDetection() {
    let char = document.querySelector("#char")
    let blocsB = document.querySelectorAll(".obstacle-B");
    blocsB.forEach(blocB => {
    if (blocB.getBoundingClientRect().left > char.getBoundingClientRect().left && blocB.getBoundingClientRect().left < char.getBoundingClientRect().right) {
         if (char.getBoundingClientRect().bottom >= blocB.getBoundingClientRect().top) {
                      gameActive = false;
                      losingScreen();
                  }
              }
         })
    let blocsC = document.querySelectorAll(".obstacle-C");
         console.log(char.getBoundingClientRect().left)
        blocsC.forEach(blocC => {
            if (blocC.getBoundingClientRect().left > char.getBoundingClientRect().left && blocC.getBoundingClientRect().left < char.getBoundingClientRect().right) {
                if (char.getBoundingClientRect().top < blocC.getBoundingClientRect().bottom) {
                      gameActive = false;
                      losingScreen();
                  }
              }
         })

}  

function losingScreen() {
    let levelWindowContent = document.querySelector("#level-window-content");
    let obstaclesContainer = document.querySelector("#obstacles-container");
    let loseScreen = document.createElement("div");
    loseScreen.classList.add("ending-screen");
    loseScreen.innerHTML = `<span>You lost</span>`;
    obstaclesContainer.remove(obstaclesContainer.firstChild);
    levelWindowContent.insertBefore(loseScreen, levelWindowContent.firstChild);
}

function winningScreen() {
    let levelWindowContent = document.querySelector("#level-window-content");
    let obstaclesContainer = document.querySelector("#obstacles-container");
    let winScreen = document.createElement("div");
    winScreen.classList.add("ending-screen");
    winScreen.innerHTML = `<span>You won</span>`;
    obstaclesContainer.remove(obstaclesContainer.firstChild);
    levelWindowContent.insertBefore(winScreen, levelWindowContent.firstChild);
}