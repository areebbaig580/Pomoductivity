const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');
const noSession = document.getElementById('session');
const backPage = document.querySelector(".home");
const noFocus = document.getElementById('focus-hours');
const weekHours = document.getElementById('Weekly-hours');

backPage.addEventListener("click", (evt) => {
    window.location.href = "../index.html";
});

function getSession() {

    let session = localStorage.getItem('pomodoroSessions');
    return session ? JSON.parse(session) : [];

};


function getTodayDate() {
    return new Date().toISOString().split('T')[0];
};


function getTodaySession() {
    let sessions = getSession();
    let today = getTodayDate();

    return sessions.filter(s => s.date === today && s.type === "focus").length;

};

function getWeeklySessions() {
    let allsessions = getSession();
    let focusSessions = allsessions.filter(s => s.type === "focus");

    let today = new Date();
    let dayOfWeek = today.getDay();
    let daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    let monday = new Date(today);
    monday.setDate(today.getDate() - daysFromMonday);


    let dailyCounts = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 7; i++) {
        let currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);
        let dateString = currentDay.toISOString().split('T')[0];

        let count = focusSessions.filter(s => s.date === dateString).length;
        dailyCounts[i] = count;
    }


    return dailyCounts;


};

function getdailyHours() {
    let sessionsToday = getTodaySession();
    let focusHours = sessionsToday * 25;
    let hr = Math.floor(focusHours / 60);
    let min = focusHours - (hr * 60);
    if (min < 10) {
        min = "0" + min;
    }
    if(hr===0){
        noFocus.innerHTML = `${min}m`;
    }else{
        noFocus.innerHTML = `${hr}h ${min}m`;
    }
};

function getWeeklyHours() {
    let allsessions = getSession();
    let focusSessions = allsessions.filter(s => s.type === "focus");

    let today = new Date();
    let dayOfWeek = today.getDay();
    let daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    let monday = new Date(today);
    monday.setDate(today.getDate() - daysFromMonday);


    let dailyHours = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 7; i++) {

        let currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);
        let dateString = currentDay.toISOString().split('T')[0];

        let count = focusSessions.filter(s => s.date === dateString).length;

        focusMin = count * 25;
        focusHours = focusMin / 60;

        dailyHours[i] = focusHours;
    }


    return dailyHours;
};

function toatalWeeklyHours() {
    let dailyHr = getWeeklyHours();
    let totalHours = 0
    for (let hours of dailyHr) {
        totalHours += hours;
    }
    let hr = Math.floor(totalHours);
    let min = Math.round((totalHours % 1) * 60);
    if (hr === 0) {
        return `${min}m`;
    } else {

        return `${hr}h ${min}m`;
    }
    
};


function updateChart() {
    currentSession = getTodaySession();
    weeklyHr = toatalWeeklyHours();

    localStorage.setItem('currentSession', currentSession);
    noSession.innerHTML = currentSession;
    weekHours.innerHTML = weeklyHr;

    getdailyHours();
};


updateChart();

let daysData = getWeeklySessions();
let dailyHourData = getWeeklyHours();

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', `Sat`, `Sun`],
        datasets: [{
            label: 'Study Hours',
            data: dailyHourData,
            backgroundColor: '#8A75E6'
        }]
    },
    options: {
        scales: {
            y: {
                grid: {
                    color: "#808080"
                }
            },
            x: {
                grid: {
                    color: "#808080"
                }

            }

        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let hours = context.parsed.y;

                        let hr = Math.floor(hours);
                        let min = Math.round((hours % 1) * 60);
                        if (hr === 0) {
                            return `Study hours :${min}m`;
                        } else {

                            return `Study hours :${hr}h ${min}m`;
                        }

                    }
                }
            }
        }
    }

});
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', `Sat`, `Sun`],
        datasets: [{
            label: 'Total Sessions',
            data: daysData,
            backgroundColor: '#8A75E6'
        }]
    },
    options: {
        scales: {
            y: {
                grid: {
                    color: "#808080"
                }
            },
            x: {
                grid: {
                    color: "#808080"
                }

            }

        }
    }
});
