nomato.directive('rightclick',function() {
    return {
        restrict:'A',
        link:function (scope,elem,attr){
            elem.bind('contextmenu',function (e){
                e.preventDefault();
                scope.$apply(attr.rightclick);
            });
        }
    };
});

nomato.directive('edit',['nodb',function (nodb){
    return {
        restrict:'EA',
        replace:true,
        scope:{
            todo:'=todo',
            todos:'=todos'
        },
        template:'<form ng-dblclick="editTodo(todo)" ng-submit="editDone(todo)" todoesc="editEsc(todo)">'
                +'<span ng-hide="editing" style="padding-left:12px">{{todo.title}}</span>'
                +'<input ng-show="editing" ng-blur="editDone(todo)" ng-model="todo.title" todofocus="editing" class="form-control" style="margin:-6px 0" type="text" />'
                +'</form>',
        link:function (scope,elem,attr){
            scope.editing=false;
            scope.editTodo=function (todo){
                if(todo.done)return;
                scope.origin=todo.title
                scope.editing=true;
            };
            scope.editDone=function (todo){
                scope.editing=false;
                if(!todo.title){
                    scope.todos.splice(scope.todos.indexOf(todo),1);
                }
                nodb.save(scope.todos);
            };
            scope.editEsc=function (todo){
                scope.editing=false;
                todo.title=scope.origin;
            }
            elem.bind('keydown',function (e){
                if(e.keyCode===27){
                    scope.$apply(attr.todoesc);
                }
            });
        }
    };
}]);

nomato.directive('todofocus',['$timeout',function ($timeout){
    return {
        restrict:'A',
        link:function (scope,elem,attr){
            scope.$watch(attr.todofocus,function (b){
                if(b){
                    $timeout(function () {
    					elem[0].focus();
    				}, 0, false);
                }
            });
        }
    };
}]);
