angular.module('viraLiga').controller('TeaManagmentCtrl',TeaManagmentCtrl);

function TeaManagmentCtrl ($scope, TeamsInfo) {
	$scope.setActive('teaManagment');
	$scope.teamsInfo = TeamsInfo.query();

	$scope.temp = {
		id: "",
		name: "",
		members: [
			{
				name: [],
				photo: ""
			}
		],
		win: "",
	    lost: "",
	    goal_avarage: "",
	    point: ""
	};
	$scope.idMaker;
	$scope.teamLogo = "";
	$scope.Data = {
		mode: 'view',
		searchMode: 'none',
		userroleList: [],
		selecteduserrole: {
		},
		backupTeamInfo: {},
		validationClicked: false
	}

	$scope.Func = {
		onCancelClick: function(){
			$scope.firstMember = null;
			$scope.secondMember = null;
			$scope.teamName = null; 
		},

		onListItemSelect: function(item){
			$scope.temp = angular.copy(item);
			$scope.firstMember = $scope.temp.members[0].name[0];
			$scope.secondMember = $scope.temp.members[0].name[1];
			$scope.teamName = $scope.temp.name;
			 $scope.teamLogo = $scope.temp.members[0].photo;
		},
		updateInfo: function(){

			if ($scope.temp.id) {

				$scope.temp.name = $scope.teamName;
				$scope.temp.members[0].name[0] = $scope.firstMember;
				$scope.temp.members[0].name[1] = $scope.secondMember;
				$scope.temp.members[0].photo = $scope.teamLogo; 
				TeamsInfo.save({id:$scope.temp.id},$scope.temp, function (data) {
					$scope.teamsInfo = TeamsInfo.query();
				});
			}
			else{
				$scope.idMaker = $scope.teamsInfo.length + 1; 
				$scope.temp.id = $scope.idMaker;
				$scope.temp.name = $scope.teamName;
				$scope.temp.members[0].name[0] = $scope.firstMember;
				$scope.temp.members[0].name[1] = $scope.secondMember;
				$scope.temp.members[0].photo = $scope.teamLogo; 
				$scope.temp.win = 0;
				$scope.temp.lost = 0;
				$scope.temp.goal_avarage = 0;
				$scope.temp.point = 0; 
				TeamsInfo.save($scope.temp, function (data) {
					$scope.teamsInfo = TeamsInfo.query();
				});
			}

			$scope.firstMember = null;
			$scope.secondMember = null;
			$scope.teamName = null;	
		},
		addTeam: function(){
			$scope.firstMember = null;
			$scope.secondMember = null;
			$scope.teamName = null;
			$scope.temp.id = null;
		}
	}
}