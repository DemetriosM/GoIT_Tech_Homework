var names = [];
var userName = '';

alert('Введите 5 имен');
for (var i = 1; i <= 5; i++) {
  var str = 'Введите любое имя ' + i;
  names[i] = prompt(str, '');
  if (names[i]) {
	  names[i] = names[i].toLowerCase();
  }
}

userName = prompt('Введите ваше имя', '') || '';
if (authentication(userName)) {
  var str = userName + ', вы успешно вошли';
  alert(str);
}else {
  alert('В доступе отказано :)');
}

function authentication(userName) {
  for (var i = 0; i < names.length; i++) {
    if (names[i] == userName.toLowerCase() & userName != '') return true;
  }
}