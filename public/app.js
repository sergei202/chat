angular.module('app', []);

angular.module('app').controller('ChatCtrl', function($scope,$http,$interval) {

	// Get list of messages from server backend route
	function refresh() {
		$http.get('/messages').then(function(res) {
			console.log('/messages: ', res.data);
			$scope.messages = res.data;
		});
	}
	refresh();

	// Call refresh() every second to get the latest messages
	$interval(refresh, 1000);

	// Initialize name and newMessage
	$scope.name = '';
	$scope.newMessage = {text:''};


	$scope.send = function() {
		console.log('send() newMessage=%o', $scope.newMessage);
		// newMessage right now only contains the text,
		// we need to add name and date
		$scope.newMessage.name = $scope.name;
		$scope.newMessage.date = new Date();

		// POST newMessage to the backend
		$http.post('/message', $scope.newMessage).then(function(res) {
			console.log('/message: ', res.data);
			// res.data contains the new message list.
			// This prevents us from having to call refresh()
			$scope.messages = res.data;
		});

		// Reset newMessage to clear the last text
		$scope.newMessage = {text:''};
	};
});
