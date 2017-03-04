(function() {
    angular.module('myApp')
        .factory('Auth', ['$http', '$location', 'LocalStorageServ', Auth])

    function Auth($http, $location, LocalStorageServ) {

        function register(email, password) {
            return $http.post('/register', { email: email, password: password })
                .then(function(res) {
                    if (res.data && res.data.token) {
                        var user = {
                            token: res.data.token
                        };
                        LocalStorageServ.saveUser(user);
                        $location.path('/profile')
                    }
                    return res.data;
                })
        }

        function isLoggedIn() {
            return LocalStorageServ.getToken();
        }

        function logIn(email, password) {
            return $http.post('/login', { email: email, password: password })
                .then(function(res) {
                    if (res.data && res.data.token) {
                        var user = {
                            token: res.data.token
                        };
                        LocalStorageServ.saveUser(user);
                        $location.path('/profile')
                    }
                    return res.data;
                })
        }


        function logOut() {
            LocalStorageServ.deleteUser();
        }

        return {
            register: register,
            isLoggedIn: isLoggedIn,
            logOut: logOut,
            logIn: logIn
        }
    }
}())
