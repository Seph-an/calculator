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

/*
        console.log("------------------DEL---------------------");
        console.log("equal clicked");
        console.log("clear is:", clear);
        console.log("display is:", disp);
        console.log("num1 is:", num1);
        console.log("num2 is:", num2);
        console.log("operatorCounter is:", operatorCounter);
        console.log("numBtnCounter is:", numBtnCounter);
        console.log("tmp is:", tmp);
        console.log("operator is:", operator);
        console.log("--------------------DEL-------------------");
*/
