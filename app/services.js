'use strict';

// services.js
angular.module('todoApp')
  .factory('TodoResource', function($resource){
  	return $resource("https://jsonplaceholder.typicode.com/todos/:id", { id: "@id" }, { update: { method: "PATCH" }});
  })