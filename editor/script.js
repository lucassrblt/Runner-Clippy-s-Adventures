function editorLoad() {

// SAVE, IMPORT & DELETE BUTTON
let saveButton = document.querySelector("#save-button")
let saveFileImport = document.querySelector("[name='import-file']");
let resetLevel = document.querySelector("#reset-level");
// FORM
let title = document.querySelector("[name='title']");
let creator = document.querySelector("[name='creator']");
let difficulty = document.querySelector("[name='difficulty']");
// CONTAINERS
let blocksNumber = document.querySelector("#blocks-number")
let mapElements = document.querySelectorAll(".map-element");
let elementsContainers = document.querySelectorAll(".map-element-container");
let levelContainer = document.querySelector("#level-container");
let menuContainer = document.querySelector("#menu-container");

////////////////////////////

let blockA = document.createElement("span");
blockA.innerText = "A";
blockA.classList.add("map-element");
blockA.classList.add("element-type-A");
blockA.draggable = true;

let blockB = document.createElement("span");
blockB.innerText = "B";
blockB.classList.add("map-element");
blockB.classList.add("element-type-B");
blockB.draggable = true;

let blockC = document.createElement("span");
blockC.innerText = "C";
blockC.classList.add("map-element");
blockC.classList.add("element-type-C");
blockC.draggable = true;

let visualRemove = document.createElement("span");
visualRemove.innerText = "Remove";
visualRemove.classList.add("visual-remove");


function updateShownBlockNumber() {
    blocksNumber.innerText = "Number of blocks : " + levelContainer.children.length;
}
updateShownBlockNumber();

// DRAG mapElements IN elementsContainers

function dragListenerClassDragged(element) {
    element.addEventListener("dragstart", () => {
        element.classList.add("dragged");
    })
    element.addEventListener("dragend", () => {
        element.classList.remove("dragged");
    })
}

mapElements.forEach(dragListenerClassDragged)

elementsContainers.forEach(elementsContainer => {
    elementsContainer.addEventListener("dragover", (e) => {

        e.preventDefault();
        let mapElementAfter = getAfterDragElement(elementsContainer, e.clientX); // get element after the mouse while a drag is active
        let mapElement = document.querySelector(".dragged");

        // adjust the position of the dragged mapElement (only in #level-container because #menu-container does not change)
        if (elementsContainer.id == levelContainer.id){
            // reset content of "#menu-container"
            fillMenu()
            // add mapElement on mouse position
            if (mapElementAfter == null) {
                elementsContainer.appendChild(mapElement);
            } else {
                elementsContainer.insertBefore(mapElement, mapElementAfter);
            }
        // add a visualRemove when #menu-container is hovered
        } else if (elementsContainer.id == menuContainer.id){
            menuContainer.insertBefore(visualRemove, menuContainer.firstChild);
        }

        // on draggend, check what action to do based on the container where it is dropped
        mapElement.addEventListener("dragend", () => {
            // if dropped in "#level-container"
            if (elementsContainer.id == levelContainer.id){
                // add mapElement on mouse position
                if (mapElementAfter == null) {
                    elementsContainer.appendChild(mapElement);
                    // if mapElement is at the end, scroll all the way to the right
                    if (mapElement == levelContainer.lastChild) {
                        elementsContainer.scrollBy(200,0);
                    }
                } else {
                    elementsContainer.insertBefore(mapElement, mapElementAfter);
                }
            // if dropped in "#menu-container"
            } else if (elementsContainer.id == menuContainer.id){
                // reset content of "#menu-container"
                fillMenu()
                // remove the element
                mapElement.remove();
            }
            blocksNumber.innerText = "Number of blocks : " + levelContainer.children.length; // update the number of blocks that is shown
        })
    updateShownBlockNumber();
    })
})

function getAfterDragElement(elementsContainer, x) {
    let draggableElements = [...elementsContainer.querySelectorAll(".map-element:not(.dragged)")]; // create a collection of all the elements that are not dragged
    return draggableElements.reduce(
    (closest, child) => { 
        const box = child.getBoundingClientRect(); // give us informations regarding the size and position of an element relative to the viewport
        offset = x - box.left - box.width/2
        if (offset < 0 && offset > closest.offset) {
            return {offset : offset, element: child};
        } else {
            return closest;
        }
    },
    {offset: Number.NEGATIVE_INFINITY}).element
}

function fillMenu() {
    menuContainer.innerHTML = ""
    menuContainer.append(blockA.cloneNode(true), blockB.cloneNode(true), blockC.cloneNode(true));
    menuContainer.querySelectorAll(".map-element").forEach(dragListenerClassDragged)
}

// SAVE

function convertMapToJson(mapStructure) {
    let obj = Object.fromEntries(mapStructure); //convert map to object before converting to json
    let jsonStructure = JSON.stringify(obj)
    return jsonStructure
}

function download(filename, content) {
    // create clickable element for download
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    // create and click of the said element
    element.style.display = 'none'; // make it not visible
    document.body.appendChild(element);
    element.click();
    // delete the element
    document.body.removeChild(element);
}

saveButton.addEventListener("click", () => {
    let saveMap = new Map();
    if (title.value != "") {
        saveMap.set("title", title.value);
    } else {
        saveMap.set("title", "untitled");
    }
    if (creator.value != "") {
        saveMap.set("creator", creator.value);
    } else {
        saveMap.set("creator", "anonymous");
    }
    saveMap.set("difficulty", parseInt(difficulty.value));
    let levelMap = new Array();
    for (let child of levelContainer.children) {
        if (child.classList.contains("element-type-A")) {
            levelMap.push({"block": "A"});
        } else if (child.classList.contains("element-type-B")) {
            levelMap.push({"block": "B"});
        } else if (child.classList.contains("element-type-C")) {
            levelMap.push({"block": "C"});
        }
        saveMap.set("blocks", levelMap);
    }
    saveJson = convertMapToJson(saveMap)
    saveName = saveMap.get("title") + "-" + saveMap.get("creator") + ".jmpr"
    download(saveName, saveJson)
})

// IMPORT FILE

saveFileImport.addEventListener('change', editorFileSelect, false);

function editorFileSelect(event) {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
    saveFileImport.value = "";
}

function handleFileLoad(event) {
    const fileContent = event.target.result;
    levelContainerUpdate(fileContent);
}

function levelContainerUpdate(jmprFile) {
    let obj = JSON.parse(jmprFile);
    // insert obj.title in corresponding input field
    title.value = obj.title;
    // insert obj.creator in corresponding input field
    creator.value = obj.creator;
    // select obj.difficulty in corresponding select field
    difficulty.value = obj.difficulty;
    // insert corresponding  blocks in levelContainer
    levelContainer.innerHTML = "";
    for (block of obj.blocks) {
        if (block.block == "A") {
            levelContainer.appendChild(blockA.cloneNode(true));
        } else if (block.block == "B") {
            levelContainer.appendChild(blockB.cloneNode(true));
        } else if (block.block == "C") {
            levelContainer.appendChild(blockC.cloneNode(true));
        }
    }
    levelContainer.querySelectorAll(".map-element").forEach(dragListenerClassDragged);
    updateShownBlockNumber();
}

resetLevel.addEventListener("click", () => {
    levelContainer.innerHTML = "";
    levelContainer.appendChild(blockA.cloneNode(true));
    title.value = "";
    creator.value = "";
    difficulty.value = 1;
    updateShownBlockNumber();
})

}