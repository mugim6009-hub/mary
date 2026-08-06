const display = document.getElementById('display');

// Add number or operator to display
function addToDisplay(value) {
  if (display.value === '0' && value !== '.') display.value = '';
  display.value += value;
}

// Add function like sin(, sqrt(
function addFunction(func) {
  if (display.value === '0') display.value = '';
  display.value += func;
}

function clearAll() {
  display.value = '0';
}

function backspace() {
  display.value = display.value.length > 1 ? display.value.slice(0, -1) : '0';
}

function percentage() {
  display.value = eval(display.value) / 100;
}

// THE BRAIN: Convert scientific to real JS math then calculate
function calculate() {
  try {
    let expression = display.value;
    
    // Replace calculator symbols with JS math
    expression = expression.replace(/×/g, '*')
                           .replace(/÷/g, '/')
                           .replace(/\^/g, '**') // x^y to **
                           .replace(/sin\(/g, 'Math.sin(')
                           .replace(/cos\(/g, 'Math.cos(')
                           .replace(/tan\(/g, 'Math.tan(')
                           .replace(/log\(/g, 'Math.log10(')
                           .replace(/ln\(/g, 'Math.log(')
                           .replace(/sqrt\(/g, 'Math.sqrt(')
                           .replace(/1\//g, '1/')
                           .replace(/pow\(/g, 'Math.pow(');
    
    // Convert degrees to radians for trig
    expression = expression.replace(/Math\.(sin|cos|tan)\(/g, (match, fn) => `Math.${fn}((`);

    let result = eval(expression);
    result = parseFloat(result.toFixed(10)); // clean decimals
    
    display.value = result;
  } catch {
    display.value = 'Error';
    setTimeout(clearAll, 1500);
  }
}