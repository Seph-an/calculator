// const { sum, subtract, multiply, divide } = require("./calculator");

const container = document.querySelector("#container");

const header = document.createElement("header");
header.classList.add("header");

const calcContainer = document.createElement("div");
calcContainer.classList.add("calcContainer");

const display = document.createElement("div");
display.classList.add("display");
const displayValue = document.createElement("div");
displayValue.classList.add("displayValue");

const keypad = document.createElement("div");
keypad.classList.add("keypad");

container.append(header, calcContainer);
display.appendChild(displayValue);
calcContainer.append(display, keypad);

let keypads = ["AC", "DEL", "+", "-", "x", "÷", ".", "="];
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

buttons.forEach((button, i) => {
  const btn = button.textContent;
  button.style.order = i + 1;
  //looking into else ifs using ternary operators
  //------------------------------------------------------------------
  if ((btn == "x") | (btn == "+") | (btn == "-") | (btn == "÷")) {
    button.classList.add("btn-operator");
    if (btn == "x") {
      button.style.order = 8;
    } else if (btn == "÷") {
      button.style.order = 12;
    }
  } else if (btn == ".") {
    button.style.order = 16;
  } else if ((btn == "AC") | (btn == "DEL")) {
    // button.style.color = "#1E1E1E";
    button.style.color = "#160C55";
    // button.style.backgroundColor = "#bfbfbf";

    // button.style.backgroundColor = "#999999";
  } else if (btn == "=") {
    //figure out a way of adding multiple styles at ago
    button.style.order = 18;
    button.style.width = "127px";
    button.style.backgroundColor = "#1E1E1E";
    button.style.color = "#FFFFFF";
  } else {
    if (btn == "0") {
      button.style.order = 17;
      button.style.width = "127px";
    } else if (btn == "1") {
      button.style.order = 5;
    } else if (btn == "2") {
      button.style.order = 6;
    } else if (btn == "3") {
      button.style.order = 7;
    } else if (btn == "4") {
      button.style.order = 9;
    } else if (btn == "5") {
      button.style.order = 10;
    } else if (btn == "6") {
      button.style.order = 11;
    } else if (btn == "7") {
      button.style.order = 13;
    } else if (btn == "8") {
      button.style.order = 14;
    } else if (btn == "9") {
      button.style.order = 15;
    }
  }
  // console.log("btn is", btn);
  button.addEventListener("click", btnClicked);
});
//--------------------------------------------------------------------
let disp = "0";
let num1 = "";
let num2 = "";
let tmp = "";
let operator = "";
let operatorCounter = 0;
let numBtnCounter = 0;
displayValue.textContent = disp;

function btnClicked(e) {
  const bt = e.currentTarget.textContent;
  const clickedBtn = e.currentTarget;
  // const bt = clickedBtn;

  if ((bt == "÷") | (bt == "+") | (bt == "-") | (bt == "x")) {
    operatorCounter++;
    clickedBtn.style.backgroundColor = "#e6e6e7";
    // clickedBtn.style.boxShadow = "";

    //action performed when btn clicked is an operator ("+","-","x","÷")

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
    buttons.forEach((button) => {
      const btN = button.textContent;
      if ((btN == "÷") | (btN == "+") | (btN == "-") | (btN == "x")) {
        button.style.backgroundColor = "#bfbfbf";
      }
    });
    //******* +/- btn that adds -ve sign to num on display or removes it
    //use unshift("-")
    if (bt !== "." && bt !== "=" && bt !== "AC" && bt !== "DEL") {
      //action performed when btn clicked is not an operator
      //but is a number btwn 0-9
      //
      //if operator count is less than 1
      numBtnCounter++;
      console.log("numBtnCounter is:", numBtnCounter);

      if (num1 == "") {
        if (operatorCounter > 1) {
          num1 = disp;
          disp = "";
          tmp += bt;
          disp = tmp;
        } else {
          if (numBtnCounter == 1) {
            disp = "";
            disp += bt;
          } else {
            disp += bt;
          }
        }
      } else {
        if (num2 == "") {
          disp = "";
          tmp += bt;
          disp = tmp;
          // tmp = "";
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
        }
      } else if (bt == "AC") {
        num1 = "";
        num2 = "";
        operator = "";
        tmp = "";
        operatorCounter = 0;
        numBtnCounter = 0;
        disp = "0";
      } else if (bt == "DEL") {
        //Error: Should only work when a num is being typed and
        //not on a returned result
        //check for when operator is zero perhaps??
        if (disp.length == 1) {
          disp = "0";
          numBtnCounter = 0;
        } else {
          let inDisp = [...disp];
          inDisp.pop();
          let inDispNew = inDisp.toString().replace(/,/g, "");
          disp = inDispNew;
        }
      } else {
        //action performed when btn clicked is "."
        //---------------------------------------
        const dotChecker = disp.includes(".");
        if (!dotChecker) {
          disp += bt;
        }
        //working with decimals
        //check if num on disp already has a decimal
        //if it does, ignore
        //if it does not, disp += bt;
      }
    }
  }
  displayValue.textContent = disp;
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
  let division = 0;
  if (x == 0) {
    division = 0;
  } else if (y == 0) {
    division = "Err";
  } else {
    division = x / y;
  }
  //   console.log("from division", division);
  return division;
};
