'use strict';

// services.js
angular.module('todoApp')
  .factory('TodoResource', function($resource){
  	return $resource("http://bf02b8e1.ngrok.io/:id", { id: "@id" }, { update: { method: "PATCH" }});
  })