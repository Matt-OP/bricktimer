let countdown;
let countdownTimeout;
let endTime;

function startCountdown() {
    clearInterval(countdown); // Clear any ongoing countdown
    clearTimeout(countdownTimeout); // Clear any existing timeout
    playSound("sounds\\start.mp3"); // Play sound when the start button is pressed

    const minuteInput = document.getElementById("minuteInput");
    const minTimeInput = document.getElementById("minTimeInput");
    const maxTimeInput = document.getElementById("maxTimeInput");

    let minutes = parseInt(minuteInput.value, 10) || 15;
    let minTime = parseInt(minTimeInput.value, 10) ?? 2;
    let maxTime = parseInt(maxTimeInput.value, 10) ?? 5;

    minTime = isNaN(minTime) ? 2 * 60 : minTime * 60;
    maxTime = isNaN(maxTime) ? 5 * 60 : maxTime * 60;

    if (isNaN(minutes) || isNaN(minTime) || isNaN(maxTime) || minTime < 0 || maxTime < 0 || minTime >= maxTime) {
        alert("Please enter a valid time within the specified range.");
        return;
    }

    let delay = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    let totalTime = minutes * 60;

    // Store the end time based on the delay
    endTime = Date.now() + (delay + totalTime) * 1000;

    updateDisplay(totalTime);

    // Start countdown after the random delay
    countdownTimeout = setTimeout(() => {
        playSound("sounds\\gunshot.mp3"); // Play gunshot when countdown starts

        countdown = setInterval(() => {
            let remainingTime = Math.ceil((endTime - Date.now()) / 1000);
            if (remainingTime < 0) remainingTime = 0;

            updateDisplay(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(countdown);
                updateDisplay(0); // Ensure display shows 00:00
                playSound("sounds\\clock-alarm.mp3"); // Play clock alarm when countdown ends
            }
        }, 1000);
    }, delay * 1000);
}

function updateDisplay(time) {
    if (time < 0) time = 0;
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function playSound(audio_file) {
    const audio = new Audio(audio_file);
    audio.play();
}
