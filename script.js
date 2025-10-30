let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay() {
    display.value = currentInput;
}

function clear() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function scientificFunction(func) {
    const value = parseFloat(currentInput);
    if (isNaN(value)) return;

    let result;
    switch (func) {
        case 'sin':
            result = Math.sin(value * Math.PI / 180); // Assuming degrees
            break;
        case 'cos':
            result = Math.cos(value * Math.PI / 180);
            break;
        case 'tan':
            result = Math.tan(value * Math.PI / 180);
            break;
        case 'log':
            result = Math.log10(value);
            break;
        case 'sqrt':
            result = Math.sqrt(value);
            break;
        case '^':
            // For power, we need two values
            if (previousInput !== '') {
                result = Math.pow(parseFloat(previousInput), value);
                previousInput = '';
            } else {
                previousInput = currentInput;
                currentInput = '';
                return;
            }
            break;
        case '!':
            result = factorial(value);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    updateDisplay();
}

function factorial(n) {
    if (n < 0) return 'Error';
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            appendNumber(value);
        } else if (button.classList.contains('operator')) {
            if (value === '(' || value === ')') {
                appendNumber(value);
            } else {
                appendOperator(value);
            }
        } else if (button.classList.contains('function')) {
            scientificFunction(value);
        } else if (button.classList.contains('clear')) {
            clear();
        } else if (button.classList.contains('backspace')) {
            backspace();
        } else if (button.classList.contains('equals')) {
            calculate();
        } else if (button.classList.contains('decimal')) {
            if (!currentInput.includes('.')) {
                appendNumber('.');
            }
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clear();
    } else if (key === '.') {
        if (!currentInput.includes('.')) {
            appendNumber('.');
        }
    }
});
