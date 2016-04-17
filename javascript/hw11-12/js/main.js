$(function () {
  $('.carousel').carousel({
    itemsVisible: 4
  });

  var employees = $('#employees').html();
  var employeeForm = [
                     {
                       name: 'Иван Иванов',
                       position: 'junior',
                       salary: 700,
                       photo: 'img/huh.png',
                       characterization: 'Tincidunt integer eu augue augue nunc elit dolor, \
                                          luctus placerat scelerisque euismod, iaculis eu \
                                          lacus nunc mi elit, vehicula ut laoreet ac, aliquam \
                                          sit amet justo nunc tempor, metus vel.'
                     },
                     {
                       name: 'Тарас Тарасов',
                       position: 'senior',
                       salary: 2000,
                       photo: 'img/wow.png',
                       characterization: 'Tincidunt integer eu augue augue nunc elit dolor, \
                                          luctus placerat scelerisque euismod, iaculis eu \
                                          lacus nunc mi elit, vehicula ut laoreet ac, aliquam \
                                          sit amet justo nunc tempor, metus vel.'
                     }

  ];
  
  var content = tmpl(employees, { data: employeeForm });
  $('.employees').append(content);
});
