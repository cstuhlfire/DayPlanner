// DayPlanner

// Query selectors
let todayEl = document.querySelector("#currentDay");

// Function calls
setDate();

// Function definitions
function setDate() {
    let today = moment().format("dddd, MMM Do");
    console.log(today);
    todayEl.textContent = today;
}