$(function () {
/*---------------------------data for tabs--------------------------*/
  var articles = [
    {
      header: 'work 1',
      srcImg: 'works1.jpg',
      text: ' Integer quis tortor metus. Aliquam et lacus nulla. \
              Pellentesque habitant morbi tristique senectus et netus \
              et malesuada fames ac turpis egestas. Cras ut eros nibn. \
              Proin vitae quam mollis diam faucibus porta hendrerit vitae diam. \
              Aenean cursus massa quis sem dictum convallis. Morbi ornare rutrum \
              tellus, eu dapibus magna iaculis dictum. Nam nibh arcu. \
              Sed a ipsum molestie, pellentesque felis at, vestibulum nunc. \
              Aenean eu tristique elit. Vivamus ullamcorper id ante nec \
              condimentum. In eleifend convallis ante in semper. Nam vitae com.'
    },
    {
      header: 'work 2',
      srcImg: 'works2.jpg',
      text: ' Proin vitae quam mollis diam faucibus porta hendrerit vitae diam. \
              Aenean cursus massa quis sem dictum convallis. Morbi ornare rutrum \
              tellus, eu dapibus magna iaculis dictum. Nam nibh arcu.\
              Proin vitae quam mollis diam faucibus porta hendrerit vitae diam. \
              Aenean cursus massa quis sem dictum convallis. Morbi ornare rutrum \
              tellus, eu dapibus magna iaculis dictum. Nam nibh arcu. \
              Sed a ipsum molestie, pellentesque felis at, vestibulum nunc. \
              Aenean eu tristique elit. Vivamus ullamcorper id ante nec \
              condimentum. In eleifend convallis ante in semper. Nam vitae com.'
    },
    {
      header: 'work 3',
      srcImg: 'works3.jpg',
      text: ' Sed a ipsum molestie, pellentesque felis at, vestibulum nunc. \
              Aenean eu tristique elit. Vivamus ullamcorper id ante nec \
              condimentum. In eleifend convallis ante in semper. Nam vitae com.'
    }
  ];
/*------------------------------------------------------------------*/


  var tabs = (function () {

    function createTabs(articles) {
      var $menu = $('<ul>').attr({ 'class': 'menu clearfix' });
      var $tabs = $('<section>').attr({ 'class': 'container' })
                                .prepend($menu);

      for (var i = 0; i < articles.length; i++) {
        $($menu).append(createMenuItem(articles[i], i));
        $($tabs).append(createArticle(articles[i], i));
      }

      addEventForMenuItem($menu.find('.menu__item'));

      return $tabs;
    }

    function createMenuItem(article, i) {
      var $menuItem = $('<li>').attr({ 'class': 'menu__item' })
                               .text(article.header);
      if (i === 0) { $menuItem.addClass('menu__item_active'); }
      
      return $menuItem;
    }

    function createArticle(article, i) {
      var src = 'img\/' + article.srcImg;
      var $articleImg = $('<img>').attr({
        'class': 'article__img',
        'src': src, 'alt': 'icon',
        'title': 'portfolio'
      });
      var $articleText = $('<p>').attr({ 'class': 'article__text' })
                                 .text(article.text);
      var $article = $('<div>').attr({ 'class': 'article clearfix' })
                               .append($articleImg)
                               .append($articleText);
      if (i === 0) { $article.show(); }
      return $article;
    }

    function addEventForMenuItem($menuItem) {
      $menuItem.on('click', function () {
        $(this).addClass('menu__item_active')
               .siblings()
               .removeClass('menu__item_active');
        $(this).parents()
               .find('.article')
               .hide()
               .eq($(this).index())
               .show(500);
        return false;
      });
    }

    return { create: createTabs};
  })();

  $('#main').prepend(tabs.create(articles));
});
