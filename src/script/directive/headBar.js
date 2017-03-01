	'use strict';
	angular.module('app').directive('appHeadBar',[function(){
		return {
			restrict:'A',
			replace:true,
			templateUrl:'view/template/headBar.html',
			scope:{
				text:'@'
			},
			link:function($scope){ //function(scope,element,attr){}完整参数 scope为形参所以有没有$都可以
				// console.log($scope.text);
				$scope.back=function(){
					window.history.back();
				};
			
			}
		};
	}]);