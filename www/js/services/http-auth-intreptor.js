(function() {
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
