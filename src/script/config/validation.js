	'use strict';
	angular.module('app')
	.config(['$validationProvider',function($validationProvider){
		var expression = {  //此表达式为了保证表单值是否符合要求
			phone:/^1[\d]{10}$/,    //每条属性代表一种校验规则
			password: function(value){
				var str = value + '' //转成字符串
     			return str.length > 5;
			},
			required:function(value){
				return !!value;  //不可为空
			}
		};
		var defaultMsg = { //错误提示配置
			phone:{
				success:'',
				error:'必须输入11位手机号'
			},
			password:{
				success:'',
				error:'必须输入大于6位密码'
			},
			required:{
				success:'',
				error:'不能为空'
			}
		}
		$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);//进行配置
	}]);