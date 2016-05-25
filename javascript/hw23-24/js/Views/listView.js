define(
    'listView',
    ['tmpl', 'jquery-1.12.4.min'],
    function (tmpl, $) {
        function View(model) {
            self = this;
            
            self.renderList = function (data) {
                var listItems = tmpl($('#list-template').html(), {data: data});              
                self.elements.list.html(listItems);
            };
            
            function init () {
                var container = tmpl($('#container-template').html());              
                $('main').append(container);
                
                self.elements = {
                    list: $('.list'),
                    input: $('.controlls__field'),
                    addBtn: $('.controlls__add'),
                    editBtn: $('.controlls__edit'),
                    clearBtn: $('.controlls__clear')
                };
                
                self.renderList(model.data);
            }
            
            init();
        }
        return View;
    }
        
);