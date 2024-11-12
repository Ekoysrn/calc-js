// dark mode
const checkDarkMode = document.querySelector(".toggle");
const sunToggle = document.querySelector(".sun");
const moonToggle = document.querySelector(".moon");
const displayCal = document.querySelector(".displayCal");
const bodyCal = document.querySelector(".bodyCalc");

checkDarkMode.addEventListener("click", function () {
  if (checkDarkMode.checked) {
    sunToggle.classList.toggle("activeDark");
    moonToggle.classList.toggle("activeDark");
    document.documentElement.classList.add("dark");
    displayCal.classList.replace("bg-linear", "bg-darklinear");
    bodyCal.classList.replace("bg-bodyLinear", "bg-bodyDarkLinear");
  } else {
    sunToggle.classList.toggle("activeDark");
    moonToggle.classList.toggle("activeDark");
    document.documentElement.classList.remove("dark");
    displayCal.classList.replace("bg-darklinear", "bg-linear");
    bodyCal.classList.replace("bg-bodyDarkLinear", "bg-bodyLinear");
  }
});


// declaration null
let currentNumber = 0;
let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayFirstNum = 0;
let displaySecondNum = "";
let displayOperator = "";
let displayCalc = "0";
let historyItem = [];

// targeting element display
const currentNumberContent = document.querySelector(".numberContent");
const resultContent = document.querySelector(".result");
const equals = document.querySelector(".equals");

// display result the number
function displayValue(e) {
  if (e === undefined) {
    currentNumberContent.textContent = formatNumber(currentNumber);
  } else {
    currentNumberContent.textContent = e;
  }
}

// display calculating the number
function equalValue() {
  resultContent.textContent = formatNumber(displayCalc);
}

// set number
function setNumber(number) {
  if (currentNumber === 0) {
    currentNumber = number;
  } else {
    currentNumber += number;
  }

  displayValue();
}

// operator
function setOperation(operation) {
  if (operation != null) calculate();
  operator = operation;
  firstNumber = parseFloat(currentNumber);

  displayFirstNum = parseFloat(firstNumber);
  displayOperator = operator;
  displaySecondNum = 0;
  currentNumber = 0;

  displayValue();
}

// calculate
function calculate() {
  secondNumber = parseFloat(currentNumber);
  displaySecondNum = parseFloat(secondNumber);

  if (operator === "+") {
    currentNumber = firstNumber + secondNumber;
    displayCalc = currentNumber;
  } else if (operator === "-") {
    currentNumber = firstNumber - secondNumber;
    displayCalc = currentNumber;
  } else if (operator === "*") {
    currentNumber = firstNumber * secondNumber;
    displayCalc = currentNumber;
  } else if (operator === "/") {
    currentNumber = firstNumber / secondNumber;
    displayCalc = currentNumber;
  }

  let dis = `${formatNumber(displayFirstNum)} ${displayOperator} ${formatNumber(
    displaySecondNum
  )}`;

  viewHistory(firstNumber, secondNumber, operator, currentNumber);

  firstNumber = 0;
  operator = null;

  if (equals.classList.contains("hidden")) {
    equals.classList.remove("hidden");
  }

  displayValue(dis);
  equalValue();
}

// calculate percentage
function calculatePercentage() {
  currentNumber = currentNumber / 100;

  currentNumber.toFixed(2);
  displayValue();
}

function removeNumber() {
  currentNumber = 0;
  firstNumber = null;
  secondNumber = null;
  operator = null;
  displayFirstNum = 0;
  displaySecondNum = "";
  displayOperator = "";
  displayCalc = "0";

  displayValue();
  equalValue();
}


// view historu
function viewHistory(firstNum, secondNum, operator, result) {
  let historyResult = `${formatNumber(firstNum)} ${operator} ${formatNumber(
    secondNum
  )} = ${formatNumber(result)}`;

  if (firstNum != null && secondNum != null && operator != null) {
    historyItem.push(historyResult);
    textHistory();
  }
}

function textHistory() {
  let history = document.querySelector(".history");

  history.innerHTML = "";

  historyItem.forEach((item) => {
    let divItem = document.createElement("div");
    divItem.textContent = item;
    history.appendChild(divItem);
  });
}

const sectionHistory = document.querySelector(".historySection");

function hideBtn(e) {
  if (e.classList.contains("uil-redo")) {
    e.classList.replace("uil-redo", "uil-times");
  } else {
    e.classList.replace("uil-times", "uil-redo");
  }
  displayCal.classList.toggle("hidden");

  currentNumberContent.classList.toggle("hidden");
  resultContent.classList.toggle("hidden");
  equals.classList.add("hidden");
  sectionHistory.classList.toggle("hidden");
}

// format number ,
function formatNumber(number) {
  return parseFloat(number).toLocaleString("en-US");
}

//backspace button
function backspaceBtn() {
  currentNumber = currentNumber.slice(0, -1) || "0";

  displayValue();
}


