module.exports = function zeros(expression) {

  let result = '1';
  let factorials = expression.split('*');
  for (let i = 0; i < factorials.length; i++) {
    factorials[i] = factorial(factorials[i]);
  }
  for (let i = 0; i < factorials.length; i++) {
    result = multiply(factorials[i], result);
  }
  return result.length - result.match(/0{0,}$/).index;


  function factorial(numb) {
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


  function multiply(numb, factor) {
    let products = [];
    for (let i = numb.length - 1; i >= 0; i--) {

      let product = 0;
      for (let j = 0; j < +numb[i]; j++) {
        product = add(product, factor);
      }

      for (let k = 0; k < numb.length - 1 - i; k++) {
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
    let arr = [];
    let shift = false;
    let length = first.length > second.length ? first.length : second.length;
    let sum;
    for (let i = 0; i < length; i++) {
      if (second[second.length - 1 - i] && !first[first.length - 1 - i]) {
        sum = +second[second.length - 1 - i] + 0;
      }
      if (!second[second.length - 1 - i] && first[first.length - 1 - i]) {
        sum = 0 + +first[first.length - 1 - i];
      }
      if (second[second.length - 1 - i] && first[first.length - 1 - i]) {
        sum = +second[second.length - 1 - i] + +first[first.length - 1 - i];
      }
      sum += shift ? 1 : 0;
      arr.unshift(sum % 10);
      shift = sum > 9;

    }
    result = arr.join('');
    shift ? result = '1' + result : result;
    return result;
  }
}
