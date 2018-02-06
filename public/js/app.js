angular.module('viraLiga', ['viraLigaServices', 'ui.select', 'ui.router', 'ui.bootstrap.persian.datepicker', 'vtPersianDatePicker', 'ui.bootstrap'])

.controller('AppCtrl', function AppCtrl ($scope) {
  $scope.setActive = function (type) {
    $scope.gameBoardActive = '';
    $scope.teaManagmentActive = '';
    $scope.resultActive = '';
    $scope.gamePlanActive = '';

    $scope[type + 'Active'] = 'active';
  }
})

.config(function($stateProvider, $urlRouterProvider) {
    /*$urlRouterProvider.otherwise('/home');*/
    $stateProvider
        .state('gameBoard', {
            url: '',
            templateUrl: 'partials/board.html',
            controller: 'BoardCtrl'})
        .state('teaManagment', {
            url: '/teaManagment',
            templateUrl: 'partials/teaManagment.html',
            controller: 'TeaManagmentCtrl'})
        .state('results', {
            url: '/results',
            templateUrl: 'partials/weekResult.html',
            controller: 'WeekResultCtrl'})
        .state('gamePlan', {
            url: '/gamePlan',
            templateUrl: 'partials/gamePlan.html',
            controller: 'gamePlanCtrl'});
        
});
