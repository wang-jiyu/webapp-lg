	'use strict';
	angular.module('app')
	.controller('meCtrl', ['cache','$scope','$state', function(cache,$scope,$state){
		if(cache.get('name')){ //通过name来判断用户是否登录
			$scope.name=cache.get('name');
			$scope.image=cache.get('image');
			$scope.id=cache.get('id');
		}
		$scope.logout = function(){
			cache.remove('id');
			cache.remove('name');
			cache.remove('image');
			$state.go('main');
		}
	}]);