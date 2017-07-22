angular.module('app', []);

angular.module('app').controller('ChatCtrl', function($scope,$http) {
	$scope.messages = [
		{name:'Dummy', text:'First message', date:new Date()},
		{name:'Dummy', text:'Hi',			 date:new Date()}
	];

	$scope.name = 'Sergei';
	$scope.newMessage = {text:''};


	$scope.send = function() {
		console.log('send() newMessage=%o', $scope.newMessage);
		$scope.newMessage.name = $scope.name;
		$scope.newMessage.date = new Date();
		$scope.messages.push($scope.newMessage);

		$scope.newMessage = {text:''};
	};
});
