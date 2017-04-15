(function() {
    var app = angular.module('myApp', ['ngRoute']);
    app.run(['$rootScope', '$location', '$route', 'Auth', function($rootScope, $location, $route, Auth) {
        $rootScope.logOut = function() {
            Auth.logOut()
        };

        $rootScope.$on('$routeChangeStart', function(ev, next, current) {
            var isLoggedIn = Auth.isLoggedIn();
            $rootScope.isLoggedIn = isLoggedIn;
            var redirectToLoginPage = (next.$$route && next.$$route.isAuthNeeded && (!isLoggedIn));

            if (redirectToLoginPage) {
                $location.path('/login');
            }

        })
    }]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/profile', {
                templateUrl: '/partials/user-profile.html',
                controller: 'profileCtrl',
                isAuthNeeded: true
            })
            .when('/login', {
                templateUrl: '/partials/login.html',
                controller: 'loginCtrl',
                isAuthNeeded: false
            })
            .when('/register', {
                templateUrl: '/partials/register.html',
                controller: 'registerCtrl',
                isAuthNeeded: false
            })
            .otherwise('/login')
    }])

    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('HttpAuthIntreptorServ');
    }]);

    app.directive('navActive', ['$rootScope', '$window', function($rootScope, $window) {

        function link(scope, element, attrs) {
            var li = element.parent();
            if (li[0].nodeName === 'LI') {
                $rootScope.$on('$routeChangeSuccess', function(e) {
                    if (element[0].href === $window.location.href) {
                        li.addClass('active');
                    } else {
                        li.removeClass('active');
                    }
                })

            }

        }

        return {
            restrict: 'A',
            link: link
        }
    }])

}())
;(function() {
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
;(function() {
    angular.module('myApp')
        .controller('mainCtrl', ['$scope', mainCtrl]);

    function mainCtrl($scope) {

    }
}())
;(function() {
    angular.module('myApp')
        .controller('profileCtrl', ['$scope', 'Profile', profileCtrl]);

    function profileCtrl($scope, Profile) {
    	Profile.get()
    	.then(function (profileData) {
    		console.log(profileData)
    		$scope.up = profileData;
    	})
    }
}())
;'use strict';
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
;(function() {
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
;(function() {
    angular.module('myApp')
        .factory('HttpAuthIntreptorServ', ['LocalStorageServ', HttpAuthIntreptorServ])

    function HttpAuthIntreptorServ(LocalStorageServ) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                var token = LocalStorageServ.getToken()
                if (token) {
                    config.headers['x-access-token'] = token;
                    config.headers.Authorization = token;
                }
                // console.log(config.headers)
                return config;
            }
        };
    }
}())
;(function() {
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
;(function() {
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
