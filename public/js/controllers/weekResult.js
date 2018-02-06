angular.module('viraLiga').controller('WeekResultCtrl',WeekResultCtrl);

function WeekResultCtrl ($scope, $http, Results, TeamsInfo) {
	//activation of tabs
	$scope.setActive('result');

	//GET jsons
	$scope.results = Results.query();
	$scope.resultBackup = Results.query();
	$scope.teamsInfo = TeamsInfo.query();
	
	$scope.weekNO = null;
	$scope.weekSelect = false;

	$scope.firstTeamGoals = 0;
	$scope.secondTeamGoals = 0;
	$scope.selectGame = false;
	$scope.updateAll = true;
	$scope.mode = 'view';
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

	$scope.firsttempTeamInfo = {
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

	$scope.secondtempTeamInfo = {
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

	$scope.weekNumbers = [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
		 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

	$scope.Func = {
		editResult: function(){
			$scope.mode = 'edit';
		},
		addResult: function(){
			$scope.mode = 'add'
		},
		onWeekClick: function(weekNumber) {
			$scope.numberOfWeek = weekNumber;
			$scope.weekSelect = true;
		},
		goalAvarageAnalyzerV1: function(firstTeam, secondTeam, backupGoalDiff, goalDiff) {
			//changing goal_avarage of first team
			$scope.backupGoalAve = firstTeam.goal_avarage - backupGoalDiff;
			firstTeam.goal_avarage = $scope.backupGoalAve;
			$scope.currentGoalAve = firstTeam.goal_avarage + goalDiff;
			firstTeam.goal_avarage = $scope.currentGoalAve;
										
			//changing goal_avarage of second team
			$scope.backupGoalAve = secondTeam.goal_avarage + backupGoalDiff;
			secondTeam.goal_avarage = $scope.backupGoalAve;
			$scope.currentGoalAve = secondTeam.goal_avarage - goalDiff;
			secondTeam.goal_avarage = $scope.currentGoalAve;
		},
		goalAvarageAnalyzerV2: function(firstTeam, secondTeam, backupGoalDiff, goalDiff) {
			//changing goal_avarage of first team
			$scope.backupGoalAve = firstTeam.goal_avarage - backupGoalDiff;
			firstTeam.goal_avarage = $scope.backupGoalAve;
			$scope.currentGoalAve = firstTeam.goal_avarage - goalDiff;
			firstTeam.goal_avarage = $scope.currentGoalAve;
										
			//changing goal_avarage of second team
			$scope.backupGoalAve = secondTeam.goal_avarage + backupGoalDiff;
			secondTeam.goal_avarage = $scope.backupGoalAve;
			$scope.currentGoalAve = secondTeam.goal_avarage + goalDiff;
			secondTeam.goal_avarage = $scope.currentGoalAve;
		},
		mathArithmetic: function(firstTeam, secondTeam, result, week){

			if (week == $scope.numberOfWeek) {
				if ((result[0] != null) && (result[1] != null)) {
					var result1 =  parseInt(result[0]);
					var result2 =  parseInt(result[1]);

					for (var i = 0; i < $scope.resultBackup.length; i++) {
						if ($scope.resultBackup[i].team1.id == firstTeam.id) {
							$scope.team1BackupGoal = $scope.resultBackup[i].result[0];
							$scope.team2BackupGoal = $scope.resultBackup[i].result[1];
						}
					}

					if (($scope.team1BackupGoal == null) && ($scope.team2BackupGoal == null)) {
						//if game was 14 = 14  
						if ((result2 > 13) && (result1 > 13)) {
							//if first team win the game
							if (result2 < result1) {
								//firstTeam changes
								firstTeam.win++;
								
								$scope.currentPoint = firstTeam.point + 2;
								firstTeam.point = $scope.currentPoint;
								
								$scope.goalDiff = result1 - result2;
								$scope.currentGoalAve = firstTeam.goal_avarage + $scope.goalDiff;
								firstTeam.goal_avarage = $scope.currentGoalAve; 

								//secondTeam changes
								secondTeam.lost++;

								$scope.currentPoint = secondTeam.point + 1;
								secondTeam.point = $scope.currentPoint;

								$scope.currentGoalAve = secondTeam.goal_avarage - $scope.goalDiff;
								secondTeam.goal_avarage = $scope.currentGoalAve;
							}
							//if second team win the game
							else {
								//secondTeam changes
								secondTeam.win++;
								
								$scope.currentPoint = secondTeam.point + 2;
								secondTeam.point = $scope.currentPoint;
								
								$scope.goalDiff = result1 - result2;
								$scope.currentGoalAve = secondTeam.goal_avarage - $scope.goalDiff;
								secondTeam.goal_avarage = $scope.currentGoalAve; 

								//firstTeam changes
								firstTeam.lost++;

								$scope.currentPoint = firstTeam.point + 1;
								firstTeam.point = $scope.currentPoint;

								$scope.currentGoalAve = firstTeam.goal_avarage + $scope.goalDiff;
								firstTeam.goal_avarage = $scope.currentGoalAve;
							}
						}
						//if game end in formal form(14 = 14 did not happen)
						else {
							//if first team win the game
							if (result2 < result1) {
								
								//firstTeam changes
								firstTeam.win++;
								
								$scope.currentPoint = firstTeam.point + 3;
								firstTeam.point = $scope.currentPoint;
								
								$scope.goalDiff = result1 - result2;
								$scope.currentGoalAve = firstTeam.goal_avarage + $scope.goalDiff;
								firstTeam.goal_avarage = $scope.currentGoalAve; 

								//secondTeam changes
								secondTeam.lost++;

								$scope.currentGoalAve = secondTeam.goal_avarage - $scope.goalDiff;
								secondTeam.goal_avarage = $scope.currentGoalAve;
							}
							//if second team win the game
							else {
								//secondTeam changes
								secondTeam.win++;
								
								$scope.currentPoint = secondTeam.point + 3;
								secondTeam.point = $scope.currentPoint;
								
								$scope.goalDiff = result1 - result2;
								$scope.currentGoalAve = secondTeam.goal_avarage - $scope.goalDiff;
								secondTeam.goal_avarage = $scope.currentGoalAve; 

								//firstTeam changes
								firstTeam.lost++;

								$scope.currentGoalAve = firstTeam.goal_avarage + $scope.goalDiff;
								firstTeam.goal_avarage = $scope.currentGoalAve;
							} // end of else --> if second team win the game
						} // end of else --> if game end in formal form(14 = 14 did not happen)
					}
					else {
						console.log("just Add file allowed for " + firstTeam.name + "and" + secondTeam.name);
					}
				}
			}
		},

		reWriteMathArithmetic: function(firstTeam, secondTeam, result, week) {
			if (week == $scope.numberOfWeek) {
				if ((result[0] != null) && (result[1] != null)) {
					var result1 =  parseInt(result[0]);
					var result2 =  parseInt(result[1]);

					for (var i = 0; i < $scope.resultBackup.length; i++) {
						if ($scope.resultBackup[i].team1.id == firstTeam.id) {
							$scope.team1BackupGoal = $scope.resultBackup[i].result[0];
							$scope.team2BackupGoal = $scope.resultBackup[i].result[1];
						}
					}			

					var teamOneBGint = parseInt($scope.team1BackupGoal);
					var teamTwoBGint = parseInt($scope.team2BackupGoal);

					$scope.backupGoalDiff = teamOneBGint - teamTwoBGint;
					$scope.goalDiff = result1 - result2;

					if ((teamOneBGint == result1) && (teamTwoBGint == result2)) {
						console.log(firstTeam.name + "and" + secondTeam.name + "result did not changed, so wo do not edit them");
					}
					else {
							//how points divided between teams in backupResult 
							if ((teamOneBGint > 13) && ($scope.team2BackupGoal > 13)) {
								if (teamTwoBGint < teamOneBGint) {
									$scope.resultBackupMode = 'team1WinOver14';
									console.log("team1WinOver14");
								}
								else{
									$scope.resultBackupMode = 'team2WinOver14';	
									console.log("team2WinOver14");
								}
							}
							else {
								if (teamTwoBGint < teamOneBGint) {
									$scope.resultBackupMode = 'team1Win';
									console.log("team1Win");
								}
								else{
									$scope.resultBackupMode = 'team2Win';
									console.log("team2Win");	
								}
							}
							//if game was 14 = 14  
							if ((result2 > 13) && (result1 > 13)) {
								//if first team win the game
								if (result2 < result1) {
									switch ($scope.resultBackupMode) {
									    case 'team1WinOver14':
									    	
									        break;
									    case 'team2WinOver14':
									    	//goal Avarage changes
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

									    	//point changes
									    	$scope.currentPoint = secondTeam.point - 1;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point + 1;
									    	firstTeam.point = $scope.currentPoint;

									    	//win & lost changes
									    	secondTeam.win--;
									    	secondTeam.lost++;

									    	firstTeam.win++
									    	firstTeam.lost--;

									        break;
									    case 'team1Win':
									   		$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);
									        
									        //point changes
									    	$scope.currentPoint = secondTeam.point - 1;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point + 1;
									    	firstTeam.point = $scope.currentPoint;

									        break;
									    case 'team2Win':
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

											//point changes
									    	$scope.currentPoint = secondTeam.point - 2;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point + 2;
									    	firstTeam.point = $scope.currentPoint;

									    	//win & lost changes
									    	secondTeam.win--;
									    	secondTeam.lost++;

									    	firstTeam.win++
									    	firstTeam.lost--;
									       
									        break;
									} //end of switchCase
								} //end of if (result2 < result1)
								else {
									switch ($scope.resultBackupMode) {
									    case 'team1WinOver14':
									    	
									    	//goal Avarage changes
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

									    	//point changes
									    	$scope.currentPoint = secondTeam.point + 1;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point - 1;
									    	firstTeam.point = $scope.currentPoint;

									    	//win & lost changes
									    	secondTeam.win++;
									    	secondTeam.lost--;

									    	firstTeam.win--;
									    	firstTeam.lost++;

									        break;
									    case 'team2WinOver14':								 								    	
									    	console.log("im in team2WinOver14 case");
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

									        break;
									    case 'team1Win':
									   		$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);
									        								     
									    	//point changes
									    	$scope.currentPoint = secondTeam.point + 2;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point - 2;
									    	firstTeam.point = $scope.currentPoint;

									    	//win & lost changes
									    	firstTeam.win--;
									    	firstTeam.lost++;

									    	secondTeam.win++
									    	secondTeam.lost--;

									        break;
									    case 'team2Win':
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

											//point changes
									    	$scope.currentPoint = secondTeam.point - 1;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point + 1;
									    	firstTeam.point = $scope.currentPoint;										
									       
									        break;
									} //end of switchCase
								} //end of else							
							} //end of if game was 14 = 14 

							//if game end in formal form(14 = 14 did not happen)
							else {
								//if first team win the game
								if (result2 < result1) {
									switch ($scope.resultBackupMode) {
									    case 'team1WinOver14':
									    	//goal Avarage changes
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

									    	//point changes
									    	$scope.currentPoint = secondTeam.point - 1;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point + 1;
									    	firstTeam.point = $scope.currentPoint;

									        break;
									    case 'team2WinOver14':
									    	//goal Avarage changes
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

									    	//point changes
									    	$scope.currentPoint = secondTeam.point - 2;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point + 2;
									    	firstTeam.point = $scope.currentPoint;

									    	//win & lost changes
									    	secondTeam.win--;
									    	secondTeam.lost++;

									    	firstTeam.win++
									    	firstTeam.lost--;

									        break;
									    case 'team1Win':
									    	//goal Avarage changes
									   		$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

									        break;
									    case 'team2Win':
									    	//goal Avarage changes
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

											//point changes
									    	$scope.currentPoint = secondTeam.point - 3;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point + 3;
									    	firstTeam.point = $scope.currentPoint;

									    	//win & lost changes
									    	secondTeam.win--;
									    	secondTeam.lost++;

									    	firstTeam.win++
									    	firstTeam.lost--;
									       
									        break;
									} //end of switchCase								
								}
								//if second team win the game
								else {
									switch ($scope.resultBackupMode) {
									    case 'team1WinOver14':
									    	//goal Avarage changes
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

									    	//point changes
									    	$scope.currentPoint = secondTeam.point + 2;
									    	secondTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = firstTeam.point - 2;
									    	firstTeam.point = $scope.currentPoint;

									    	//win & lost changes
									    	firstTeam.win--;
									    	firstTeam.lost++;

									    	secondTeam.win++
									    	secondTeam.lost--;
									    
									        break;
									    case 'team2WinOver14':
									    	//goal Avarage changes
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

									    	//point changes
									    	$scope.currentPoint = firstTeam.point - 1;
									    	firstTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = secondTeam.point + 1;
									    	secondTeam.point = $scope.currentPoint;

									        break;
									    case 'team1Win':
									    	//goal Avarage changes
									    	console.log("im in team1Win position");
									   		$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);

									   		//point changes
									    	$scope.currentPoint = firstTeam.point - 3;
									    	firstTeam.point = $scope.currentPoint;

									    	$scope.currentPoint = secondTeam.point + 3;
									    	secondTeam.point = $scope.currentPoint;

									    	//win & lost changes
									    	firstTeam.win--;
									    	firstTeam.lost++;

									    	secondTeam.win++
									    	secondTeam.lost--;

									        break;
									    case 'team2Win':
									    	//goal Avarage changes
									    	$scope.Func.goalAvarageAnalyzerV1(firstTeam, secondTeam, $scope.backupGoalDiff, $scope.goalDiff);										
									       
									        break;
									} //end of switchCase
								}// end of else --> if second team win the game
							} // end of else	
					}			
				}
			}
		},

		updateTeamsInfo:function(teamsInfo, team1ID, team2ID, result, week, reWrite){

			for (var i = 0; i < teamsInfo.length; i++) {
				if (teamsInfo[i].id == team1ID) {
					$scope.firsttempTeamInfo = teamsInfo[i];
				}
			};	

			for (var j = 0; j < teamsInfo.length; j++) {
				if (teamsInfo[j].id == team2ID) {
					$scope.secondtempTeamInfo = teamsInfo[j];
				}
			};

			if (reWrite == false) {
				$scope.Func.mathArithmetic($scope.firsttempTeamInfo, $scope.secondtempTeamInfo, result, week);
			}
			else if (reWrite == true) {
				$scope.Func.reWriteMathArithmetic($scope.firsttempTeamInfo, $scope.secondtempTeamInfo, result, week);
			}
			
			return teamsInfo;
		},

		sendResult: function(){
			
			//detect diff between add & edit
			if ($scope.mode == 'add') {
				$scope.reWriteResult = false;
			}
			else if ($scope.mode == 'edit') {
				$scope.reWriteResult = true;
			}

			angular.forEach($scope.results, function(match, key){				
				
				$scope.teamsInfo = $scope.Func.updateTeamsInfo($scope.teamsInfo, match.team1.id, match.team2.id, match.result, match.week, $scope.reWriteResult);

					//import data for sending to result.json
					$scope.temp = angular.copy(match);

					//post to result.json
					Results.save({id:$scope.temp.team1.id},$scope.temp, function (data) {
						$scope.results = Results.query();
						$scope.resultBackup = Results.query();
					});
				}); //endOf angular.forEach

			$scope.mode = 'view';

			//post to teamsInfo.json
			$http.post('/teamsInfo/updateAll', $scope.teamsInfo).
    			success(function(response) {
        			console.log('response');
    			}).
    			error(function() {	
        			console.log('Err');
    			});
		},
		onCancelClick: function() {
			$scope.mode = 'view';
			$scope.results = angular.copy($scope.resultBackup);
		} 
	}
}
