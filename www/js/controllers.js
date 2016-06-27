angular.module('starter.controllers', [])

.filter('inSlicesOf',
		['$rootScope',
		function($rootScope) {
			makeSlices = function(items, count) {
				if (!count)
					count = 3;

				if (!angular.isArray(items) && !angular.isString(items)) return items;

				var array = [];
				for (var i = 0; i < items.length; i++) {
					var chunkIndex = parseInt(i / count, 10);
					var isFirst = (i % count === 0);
					if (isFirst)
						array[chunkIndex] = [];
					array[chunkIndex].push(items[i]);
				}

				if (angular.equals($rootScope.arrayinSliceOf, array))
					return $rootScope.arrayinSliceOf;
				else
					$rootScope.arrayinSliceOf = array;

				return array;
			};

			return makeSlices;
		}]
	)

.controller('DashCtrl', function($scope, Categories) {
  $scope.myTitle = 'Template';
  $scope.$on('$ionicView.enter', function(e) {
    $scope.items = Categories.all();
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    console.log('$ionicView.enter');
  });

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
