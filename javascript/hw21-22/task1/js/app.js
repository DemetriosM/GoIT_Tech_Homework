var app = {
  
  pow: function (x, n) {
          var result = x;
          if (!isNaN(x) && !isNaN(n) && Math.round(n) === n && n > 0) {
            for (var i = 0; i < n-1; i++) {
                result *= x;
            }
            console.log('результат - ', result);
            return result;
              
          } else {
              if (isNaN(n) || Math.round(n) != n || n <= 0)
                           console.log('Функция возводит в степень равную целому положительному числу');
              if (isNaN(x)) console.log('Вводите числа');
              result = false;
              return result;
          }
        }

};

try{
  module.exports = app;
}
catch(e){}