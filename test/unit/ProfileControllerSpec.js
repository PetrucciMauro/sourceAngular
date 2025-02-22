/*
* Name :  accessControllerSpec.js
* Module : UnitTest
* Location : test/unit
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.0.1        30/07/2015   Petrucci Mauro              Unit test for Profile Controller
* =================================================================================================
*
*/

describe('Authentication Controller Test', function(){

	var scope;
	var controller;

	beforeEach(function(){		
     angular.module('ngRoute');
     angular.module('ngMaterial');
     angular.module('ngAnimate');
     angular.mock.module('premiApp');
     angular.mock.module('premiService');
     angular.module('ngStorage');
		inject(['$rootScope','$controller','$localStorage',function($rootScope, $controller,$localStorage){
			this.$localStorage= $localStorage;
			scope = $rootScope.$new();
			controller = $controller('ProfileController', { $scope : scope });
		}]);
	});


	it('controller is defined', function() {
		expect(controller).toBeDefined();
	});


});

