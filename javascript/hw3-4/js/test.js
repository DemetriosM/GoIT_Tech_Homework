var test = {
  themeOfTest: 'Тест по программированию',
  questionsArray: [
    {
      question: 'Вопрос №1',
      logicalGroupNumber: 1,
      nameOfElements: 'groupAnswers1',
      options: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
      multiReturn: true
    },
    {
      question: 'Вопрос №2',
      logicalGroupNumber: 2,
      nameOfElements: 'groupAnswers2',
      options: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
      multiReturn: true
    },
    {
      question: 'Вопрос №3',
      logicalGroupNumber: 3,
      nameOfElements: 'groupAnswers3',
      options: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
      multiReturn: false
    }
  ],
  textOfButton: 'Проверить мои результаты',
  
  
  createForm: function () {
    var questionsArray = this.questionsArray;
    var themeOfTest = this.themeOfTest;
    var textOfButton = this.textOfButton;

    var form = document.createElement('form');
    form.className = 'container';
    form.style.margin = '20px auto';
    form.style.backgroundColor = 'white';
    form.style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 0.5)';

    var rubric = document.createElement('h3');
    rubric.className = 'text-center';
    rubric.innerHTML = themeOfTest;
    form.appendChild(rubric);

    var questions = this.createQuestions(questionsArray);
    form.appendChild(questions);

    var submit = this.createSubmit(textOfButton);
    form.appendChild(submit);

    return form;
  },

  createQuestions: function (questionsArray) {
    var questions = document.createElement('ol');
    questions.style.fontSize = '24px';

    for (var i = 0; i < questionsArray.length; i++) {
      var singleQuestion = this.createSingleQuestion(
        questionsArray[i].question, questionsArray[i].logicalGroupNumber,
        questionsArray[i].nameOfElements, questionsArray[i].options, questionsArray[i].multiReturn);
      questions.appendChild(singleQuestion);
    }

    return questions;
  },

  createSingleQuestion: function (question, logicalGroupNumber, nameOfElements, options, multiReturn) {
    var problem = document.createElement('h3');
    problem.innerText = question;

    var answers = this.createGroupAnswers(logicalGroupNumber, nameOfElements, options, multiReturn);

    var singleQuestion = document.createElement('li');
    singleQuestion.appendChild(problem);
    singleQuestion.appendChild(answers);

    return singleQuestion;
  },

  createGroupAnswers: function (logicalGroupNumber, nameOfElements, options, multiReturn) {
    var answers = document.createElement('ul');
    answers.style.listStyle = 'none';

    for (var i = 0; i < options.length; i++) {
      var id = 'answer' + logicalGroupNumber + '.' + (i + 1);
      var answer = this.createSingleAnswer(id, options[i], multiReturn);
      answer.getElementsByTagName('input')[0].name = nameOfElements;
      answers.appendChild(answer);
    }

    return answers;
  },

  createSingleAnswer: function (id, answerText, multiReturn) {
    var checkboxRadio = document.createElement('input');
    if (multiReturn) {
      checkboxRadio.type = 'checkbox';
    } else {
      checkboxRadio.type = 'radio';
    }
    checkboxRadio.id = id;

    var label = document.createElement('label');
    label.innerHTML = answerText;
    label.setAttribute('for', id);

    var answer = document.createElement('li');
    if (multiReturn) {
      answer.className = 'checkbox';
    } else {
      answer.className  = 'radio';
    }
    answer.style.fontSize = '18px';
    answer.appendChild(checkboxRadio);
    answer.appendChild(label);

    return answer;
  },

  createSubmit: function (text) {
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.className = 'btn btn-primary btn-lg';
    submit.value = text;
    submit.style.display = 'block';
    submit.style.margin = '30px auto';

    return submit;
  }
};

document.body.style.backgroundColor = '#cfcfff';
document.body.appendChild(test.createForm());