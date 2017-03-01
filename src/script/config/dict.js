	'use strict';
	angular.module('app')
	.value('dict',{}) //创建全局变量，没有动态对象，只有值
	.run(['dict','$http',function (dict,$http) {		//模块初始化操作，引入dict全局变量
		$http.get('data/city.json').then(function(resp){
			dict.city=resp.data;
		}, function(resp){
			console.log(resp.data);
		});
		$http.get('data/salary.json').then(function(resp){
			dict.salary=resp.data;
		}, function(resp){
			console.log(resp.data);
		});
		$http.get('data/scale.json').then(function(resp){
			dict.scale=resp.data;
		}, function(resp){
			console.log(resp.data);
		});
	}]);  