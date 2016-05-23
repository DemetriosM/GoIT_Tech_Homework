var app = require('../js/app.js');

describe("app", function() {
  
  var result;
  
  it("pow(2, 2)", function() {
    result = app.pow(2, 2);
    expect(result).toBe(4);
  });
  
  it("pow(2, 'aaa')", function() {
    result = app.pow(2, 'aaa');
    expect(result).toBe(false);
  });
  
  it("pow('xxx', 2)", function() {
    result = app.pow('xxx', 2);
    expect(result).toBe(false);
  });
  
});