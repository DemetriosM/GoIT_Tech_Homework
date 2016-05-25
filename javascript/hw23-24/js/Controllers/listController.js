define(
    'listController',
    ['jquery-1.12.4.min'],
    function ($) {
        
        function Controller(model, view){
            var self = this;
            var selectedItem = '';
            
            view.elements.addBtn.on('click', addItem);
            view.elements.list.on('click', '.list__item span', removeItem);
            view.elements.list.on('click', '.list__item', selectItem);
            view.elements.editBtn.on('click', editItem);
            view.elements.clearBtn.on('click', cleanInput);
            
            function addItem(){
                var newItem = view.elements.input.val();
                model.addItem(newItem);
                view.renderList(model.data);
                view.elements.input.val('');
            }
            
            function removeItem(event){
                var item = $(this).attr('data-value');
                model.removeItem(item);
                view.renderList(model.data);
                event.stopPropagation();
            }
            
            function selectItem() {
                selectedItem = $(this).attr('data-value');
                view.elements.input.val(selectedItem);              
            }
            
            function editItem(){
                if (selectedItem !== '') {
                    var newItem = view.elements.input.val();
                    view.elements.input.val(selectedItem, newItem);
                    model.editItem(selectedItem, newItem);
                    view.elements.input.val('');
                    selectedItem = '';
                    view.renderList(model.data);
                }
            }
            
            function cleanInput() {
                selectedItem = '';
                view.elements.input.val('');              
            }
        }
        
        return Controller;
    }       
);