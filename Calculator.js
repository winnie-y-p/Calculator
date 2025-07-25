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
const displayOperation = document.querySelector("#display-operation");
let shouldReset = false;

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

//this handleInput function creates the rules of what number inputs are allowed
function handleInput(currentValue, input) {
    //if first input
    if (!currentValue) {
        return input;
    }

    const isInputDecimal = input === ".";
    const isInputNumber = !isNaN(input);
    const alreadyHasDecimal = currentValue.includes(".");

    //Prevent multiple decimals
    if (alreadyHasDecimal && isInputDecimal) {
        return currentValue;
    }

    //Adding zero at front if input starts with decimal
    if (currentValue.startsWith(".")) {
        currentValue = "0" + currentValue;
    }

    //Replace leading zero if input is a number
    if (currentValue === "0" && isInputNumber) {
        return input;
    }

    return currentValue + input;
}

function setupNumberButtons() {
    numberBtns.forEach(button => {
        button.addEventListener("click", function () {
            let input = this.getAttribute("data-message");

            if (shouldReset) {
                num1 = "0";
                num2 = undefined;
                operator = undefined;
                displayResult.textContent = "";
                shouldReset = false;
            }

            if (toggleNum) {
                //making num1 if there isn't an operator
                num1 = handleInput(num1, input);
            } else {
                //making num2 if there is an operator
                num2 = handleInput(num2, input);
            }

            displayOnScreen();
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
                toggleNum = false; //toggle will switch between num1 and num2
            } else {
                operator = this.getAttribute("data-message");
                //"operator" is a string
                displayOnScreen();
                toggleNum = false;
            }
        })
    })
}

setupNumberButtons()
setupOperation()


const displayResult = document.querySelector("#display-result");

function evaluateResult() {
    if (num1 && num2 && operator) {
        if (num2 === "0" && operator === "/") {
            alert("Oops! You cannot divide by 0")
        } else {
            let result = operate(operator, Number(num1), Number(num2));
            displayResult.textContent = result;
            toggleNum = true;
            num1 = String(result);
            num2 = undefined;
            operator = undefined;
        }

        shouldReset = true;
    }
}

const equalsBtn = document.getElementById("equals-button");
equalsBtn.addEventListener("click", evaluateResult);


const resetBtn = document.getElementById("reset-button");

resetBtn.addEventListener("click", function () {
    let confirmed = confirm("Do you really want to clear all data?");
    if (confirmed) {
        num1 = "0";
        num2 = undefined;
        operator = undefined;
        displayOperation.textContent = "0";
        displayResult.textContent = "";
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
        console.log(num1);
        num1 = num1.substring(0, num1.length - 1);
        displayOnScreen();
    }
})

