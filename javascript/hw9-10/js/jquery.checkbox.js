$(function () {

  var $check = $('.check-js');

  $check.mousedown(function () {
      changeCheck($(this));
  });

  $check.each(function () {
    changeCheckStart($(this)); 
  });

  $check.on('change', function () {
    changeCheck($(this));
  });

  function changeCheck(el) {
    var el = el,
        input = el.find('input').eq(0);

    if(!input.attr('checked')) {
      el.css('background-position','-20px 0');	
      input.attr('checked', true)
    } else {
      el.css('background-position','0 0');	
      input.attr('checked', false)
    }
    return true;
  }

  function changeCheckStart(el)
  {
    var el = el,
        input = el.find('input').eq(0);

    if(input.attr('checked')) {
      el.css('background-position','-20px 0');	
    }
    return true;
  }

});
