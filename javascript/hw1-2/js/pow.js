alert('Возведение числа в степень');

var x = +prompt('Введите число x=', '');
var n = +prompt('Введите степень (целочисленное число больше нуля) n=', '');
var result = x;

if (!isNaN(x) && !isNaN(n) && Math.round(n) === n && n > 0) {
  result = pow(x, n);
  console.log('x =', x);
  console.log('n =', n);
  console.log('x в степени n =', result);
} else {
  console.log('pow - Некорректно введены данные');
}

function pow(x, n) {
  for (var i = 0; i < n-1; i++) {
      result *= x;
  }
  return result;
}