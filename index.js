// const { sum, subtract, multiply, divide } = require("./calculator");
/*
Bugs to address
1. On clicking = when only num1 has been saved by clicking
   an operator, the result returned is num1 operated on itself
   i.e 24 + returns 48, 24 - returns 0, 24 x returns 576 ...

2. DEL shouldn't be active when onDelete is active, thus          √
   clicking DEL should not deactivate selected color
   of operator

3. The bug attributed to when decimal is clicked, either at the   √
   very start or when operate has been called.

4. Overflow when floats are involved, results partaining to       *
   floats should be rounded off to 2 d.p

5. The bug that occurs when working with DEL after operator       √
   is set and a new num being typed in after DEL is typed
   actually this is common bug after operate is called
   if operate has been called, new values being typed
   should be independent of the initial chain

6. Bug when two operators are clicked in a row before any         L*
   num is clicked

7. Buggiest of bugs: Doing a series of operations and then        √
   clicking equal, then tapping any number followed by an
   operator yields an inexplicable bug, suddenly there are
   decimal points.
   Well, for whatever reason, the num on display after the
   series of operations
   --'clear' may be used to check when an operator or keypad
   is clicked so that num on disp is not saved??
   --whatever is on screen at the instance of clicking
   nums should be cleared entirely & not saved to 
   either num1 or num2 
*/

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
// let clear = "false";

function btnClicked(e) {
  const bt = e.currentTarget.textContent;
  const clickedBtn = e.currentTarget;

  if ((bt == "÷") | (bt == "+") | (bt == "-") | (bt == "x")) {
    operatorCounter++;
    clickedBtn.style.backgroundColor = "#e6e6e7";
    noDelete = "true";
    // clear = "false";

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
      // console.log("clear is:", clear);
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
        // disp = getKeypad(
        //   num1,
        //   operatorCounter,
        //   disp,
        //   tmp,
        //   bt,
        //   numBtnCounter,
        //   num2
        // );
      }
    } else {
      if (bt == "=") {
        noDelete = "true";
        if (num1 !== "") {
          const result = operate(num1, operator, disp);
          disp = result.toString();
          num1 = "";
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
  console.log("---------------overall----------------------");
  console.log("display is:", disp);
  console.log("num1 is:", num1);
  console.log("num2 is:", num2);
  console.log("operatorCounter is:", operatorCounter);
  console.log("numBtnCounter is:", numBtnCounter);
  console.log("tmp is:", tmp);
  console.log("---------------overall----------------------");
}
//----------------------------------------------------------
function getDisp(disp, tmp, bt) {
  disp = "";
  tmp += bt;
  disp = tmp;
  return { tmp, disp };
}
function getKeypad(num1, operatorCounter, disp, tmp, bt, numBtnCounter, num2) {
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
  console.log("returned disp is", disp);
  return disp;
}
//
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
  result = Math.round((result + Number.EPSILON) * 10000) / 10000;
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
