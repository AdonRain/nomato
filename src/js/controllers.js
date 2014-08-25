nomato.controller('noCtrl',function ($scope,$interval,nodb,timer) {
	var todos=$scope.todos=nodb.find();

	nodb.init(todos);
	timer.init($scope,26);

	$scope.addTodo=function (){
		if(!$scope.newTodo)return;
		var newTodo=$scope.newTodo.trim();
		var idx=0;
		for(var i=0;i<todos.length;i++){
			if(!todos[i].done){
				idx=i+1;
			}
		}
		todos.splice(idx,0,{
			title:newTodo,
			number:0,
			done:false,
			first:false
		});
		nodb.save(todos);
		$scope.newTodo='';
	};

	$scope.hasDone=function (todo){
		todos.splice(todos.indexOf(todo),1);
		if(todo.done){
			todos.push(todo);
		}else{
			todos.unshift(todo);
		}
		nodb.init(todos);
		nodb.save(todos);
	};

	$scope.clearDone=function (){
		for(var i=todos.length-1;i>=0;i--){
			if(todos[i].done){
				todos.splice(i,1);
			}
		}
		nodb.save(todos);
	};

	$scope.runTimer=function (){
		if($scope.clock){
			timer.init($scope,26);
		}else{
			$scope.btnVal='停止番茄钟';
			$scope.clock=$interval(function (){
				timer.tick($scope);
				console.log($scope.timeLeft);
				if($scope.timeUsed>=$scope.timeTotal){
					todos[0].number++;
					nodb.save(todos);
					timer.init($scope,6);
					$scope.clock=$interval(function (){
						timer.tick($scope);
						console.log($scope.timeLeft);
						if($scope.timeUsed>=$scope.timeTotal){
							timer.init($scope,26);
						}
					},1000);
				}
			},1000);
		}
	};

	$scope.removeTodo=function (todo){
		todos.splice(todos.indexOf(todo),1);
		nodb.init(todos);
		nodb.save(todos);
	};

	$scope.toTop=function (todo){
		todos.splice(todos.indexOf(todo),1);
		todos.unshift(todo);
		nodb.init(todos);
		nodb.save(todos);
	}

});
