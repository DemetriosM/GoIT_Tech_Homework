$(function () {
  var $carousel = $('.jcarousel');

  $carousel.jcarousel({
               animation: {
                 duration: 500
               }
             })
           .jcarouselAutoscroll({
             interval: 3000,
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

  $('.jcarousel__pagination').jcarouselPagination({
                               item: function (page) {
                                 return '<a href="#' + page + '">' + page + '</a>';
                               }
                              })
                             .on('jcarouselpagination:active', 'a', function () {
                               $(this).addClass('active');
                              })
                             .on('jcarouselpagination:inactive', 'a', function () {
                               $(this).removeClass('active');
                              })
                             .jcarouselPagination();

  $('.jcarousel__pagination').find('a').on('click', function(){
    $carousel.jcarouselAutoscroll('stop');
  });

});
