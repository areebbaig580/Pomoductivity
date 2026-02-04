const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const btn = document.querySelector(".start-stop");
const focusBtn = document.querySelector(".focus");
const breakBtn = document.querySelector(".break")
const longBreakBtn = document.querySelector(".long-break")


let remainingSeconds = 1 * 60;
focusBtn.style.backgroundColor = `#373636b7`;
let timeinterval = null;
let isRunning = false;
let currMode = "focus";


function switchMode(duration, displayMin, activeBtn, otherBtns) {
    if (isRunning) {

        btn.innerHTML = "START";
        clearInterval(timeinterval);
        isRunning = false;
    }

    remainingSeconds = duration * 60;
    minutes.innerHTML = displayMin;
    seconds.innerHTML = "00";


    activeBtn.style.backgroundColor = `#373636b7`;
    otherBtns.forEach(btn => btn.style.backgroundColor = ``);

};

focusBtn.addEventListener("click", (evt) => {
    switchMode(25, "25", focusBtn, [breakBtn, longBreakBtn]);
    currMode = "focus";

});


breakBtn.addEventListener("click", (evt) => {

    switchMode(10, "10", breakBtn, [focusBtn, longBreakBtn]);
    currMode = "short-break";

});


longBreakBtn.addEventListener("click", (evt) => {

    switchMode(15, "15", longBreakBtn, [focusBtn, breakBtn]);
    currMode = "long-break";

});

btn.addEventListener("click", (evt) => {

    if (isRunning) {

        btn.innerHTML = "START";
        clearInterval(timeinterval);
        isRunning = false;
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

    seconds.innerHTML = sec;
    minutes.innerHTML = min;

    if (remainingSeconds === 0) {
        clearInterval(timeinterval);

        saveSession();


    }

};

function saveSession() {

    if (currMode !== "focus") {
        return;  
    }


    session = {
        date: new Date().toISOString().split('T')[0],
        type: currMode,
        timestamp: Date.now(),
    };

    let existingSession = localStorage.getItem('pomodoroSessions');
    let sessionArray = existingSession ? JSON.parse(existingSession) : [];


    sessionArray.push(session);

    localStorage.setItem('pomodoroSessions', JSON.stringify(sessionArray));


}

