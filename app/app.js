'use strict';

// app.js
angular
		.module('todoApp', ["lumx", "ngRoute", "ngResource"])
		.config(function($routeProvider){
			$routeProvider
				.when("/", {
					controller: "HomeController",
					templateUrl: "templates/home.html" 
				})
				.when("/todo/new",{
					controller: "NewTodoController",
					templateUrl: "templates/todo_form.html"
				})
				.when("/todo/:id",{
					controller: "TodoController",
					templateUrl: "templates/todo.html"
				});
		});