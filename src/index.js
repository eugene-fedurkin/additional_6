module.exports = function zeros(expression) {

  let result = '1';
  let factorials = expression.split('*');
  for (let i = 0; i < factorials.length; i++) {
    factorials[i] = getFactorial(factorials[i]);
  }
  for (let i = 0; i < factorials.length; i++) {
    result = multiply(factorials[i], result);
  }
  return result.length - result.match(/0{0,}$/).index;

}



module.exports = function zerosRecursive(expression) {
  let result = '1';
  let factorials = expression.split('*');

  for (let index = 0; index < factorials.length; index++) {
    if (factorials[index].endsWith('!!')) {
      factorials[index] = getFactorialRecursive(factorials[index].slice(0, -2), true);
    } else {
      factorials[index] = getFactorialRecursive(factorials[index].slice(0, -1), false);
    }
  }
  for (let index = 0; index < factorials.length; index++) {
    result = multiply(factorials[index], result);
  }
  return result.length - result.match(/0{0,}$/).index;
}

function getFactorialRecursive(argument, skip) {
  if (+argument < 1) return '1';
  let nextValue = skip ? decrement(decrement(argument)) : decrement(argument);
  return multiply(argument, getFactorialRecursive(nextValue, skip));
}

function getFactorial(numb) {
  let result = numb;
  if (numb.slice(-2) === '!!' && Number(numb.slice(0, -2)) % 2 === 0) {
    result = result.slice(0, -2);
    for (let factor = 2; factor < Number(numb.slice(0, -2)); factor += 2) {
      result = multiply(`${factor}`, result);
    }
  } else if (numb.slice(-2) === '!!' && Number(numb.slice(0, -2)) % 2 === 1) {
    result = result.slice(0, -2);
    for (let factor = 1; factor < Number(numb.slice(0, -2)); factor += 2) {
      result = multiply(`${factor}`, result);
    }
  } else {
    result = result.slice(0, -1);
    for (let factor = 1; factor < Number(numb.slice(0, -1)); factor++) {
      result = multiply(`${factor}`, result);
    }
  }
  return result;
}

function multiply(multiplicand, factor) {
  let products = [];
  for (let digitIndex = multiplicand.length - 1; digitIndex >= 0; digitIndex--) {
    let product = 0;
    for (let sumIndex = 0; sumIndex < +multiplicand[digitIndex]; sumIndex++) {
      product = add(product, factor);
    }

    for (let zeroIndex = 0; zeroIndex < multiplicand.length - 1 - digitIndex; zeroIndex++) {
      product = product + '0';
    }

    products.push(product);
  }

  let result = 0;
  for (let product of products) {
    result = add(result, product);
  }

  return result;
}

function add(first, second) {
  let result = '0';
  let digits = [];
  let shift = false;
  let maxLength = first.length > second.length ? first.length : second.length;
  let sum;

  for (let index = 0; index < maxLength; index++) {
    let firstDigit = first[first.length - 1 - index] ? +first[first.length - 1 - index] : 0;
    let secondDigit = second[second.length - 1 - index] ? +second[second.length - 1 - index] : 0;

    sum = firstDigit + secondDigit;
    sum += shift ? 1 : 0;
    digits.unshift(sum % 10);
    shift = sum > 9;
  }

  result = digits.join('');
  shift ? result = '1' + result : result;
  return result;
}

function decrement(argument) {
  let i;
  for (i = argument.length - 1; i >= 0; i--) {
    let digit = argument[i];
    if (digit === '0') argument = argument.substring(0, i + 1) + 9 + argument.substring(i + 2);
    else {
      i--;
      break;
    };
  }
  return argument.substring(0, i + 1) + (+argument[i + 1] - 1) + argument.substring(i + 3);
}