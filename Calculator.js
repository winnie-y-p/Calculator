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

    if (operator === "x") {
        return multiply(a, b);
    }

    if (operator === "/") {
        return divide(a, b);
    }
}

let num1;
let num2;
let operator;
let toggleNum = true; //true is when an operator has not been pressed
const operationBtn = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".number");
const displayOperation = document.querySelector("#display-operation")

function displayOnScreen() {
    let displayOutput;

    if (operator !== undefined) {
        displayOutput = num1 + " " + operator;
        if (num2 !== undefined) {
            displayOutput = num1 + " " + operator + " " + num2;
        }
    } else {
        displayOutput = num1;
    }

    displayOperation.textContent = displayOutput;
}

function setupNumberButtons() {
    numberBtns.forEach(button => {
        button.addEventListener("click", function () {
            if (toggleNum) {
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


            } else {
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
            }

            displayOnScreen();
            console.log(num1);
            console.log(num2)
            console.log(operator);
            console.log(toggleNum)
        });
    });
}

function setupOperation() {
    operationBtn.forEach(button => {
        button.addEventListener("click", function () {
            if (operator && num2) {
                evaluateResult();
                operator = this.getAttribute("data-message");
                displayOnScreen();
                toggleNum = false;
            } else {
                operator = this.getAttribute("data-message");
                //"operator" is a string
                displayOnScreen();
                toggleNum = false;
            }
            console.log(num1);
            console.log(num2);
            console.log(operator);
            console.log(toggleNum);
        })
    })
}

setupNumberButtons()
setupOperation()

const equalsBtn = document.getElementById("equals-button");
const displayResult = document.querySelector("#display-result");

function evaluateResult() {
    if (num1 && num2 && operator) {
        let result = operate(operator, Number(num1), Number(num2));
        displayResult.textContent = result;
        toggleNum = true;
        num1 = result;
        num2 = undefined;
        operator = undefined;
        console.log(num1);
        console.log(num2)
        console.log(operator);
        console.log(toggleNum)
    }
}

equalsBtn.addEventListener("click", evaluateResult);


const resetBtn = document.getElementById("reset-button");
resetBtn.addEventListener("click", function () {
    let confirmed = confirm("Do you really want to clear all data?");
    if (confirmed) {
        num1 = undefined;
        num2 = undefined;
        operator = undefined;
        displayOperation.textContent = "0";
        displayResult.textContent = "0";
    } else {
        alert("Reset canceled. Phew, that was lucky we checked ;)");
    }
})

const backspaceBtn = document.getElementById("backspace-button");
backspaceBtn.addEventListener("click", function () {
    if (operator && !num2) {
        operator = undefined;
        displayOnScreen();
    } else if (num2) {
        num2 = num2.substring(0, num2.length - 1);
        displayOnScreen();
    } else {
        num1 = num1.substring(0, num1.length - 1);
        displayOnScreen();
    }
})
