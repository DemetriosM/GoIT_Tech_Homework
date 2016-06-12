/*-----------------------------Slider-----------------------------*/
(function($){
  $(function () {
      
    var $carousel = $('.jcarousel');

    $carousel.jcarousel({
                animation: {
                  duration: 500
                }
              })
            .jcarouselAutoscroll({
              interval: 5000,
              target: '+=1',
              autostart: true
    });

    $('.jcarousel__control-prev').jcarouselControl({
                                    target: '-=1'
                                  })
                                .on('click', function () {
                                  $carousel.jcarouselAutoscroll('stop');
                                  });
    $('.jcarousel__control-next').jcarouselControl({
                                    target: '+=1'
                                  });

  });
})(jQuery);

