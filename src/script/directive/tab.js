	'use strict';
	angular.module('app')
	.directive('appTab', [function(){
		return {
			restrict:'A',
			replace:true,
			scope:{
				list:'=', //数据暴露API
				tabClick:'&'   //&指代传入函数
			},
			templateUrl:'view/template/tab.html',
			link:function($scope){
				$scope.click = function(tab){
					$scope.selectId = tab.id;
					$scope.tabClick(tab); //通知父控制器已经被点击了
				}
			}
		};
	}]);