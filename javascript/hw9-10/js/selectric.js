$(function () {
  $('select').selectric();
  var $carousel = $('.jcarousel'),
      $selectList = $('#values');

  /*------привязка выпадающего списка к слайдеру------*/
  $selectList.selectric().on('change', function () {
    var index = +$(this).val();  
    $carousel.jcarousel('scroll', $carousel.find('li').eq(index));
    $carousel.jcarouselAutoscroll('stop');
  });

  $carousel.on('jcarousel:scrollend', function (event, carousel) {
    var index = $carousel.jcarousel('target').index();
    $selectList.prop('selectedIndex', index).selectric('refresh');
  });
  /*--------------------------------------------------*/
});
