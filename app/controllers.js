'use strict';

// controllers.js
angular.module('todoApp')
  .controller('HomeController', function($scope, $location, TodoResource){
  	$scope.title = "Home";

		$scope.todos = [];

		// Get ToDos
		$scope.todos = TodoResource.query();
		console.log($scope.todos);
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