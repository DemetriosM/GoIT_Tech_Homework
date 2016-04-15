$(function () {
  var $menu = $('.menu'),
      $menuItemDuplex = $menu.find('.menu__item_duplex');

  $menu.on('click', function () {
    return false;
  });

  $menuItemDuplex.hover(
    function () {
      $(this).children('.menu_sub')
             .stop()
             .slideDown(200);
    },
    function () {
      $(this).children('.menu_sub')
             .stop()
             .slideUp(200);
    }
  );
});
