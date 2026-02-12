const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const btn = document.querySelector(".start-stop");
const focusBtn = document.querySelector(".focus");
const breakBtn = document.querySelector(".break")
const longBreakBtn = document.querySelector(".long-break")
const txt = document.querySelector(".txt");


focusBtn.style.backgroundColor = `#373636b7`;
let timeinterval = null;
let isRunning = false;
let currMode = "focus";

let pomodoro = localStorage.getItem('pomodoro');
let shortBreak = localStorage.getItem('short-break');
let longBreak = localStorage.getItem('long-break');

let remainingSeconds = parseInt(pomodoro) * 60;

window.addEventListener("DOMContentLoaded", () => {
    minutes.innerHTML = pomodoro;
});

function switchMode(duration, displayMin, activeBtn, otherBtns, text) {
    if (isRunning) {

        btn.innerHTML = "START";
        clearInterval(timeinterval);
        isRunning = false;
    }

    remainingSeconds = duration * 60;
    minutes.innerHTML = displayMin;
    seconds.innerHTML = "00";
    txt.innerHTML = text;

    activeBtn.style.backgroundColor = `#373636b7`;
    otherBtns.forEach(btn => btn.style.backgroundColor = ``);

};

focusBtn.addEventListener("click", (evt) => {
    switchMode(parseInt(pomodoro), pomodoro, focusBtn, [breakBtn, longBreakBtn], "Lets focus!");
    currMode = "focus";

});


breakBtn.addEventListener("click", (evt) => {

    switchMode(parseInt(shortBreak), shortBreak, breakBtn, [focusBtn, longBreakBtn], "Take a break!");
    currMode = "short-break";

});


longBreakBtn.addEventListener("click", (evt) => {

    switchMode(parseInt(longBreak), longBreak, longBreakBtn, [focusBtn, breakBtn], "Take a long break!");
    currMode = "long-break";

});

btn.addEventListener("click", (evt) => {
    
    if (isRunning) {

        btn.innerHTML = "START";
        clearInterval(timeinterval);

    }
    else {
        btn.innerHTML = "PAUSE";
        timeinterval = setInterval(startfunction, 1000);
        isRunning = true;

    }

});


function startfunction() {
    remainingSeconds--;

    let min = Math.floor(remainingSeconds / 60);
    let sec = remainingSeconds % 60;


    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;

    seconds.innerHTML = sec;
    minutes.innerHTML = min;


    if (remainingSeconds === 0) {

        clearInterval(timeinterval);
        saveSession();
        if (currMode === "focus") {
            switchMode(parseInt(shortBreak), shortBreak, breakBtn, [focusBtn, longBreakBtn], "Take a break!");
        } else if (currMode === "short-break") {
            switchMode(parseInt(pomodoro), pomodoro, focusBtn, [breakBtn, longBreakBtn], "Lets focus!");
        }

    }

};

function saveSession() {

    if (currMode !== "focus") {
        return;
    }

    let session = {
        date: new Date().toISOString().split('T')[0],
        type: currMode,
        duration: parseInt(pomodoro),
        timestamp: Date.now(),
    };

    let existingSession = localStorage.getItem('pomodoroSessions');
    let sessionArray = existingSession ? JSON.parse(existingSession) : [];


    sessionArray.push(session);

    localStorage.setItem('pomodoroSessions', JSON.stringify(sessionArray));


}

