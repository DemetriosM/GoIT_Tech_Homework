$(function () {
  var titles = [
    'Пожалуйста, введите свое имя.',
    'Пожалуйста, введите свою фамилию.',
    'Ваш домашний или рабочий адрес.'
  ];

  (function (titles) {
    createTitles();

    function createTitles() {
      var $titles = $('<div>').addClass('title');
      var $inputsItem = $('.inputs__item');
      $inputsItem.append($titles);

      $titles = $inputsItem.find('div');
      $titles.text(function (index) {
        return titles[index];
      });

      addEventForTitles($inputsItem, $titles);
    }

    function addEventForTitles($inputsItem, $titles) {
      $inputsItem.on({
        mouseenter: function () {
          $titles.eq($(this).index())
                 .show(600);
          return false;
        },
        mouseleave: function () {
          $titles.eq($(this).index())
                 .stop(true)
                 .hide(300);
          return false;
        }
      });

      $('form').find('button').on('click', function () {
        $titles.show(500);
        return false;
      });

    }

  })(titles);

});
