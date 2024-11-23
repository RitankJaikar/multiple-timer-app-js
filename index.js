let main= document.querySelector(".main");
let form= document.querySelector("#set-timer-form");
let hour= document.querySelector("#hour");
let min= document.querySelector("#min");
let sec= document.querySelector("#sec");

let timerCount= 1;

form.addEventListener("submit", e => {
    e.preventDefault();
    let hourVal= parseInt(hour.value) || 0;
    let minVal= parseInt(min.value) || 0;
    let secVal= parseInt(sec.value) || 0;
    let inSec= hourVal*60*60 + minVal*60 + secVal;

    console.log(hourVal, minVal, secVal, inSec);

    if(inSec>0) {
        addTimer(inSec, timerCount);
        let paraNoTimer= document.querySelector(".para-no-timer");
        if(paraNoTimer) {
            paraNoTimer.remove();
        }
    }
    
    timerCount++;

    hour.value= "";
    min.value= "";
    sec.value= "";
})

const intervalMap = new Map();

function addTimer(inSec, timerCount) {

    let timerDiv= document.createElement("div");
    timerDiv.classList.add("timer-div");
    timerDiv.classList.add("timer-div2");
    timerDiv.setAttribute("id", `timer-${timerCount}`);

    let timeLeft= document.createElement("div");
    timeLeft.innerText= "Time Left:";
    timerDiv.appendChild(timeLeft);

    let timerWrapper= document.createElement("div");
    timerWrapper.classList.add("timer-wrapper");
    timerDiv.appendChild(timerWrapper);

    let hourSpan= document.createElement("span");
    hourSpan.classList.add("time");
    hourSpan.classList.add("hour");
    hourSpan.innerText= "00";
    timerWrapper.appendChild(hourSpan);

    let semiColun1= document.createElement("span");
    semiColun1.innerText= ":";
    timerWrapper.appendChild(semiColun1);

    let minSpan= document.createElement("span");
    minSpan.classList.add("time");
    minSpan.classList.add("min");
    minSpan.innerText= "00";
    timerWrapper.appendChild(minSpan);

    let semiColun2= document.createElement("span");
    semiColun2.innerText= ":";
    timerWrapper.appendChild(semiColun2);

    let secSpan= document.createElement("span");
    secSpan.classList.add("time");
    secSpan.classList.add("sec");
    secSpan.innerText= "00";
    timerWrapper.appendChild(secSpan);

    let intervalId= setInterval(()=> {
        if(inSec===0) {
            clearInterval(intervalId);
            intervalMap.delete(timerCount);

            let audio= new Audio("https://cdn.uppbeat.io/audio-files/13a6d3c9e914de5ab3fb451786993718/4e02f27c587347d1a09a4e08032cac08/bc76aea3e026e422ae25b2553b1a479b/STREAMING-alarm-danger-alert-big-smartsound-fx-1-00-24.mp3");
            audio.play();

            timerDiv.innerHTML= "";
            timerDiv.classList.add("time-up-div");

            let timeUpSpan= document.createElement("span");
            timeUpSpan.classList.add("time-up");
            timeUpSpan.innerText= "Time Is Up 🔊";
            timerDiv.appendChild(timeUpSpan);

            let stopBtn= document.createElement("button");
            stopBtn.innerText= "Stop";
            stopBtn.classList.add("stop");
            timerDiv.appendChild(stopBtn);
            stopBtn.addEventListener("click", e => deleteBlock(e, audio));
        }

        let hourValue= Math.floor(inSec/(60*60));
        let minValue= Math.floor((inSec%(60*60))/60); // inSec%(60*60) Remaining seconds after extracting hours
        let secValue= Math.floor((inSec%(60*60))%60); // Remaining seconds after extracting minutes
        hourSpan.innerText= String(hourValue).padStart(2, '0');
        minSpan.innerText= String(minValue).padStart(2, '0');
        secSpan.innerText= String(secValue).padStart(2, '0');
        console.log(inSec);
        inSec--;
    }, 1000);

    intervalMap.set(timerCount, intervalId);

    let deleteBtn= document.createElement("button");
    deleteBtn.innerText= "Delete";
    deleteBtn.classList.add("delete-btn");
    timerDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", e => deleteTimer(e, timerCount));

    main.appendChild(timerDiv);
}

function deleteTimer(e, timerCount) {
    console.log(e.target.parentNode);
    const intervalId= intervalMap.get(timerCount);
    if(intervalId) {
        clearInterval(intervalId);
        intervalMap.delete(timerCount);
    }
    e.target.parentNode.remove();
    addParaNoTimer();
}

function deleteBlock(e, audio) {
    e.target.parentNode.remove();
    audio.pause();
    addParaNoTimer();
}

function addParaNoTimer() {
    if(!document.querySelector(".para-no-timer") && !document.querySelector(".timer-div2")) {
        let paraNoTimer = document.createElement("p");
        paraNoTimer.classList.add("para-no-timer");
        paraNoTimer.innerText= "You have no timers currently!";
        main.append(paraNoTimer);
    }
}