	'use strict';
	angular.module('app')
	.filter('filterByObj',[function () {
		return function(arr,obj){
			var result = [];
			angular.forEach(arr,function(item){
				var isEqual = true;
				for(var e in obj){
					if(item[e]!==obj[e]){
						isEqual = false;
					}
				}
				if(isEqual) {
					result.push(item);
				}
			});
			return result;
		};
	}]);