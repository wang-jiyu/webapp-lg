	'use strict';
	angular.module('app')
	.config(['$provide',function ($provide) {  //修改$http服务POST改为get 
		$provide.decorator('$http',['$delegate','$q',function($delegate,$q){ //这里面的$delegate指代$http服务
			$delegate.post=function(url,data,config){ //$delegate代表$http,让控制器里面$http.post改$http.get请求
				var def = $q.defer();
				$delegate.get(url).then(function(resp){
					def.resolve(resp.data);
				}, function(resp){
					/*失败回调*/
					def.reject(resp);
				});

				return{
					success:function(cb){
						def.promise.then(cb);
					},
					error:function(cb){
						def.promise.then(null,cb);
					}
				}
			}
			return $delegate;
		}]);
	}])