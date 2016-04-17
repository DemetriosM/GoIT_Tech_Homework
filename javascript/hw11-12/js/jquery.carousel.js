(function ($) {
  
  $.fn.carousel=function (options) {

    var $carousel = this;

    var defaults = {
      itemsVisible: 1,
    };
    var settings = $.extend(defaults, options);

    var $slides = $carousel.find('.slides'),
        $slidesItem = $carousel.find('.slides__item'),
        $arrowLeft = $carousel.find('.carousel__arrow-left'),
        $arrowRight = $carousel.find('.carousel__arrow-right');

    var slidesWidth = $slidesItem.length * 100 / settings.itemsVisible + '%',
        oneSlideWidth = 100 / $slidesItem.length + '%';

    var slidesLeftMargin = parseInt($slides.css('margin-left')),
        slidesMaxLeftMargin = 100 - parseInt(slidesWidth);

    $slides.css('width', slidesWidth);
    $slidesItem.css('width', oneSlideWidth);

    $arrowLeft.on('click', toggleSlideLeft);
    $arrowRight.on('click', toggleSlideRight);

    function toggleSlideLeft(e) {
      if (slidesLeftMargin < 0) {
        $slides.animate({
          marginLeft: '+=100%'
        }, 200);
        slidesLeftMargin += 100;
      }
      e.preventDefault();
    }
    function toggleSlideRight(e) {
      if (parseInt(slidesLeftMargin) > parseInt(slidesMaxLeftMargin)) {
        $slides.animate({
          marginLeft: '-=100%'
        }, 200);
        slidesLeftMargin -= 100;
      }
      e.preventDefault();
    }

    return this;
  };
})(jQuery);