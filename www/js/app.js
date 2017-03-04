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
