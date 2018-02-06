angular.module('viraLiga').controller('gamePlanCtrl',gamePlanCtrl);

function gamePlanCtrl ($scope, Results, TeamsInfo) {
	$scope.pointSorType     = 'point'; // set the default sort type
	$scope.goalSorType    = 'goal_avarage'; // set the second sort type
	$scope.sortReverse  = true;  // set the default sort order
	$scope.weekNO = null;
	$scope.weekSelect = false;

	$scope.setActive('gamePlan');
	/*$scope.plan = Results.query();*/
	$scope.teamsList = TeamsInfo.query();
	$scope.plan = Results.query();

	$scope.temp = {
		team1:{
			id: "",
			name:""
		},
		team2:{
			id: "",
			name:""
		},
		result:[],
		week: "",
		date: null
	}

	$scope.weekNumbers = [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
		 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
	

	$scope.Func = {
		firstSelect: function(item, model){
			$scope.temp.team1.name = item.name;
			$scope.temp.team1.id = item.id;
		},
		secondSelect: function(item, model){
			$scope.temp.team2.name = item.name;
			$scope.temp.team2.id = item.id;
		},
		addPlan: function() {
			$scope.temp.week = $scope.weekNO;
			Results.save($scope.temp, function (data) {
				$scope.plan = Results.query();
			});
		},
		onWeekClick: function(weekNumber) {
			$scope.numberOfWeek = weekNumber;
			$scope.weekSelect = true;
		}
	}
}