var app = require('../js/app.js');

describe("pow function in app", ()=>{
  
  var result;
  
  it("should failed if 2*2 not to be 4", ()=>{
    result = app.pow(2, 2);
    expect(result).toBe(4);
  });
  
  it("should be successful if there is a message - Функция возводит в степень равную целому положительному числу", ()=>{
    result = app.pow(2, 'aaa');
    expect(result).toBe(false);
  });
  
  it("should be successful if there is a message - Вводите числа", ()=>{
    result = app.pow('xxx', 2);
    expect(result).toBe(false);
  });
  
});