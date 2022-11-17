// const { sum, subtract, multiply, divide } = require("./calculator");

const container = document.querySelector("#container");

const header = document.createElement("header");
header.classList.add("header");

const calcContainer = document.createElement("div");
calcContainer.classList.add("calcContainer");

const display = document.createElement("div");
display.classList.add("display");

const keypad = document.createElement("div");
keypad.classList.add("keypad");

container.append(header, calcContainer);
calcContainer.append(display, keypad);

let keypads = ["+", "-", "x", "÷", ".", "="];
for (let i = 0; i < 10; i++) {
  keypads.push(i);
}
console.log("keypads", keypads);
let btns = "";
keypads.map((btn) => {
  btns += `
    <button class = "btn">${btn}</button>
`;
});
console.log("mapped btns", btns);

keypad.innerHTML = btns;

const items = document.querySelectorAll(".btn");
const buttons = [...items];

buttons.forEach((button) => {
  button.addEventListener("click", btnClicked);
});

let disp = "";
let num1 = "";
let num2 = "";
let tmp = "";
let tmp2 = "";
let operator = "";
// let newOperator = "";
let operatorCounter = 0;

function btnClicked(e) {
  const clickedBtn = e.currentTarget.textContent;
  const bt = clickedBtn;

  if ((bt == "÷") | (bt == "+") | (bt == "-") | (bt == "x")) {
    operatorCounter++;

    //action performed when btn clicked is an operator

    if (num1 !== "") {
      const result = operate(num1, operator, disp);
      disp = result.toString();
      num1 = "";
      // num2 = "";
      tmp = "";
      operator = bt;
    } else {
      num1 = disp;
      operator = bt;
    }
  } else {
    //action performed when btn clicked is not an operator

    if (bt !== "." && bt !== "=") {
      //action performed when btn clicked is not an operator
      //but is a number btwn 0-9

      if (num1 == "") {
        if (operatorCounter > 1) {
          num1 = disp;
          disp = "";
          tmp += bt;
          disp = tmp;
        } else {
          disp += bt;
        }
      } else {
        if (num2 == "") {
          disp = "";
          tmp += bt;
          disp = tmp;
          // tmp = "";
        } else {
        }
      }
    } else {
      //action performed when btn clicked is not an operator
      //& is not a number btwn 0-9; either "=" or "."
      if (bt == "=") {
        //action performed when btn clicked is "="
        if (num1 !== "") {
          // num2 = disp;
          const result = operate(num1, operator, disp);

          disp = result.toString();

          num1 = "";
          // num2 = "";
          tmp = "";
          // operator = newOperator;
        }
      } else {
        //action performed when btn clicked is "."
        //---------------------------------------
        //working with decimals
        //check if num on disp already has a decimal
        //if it does, ignore
        //if it does not, disp += bt;
      }
    }
  }
  console.log("display is:", disp);
  console.log("num1 is:", num1);
  console.log("num2 is:", num2);
}
//----------------------------------------------------------
function operate(num1, operator, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  let result = "";
  if (operator == "+") {
    result = sum(num1, num2);
    // sum(num1, num2);
  } else if (operator == "-") {
    result = subtract(num1, num2);
    // subtract(num1, num2);
  } else if (operator == "x") {
    result = multiply(num1, num2);
    // multiply(num1, num2);
  } else {
    result = divide(num1, num2);
    // divide(num1, num2);
  }

  return result;
}
//------------------------------------------------------
const subtract = function (m, n) {
  const sub = m - n;
  //   console.log("from subtract", sub);
  return sub;
};

const sum = function (x, y) {
  const sum = x + y;
  //   console.log("from sum", sum);
  return sum;
};

const multiply = function (x, y) {
  const product = x * y;
  //   console.log("from product", product);
  return product;
};

const divide = function (x, y) {
  const division = x / y;
  //   console.log("from division", division);
  return division;
};
