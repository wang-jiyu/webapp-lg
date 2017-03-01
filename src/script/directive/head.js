	'use strict';
	angular.module('app')
	.directive('appHead',['cache',function(cache){
		return{
			restrict:'A',  //通过属性方式调用指令
			replace:true,  //替换外层父元素(只能有一个根元素)
			templateUrl:'view/template/head.html', //模板位置
			link:function($scope){
				$scope.name = cache.get('name') || '';
			}
		}
	}]);