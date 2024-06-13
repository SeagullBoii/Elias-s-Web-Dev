document.getElementById("back-button").onclick = function () {
    window.location.href = "../index.html";
};

let timerInterval;
let totalTime = 0;

const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timerDisplay');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {

    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    totalTime = (hours * 3600) + (minutes * 60) + seconds;

    if (totalTime <= 0) return;

    timerInterval = setInterval(updateTimer, 1000);

    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
}

function updateTimer() {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    if (totalTime <= 0) {
        clearInterval(timerInterval);

        let audio = new Audio('timer_end.mp3');
        audio.play();

        totalTime--;
        timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = true;
        return;
    }

    totalTime--;
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function pauseTimer() {
    clearInterval(timerInterval);

    [h, min, s] = timerDisplay.textContent.split(":");
    document.getElementById('hours').value = h;
    document.getElementById('minutes').value = min;
    document.getElementById('seconds').value = s;

    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);

    totalTime = 0;
    timerDisplay.textContent = '00:00:00';

    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
}