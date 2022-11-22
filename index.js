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

let btns = "";
keypads.map((btn) => {
  btns += `
    <button class = "btn">${btn}</button>
`;
});

keypad.innerHTML = btns;

//--------------------------------------------------------------------
let disp = "0";
let num1 = "";
let num2 = "";
let tmp = "";
let operator = "";
let operatorCounter = 0;
let numBtnCounter = 0;
displayValue.textContent = disp;
let noDelete;
// let setNum2 = "false";

function btnClicked(e) {
  const bt = e.currentTarget.textContent;
  const clickedBtn = e.currentTarget;

  if ((bt == "÷") | (bt == "+") | (bt == "-") | (bt == "x")) {
    operatorCounter++;
    clickedBtn.style.backgroundColor = "#e6e6e7";
    noDelete = "true";

    if (num1 !== "") {
      num2 = disp;
      const result = operate(num1, operator, num2);
      disp = result.toString();
      num1 = "";
      num2 = "";
      tmp = "";
      operator = bt;
    } else {
      num1 = disp;
      operator = bt;
      tmp = "";
    }
  } else {
    if (bt !== "DEL") {
      buttons.forEach((button) => {
        const btN = button.textContent;
        if ((btN == "÷") | (btN == "+") | (btN == "-") | (btN == "x")) {
          button.style.backgroundColor = "#bfbfbf";
        }
      });
    }

    //******* +/- btn that adds -ve sign to num on display or removes it
    //use unshift("-")
    if (bt !== "=" && bt !== "AC" && bt !== "DEL") {
      const dotChecker = disp.includes(".");

      noDelete = "false";
      numBtnCounter++;

      if (bt == ".") {
        if (dotChecker == false) {
          //make this a callable func to avoid rep
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
            }
          }
        }
      } else {
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
          }
        }
      }
    } else {
      if (bt == "=") {
        noDelete = "true";
        if (num1 !== "") {
          num2 = disp;
          const result = operate(num1, operator, num2);
          disp = result.toString();
          num1 = "";
          num2 = "";
          tmp = "";
          operator = "";
          // clear = "true";
          numBtnCounter = 0;
          operatorCounter = 0;
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
        if (noDelete == "false") {
          if (disp.length == 1) {
            disp = "0";
            tmp = "";
            numBtnCounter = 0;
          } else {
            let inDisp = [...disp];
            inDisp.pop();
            let inDispNew = inDisp.toString().replace(/,/g, "");
            tmp = inDispNew;
            disp = inDispNew;
          }
        }
      }
    }
  }
  displayValue.textContent = disp;
}
//----------------------------------------------------------
function operate(num1, operator, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  let result = "";
  if (operator == "+") {
    result = sum(num1, num2);
  } else if (operator == "-") {
    result = subtract(num1, num2);
  } else if (operator == "x") {
    result = multiply(num1, num2);
  } else {
    result = divide(num1, num2);
  }
  //returns result to 4 d.p if its a long float
  result = Math.round((result + Number.EPSILON) * 10000) / 10000;
  return result;
}
//------------------------------------------------------
const subtract = function (m, n) {
  const sub = m - n;
  return sub;
};

const sum = function (x, y) {
  const sum = x + y;
  return sum;
};

const multiply = function (x, y) {
  const product = x * y;
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
  return division;
};
