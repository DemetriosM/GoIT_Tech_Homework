'use strict';

(function ($) {
  $(function () {

    var questionsArray = [
        {
          question: 'Вопрос №1 (правильный ответ 1 и 2)',
          nameOfElements: 'groupAnswers1',
          options: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
          multiReturn: true,
          answer: ['groupAnswers1.0', 'groupAnswers1.1']
        },
        {
          question: 'Вопрос №2 (правильный ответ 1 и 2)',
          nameOfElements: 'groupAnswers2',
          options: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
          multiReturn: true,
          answer: ['groupAnswers2.0', 'groupAnswers2.1']
        },
        {
          question: 'Вопрос №3 правильный ответ 1',
          nameOfElements: 'groupAnswers3',
          options: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
          multiReturn: false,
          answer: ['groupAnswers3.0']
        }
    ];
    
    window.localStorage.setItem('test123', JSON.stringify({ data: questionsArray }));
    var data = JSON.parse(localStorage.getItem('test123'));
    
    var questions = $('#test').html();
    var test = tmpl(questions, data);
    $('.form').append(test);

    $('.submit').on('click', function () {
      checkAnswers();
      showModal();
      return false;
    });

    questionsArray = data.data;
    var result = [];

    function checkAnswers() {
      var $questions = $('.form').find('article');

      for (var i = 0; i < $questions.length; i++) {
        var $answers = $($questions[i]).find('input');
        var selectedAnswers = $answers.map(function (index, item) {
          if ($(item).prop('checked')) return $(item).attr('id');
        })
                                       .get();

        if (selectedAnswers.toString() === questionsArray[i].answer.toString()) {
          result.push(questionsArray[i].question + '- правильно');
        } else {
          result.push(questionsArray[i].question + '- неправильно');
        }
      }
    }

    function showModal() {
      var modal = $('#result').html();
      var summary = tmpl(modal, { data: result });
      $('body').append(summary);

      $('.modal button').one('click', function () {
        $('input').prop('checked', false);
        result = [];
        $('.overlay').remove();
        return false;
      });
    }

  });
})(jQuery);
