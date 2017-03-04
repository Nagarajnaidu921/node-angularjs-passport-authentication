'use strict';
(function() {
    angular.module('myApp')
        .controller('registerCtrl', ['$scope', 'Auth', registerCtrl]);

    function registerCtrl($scope, Auth) {

        $scope.registerUser = function() {
            Auth.register($scope.user.email, $scope.user.password)
            .then(function(data) {
            	if (data && data.message && (!data.success)) {
            		$scope.message = data.message;
            	}
            })
        }

    }
}())
