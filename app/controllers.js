'use strict';

// controllers.js
angular.module('todoApp')
  .controller('HomeController', function($scope, $location, TodoResource){
  	$scope.title = "Home";
		$scope.todos = [];

		// Get ToDos
		$scope.todos = TodoResource.query();

		// Remove ToDo
		$scope.todoRemove = function(todo){
			TodoResource.delete({id: todo._id}, function(data){
				console.log(data);
				$scope.todos = $scope.todos.filter(function(element){
					return element._id !== todo._id;
				})
			});
		}
	
	})

 	.controller('TodoController', function($scope, $resource, $routeParams, $location, TodoResource){
		// Get ToDos
		$scope.title = "Edit ToDo";
		$scope.todo = TodoResource.get({id: $routeParams.id});
		console.log($scope.todo);
		
		$scope.createTodo = function(){
			TodoResource.update({id: $scope.todo._id}, {data: $scope.todo}, function(data){
				$location.path("/todo/"+$scope.todo._id);
			});
		}

	})

	.controller('NewTodoController', function($scope, $location, TodoResource){
		// Create ToDo		
		$scope.todo = {};
		$scope.title = "Create ToDo";
		$scope.createTodo = function(){
			TodoResource.save({data: $scope.todo}, function(data){				
				$location.path("/");
			});
		}
	});