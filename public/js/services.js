angular.module('viraLigaServices', ['ngResource', 	])
	.factory('TeamsInfo', function  ($resource, $http) {
		return $resource('/teamsInfo/:id');
	})
	.factory('BoardsInfo', function  ($resource) {
		return $resource('/boardsInfo');
	})
	.factory('Results', function  ($resource) {
		return $resource('/result/:id');
	})
	.factory('GamePlan', function  ($resource) {
		return $resource('/gamePlan');
	});