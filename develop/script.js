// DayPlanner

// Query selectors
let todayEl = document.querySelector("#currentDay");
let tableRowsEl = document.querySelectorAll("tr");

// Function calls
main();


// Function definitions
function main() {
    setDate();
    setTableColors();
}

function setDate() {
    let today = moment().format("dddd, MMM Do");
    console.log(today);
    todayEl.textContent = today;
    
    return;
}

function convertTime(numericPart, moridiem) {
    let militaryTime = 0;

    if(numericPart === 12 && moridiem === "AM") {
        militaryTime = 0;
        
    } else if (moridiem === "AM" || (numericPart === 12 && moridiem === "PM")) {
        militaryTime = numericPart * 100;
        
    } else if (moridiem === "PM") {
        militaryTime = (numericPart + 12) * 100;
    }
    
    return parseInt(militaryTime);
}

function parseTime(timeString) {
    let split = [];
    let numericPart = 0;
    let moridiem = "";
    let militaryTime = 0;

    // Parse number and am/pm part of time
    split = timeString.split(" ");
    
    numericPart = parseInt(split[0]);
    moridiem = split[1].toUpperCase();
    militaryTime = convertTime(numericPart, moridiem);

    return militaryTime;
}

function setTableColors() {
    // Get current hour
    let currentTime = 0;
    let calTime = 0;

    console.log(currentTime);
    currentTime = parseTime(moment().format("h a"));

    for (let i = 0; i < tableRowsEl.length; i++) {
        calTime = parseTime(tableRowsEl[i].children[0].textContent);
        console.log(calTime + " "+ currentTime);

        if (calTime < currentTime) {
            tableRowsEl[i].classList.add("past");
        } else if (calTime > currentTime) {
            tableRowsEl[i].classList.add("future");
        } else {
            tableRowsEl[i].classList.add("present");
        }    
    }
    
    return;
}