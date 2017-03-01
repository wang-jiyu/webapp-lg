	'use strict';
	angular.module('app').directive('appPositionClass',[function(){
		return{
			restrict:'A',
			replace:true,
			scope:{
				com:'='
			},
			templateUrl:'view/template/positionClass.html',
			link:function($scope){
				$scope.showPositionList=function(index){
					$scope.positionList = $scope.com.positionClass[index].positionList;
					// console.log($scope.positionList);
					$scope.isActive=index;
				}
				$scope.$watch('com',function(newVal){  //监听com变化,com为属性名称，也可写函数与式
					if(newVal) $scope.showPositionList(0);
				});
			}
		};
	}]);