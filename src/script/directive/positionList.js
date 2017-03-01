	'use strict';
	angular.module('app')
	.directive('appPositionList',['$http',function($http) {
		return {
			restrict:'A',
			replace:true,
			templateUrl:'view/template/positionList.html',
			scope:{
				data:'=', //这样就与controller中的$scope共享（仅限属性共享）
				filterObj:'=',
				isFavorite:'='
			},
			link:function($scope){
				$scope.select = function(item){
					$http.post('data/favorite.json',{
						id:item.id,
						select:!item.select
					}).success(function(resp){
						item.select = !item.select;
					});
				};
			}
		};
	}]);