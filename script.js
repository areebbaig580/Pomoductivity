const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const btn = document.querySelector(".start-stop");
const focusBtn = document.querySelector(".focus");
const breakBtn = document.querySelector(".break")
const longBreakBtn = document.querySelector(".long-break")


let remainingSeconds = 25 * 60;
focusBtn.style.backgroundColor = `#373636b7`;
let timeinterval = null;
let isRunning = false;


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

});


breakBtn.addEventListener("click", (evt) => {

    switchMode(10, "10", breakBtn, [focusBtn, longBreakBtn]);

});


longBreakBtn.addEventListener("click", (evt) => {

    switchMode(15, "15", longBreakBtn, [focusBtn, breakBtn]);

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

    }

};

