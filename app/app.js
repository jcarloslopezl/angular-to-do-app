'use strict';

// app.js
angular
		.module('todoApp', ["ngRoute"])
		.config(function($routeProvider){
			$routeProvider
				.when("/", {
					controller: "HomeController",
					templateUrl: "templates/home.html" 
				});
		});