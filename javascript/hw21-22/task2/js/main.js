(function ($) {
  $(function () {

    let questionsArray = [
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
    let data = JSON.parse(localStorage.getItem('test123'));
    
    let questions = $('#test').html();
    let test = tmpl(questions, data);
    $('.form').append(test);

    $('.submit').on('click', ()=>{
      checkAnswers();
      showModal();
      return false;
    });


    questionsArray = data.data;
    let result = [];

    function checkAnswers() {
      let $questions = $('.form').find('article');

      for (let i = 0; i < $questions.length; i++) {
        let $answers = $($questions[i]).find('input');
        let selectedAnswers = $answers.map(scanCheckbox)
                                      .get();

        if (selectedAnswers.toString() === questionsArray[i].answer.toString()) {
          result.push(`${questionsArray[i].question} - правильно`);
        } else {
          result.push(`${questionsArray[i].question} - неправильно`);
        }
      }
      
       function scanCheckbox(index, item) {
         if ($(item).prop('checked')) return $(item).attr('id');
       }
    }

    function showModal() {
      let modal = $('#result').html();
      let summary = tmpl(modal, { data: result });
      $('body').append(summary);

      $('.modal button').one('click', ()=>{
        $('input').prop('checked', false);
        result = [];
        $('.overlay').remove();
        return false;
      });
      
      $('.modal button').focus();

    }

  });
})(jQuery);
