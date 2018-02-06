function AppCtrl ($scope) {
  $scope.setActive = function (type) {
    $scope.gameBoardActive = '';
    $scope.teaManagmentActive = '';
    $scope.resultActive = '';

    $scope[type + 'Active'] = 'active';
  }



}