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
// value from currency to currency
let resultFrom;
let resultTo;
let inputValue;

// targeting element display
const currentNumberContent = document.querySelector(".numberContent");
const resultContent = document.querySelector(".resultContent");


// display result the number
function displayValue() {
    currentNumberContent.textContent = formatNumber(currentNumber);
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



function removeNumber() {
  currentNumber = 0;
  resultContent.textContent = 0;
  displayValue();
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

// target element
const fromBtn = document.querySelector("#fromBtn"),
  fromList = document.querySelector("#from"),
  toBtn = document.querySelector("#toBtn"),
  toList = document.querySelector("#to");

// dropdown
const toggleList = (e) => e.classList.toggle("hidden");

fromBtn.addEventListener("click", () => toggleList(fromList));
toBtn.addEventListener("click", () => toggleList(toList));


const listFromCurrency = document.querySelectorAll(".fromCurrency"),
  fromDisplay = document.querySelector(".fromText"),
  listToCurrency = document.querySelectorAll(".toCurrency"),
  toDisplay = document.querySelector(".toText");

// get value option
listFromCurrency.forEach( i => {
  i.addEventListener("click", function () {
    fromDisplay.textContent = this.getAttribute("value");
    resultFrom = this.getAttribute('value');
    toggleList(fromList);
  });
});

listToCurrency.forEach( i => {
  i.addEventListener("click", function () {
    toDisplay.textContent = this.getAttribute("value");
    resultTo = this.getAttribute('value');
    toggleList(toList);
  });
});

// fetch 
const api = "https://api.exchangerate-api.com/v4/latest/USD";
const convertBtn = document.querySelector('#convert');

convertBtn.addEventListener('click', convertCurrency);

function convertCurrency() {
  fetch(`${api}`)
    .then(currency => currency.json())
    .then(displayResult);
}

//display result fetch 
function displayResult(currency) {
  let fromRate = currency.rates[resultFrom];
  let toRate = currency.rates[resultTo];
  let result = (toRate / fromRate) * currentNumber

  resultContent.innerHTML = formatNumber(result);
}