requirejs.config({
    paths: {
        'jquery-1.12.4.min': 'lib/jquery-1.12.4.min',
        'tmpl': 'lib/tmpl',
        'list': 'Models/list',
        'listView': 'Views/listView',
        'listController': 'Controllers/listController'
    },
    shim: {
        'jquery-1.12.4.min': {
            deps: [],
            exports: 'jQuery'
        },
       'tmpl': {
           exports: 'tmpl'
       }
    }
});

require(
    [
        'list',
        'listView',
        'listController'
    ],
    function(Model, View, Controller){
        
        var data = ['Задача 1', 'Задача 2', 'Задача 3'];
        var model = new Model(data);
        var view = new View(model);
        var controller = new Controller(model, view);
        
    }
);