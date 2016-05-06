'use strict';

(function ($) {
  $(function () {

    // Поиск изображений

    $('#search').on('submit', request);
    var div = document.createElement('div');
    div.style.padding = '20px';
    div.style.fontSize = '20px';
    $('body').append(div);

    function request(e) {

        e.preventDefault();
        var text = $('#search__field').val();

        $.ajax({
          url: 'http://api.riffsy.com/v1/search',
          data: {
            limit: 6,
            tag: text
          },
          dataType: 'json',
          success: function (data) {
            div.innerHTML = '';
            if (data.results.length != 0) {
              $.each(data.results, function (i, val) {
                var img = document.createElement('img');
                img.src = val.itemurl;
                img.title = val.title;
                img.style.width = '30%';
                div.appendChild(img);
              });
            } else {
              div.innerText ='Ничего не найдено, попробуйте еще раз';
            }
          }

        });
      }
   

    //Классы

    function Human(name, age, sex, height, body) {
      this.name = name || '';
      this.age = age || 0;
      this.sex = sex || '';
      this.height = height || 0;
      this.body = body || 0;
    }


    function Worker(name, age, sex, height, body, workPlace, salary) {
      Human.apply(this, arguments);
      this.workPlace = workPlace || '';
      this.salary = salary || 0;
    }
    Worker.prototype.toWork = function () {
      console.log('Worker ' + this.name + ' from ' + this.workPlace + ' is working.');
    };


    function Student(name, age, sex, height, body, studyPlace, grunt) {
      Human.apply(this, arguments);
      this.studyPlace = studyPlace || '';
      this.grunt = grunt || 0;
    }
    Student.prototype.toWatchTv = function () {
      console.log('Student ' + this.name + ' from ' + this.studyPlace + ' watches TV everyday.');
    };
    

    var newWorker = new Worker('Vlad', 30, 'man', 180, 90, 'MMM', 10000);    
    newWorker.toWork();
    show(newWorker);
    console.log('-----------------------------------');

    var newWorker2 = new Worker('Kolya', 25, 'man', 175, 82, 'Factory', 5000);
    newWorker2.toWork();
    show(newWorker2);
    console.log('-----------------------------------');

    var newStudent = new Student('Nika', 20, 'woman', 180, 60, 'University', 500);
    newStudent.toWatchTv();
    show(newStudent);


    function show(obj) {
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        console.log(key + ' : ' + obj[key]);
      }
    }

  });
})(jQuery);
