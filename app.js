const startPauseResume = document.getElementById("start_pause_resume");
const reset = document.getElementById("reset");
const _hours = document.getElementById("hours");
const _minutes = document.getElementById("minutes");
const _seconds = document.getElementById("seconds");
const _milliseconds = document.getElementById("milliseconds");

let hours = (minutes = seconds = milliseconds = 0);
let prev_hours = (prev_minutes = prev_seconds = prev_milliseconds = undefined);
let timeUpdate;

startPauseResume.addEventListener("click", (e) => {
  if (e.target.innerText == "Start") {
    e.target.innerText = "Pause";
    updateTime(0, 0, 0, 0);
  } else if (e.target.innerText == "Pause") {
    clearInterval(timeUpdate);
    e.target.innerText = "Resume";
  } else if (e.target.innerText == "Resume") {
    prev_hours = parseInt(_hours.innerText);
    prev_minutes = parseInt(_minutes.innerText);
    prev_seconds = parseInt(_seconds.innerText);
    prev_milliseconds = parseInt(_milliseconds.innerText);

    updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds);

    e.target.innerText = "Pause";
  }
});

reset.addEventListener("click", () => {
  if (timeUpdate) clearInterval(timeUpdate);
  setStopwatch(0, 0, 0, 0);
  startPauseResume.innerText = "Start";
});

function updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds) {
  const startTime = new Date();

  timeUpdate = setInterval (() => {
    const timeElapsed = new Date().getTime() - startTime.getTime();

    hours = parseInt(timeElapsed / 1000 / 60 / 60) + prev_hours;

    minutes = parseInt(timeElapsed / 1000 / 60) + prev_minutes;
    if (minutes > 60) {
      minutes %= 60;
      hours++;
    }

    seconds = parseInt(timeElapsed / 1000) + prev_seconds;
    if (seconds > 60) {
      seconds %= 60;
      minutes++;
    }

    milliseconds = timeElapsed + prev_milliseconds;
    if (milliseconds > 100) {
      milliseconds %= 100;
      seconds++;
    }

    setStopwatch(hours, minutes, seconds, milliseconds);
  }, 25);
}

function setStopwatch(hours, minutes, seconds, milliseconds) {
  _hours.innerText = padStart(hours, 2);
  _minutes.innerText = padStart(minutes, 2);
  _seconds.innerText = padStart(seconds, 2);
  _milliseconds.innerText = padStart(milliseconds, 2);
}

function padStart(time, length) {
  time = new String(time);
  return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
}
