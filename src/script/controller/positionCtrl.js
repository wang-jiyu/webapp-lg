	'use strict'
	angular.module('app')
	.controller('positionCtrl',['$log','$q','$http','$state','$scope','cache',function($log,$q,$http,$state,$scope,cache){
		$scope.isLogin = !!cache.get('name'); //两个！！可以转换成布尔值 
		$scope.message = $scope.isLogin?'投个简历':'去登录';
		function getPosition(){
			var def=$q.defer(); //声明延迟加载对象
			$http.get('/data/position.json?id='+$state.params.id)
			.then(function(resp){ //成功回调
				// console.log(resp.data)
				$scope.position = resp.data;
				if(resp.data.posted){
					$scope.message = '已投递';
				}

				def.resolve(resp.data); //成功之后返回数据 
			},function(resp){  //失败回调
				def.reject(resp.data);
			});
			return def.promise;
		}

		function getCompany(id){
			$http.get('data/company.json?id='+id).then(function(resp){
				// console.log(resp);
				$scope.company = resp.data;
			})
		}

		getPosition().then(function(resp){
			getCompany(resp.companyId);
		});

		$scope.go = function(){
			if($scope.message !== '已投递'){
				if($scope.isLogin){
					$http.post('data/handle.json',{
						id:$scope.position.id
					}).success(function(resp){
						$log.info(resp); //打印日志服务 
						$scope.message = '已投递';
					});
				}else{
					$state.go('login');
				}
			}
		}
		
	}]);