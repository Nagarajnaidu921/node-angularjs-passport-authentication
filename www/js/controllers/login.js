(function() {
    angular.module('myApp')
        .controller('loginCtrl', ['$scope', 'Auth', loginCtrl]);

    function loginCtrl($scope, Auth) {

        $scope.loginUser = function() {
            Auth.logIn($scope.user.email, $scope.user.password)
                .then(function(data) {
                    if (data && data.message && (!data.success)) {
                        $scope.message = data.message;
                    }
                })
        };

    }

}())
