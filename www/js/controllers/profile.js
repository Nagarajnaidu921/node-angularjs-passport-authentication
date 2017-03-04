(function() {
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
