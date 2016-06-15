(function($){
  $(function () {

    $('a').on('click', (e)=>{e.preventDefault();});
      
/*-----------------------------Slider-----------------------------*/
    var $carousel = $('.jcarousel');

    $carousel.jcarousel({
                animation: {
                  duration: 500
                }
    });

    $('.jcarousel__control-prev').jcarouselControl({
                                    target: '-=1'
                                  });
    $('.jcarousel__control-next').jcarouselControl({
                                    target: '+=1'
                                  });

/*--------------------------------Masonry----------------------------*/
    $('.ideas').masonry({
      itemSelector: '.ideas__item',
      columnWidth: '.ideas__sizer',
      gutter: 20
    });


/*---------------------------------AJAX------------------------------*/
    
    const KEY = '2737892-0a0fc780bffeea0f16b21d69b';
    const URL = 'https://pixabay.com/api/';
    var $ideas = $('.ideas__item');
    var searchField = $('#search__field');
    var text;
    var flag = false;
    $('#search').on('submit', request)
                .trigger('submit');
                

    function request(e) {

        e.preventDefault();
       
        if (flag) {
          text = searchField.val();
          if (text.length === 0) return;
        } else {
          text = 'active holiday';
          flag = true;
        }

        $.ajax({
          type: 'GET',
          url: URL,
          data: {
            key: KEY,
            q: text,
            per_page: 7
          },
          dataType: 'jsonp',
          success: (data) => {
              searchField.val('');
              if (data.hits.length !== 0) {
                $.each(data.hits, (i, val) => {
                  let bg = 'url(' + val.webformatURL + ')' + ' no-repeat';
                  $ideas[i].style.background = bg;
                  $ideas[i].style.backgroundSize = '100% 100%';
                  $ideas[i].style.alt = val.tags;
                  $ideas[i].appendChild(document.createTextNode(val.tags.split(',')[0])); 
                });
              } else {
                searchField.val('Try again');
              }
          }
        });

      }
    
  });
})(jQuery);

