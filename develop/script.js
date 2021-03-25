// DayPlanner

// Define storage array
let storeArray = [
  {
    arrayRow: 0,
    arrayTime: "",
    arrayTask: "",
  },
  {
    arrayRow: 1,
    arrayTime: "",
    arrayTask: "",
  },
  {
    arrayRow: 2,
    arrayTime: "",
    arrayTask: "",
  },
  {
    arrayRow: 3,
    arrayTime: "",
    arrayTask: "",
  },
  {
    arrayRow: 4,
    arrayTime: "",
    arrayTask: "",
  },
  {
    arrayRow: 5,
    arrayTime: "",
    arrayTask: "",
  },
  {
    arrayRow: 6,
    arrayTime: "",
    arrayTask: "",
  },
  {
    arrayRow: 7,
    arrayTime: "",
    arrayTask: "",
  },
  {
    arrayRow: 8,
    arrayTime: "",
    arrayTask: "",
  },
  {
    arrayRow: 9,
    arrayTime: "",
    arrayTask: "",
  },
];

// Query selectors
let todayEl = document.querySelector("#currentDay");
let saveBtnEl = document.querySelectorAll(".saveBtn");
let tableRowsEl = document.querySelectorAll("tr");
let textsEl = document.querySelectorAll("textarea");
let lastUpdateEl = document.getElementById("updated");

// Function calls
main();

// Function definitions
function main() {
  setDate();
  setTableColors();
  setDataFromLocalStorage();
}

function setDate() {
  // Use moment to set date.
  let today = moment().format("dddd, MMM Do");

  todayEl.textContent = today;
  return;
}

function convertTime(numericPart, moridiem) {
  let militaryTime = 0;

  if (numericPart === 12 && moridiem === "AM") {
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
  let moridiem = ""; // am/pm
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

  currentTime = parseTime(moment().format("h a"));

  for (let i = 0; i < tableRowsEl.length; i++) {
    calTime = parseTime(tableRowsEl[i].children[0].textContent);

    // Add class to change color based on current time
    if (calTime < currentTime) {
      tableRowsEl[i].children[1].classList.add("past");
    } else if (calTime > currentTime) {
      tableRowsEl[i].children[1].classList.add("future");
    } else {
      tableRowsEl[i].children[1].classList.add("present");
    }
  }
  return;
}

function setDataFromLocalStorage() {
  let scheduleObject = JSON.parse(localStorage.getItem("schedule"));

  if (scheduleObject !== null) {
    storeArray = scheduleObject;
    console.log(storeArray);
    for (let i = 0; i < scheduleObject.length; i++) {
      textsEl[i].value = scheduleObject[i].arrayTask;
      //storeArray[i] = scheduleObject[i].arrayTask;
    }
  }
}

function setUpdateTime() {
  let updateTime = moment().format("dddd, MMM Do h:mm a");
  lastUpdateEl.textContent = "Last Update: " + updateTime;
}

function saveLocalStorage(storeRow, storeTime, storeTask) {
  storeArray[storeRow] = {
    arrayRow: storeRow,
    arrayTime: storeTime,
    arrayTask: storeTask,
  };

  // Set local storage as schedule from store Array
  localStorage.setItem("schedule", JSON.stringify(storeArray));
  setUpdateTime();
}

// Event listeners
for (let i = 0; i < saveBtnEl.length; i++) {
  const element = saveBtnEl[i];

  element.addEventListener("click", function () {
    saveLocalStorage(
      i,
      tableRowsEl[i].children[0].textContent,
      textsEl[i].value
    );
  });
}
