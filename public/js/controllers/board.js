function BoardCtrl ($scope, TeamsInfo) {
	$scope.pointSorType     = 'point'; // set the default sort type
	$scope.goalSorType    = 'goal_avarage'; // set the second sort type
	$scope.sortReverse  = true;  // set the default sort order

	$scope.setActive('gameBoard');
	$scope.board = TeamsInfo.query();
}

angular.module('viraLiga').controller('BoardCtrl',BoardCtrl);