'use strict';

// controllers.js
angular.module('todoApp')
  .controller('HomeController', function($scope, TodoResource){
  	$scope.title = "Home";

		$scope.todos = [];

		// Get ToDos
		$scope.todos = TodoResource.query();
	});