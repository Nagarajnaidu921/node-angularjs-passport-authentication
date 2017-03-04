(function() {
    angular.module('myApp')
        .factory('LocalStorageServ', [LocalStorageServ])

    function LocalStorageServ() {
        function saveUser(user) {
            if (user && (typeof user === 'object')) {
                user = JSON.stringify(user);
            }

            sessionStorage.setItem('user', user);
        }

        function deleteUser() {
            sessionStorage.removeItem('user');
        }

        function getUser() {
            var user = sessionStorage.user;
            if (user) {
                return JSON.parse(user);
            } else {
                return null;
            }
        }

        function getToken() {
            var user = sessionStorage.user;
            if (user) {
                return JSON.parse(user).token
            } else {
                return null;
            }
        }

        return {
            saveUser: saveUser,
            getUser: getUser,
            getToken: getToken,
            deleteUser: deleteUser
        }
    }
}())
