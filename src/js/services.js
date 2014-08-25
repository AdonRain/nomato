nomato.factory('nodb',function () {
	var lsKey='nomato_todos';
	return {
		find:function (){
			return JSON.parse(localStorage.getItem(lsKey) || '[]');
		},
		save:function (todos){
			localStorage.setItem(lsKey, JSON.stringify(todos));
		},
		init:function (todos){
			if(todos.length===0)return;
			todos[0].first=true;
			for(var i=1;i<todos.length;i++){
				todos[i].first=false;
			}
		}
	};
});

nomato.factory('timer',['$interval',function ($interval){
	return {
		init:function ($scope,min){
			$interval.cancel($scope.clock);
			$scope.clock=null;
			$scope.timeTotal=60*min;
			$scope.timeUsed=60;
			$scope.btnVal='开始吃番茄';
		},
		tick:function ($scope){
			$scope.timeUsed++;
			$scope.timeLeft=$scope.timeTotal-$scope.timeUsed;
		}
	};
}]);
