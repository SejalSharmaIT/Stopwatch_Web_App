let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let lapCount = 0;

function updateDisplay() {
    let time = Date.now() - startTime + elapsedTime;
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    document.getElementById("display").innerText =
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + ":" +
        (milliseconds < 10 ? "0" : "") + milliseconds;
}

function start() {
    if (!running) {
        running = true;
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
    }
}

function stop() {
    if (running) {
        running = false;
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
    }
}

function reset() {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    lapCount = 0;
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("laps").innerHTML = ""; // Clear laps
}

function lap() {
    if (running) {
        lapCount++;
        const lapsContainer = document.getElementById("laps");
        const lapTime = document.getElementById("display").innerText;
        const lapElement = document.createElement("div");
        lapElement.className = "lap-item";
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
        lapsContainer.scrollTop = lapsContainer.scrollHeight; // Auto scroll to latest lap
    }
}
