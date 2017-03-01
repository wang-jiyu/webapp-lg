	'use strict';
	angular.module('app')   //引入模块
	.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) { //配置显示声明
		$stateProvider.state('main',{ //第一个参数配置路由
			url:'/main',  //url后面的哈希值
			templateUrl:'view/main.html', //页面模板
			controller:'mainCtrl'  //页面逻辑
		}).state('position',{
			url:'/position/:id',
			templateUrl:'view/position.html',
			controller:'positionCtrl'
		}).state('company',{
			url:'/company/:id',
			templateUrl:'view/company.html',
			controller:'companyCtrl'
		}).state('search',{
			url:'/search',
			templateUrl:'view/search.html',
			controller:'searchCtrl'
		}).state('login',{
			url:'/login',
			templateUrl:'view/login.html',
			controller:'loginCtrl'
		}).state('register',{
			url:'/register',
			templateUrl:'view/register.html',
			controller:'registerCtrl'
		}).state('me',{
			url:'/me',
			templateUrl:'view/me.html',
			controller:'meCtrl'
		}).state('favorite',{
			url:'/favorite',
			templateUrl:'view/favorite.html',
			controller:'favoriteCtrl'
		}).state('post',{
			url:'/post',
			templateUrl:'view/post.html',
			controller:'postCtrl'
		});
		$urlRouterProvider.otherwise('main'); //默认跳转
	}])