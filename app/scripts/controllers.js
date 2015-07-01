'use strict';

var premiControllers = angular.module('premiControllers', []);

premiControllers.controller('premiAuthenticationController', ['$rootScope', '$scope', '$location', '$localStorage','Main', function($rootScope, $scope, $location, $localStorage,Main) {
	$scope.master = {};

	$scope.update = function(user) {
		$scope.master.email = $scope.user.email;
		$scope.master.password = $scope.user.password;
		$scope.status = 'logged';
	};

	$scope.reset = function() {
		$scope.user = angular.copy($scope.master);
	};

	$scope.signin = function() {
		var formData = {
				username: $scope.user.username,
				password: $scope.user.password,
				admin: false
		}

		Main.signin(formData, function(res) {
				if (res.type == false) {
						alert(res.data)    
				} else {
						$localStorage.token = res.data.token;
						$local.path("/home");    
				}
		}, function() {
				$rootScope.error = 'Failed to signin';
		})
	};

	$scope.signup = function() {
		var formData = {
				username: $scope.user.username,
				password: $scope.user.password,
				admin: false
		}
		console.log("ciao");
		Main.save(formData, function(res) {
				console.log("Main.save");
				if (res.type == false) {
						alert(res.data)
				} else {
						$localStorage.token = res.data.token;
						$local.path("/home");  
				}
		}, function() {
				$rootScope.error = 'Failed to signup';
		})
	};

	$scope.me = function() {
		Main.me(function(res) {
				$scope.myDetails = res;
		}, function() {
				$rootScope.error = 'Failed to fetch details';
		})
	};

	$scope.logout = function() {
		$scope.welcome = '';
		$scope.message = '';
		$scope.isAuthenticated = false;
		delete $window.sessionStorage.token;
	};
	
	$scope.token = $localStorage.token;

	$scope.grade = function() {
		var size = $scope.password.length;
		if (size > 8) {
			$scope.strength = 'strong';
		} else if (size > 3) {
			$scope.strength = 'medium';
		} else {
			$scope.strength = 'weak';
		}
	};
}])

premiControllers.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {
	Main.me(function(res) {
			$scope.myDetails = res;
		}, function() {
			$rootScope.error = 'Failed to fetch details';
		})
	}])


premiControllers.controller('HomeController',['$rootScope', '$scope', '$location', 'Main', 'toPage', function($rootScope, $scope, $location, Main, toPage) {
	//$scope.allSS = SlideShow.query();

	$scope.goEdit = function(slideId){
		toPages.editpage(slideId);
		}

	$scope.goExecute = function(slideId){
		toPages.executionpage(slideId);
		}

	$scope.goProfile = function(){
		toPages.profilepage();
		}

	$scope.deleteSlideShow = function(slideId) {
		//$scope.delete CHIAMARE LA DELETE SLIDESHOW DEL MODEL
		//$scope.delete CHIAMARE LA DELETE SLIDESHOW DELLA VIEW
	}
	$scope.renameSlideShow = function(slideId) {
		//$scope.delete CHIAMARE LA DELETE SLIDESHOW DEL MODEL
		//$scope.delete CHIAMARE LA DELETE SLIDESHOW DELLA VIEW
	}
	$scope.createSlideShow = function() {
		//$scope.delete CHIAMARE LA DELETE SLIDESHOW DEL MODEL
		//$scope.delete CHIAMARE LA DELETE SLIDESHOW DELLA VIEW
	}
	}])



