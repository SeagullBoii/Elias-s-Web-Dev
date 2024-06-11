
const grid = document.getElementById('grid');
const startStopButton = document.getElementById('startStopButton');
const clearButton = document.getElementById('clearButton');
const randomizeButton = document.getElementById('randomizeButton');

var slider = document.getElementById("speed-range");
var sliderText = document.getElementById("slider-text");
var genText = document.getElementById("generation");

let isMouseDown = false;
let isRunning = false;

let intervalId;
let currentGrid = [];
let nextGrid = [];
let modifiedCells = new Set();

let size = 80;
let speed = 5;
let generation = 0;

sliderText.innerHTML = `Speed: ` + slider.value;

for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    cell.addEventListener('mousedown', () => {
        isMouseDown = true;
        toggleCell(cell);
        modifiedCells.add(cell);
    });
    cell.addEventListener('mouseover', () => {
        if (isMouseDown && !modifiedCells.has(cell)) {
            toggleCell(cell);
            modifiedCells.add(cell);
        }
    });
    
    grid.appendChild(cell);
    currentGrid.push(false);
    nextGrid.push(false);
}

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

grid.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stopGame();
    } else {
        startGame();
    }
});

clearButton.addEventListener('click', () => {
    clearGrid();

});

randomizeButton.addEventListener('click', () => {
    randomizeGrid();
});

slider.oninput = function () {
    speed = slider.value;
    stopGame();
    sliderText.innerHTML = `Speed: ` + slider.value;
}

function startGame() {
    isRunning = true;
    startStopButton.textContent = 'Stop';
    intervalId = setInterval(runGeneration, 600 / speed);
}

function stopGame() {
    isRunning = false;
    startStopButton.textContent = 'Start';
    clearInterval(intervalId);
}

function clearGrid() {
    stopGame();
    currentGrid.fill(false);
    generation = 0;
    genText.innerHTML = 'Generation: ' + generation;
    updateGrid();
}

function randomizeGrid() {
    currentGrid = currentGrid.map(() => Math.random() < 0.5);
    updateGrid();
}

function toggleCell(cell) {
    const index = Array.from(grid.children).indexOf(cell);
    currentGrid[index] = !currentGrid[index];
    cell.classList.toggle('alive');
}

function countAliveNeighbors(index) {
    let count = 0;
    const row = Math.floor(index / size);
    const col = index % size;

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < size && j >= 0 && j < size && !(i === row && j === col)) {
                const neighborIndex = i * size + j;
                if (currentGrid[neighborIndex]) {
                    count++;
                }
            }
        }
    }

    return count;
}

function runGeneration() {
    for (let i = 0; i < currentGrid.length; i++) {
        const aliveNeighbors = countAliveNeighbors(i);
        if (currentGrid[i]) {
            if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                nextGrid[i] = false;
            } else {
                nextGrid[i] = true;
            }
        } else {
            if (aliveNeighbors === 3) {
                nextGrid[i] = true;
            } else {
                nextGrid[i] = false;
            }
        }
    }

    generation++;
    genText.innerHTML = 'Generation: ' + generation;

    currentGrid = [...nextGrid];
    updateGrid();
}

function updateGrid() {
    const cells = grid.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        if (currentGrid[index]) {
            cell.classList.add('alive');
        } else {
            cell.classList.remove('alive');
        }
    });
}

function hasNoAliveCells() {
    return !currentGrid.some(cell => cell);
}

document.getElementById("back-button").onclick = function () {
    window.location.href = "../index.html";
};

