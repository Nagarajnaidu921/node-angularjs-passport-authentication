(function() {
    angular.module('myApp')
        .factory('Profile', ['$http', Profile]);

    function Profile($http) {
        function getUser() {
            return $http.get('/api/me')
                .then(function(res) {
                    return res.data;
                })
        }

        return {
            getUser: getUser,
            get: getUser
        }

    }

}())
