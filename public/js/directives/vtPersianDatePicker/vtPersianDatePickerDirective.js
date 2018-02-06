angular.module('vtPersianDatePicker', []).directive("vtPersianDatePicker", function() {
	return {
		restrict : 'AE',
		templateUrl : 'js/directives/vtPersianDatePicker/vtPersianDatePicker.html',
		scope : {
			model : '=',
			isRequired : "=",
			name : "@"
		},
		controller : function($scope, $rootScope) {
			$scope.$watch("model", function(newValue, oldValue) {
				if (newValue && !angular.isDate(newValue)) {
					newValue = new Date(newValue);
					$scope.model = newValue;
				}
			}, true);
			$scope.Data = {
				datePicker : {
					isOpen : false
				},
				open : function($event) {
					$event.preventDefault();
					$event.stopPropagation();
					$rootScope.$broadcast('closeDatePicker', {
						close : $scope.name
					});
					$scope.Data.datePicker.isOpen = !$scope.Data.datePicker.isOpen;
				}
			}
			$rootScope.$on('closeDatePicker', function(e, eArgs) {
				if ($scope.name != eArgs.close)
					$scope.Data.datePicker.isOpen = false;
			});
		},
		link : function(scope, element, attrs, ctrls) {
		}
	};
});