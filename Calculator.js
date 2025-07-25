const add = function (a, b) {
    return a + b;
};

const subtract = function (a, b) {
    return a - b;
};

const multiply = function (a, b) {
    return a * b;
};

const divide = function (a, b) {
    return a / b;
};

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    }

    if (operator === "-") {
        return subtract(a, b);
    }

    if (operator === "*") {
        return multiply(a, b);
    }

    if (operator === "/") {
        return divide(a, b);
    }
}

const button0 = document.getElementById("0-button");
const button1 = document.getElementById("1-button");
const button2 = document.getElementById("2-button");
const button3 = document.getElementById("3-button");
const button4 = document.getElementById("4-button");
const button5 = document.getElementById("5-button");
const button6 = document.getElementById("6-button");
const button7 = document.getElementById("7-button");
const button8 = document.getElementById("8-button");
const button9 = document.getElementById("9-button");
const decimalButton = document.getElementById("decimal-button");
const resetBtn = document.getElementById("reset-button");
const backspaceBtn = document.getElementById("backspace-button");
const divideBtn = document.getElementById("divide-button");
const multiplyBtn = document.getElementById("multiply-button");
const subtractBtn = document.getElementById("subtract-button");
const addBtn = document.getElementById("add-button");
const equalsBtn = document.getElementById("equals-button");
const operationBtn = document.querySelectorAll(".operator");
const numberBtn = document.querySelectorAll(".number");

let num1;
let num2;
let operator;
let toggleState = false; //false is when an operator has not been pressed

function displayOnScreen() {
    const displayOperation = document.querySelector("#display-operation");
    let displayOutput;

    if (operator !== undefined) {
        displayOutput = num1 + operator;
        if (num2 !== undefined) {
            displayOutput = num1 + operator + num2;
        }
    } else {
        displayOutput = num1;
    }

    displayOperation.textContent = displayOutput;
}

function updateNum1() {
    numberBtn.forEach(button => {
        button.addEventListener("click", function () {
            if (num1 === undefined) {
                if (this.getAttribute("data-message") !== "0" && this.getAttribute("data-message") !== ".") {
                    num1 = this.getAttribute("data-message");
                }
            } else {
                if (!Number.isInteger(Number(num1))) {
                    if (this.getAttribute("data-message") !== ".") {
                        num1 += this.getAttribute("data-message")
                    }
                } else {
                    num1 += this.getAttribute("data-message");
                }
            }
//num1 is a string
            displayOnScreen();
            console.log(num1);
            return Number(num1);
        });
    });
}

function operation() {
    operationBtn.forEach(button => {
        button.addEventListener("click", function () {
            operator = this.getAttribute("data-message"); //"operator" is a string
            displayOnScreen();
            console.log(operator);
        })
    })
}

function updateNum2() {
    numberBtn.forEach(button => {
        button.addEventListener("click", function () {
            if (num2 === undefined) {
                if (this.getAttribute("data-message") !== "0" && this.getAttribute("data-message") !== ".") {
                    num2 = this.getAttribute("data-message");
                }
            } else {
                if (!Number.isInteger(Number(num2))) {
                    if (this.getAttribute("data-message") !== ".") {
                        num2 += this.getAttribute("data-message")
                    }
                } else {
                    num2 += this.getAttribute("data-message");
                }
            }

            displayOnScreen();
            //num2 is a string
            console.log(num2);
            return Number(num2);
        });
    });
}

/*function toggleFunctions () {
    if (
}*/


updateNum1();
operation();
updateNum2();