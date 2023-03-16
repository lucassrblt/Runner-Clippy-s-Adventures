const appGame = document.querySelector("#app");
const body = document.querySelector("body");

// window creation

const main = document.createElement("main");
function defWindow() {
    main.innerHTML = `
    <section class="window">
        <header>
            <div class="window-button">
                <button class="red"></button>
                <button class="yellow"></button>
                <button class="green"></button> 
            </div>
            <span class="title-window">Clippy's Adventures - Groupe 2</span>
        </header>
        <div id="menu-window-content">
            <div id="app-launch">
                <span id="click-to-start">Click to start</span>
            </div>
        </div>
    </section>
    `}

// main menu creation

const mainMenu = document.createElement("div");
mainMenu.id = "main-menu";
mainMenu.classList.add("pause-menu");
function defMainMenu() {
    mainMenu.innerHTML = `
    <span class="pause-title">MENU</span>
    <div class="pause-buttons">
        <button id="play" class="generic-button">Play</button>
        <button id="edit" class="generic-button">Edit Level</button>
        <button id="settings" class="generic-button">Settings</button>
    </div>
    `}

// level window creation

const levelWindowContainer = document.createElement("div");
levelWindowContainer.id = "level-window-container";
levelWindowContainer.classList.add("window-container");
function defLevelMenu() {
    levelWindowContainer.innerHTML = `
    <section class="window">
        <header>
            <div class="window-button">
                <button class="red"></button>
                <button class="yellow"></button>
                <button class="green"></button> 
            </div>
            <span id="title-level-window" class="title-window">Clippy's Adventures - Groupe 2</span>
        </header>
        <div id="level-window-content">
            <div id="app-launch">
                <div id="level-menu" class="pause-menu">
                    <div class="pause-buttons">
                    <label class="generic-button">LOAD A LEVEL
                        <input id="load-level" type="file" accept=".jmpr">
                    </label>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `}

// editor window creation

const editorWindowContainer = document.createElement("div");
editorWindowContainer.id = "editor-window-container";
editorWindowContainer.classList.add("window-container");
function defEditorMenu() {
    editorWindowContainer.innerHTML = `
    <section class="window">
        <header>
            <div class="window-button">
                <button class="red"></button>
                <button class="yellow"></button>
                <button class="green"></button> 
            </div>
            <span id="title-level-window" class="title-window">Clippy's Adventures - Groupe 2</span>
        </header>
        <div id="editor-window-content">
            <div>
                <label class="generic-button">Import a level file
                    <input name="import-file" type="file" accept=".jmpr">
                </label>
                <button id="reset-level" class="generic-button">Reset level</button>
            </div>
            <form>
                <input name="title" type="text" placeholder="Title" autocomplete="off">
                <input name="creator" type="text" placeholder="Creator" autocomplete="off">
                <label>Difficulty
                    <select name="difficulty">
                        <option value=1 selected>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                        <option value=4>4</option>
                        <option value=5>5</option>
                    </select>
                </label>
            </form>
            <span id="blocks-number"></span>
            <div id="level-container" class="map-element-container">
                <span class="map-element element-type-A" draggable="true">A</span>
            </div>        
            <div id="menu-container" class="map-element-container">
                <span class="map-element element-type-A" draggable="true">A</span>
                <span class="map-element element-type-B" draggable="true">B</span>
                <span class="map-element element-type-C" draggable="true">C</span>
            </div>
            <button id="save-button" class="generic-button">
                Download map
            </button>
        </div>
    </section>
    `}

// settings window creation

const settingsWindowContainer = document.createElement("div");
settingsWindowContainer.id = "settings-window-container";
settingsWindowContainer.classList.add("window-container");
function defSettingsMenu() {
    settingsWindowContainer.innerHTML = `
    <section class="window">
        <header>
            <div class="window-button">
                <button class="red"></button>
                <button class="yellow"></button>
                <button class="green"></button> 
            </div>
            <span id="title-level-window" class="title-window">Clippy's Adventures - Groupe 2</span>
        </header>
        <div id="level-window-content">
            <div id="app-launch">
                <div id="level-menu" class="pause-menu">
                <span class="pause-title">COMMANDES</span>
                    <div class="pause-buttons">
                        <label for="jump">Jump</label>
                        <input id="jump" class="generic-button" maxlength="1">
                        <label for="crouch">Crouch</label>
                        <input id="crouch" class="generic-button" maxlength="1">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `}

////////////////

appGame.addEventListener("click", () => {
    defWindow()
    body.appendChild(main);

    // Close window
    let closeWindow = document.querySelectorAll(".red");
    closeWindow.forEach(closeWindowListener)

    // Menu
    let window = document.querySelector("#menu-window-content");
    let launchWindow = document.querySelector("#app-launch");
    window.addEventListener("click", () => {
        defMainMenu();
        launchWindow.innerHTML = "";
        launchWindow.appendChild(mainMenu);
        let play = document.querySelector("#play");
        let edit = document.querySelector("#edit");
        let settings = document.querySelector("#settings");
        play.addEventListener("click", () => {
            defLevelMenu();
            body.appendChild(levelWindowContainer);
            document.querySelector("#level-window-container").querySelectorAll(".red").forEach(closeWindowListener);
            levelWindowListener();
        })
        edit.addEventListener("click", () => {
            defEditorMenu();
            body.appendChild(editorWindowContainer);
            document.querySelector("#editor-window-container").querySelectorAll(".red").forEach(closeWindowListener);
            editorLoad()
        })
        settings.addEventListener("click", () => {
            defSettingsMenu();
            body.appendChild(settingsWindowContainer);
            document.querySelector("#settings-window-container").querySelectorAll(".red").forEach(closeWindowListener);
            settingsLoad()
        })
    })
})